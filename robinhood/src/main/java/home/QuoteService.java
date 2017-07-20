package home;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class QuoteService {
    private final Logger logger = LoggerFactory.getLogger(QuoteService.class);
    private final ObjectMapper objectMapper;
    private final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss");
    private final Map<String, LinkedList<Quote>> db = new ConcurrentHashMap<>(100);

    public QuoteService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public void addSymbol(String symbol) {
        db.computeIfAbsent(symbol, k -> new LinkedList<>());
    }

    public void historicalQuote(String symbol) {

    }

    @Scheduled(cron = "0 0/1 0-15 ? * Mon-Fri")
    public void quotes() {
        LocalTime fetchedAt = LocalTime.now();
        String symbolString = db.keySet().stream().collect(Collectors.joining(","));
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
                    quotes.forEach(q -> {
                        q.setFrom(fetchedAt).setTo(fetchedAt.plusMinutes(1));
                        LinkedList<Quote> symbolQuotes = db.get(q.getSymbol());
                        if (symbolQuotes.isEmpty()) {
                            symbolQuotes.add(q);
                        }
                        else {
                            Quote lastQuote = symbolQuotes.getLast();
                            if (lastQuote.getPrice() == q.getPrice()) {
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
