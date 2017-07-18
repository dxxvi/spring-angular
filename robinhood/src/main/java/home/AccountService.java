package home;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

public class AccountService {
    private final Logger logger = LoggerFactory.getLogger(AccountService.class);

    private final AuthenticationService authenticationService;
    private final ObjectMapper objectMapper;

    public AccountService(AuthenticationService authenticationService, ObjectMapper objectMapper) {
        this.authenticationService = authenticationService;
        this.objectMapper = objectMapper;
    }

    // returns null if there's nothing else we can do
    public String accountUrl() {
        RestTemplate restTemplate = new RestTemplate();
        try {
            RequestEntity<Void> request = RequestEntity
                    .get(new URI("https://api.robinhood.com/accounts/"))
                    .accept(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Token " + authenticationService.getToken())
                    .build();
            ResponseEntity<String> response = restTemplate.exchange(request, String.class);
            logger.debug("Logout: response status: {}", response.getStatusCode());
        }
        catch (Exception ex) {
            throw new RuntimeException("Fix me.", ex);
        }
        return null;
    }
}
