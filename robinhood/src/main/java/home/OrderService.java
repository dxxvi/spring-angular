package home;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.DB;
import home.model.Order;
import home.model.RobinhoodOrdersResult;
import home.web.socket.handler.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.*;

public class OrderService {
    private final Logger logger = LoggerFactory.getLogger(OrderService.class);
    private final HttpService httpService;
    private final DB db;
    private final WebSocketHandler wsh;
    private final ObjectMapper objectMapper;

    @Value("${username}") private String username;
    @Value("${password}") private String password;

    public OrderService(DB db, HttpService httpService, WebSocketHandler wsh, ObjectMapper objectMapper) {
        this.db = db;
        this.httpService = httpService;
        this.wsh = wsh;
        this.objectMapper = objectMapper;
    }

    @Scheduled(cron = "19/20 0/1 8-15 ? * Mon-Fri")
    public void orders() {
        String loginToken = httpService.login(username, password);
        if (loginToken == null) {
            throw new RuntimeException("Unable to get orders because the loginToken is null.");
        }
        RobinhoodOrdersResult robinhoodOrdersResult = httpService.orders(loginToken);
        String nextUrl = robinhoodOrdersResult.getNext();

        Map<String, List<Order>> symbolOrdersMap = robinhoodOrdersResult.getResults().stream()
                .filter(ror -> !"cancelled".equals(ror.getState()))
                .map(ror -> {
                    Order order = ror.toOrder();
                    order.setSymbol(db.getSymbolFromInstrument(ror.getInstrument()));
                    return order;
                })
                .collect(groupingBy(Order::getSymbol));  // returns Map<symbol, List<orders for that symbol>>

        try {
            wsh.send("ORDERS: " + objectMapper.writeValueAsString(symbolOrdersMap));
        }
        catch (JsonProcessingException jpex) {
            logger.error("Fix me.", jpex);
        }
    }
}
