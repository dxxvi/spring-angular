package home;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.Quote;
import home.model.Stock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class HttpServiceRobinhood implements HttpService {
    private final Logger logger = LoggerFactory.getLogger(HttpServiceRobinhood.class);
    private final ObjectMapper objectMapper;

    public HttpServiceRobinhood(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override public Collection<Quote> quotes(String wantedSymbols) {
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
                    logger.debug(":quotes - Got response for {}.", wantedSymbols);
                    return quotes;
                }
                else {
                    throw new RuntimeException("The response format has changed: " + response.getBody());
                }
            }
        }
        catch (Exception ex) {
            throw new RuntimeException("Fix me.", ex);
        }
        return Collections.emptyList();
    }
}
