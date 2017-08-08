package home;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.BuySellOrder;
import home.model.DB;
import home.model.Order;
import home.model.RobinhoodOrdersResult;
import home.web.socket.handler.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

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

    @Scheduled(cron = "15/20 0/1 * * * *")
    public void orders() {
        LocalTime now = LocalTime.now();
        if (now.until(Main.OPEN, ChronoUnit.MINUTES) > 5 || now.until(Main.CLOSE, ChronoUnit.MINUTES) < 0) {
            return;
        }

        LocalDateTime now2 = LocalDateTime.now();
        String loginToken = httpService.login(username, password);
        if (loginToken == null) {
            throw new RuntimeException("Unable to get orders because the loginToken is null.");
        }
        RobinhoodOrdersResult robinhoodOrdersResult = httpService.orders(loginToken);
        String nextUrl = robinhoodOrdersResult.getNext();

        Map<String, Set<Order>> symbolOrdersMap = new HashMap<>();
        robinhoodOrdersResult.getResults().stream()
                .filter(ror -> !"cancelled".equals(ror.getState()))
                .filter(ror -> ror.getCreatedAt().until(now2, ChronoUnit.HOURS) < 136)
                .filter(ror -> !db.shouldBeHidden(ror.getId()))
                .map(ror -> {
                    Order order = ror.toOrder();
                    String symbol = db.getSymbolFromInstrument(ror.getInstrument());
                    if (symbol == null) {
                        symbol = httpService.getSymbolFromInstrument(ror.getInstrument());
                        db.updateInstrumentSymbol(ror.getInstrument(), symbol);
                    }
                    order.setSymbol(symbol);
                    return order;
                })
                .collect(groupingBy(Order::getSymbol))  // returns Map<symbol, List<orders for that symbol>>
                .forEach((symbol, list) -> {
                    Set<Order> set = new TreeSet<>(Comparator.comparing(Order::getCreatedAt));
                    set.addAll(list);
                    symbolOrdersMap.put(symbol, set);
                });

        try {
            wsh.send("ORDERS: " + objectMapper.writeValueAsString(symbolOrdersMap));
        }
        catch (JsonProcessingException jpex) {
            logger.error("Fix me.", jpex);
        }
    }

    public void buySell(BuySellOrder buySellOrder) {
        String loginToken = httpService.login(username, password);
        httpService.buySell(buySellOrder, loginToken);
    }
}
