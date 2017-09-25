package home;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.*;
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
    private final ObjectMapper objectMapper;

    @Value("${wanted-symbols}") private String wantedSymbols;
    @Value("${path-to-memory}") private String pathToMemory;

    public QuoteService(HttpService httpService, DB db, ObjectMapper objectMapper) {
        this.httpService = httpService;
        this.db = db;
        this.objectMapper = objectMapper;
    }

    @PostConstruct public void postConstruct() {
        try {
            String s = Files.readAllLines(Paths.get(pathToMemory)).stream().collect(joining());
            List<Stock> stocks = objectMapper.readValue(s, new TypeReference<List<Stock>>() {});
            stocks.forEach(db::addStock);
        }
        catch (Exception ex) {
            logger.warn("Error in reading memory json", ex);
        }
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

        AtomicBoolean missingQuotesToday = new AtomicBoolean(false);

        Collection<Quote> quotes = httpService.quotes(wantedSymbols).stream().filter(Objects::nonNull).collect(toList());

        quotes.stream()
                .filter(q -> {
                    LocalTime updatedAt = q.getUpdatedAt().toLocalTime();
                    return updatedAt.isAfter(Main.OPEN) && updatedAt.isBefore(Main.CLOSE);
                })
                .forEach(q -> {
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
                            && firstQuote.getUpdatedAt().toLocalTime().isAfter(Main.OPEN.plusMinutes(10))) {
                        missingQuotesToday.set(true);
                    }

                    Set<BuySellOrder> patientBuySellOrders = db.gePatienttBuySellOrders(q.getSymbol());
                    patientBuySellOrders.forEach(bso -> {
                        if ("buy".equals(bso.getSide())) {
                            if (Math.abs(stock.getPrice().subtract(bso.getPrice()).doubleValue()) < 0.04) {
                                patientBuySellOrders.remove(bso);
                                db.addBuySellOrder(bso);
                            }
                        }
                        else {
                            if (Math.abs(bso.getPrice().subtract(stock.getPrice()).doubleValue()) < 0.04) {
                                patientBuySellOrders.remove(bso);
                                db.addBuySellOrder(bso);
                            }
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

        db.quotesReady(true);
    }

    public void removeSymbol(String symbol) {
        symbol = "," + symbol + ",";
        String s = ("," + wantedSymbols + ",").replace(symbol, "");
        if (s.startsWith(",")) {
            s = s.substring(1);
        }
        if (s.endsWith(",")) {
            s = s.substring(0, s.length() - 1);
        }
        wantedSymbols = s;
    }

    private boolean isTodayWeekend() {
        DayOfWeek today = LocalDate.now().getDayOfWeek();
        return today == DayOfWeek.SATURDAY || today == DayOfWeek.SUNDAY;
    }
}
