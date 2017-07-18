package home;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class AuthenticationService {
    private final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    @Value("${username}") private String username;
    @Value("${password}") private String password;
    private final ObjectMapper objectMapper;

    private String token;
    private long tokenAge;             //

    public AuthenticationService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    /**
     * @return the token or null if unable to login
     */
    public String login() {
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
                    token = jsonNode.get("token").asText();
                    return token;
                }
                else {
                    logger.error("Unable to login: {}", response.getBody());
                }
            }
            else {
                logger.error("Unable to login: status: {}, body: {}", response.getStatusCode(), response.getBody());
            }
        }
        catch (Exception ex) {
            throw new RuntimeException("Fix me.", ex);
        }
        return null;
    }

    public void logout() {
        RestTemplate restTemplate = new RestTemplate();
        try {
            RequestEntity<String> request = RequestEntity
                    .post(new URI("https://api.robinhood.com/api-token-logout/"))
                    .accept(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Token " + token)
                    .body("");
            ResponseEntity<String> response = restTemplate.exchange(request, String.class);
            logger.debug("Logout: response status: {}", response.getStatusCode());
        }
        catch (Exception ex) {
            throw new RuntimeException("Fix me.", ex);
        }
    }

    public String getToken() {
        return token;
    }
}
