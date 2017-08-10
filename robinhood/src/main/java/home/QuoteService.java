package home;

import home.model.DB;
import home.model.Quote;
import home.model.RobinhoodHistoricalQuote;
import home.model.RobinhoodHistoricalQuoteResult;
import home.model.Stock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Stream;

import static home.Main.OPEN;
import static java.time.temporal.ChronoUnit.MINUTES;
import static java.util.stream.Collectors.*;

public class QuoteService {
    private final Logger logger = LoggerFactory.getLogger(QuoteService.class);
    private final DB db;
    private final HttpService httpService;

    @Value("${wanted-symbols}") private String wantedSymbols;

    public QuoteService(HttpService httpService, DB db) {
        this.httpService = httpService;
        this.db = db;
    }

    @Scheduled(cron = "0/15 0/1 * * * *")
    public void quotes() {
        if (!db.hasHistoricalQuotes()) {
            httpService.getHistoricalQuotes(wantedSymbols)
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
            return;
        }

        int secondOfMinute = _fetchedAt.get(ChronoField.SECOND_OF_MINUTE);
        if (secondOfMinute < 15) {
            _fetchedAt = _fetchedAt.withSecond(0);
        }
        else if (secondOfMinute < 30) {
            _fetchedAt = _fetchedAt.withSecond(15);
        }
        else if (secondOfMinute < 45) {
            _fetchedAt = _fetchedAt.withSecond(30);
        }
        else {
            _fetchedAt = _fetchedAt.withSecond(45);
        }
        final LocalTime fetchedAt = _fetchedAt;

        AtomicBoolean missingQuotesToday = new AtomicBoolean(false);

        Collection<Quote> quotes = httpService.quotes(wantedSymbols);
        quotes.forEach(q -> {
            q.setFrom(fetchedAt).setTo(fetchedAt.plusSeconds(30));
            db.updateInstrumentSymbol(q.getInstrument(), q.getSymbol());
            Stock stock = db.addStock(new Stock(q.getSymbol(), q.getInstrument()));
            stock.addQuote(q);

            Quote firstQuote = stock.getFirstQuoteOfDay();
            if (firstQuote != null
                    && firstQuote.getFrom().isAfter(LocalTime.of(10, 0, 0))
                    && firstQuote.getTo().isBefore(LocalTime.of(15, 59, 0))) {
                missingQuotesToday.set(true);
            }
        });

        db.quotesReady();

        if (missingQuotesToday.get()) {  // fill up the missing quotes for today
            Map<String, LinkedList<RobinhoodHistoricalQuote>> symbolDayQuotesMap =
                    httpService.getTodayHistoricalQuotes(wantedSymbols).stream()
                            .collect(toMap(
                                    RobinhoodHistoricalQuoteResult::getSymbol,
                                    RobinhoodHistoricalQuoteResult::getHistoricals
                            ));
            
            db.getStocksStream().forEach(stock -> {
                LinkedList<RobinhoodHistoricalQuote> dayQuotes = symbolDayQuotesMap.get(stock.getSymbol());
                Quote firstQuoteOfDay = stock.getFirstQuoteOfDay();
                if (dayQuotes != null && firstQuoteOfDay != null) {
                    while (true) {
                        try {
                            RobinhoodHistoricalQuote lastDayQuote = dayQuotes.pollLast();
                            LocalTime lastDayQuoteLocalTime = lastDayQuote.getBeginsAt().toLocalTime()
                                    .plusHours(Utils.robinhoodAndMyTimeDifference());
                            if (lastDayQuoteLocalTime.plusMinutes(4).plusSeconds(59).isBefore(firstQuoteOfDay.getFrom())) {
                                Quote q = new Quote(stock.getSymbol(), lastDayQuote.getHighPrice(), stock.getInstrument(),
                                        lastDayQuoteLocalTime, lastDayQuoteLocalTime.plusSeconds(150));
                                stock.prependQuote(q);
                                q = new Quote(stock.getSymbol(), lastDayQuote.getLowPrice(), stock.getInstrument(),
                                        lastDayQuoteLocalTime.plusSeconds(150), lastDayQuoteLocalTime.plusSeconds(300));
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
    }
}
