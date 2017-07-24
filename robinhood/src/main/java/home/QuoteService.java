package home;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import static java.util.stream.Collectors.*;

public class QuoteService {
    private final Logger logger = LoggerFactory.getLogger(QuoteService.class);
    private final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss");
    private final LocalTime OPEN = LocalTime.of(9, 30, 1);
    private final ObjectMapper objectMapper;
    private final Map<String, LinkedList<Quote>> db = new ConcurrentHashMap<>(100);

    @Value("${wanted-symbols}") private String wantedSymbols;
    @Value("${path-to-file}") private String path;

    public QuoteService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @PostConstruct public void postConstruct() {
        for (String symbol : wantedSymbols.split(",")) {
            db.computeIfAbsent(symbol, k -> new LinkedList<>());
        }
    }

    public void writeDbToFile() {
        if (!db.isEmpty()) {
            try {
                PrintWriter printWriter = new PrintWriter(new File(path));
                db.values().stream().flatMap(Collection::stream).forEach(printWriter::println);
                printWriter.close();
            }
            catch (Exception ex) {
                throw new RuntimeException("Unable to save to file.", ex);
            }
        }
    }

    @Scheduled(cron = "5 0/1 7-15 ? * Mon-Sat")
    public void quotes() {
        LocalTime fetchedAt = LocalTime.now();
/*
        if (fetchedAt.isBefore(OPEN)) {
            return;
        }
*/

        String symbolString = db.keySet().stream().collect(joining(","));
        RestTemplate restTemplate = new RestTemplate();
        try {
            RequestEntity<Void> request = RequestEntity
                    .get(new URI("https://api.robinhood.com/quotes/?symbols=" + symbolString))
                    .accept(MediaType.APPLICATION_JSON)
                    .build();
            ResponseEntity<String> response = restTemplate.exchange(request, String.class);
            if (response.getStatusCode() == HttpStatus.BAD_REQUEST) {
                logger.warn("None of your symbols {} is valid.", symbolString);
            }
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode jsonNode = objectMapper.readTree(response.getBody());
                if (jsonNode.has("results")) {
                    List<Quote> quotes = objectMapper.readValue(
                            jsonNode.get("results").toString(), new TypeReference<List<Quote>>() {}
                    );
                    logger.debug("Got response for {}.", symbolString);
                    quotes.forEach(q -> {
                        q.setFrom(fetchedAt).setTo(fetchedAt.plusMinutes(1));
                        LinkedList<Quote> symbolQuotes = db.get(q.getSymbol());
                        if (symbolQuotes.isEmpty()) {
                            symbolQuotes.add(q);
                        }
                        else {
                            Quote lastQuote = symbolQuotes.getLast();
                            if (lastQuote.getPrice().equals(q.getPrice())) {
                                lastQuote.setTo(q.getTo());
                            }
                            else {
                                symbolQuotes.add(q);
                            }
                        }
                    });
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
