package home;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.Quote;
import home.model.RobinhoodOrdersResult;
import home.model.Stock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Base64;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        catch (HttpServerErrorException | ResourceAccessException ex) {
            logger.error("Perhaps there's nothing we can do.", ex);
        }
        catch (Exception ex) {
            throw new RuntimeException("Fix me.", ex);
        }
        return Collections.emptyList();
    }

    @Override public String login(String username, String password) {
        String errorMessage;
        RestTemplate restTemplate = new RestTemplate();
        try {
            Map<String, String> form = new HashMap<>(2);
            form.put("username", username);
            form.put("password", new String(Base64.getDecoder().decode(password)));

            RequestEntity<String> request = RequestEntity
                    .post(new URI("https://api.robinhood.com/api-token-auth/"))
                    .accept(MediaType.APPLICATION_JSON)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(objectMapper.writeValueAsString(form));
            ResponseEntity<String> response = restTemplate.exchange(request, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode jsonNode = objectMapper.readTree(response.getBody());
                if (jsonNode.has("token")) {
                    return jsonNode.get("token").asText();
                }
            }
            errorMessage = String.format("Unable to login: status: %s, body: %s",
                    response.getStatusCode(), response.getBody());
        }
        catch (Exception ex) {
            throw new RuntimeException("Fix me.", ex);
        }
        throw new RuntimeException(errorMessage);
    }

    @Override public String accountUrl(String loginToken) {
        return "https://api.robinhood.com/accounts/5RY82436/";
/*
        String errorMessage;
        RestTemplate restTemplate = new RestTemplate();
        try {
            RequestEntity<Void> request = RequestEntity
                    .get(new URI("https://api.robinhood.com/accounts/"))
                    .accept(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Token " + loginToken)
                    .build();
            ResponseEntity<String> response = restTemplate.exchange(request, String.class);
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            if (jsonNode.has("results")) {
                jsonNode = jsonNode.get("results");
                if (jsonNode.isArray()) {
                    return jsonNode.get(0).get("url").asText();
                }
            }
            errorMessage = String.format("Unable to get accountUrl: status: %s, body: %s",
                    response.getStatusCode(), response.getBody());
        }
        catch (Exception ex) {
            throw new RuntimeException("Fix me.", ex);
        }
        throw new RuntimeException(errorMessage);
*/
    }

    @Override public RobinhoodOrdersResult orders(String loginToken) {
        return null;
    }
}
