package home;

import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.DB;
import home.web.socket.handler.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

import java.time.LocalTime;
import java.util.stream.Stream;

@SpringBootApplication
@EnableScheduling
public class Main {
    private final Logger logger = LoggerFactory.getLogger(Main.class);

    public static final LocalTime OPEN  = LocalTime.of(3, 0, 0);
    public static final LocalTime CLOSE = LocalTime.of(5, 59, 35);
    public static final int graphWidth = 450;
    public static final int graphHeight = 75;

    public static void main(String[] args) {
        if (Stream.of(args).noneMatch(a -> a.startsWith("--username="))
                || Stream.of(args).noneMatch(a -> a.startsWith("--password="))) {
            System.err.println("--username and/or --password are missing");
            System.exit(-1);
        }

        ConfigurableApplicationContext ac = SpringApplication.run(Main.class, args);

        DB db = ac.getBean(DB.class);
        ObjectMapper objectMapper = ac.getBean(ObjectMapper.class);
        WebSocketHandler qwsh = ac.getBean(WebSocketHandler.class);
        new QuotesReadyThread(db, graphWidth, graphHeight, qwsh, objectMapper).start();
    }

    @Bean public AuthenticationService authenticationService(ObjectMapper objectMapper) {
        return new AuthenticationService(objectMapper);
    }

    @Bean public QuoteService quoteService(HttpService httpService, DB db) {
        return new QuoteService(httpService, db);
    }

    @Bean public OrderService orderService(DB db, HttpService httpService, WebSocketHandler wsh,
                                           ObjectMapper objectMapper) {
        return new OrderService(db, httpService, wsh, objectMapper);
    }

    @Bean public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }

    @Bean public WebSocketHandler robinhoodWebSocketHandler() {
        return new WebSocketHandler();
    }

    @Bean public DB db(Environment env, HttpService httpService) {
        return new DB(env, httpService);
    }

    @Bean
    @Profile("!local")
    public HttpService httpServiceRobinhood(ObjectMapper objectMapper) {
        return new HttpServiceRobinhood(objectMapper);
    }

    @Bean
    @Profile("local")
    public HttpService httpServiceLocal(ObjectMapper objectMapper) {
        return new HttpServiceLocal(objectMapper);
    }

    @Bean public PositionService positionService(DB db, HttpService httpService, WebSocketHandler wsh,
                                                 ObjectMapper objectMapper) {
        return new PositionService(db, httpService, wsh, objectMapper);
    }
}
