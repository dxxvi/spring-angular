package home;

import home.model.DB;
import home.model.Quote;
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
import java.util.List;
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

    @Scheduled(cron = "1/30 0/1 * * * *")
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

        _fetchedAt = _fetchedAt.withSecond(_fetchedAt.get(ChronoField.SECOND_OF_MINUTE) < 30 ? 0 : 30);
        final LocalTime fetchedAt = _fetchedAt;

        AtomicBoolean missingQuotesToday = new AtomicBoolean(false);

        Collection<Quote> quotes = httpService.quotes(wantedSymbols);
        quotes.forEach(q -> {
            q.setFrom(fetchedAt).setTo(fetchedAt.plusSeconds(30));
            db.updateInstrumentSymbol(q.getInstrument(), q.getSymbol());
            Stock stock = db.addStock(new Stock(q.getSymbol(), q.getInstrument()));
            stock.addQuote(q);

            Quote firstQuote = stock.getFirstQuoteOfDay();
            if (firstQuote != null && firstQuote.getFrom().isAfter(LocalTime.of(10, 0, 0))) {
                missingQuotesToday.set(true);
            }
        });

        db.quotesReady();

        if (missingQuotesToday.get()) {  // fill up the missing quotes for today
            List<RobinhoodHistoricalQuoteResult> results = httpService.getTodayHistoricalQuotes(wantedSymbols);
            
            db.getStocksStream();
        }
    }
}
