package home;

import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.DB;
import home.model.Quote;
import home.web.socket.handler.QuoteWebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

import java.time.LocalTime;
import java.util.LinkedList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Stream;

@SpringBootApplication
@EnableScheduling
public class Main {
    private final Logger logger = LoggerFactory.getLogger(Main.class);

    public static final LocalTime OPEN = LocalTime.of(9, 30, 0);

    public static void main(String[] args) {
        if (Stream.of(args).noneMatch(a -> a.startsWith("--username="))
                || Stream.of(args).noneMatch(a -> a.startsWith("--password="))) {
            System.err.println("--username and/or --password are missing");
            System.exit(-1);
        }

        SpringApplication.run(Main.class, args);
    }

    @Bean public AuthenticationService authenticationService(ObjectMapper objectMapper) {
        return new AuthenticationService(objectMapper);
    }

    @Bean public AccountService accountService(AuthenticationService as, ObjectMapper objectMapper) {
        return new AccountService(as, objectMapper);
    }

    @Bean public QuoteService quoteService(ObjectMapper objectMapper, DB db) {
        return new QuoteService(objectMapper, db);
    }

    @Bean public OrderService orderService(AuthenticationService authenticationService, AccountService accountService,
                                     ObjectMapper objectMapper) {
        return new OrderService(authenticationService, accountService, objectMapper);
    }

    @Bean public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }

    @Bean public QuoteWebSocketHandler robinhoodWebSocketHandler() {
        return new QuoteWebSocketHandler();
    }

    @Bean public DB db(Environment env) {
        return new DB(env);
    }
}
