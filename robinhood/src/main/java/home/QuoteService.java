package home;

import home.model.DB;
import home.model.Quote;
import home.model.Stock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.Collection;

import static home.Main.OPEN;
import static java.time.temporal.ChronoUnit.MINUTES;
import static java.util.stream.Collectors.*;

public class QuoteService {
    private final Logger logger = LoggerFactory.getLogger(QuoteService.class);
    private final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss");
    private final DB db;
    private final HttpService httpService;

    @Value("${wanted-symbols}") private String wantedSymbols;

    public QuoteService(HttpService httpService, DB db) {
        this.httpService = httpService;
        this.db = db;
    }

    @Scheduled(cron = "1/30 0/1 1-23 ? * Mon-Fri")
    public void quotes() {
        LocalTime _fetchedAt = LocalTime.now();
        if (_fetchedAt.until(Main.OPEN, MINUTES) > 5 || _fetchedAt.until(Main.CLOSE, MINUTES) < 0) {
            return;
        }

        _fetchedAt = _fetchedAt.withSecond(_fetchedAt.get(ChronoField.SECOND_OF_MINUTE) < 30 ? 0 : 30);
        final LocalTime fetchedAt = _fetchedAt;

        Collection<Quote> quotes = httpService.quotes(wantedSymbols);
        quotes.forEach(q -> {
            q.setFrom(fetchedAt).setTo(fetchedAt.plusSeconds(30));
            Stock stock = db.addStock(new Stock(q.getSymbol()));
            stock.addQuote(q);
        });

        db.quotesReady();
    }
}
