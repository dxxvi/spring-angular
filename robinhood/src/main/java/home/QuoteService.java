package home;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.DB;
import home.model.Quote;
import home.model.QuoteDO;
import home.model.Stock;
import home.web.socket.handler.QuoteWebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.PrintWriter;
import java.net.URI;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import static home.Main.OPEN;
import static java.util.stream.Collectors.*;

public class QuoteService {
    private final Logger logger = LoggerFactory.getLogger(QuoteService.class);
    private final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss");
    private final ObjectMapper objectMapper;
    private final DB db;

    @Value("${wanted-symbols}") private String wantedSymbols;
    @Value("${path-to-file}") private String path;

    public QuoteService(ObjectMapper objectMapper, DB db) {
        this.objectMapper = objectMapper;
        this.db = db;
    }

    @Scheduled(cron = "1/30 0/1 7-15 ? * Mon-Sat")
    public void quotes() {
        LocalTime _fetchedAt = LocalTime.now();
        if (_fetchedAt.isBefore(OPEN)) {
            return;
        }
        _fetchedAt = _fetchedAt.withSecond(_fetchedAt.get(ChronoField.SECOND_OF_MINUTE) < 30 ? 0 : 30);
        final LocalTime fetchedAt = _fetchedAt;

        RestTemplate restTemplate = new RestTemplate();
        try {
            RequestEntity<Void> request = RequestEntity
                    .get(new URI("https://api.robinhood.com/quotes/?symbols=" + wantedSymbols))
                    .accept(MediaType.APPLICATION_JSON)
                    .build();
            ResponseEntity<String> response = restTemplate.exchange(request, String.class);
            if (response.getStatusCode() == HttpStatus.BAD_REQUEST) {
                logger.warn("None of your symbols {} is valid.", wantedSymbols);
            }
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode jsonNode = objectMapper.readTree(response.getBody());
                if (jsonNode.has("results")) {
                    List<Quote> quotes = objectMapper.readValue(
                            jsonNode.get("results").toString(), new TypeReference<List<Quote>>() {}
                    );
                    logger.debug("Got response for {}.", wantedSymbols);
                    quotes.forEach(q -> {
                        q.setFrom(fetchedAt).setTo(fetchedAt.plusSeconds(30));
                        Stock stock = db.addStock(new Stock(q.getSymbol()));
                        stock.addQuote(q);
                    });

                    db.quotesReady();
                }
                else {
                    logger.warn("The response format has changed: {}", response.getBody());
                }
            }
        }
        catch (Exception ex) {
            throw new RuntimeException("Fix me.", ex);
        }
    }
}
