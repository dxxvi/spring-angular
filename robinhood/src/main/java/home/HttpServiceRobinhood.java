package home;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.BuySellOrder;
import home.model.Quote;
import home.model.RobinhoodHistoricalQuoteResult;
import home.model.RobinhoodOrdersResult;
import home.model.RobinhoodPositionResult;
import home.model.RobinhoodPositionsResult;
import home.web.socket.handler.WebSocketHandler;
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
    private final WebSocketHandler wsh;

    private String loginToken;
    private long loginTokenAge;
    private String accountUrl;

    public HttpServiceRobinhood(ObjectMapper objectMapper, WebSocketHandler wsh) {
        this.objectMapper = objectMapper;
        this.wsh = wsh;
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

    // returns loginToken
    @Override public String login(String username, String password) {
        if (loginToken != null && System.currentTimeMillis() - loginTokenAge < 60_001) {
            return loginToken;
        }

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
                    loginToken = jsonNode.get("token").asText();
                    loginTokenAge = System.currentTimeMillis();
                    return loginToken;
                }
            }
            logger.warn("Unable to login: status: {}, body: {}", response.getStatusCode(), response.getBody());
        }
        catch (Exception ex) {
            throw new RuntimeException("Fix me.", ex);
        }
        return null;
    }

    @Override public String accountUrl(String loginToken) {
//        return "https://api.robinhood.com/accounts/5RY82436/";
        if (accountUrl != null) {
            return accountUrl;
        }
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
                    accountUrl = jsonNode.get(0).get("url").asText();
                    return accountUrl;
                }
            }
            errorMessage = String.format("Unable to get accountUrl: status: %s, body: %s",
                    response.getStatusCode(), response.getBody());
        }
        catch (Exception ex) {
            throw new RuntimeException("Fix me.", ex);
        }
        throw new RuntimeException(errorMessage);
    }

    @Override public RobinhoodOrdersResult orders(String loginToken) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            RequestEntity<Void> request = RequestEntity
                    .get(new URI("https://api.robinhood.com/orders/"))
                    .accept(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Token " + loginToken)
                    .build();
            ResponseEntity<String> response = restTemplate.exchange(request, String.class);
            return objectMapper.readValue(response.getBody(), RobinhoodOrdersResult.class);
        }
        catch (Exception ex) {
            throw new RuntimeException("Unable to get orders", ex);
        }
    }

    @Override public String getSymbolFromInstrument(String instrument) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            RequestEntity<Void> request = RequestEntity
                    .get(new URI(instrument))
                    .accept(MediaType.APPLICATION_JSON)
                    .build();
            ResponseEntity<String> response = restTemplate.exchange(request, String.class);
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            if (jsonNode.has("symbol")) {
                return jsonNode.get("symbol").asText();
            }
            logger.warn(":getSymbolFromInstrument Unable to find symbol: status: {}, body: {}",
                    response.getStatusCode().name(), response.getBody());
        }
        catch (Exception ex) {
            logger.warn("Unable to get symbol from instrument url.", ex);
        }
        return null;
    }

    @Override public List<RobinhoodPositionResult> positions(String loginToken) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            RequestEntity<Void> request = RequestEntity
                    .get(new URI("https://api.robinhood.com/positions/"))
                    .accept(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Token " + loginToken)
                    .build();
            ResponseEntity<String> response = restTemplate.exchange(request, String.class);
            return objectMapper.readValue(response.getBody(), RobinhoodPositionsResult.class).getResults();
        }
        catch (Exception ex) {
            logger.warn("Unable to get positions", ex);
        }
        return Collections.emptyList();
    }

    @Override public void cancelOrder(String orderId, String loginToken) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            RequestEntity<String> request = RequestEntity
                    .post(new URI("https://api.robinhood.com/orders/" + orderId + "/cancel/"))
                    .accept(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Token " + loginToken)
                    .body("");
            ResponseEntity<String> response = restTemplate.exchange(request, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                logger.debug("Successfully cancel order {}", orderId);
                return;
            }
            logger.warn("Unable to cancel order: status: {}, body: {}", response.getStatusCode().name(),
                    response.getBody());
        }
        catch (Exception ex) {
            logger.warn("Fix me", ex);
        }
    }

    @Override public List<RobinhoodHistoricalQuoteResult> getHistoricalQuotes(String wantedSymbols) {
        return historicalQuotes(wantedSymbols, "week");
    }

    @Override public List<RobinhoodHistoricalQuoteResult> getTodayHistoricalQuotes(String wantedSymbols) {
        return historicalQuotes(wantedSymbols, "day");
    }

    private List<RobinhoodHistoricalQuoteResult> historicalQuotes(String wantedSymbols, String span) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            RequestEntity<Void> request = RequestEntity
                    .get(new URI("https://api.robinhood.com/quotes/historicals/?interval=5minute&span=" + span +
                            "&symbols=" + wantedSymbols))
                    .accept(MediaType.APPLICATION_JSON)
                    .build();
            ResponseEntity<String> response = restTemplate.exchange(request, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode jsonNode = objectMapper.readTree(response.getBody());
                if (jsonNode.has("results")) {
                    List<RobinhoodHistoricalQuoteResult> result = objectMapper.readValue(
                            jsonNode.get("results").toString(),
                            new TypeReference<List<RobinhoodHistoricalQuoteResult>>() {}
                    );
                    logger.debug("Got historical quotes with span of {}.", span);
                    return result;
                }
                else {
                    throw new RuntimeException("The response format has changed: " + response.getBody());
                }
            }
            logger.warn("Unable to get historical quotes: status: {}, body: {}", response.getStatusCode().name(),
                    response.getBody());
        }
        catch (Exception ex) {
            throw new RuntimeException("Fix me", ex);
        }
        return Collections.emptyList();
    }

    @Override public void buySell(BuySellOrder buySellOrder, String loginToken) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            Map<String, Object> bodyData = new HashMap<>();
            bodyData.put("account", accountUrl(loginToken));
            bodyData.put("instrument", buySellOrder.getInstrument());
            bodyData.put("symbol", buySellOrder.getSymbol());
            bodyData.put("type", "limit");
            bodyData.put("time_in_force", "gfd");
            bodyData.put("trigger", "immediate");
            bodyData.put("price", buySellOrder.getPrice());
            bodyData.put("quantity", buySellOrder.getQuantity());
            bodyData.put("side", buySellOrder.getSide());

            RequestEntity<String> request = RequestEntity
                    .post(new URI("https://api.robinhood.com/orders/"))
                    .accept(MediaType.APPLICATION_JSON)
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Token " + loginToken)
                    .body(objectMapper.writeValueAsString(bodyData));
            ResponseEntity<String> response = restTemplate.exchange(request, String.class);
            if (response.getStatusCode() == HttpStatus.CREATED) {
                wsh.send("BUY SELL: " + objectMapper.writeValueAsString(buySellOrder));
            }
            else {
                logger.error("Unable to place an order: status: {}, body: {}", response.getStatusCode().name(),
                        response.getBody());
            }
        }
        catch (Exception ex) {
            logger.warn("Fix me", ex);
        }
    }
}
