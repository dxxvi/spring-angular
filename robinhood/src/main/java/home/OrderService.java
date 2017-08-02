package home;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OrderService {
    private final Logger logger = LoggerFactory.getLogger(OrderService.class);
    private final AuthenticationService authenticationService;
    private final ObjectMapper objectMapper;

    public OrderService(AuthenticationService authenticationService, ObjectMapper objectMapper) {
        this.authenticationService = authenticationService;
        this.objectMapper = objectMapper;
    }
}
