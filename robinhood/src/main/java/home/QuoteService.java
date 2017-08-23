package home;

import home.model.BuySellOrder;
import home.model.DB;
import home.model.Quote;
import home.model.RobinhoodHistoricalQuote;
import home.model.RobinhoodHistoricalQuoteResult;
import home.model.Stock;
import home.model.Tuple2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Function;
import java.util.stream.Stream;

import static home.Main.OPEN;
import static java.time.temporal.ChronoUnit.MINUTES;
import static java.util.stream.Collectors.*;

public class QuoteService {
    private final Logger logger = LoggerFactory.getLogger(QuoteService.class);
    private final Random random = new Random();
    private final DB db;
    private final HttpService httpService;

    @Value("${wanted-symbols}") private String wantedSymbols;

    public QuoteService(HttpService httpService, DB db, OrderService orderService) {
        this.httpService = httpService;
        this.db = db;
    }

    public void quotes() {
        if (!db.hasHistoricalQuotes()) {                    // we don't have historical quotes for last 5 days yet
            httpService.getHistoricalQuotes(wantedSymbols)  // historical quotes for a week
                    .forEach(rhqr -> {
                        db.addHistoricalQuotes(
                                rhqr.getSymbol(),
                                rhqr.getHistoricals().stream()
                                        .flatMap(h -> Stream.of(h.getLowPrice(), h.getHighPrice()))
                                        .mapToDouble(BigDecimal::doubleValue)
                                        .toArray()
                        );
                    });
        }

        LocalTime _fetchedAt = LocalTime.now();
        if (_fetchedAt.until(Main.OPEN, MINUTES) > 5 || _fetchedAt.until(Main.CLOSE, MINUTES) < 0) {
            if (_fetchedAt.getSecond() > 4) {
                return;
            }
        }
        boolean createGraph = _fetchedAt.get(ChronoField.SECOND_OF_MINUTE) % 15 == 0;

        final LocalTime fetchedAt = roundSecond(_fetchedAt, 5);

        AtomicBoolean missingQuotesToday = new AtomicBoolean(false);

        Collection<Quote> quotes = httpService.quotes(wantedSymbols);

        if (_fetchedAt.isAfter(LocalTime.of(17, 0))) {  // fluctuate the price because I'm testing
            quotes.forEach(q -> {
                String s = String.format("%s0.%02d", random.nextBoolean() ? "-" : "", random.nextInt(20));
                BigDecimal price = q.getPrice().add(new BigDecimal(s));
                q.setPrice(price);
            });
        }

        quotes.forEach(q -> {
            q.setFrom(fetchedAt).setTo(fetchedAt.plusSeconds(5));
            db.updateInstrumentSymbol(q.getInstrument(), q.getSymbol());
            Stock stock = db.addStock(new Stock(q.getSymbol(), q.getInstrument()));
            stock.addQuote(q);

            if (stock.getDay5Min() == null && db.hasHistoricalQuotes()) {
                Tuple2<BigDecimal, BigDecimal> weekMinMax = db.getWeekMinMax(q.getSymbol());
                if (weekMinMax != null) {
                    stock.setDay5Min(weekMinMax._1());
                    stock.setDay5Max(weekMinMax._2());
                }
            }

            Quote firstQuote = stock.getFirstQuoteOfDay();
            if (firstQuote != null
                    && !missingQuotesToday.get()
                    && !isTodayWeekend()
                    && firstQuote.getFrom().isAfter(LocalTime.of(9, 40, 0))
                    && firstQuote.getTo().isBefore(LocalTime.of(15, 59, 0))) {
                missingQuotesToday.set(true);
            }

            List<BuySellOrder> patientBuySellOrders = db.gePatienttBuySellOrders(q.getSymbol());
            patientBuySellOrders.forEach(pbso -> {
                if ("buy".equals(pbso.getSide())) {

                }
                else {

                }
            });
        });

/*
        if (missingQuotesToday.get()) {  // fill up the missing quotes for today
            Map<String, LinkedList<RobinhoodHistoricalQuote>> symbolDayQuotesMap =
                    httpService.getTodayHistoricalQuotes(wantedSymbols).stream()
                            .collect(toMap(
                                    RobinhoodHistoricalQuoteResult::getSymbol,
                                    rhqr -> {
                                        rhqr.getHistoricals().forEach(rhq -> {
                                            LocalDateTime t = rhq.getBeginsAt().plusHours(Utils.robinhoodAndMyTimeDifference());
                                            rhq.setBeginsAt(t);
                                        });
                                        return rhqr.getHistoricals();
                                    }
                            ));
            
            db.getStocksStream().forEach(stock -> {
                LinkedList<RobinhoodHistoricalQuote> dayQuotes = symbolDayQuotesMap.get(stock.getSymbol());
                Quote firstQuoteOfDay = stock.getFirstQuoteOfDay();
                if (dayQuotes != null && firstQuoteOfDay != null) {
                    while (true) {
                        try {
                            RobinhoodHistoricalQuote lastDayQuote = dayQuotes.pollLast();
                            LocalTime lastDayQuoteLocalTime = lastDayQuote.getBeginsAt().toLocalTime();
                            if (lastDayQuoteLocalTime.plusMinutes(4).plusSeconds(59).isBefore(firstQuoteOfDay.getFrom())) {
                                Quote q = new Quote(stock.getSymbol(), lastDayQuote.getLowPrice(), stock.getInstrument(),
                                        lastDayQuoteLocalTime.plusSeconds(150), lastDayQuoteLocalTime.plusSeconds(300));
                                stock.prependQuote(q);
                                q = new Quote(stock.getSymbol(), lastDayQuote.getHighPrice(), stock.getInstrument(),
                                        lastDayQuoteLocalTime, lastDayQuoteLocalTime.plusSeconds(150));
                                stock.prependQuote(q);
                            }
                        }
                        catch (NullPointerException npex) {
                            break;
                        }
                    }
                }
            });
        }
*/

        db.quotesReady(createGraph);
    }

    private LocalTime roundSecond(LocalTime t, int n) {
        for (int i = 1; i <= 60 / n; i++) {
            if (t.get(ChronoField.SECOND_OF_MINUTE) < n*i) {
                return t.withSecond(n * (i - 1));
            }
        }
        return t.withSecond(60 / n * n);
    }

    private boolean isTodayWeekend() {
        DayOfWeek today = LocalDate.now().getDayOfWeek();
        return today == DayOfWeek.SATURDAY || today == DayOfWeek.SUNDAY;
    }
}
