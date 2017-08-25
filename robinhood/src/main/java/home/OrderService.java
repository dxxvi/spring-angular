package home;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.BuySellOrder;
import home.model.DB;
import home.model.Order;
import home.model.RobinhoodOrderResult;
import home.model.RobinhoodOrdersResult;
import home.web.socket.handler.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import static java.util.Comparator.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.UUID;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.function.Function;

import static java.util.stream.Collectors.*;

public class OrderService {
    private final Logger logger = LoggerFactory.getLogger(OrderService.class);
    private final HttpService httpService;
    private final DB db;
    private final WebSocketHandler wsh;
    private final ObjectMapper objectMapper;

    @Value("${username}") private String username;
    @Value("${password}") private String password;
    @Value("${far-back-for-orders}") private long farBackForOrders;

    public OrderService(DB db, HttpService httpService, WebSocketHandler wsh, ObjectMapper objectMapper) {
        this.db = db;
        this.httpService = httpService;
        this.wsh = wsh;
        this.objectMapper = objectMapper;
    }

    public void orders() {
        String loginToken = httpService.login(username, password);
        if (loginToken == null) {
            throw new RuntimeException("Unable to get orders because the loginToken is null.");
        }
        RobinhoodOrdersResult robinhoodOrdersResult = httpService.orders(loginToken);

        Map<String, SortedSet<Order>> symbolOrdersMap = buildSymbolOrdersMap(robinhoodOrdersResult);

        String nextUrl = robinhoodOrdersResult.getNext();
        if (nextUrl != null && nextUrl.startsWith("https")) {
            Map<String, SortedSet<Order>> m = buildSymbolOrdersMap(httpService.nextOrders(nextUrl, loginToken));
            symbolOrdersMap.forEach((symbol, tree) -> {
                SortedSet<Order> t = m.get(symbol);
                if (t != null) {
                    tree.addAll(t);
                }
            });
        }
        symbolOrdersMap.values().stream()
                .flatMap(Collection::stream)
                .filter(o -> {
                    if ("confirmed".equals(o.getState()) && "buy".equals(o.getSide())
                            && db.getStock(o.getSymbol()).getPrice().subtract(o.getPrice()).doubleValue() > 0.13) {
                        db.addCancelledOrderId(o);
                    }
                    return true;
                })
                .filter(o -> "filled".equals(o.getState()))
                .map(o -> db.getBuySellOrderNeedsFlipped(o.getId()))
                .filter(Objects::nonNull)
                .forEach(bso -> {
                    if ("buy".equals(bso.getSide())) {
                        buySell(bso.setSide("sell").setPrice(bso.getPrice().add(bso.getResellDelta())));
                    }
                    else {
                        buySell(bso.setSide("buy").setPrice(bso.getPrice().subtract(bso.getResellDelta())));
                    }
                    db.removeBuySellOrderNeedsFlipped(bso.getId());
                });

        // add patient buy sell orders to symbolOrdersMap
        symbolOrdersMap.forEach((symbol, orders) -> {
            List<Order> patientOrders = db.gePatienttBuySellOrders(symbol).stream()
                    .map(bso ->
                            new Order(bso.getId(), bso.getQuantity(), bso.getPrice(),
                                "patient", bso.getSide(), LocalDateTime.now()).setSymbol(symbol)
                    )
                    .collect(toList());
            orders.addAll(patientOrders);
        });

        try {
            wsh.send("ORDERS: " + objectMapper.writeValueAsString(symbolOrdersMap));
        }
        catch (JsonProcessingException jpex) {
            logger.error("Fix me.", jpex);
        }
    }

    private Map<String, SortedSet<Order>> buildSymbolOrdersMap(RobinhoodOrdersResult robinhoodOrdersResult) {
        LocalDateTime now = LocalDateTime.now();
        return robinhoodOrdersResult.getResults().stream()
                .map(ror -> {
                    if ("cancelled".equals(ror.getState()) && ror.getCumQuantity().intValue() > 0) {
                        ror.setState("filled");
                        ror.setQuantity(ror.getCumQuantity());
                    }
                    return ror;
                })
                .filter(ror -> !"cancelled".equals(ror.getState()))
                .filter(ror -> ror.getCreatedAt().until(now, ChronoUnit.HOURS) < farBackForOrders)
                .filter(ror -> !db.shouldBeHidden(ror.getId()))
                .map(this::toOrder)
                .collect(groupingBy(
                        Order::getSymbol,
                        mapping(
                                Function.identity(),
                                toCollection(() -> new ConcurrentSkipListSet<>(comparing(Order::getCreatedAt)))
                        )
                ));
    }

    public RobinhoodOrderResult buySell(BuySellOrder buySellOrder) {
        String loginToken = httpService.login(username, password);
        RobinhoodOrderResult ror = httpService.buySell(buySellOrder, loginToken);
        if (ror != null && "confirmed".equals(ror.getState())) {
            try {
                wsh.send("NEW ORDER: " + buySellOrder.humanBeingString());
                logger.debug("NEW ORDER: {}", objectMapper.writeValueAsString(toOrder(ror)));
            }
            catch (JsonProcessingException jpex) {
                logger.error("Fix me.", jpex);
            }
        }
        return ror;
    }

    private Order toOrder(RobinhoodOrderResult ror) {
        Order order = ror.toOrder();
        String symbol = db.getSymbolFromInstrument(ror.getInstrument());
        if (symbol == null) {
            symbol = httpService.getSymbolFromInstrument(ror.getInstrument());
            db.updateInstrumentSymbol(ror.getInstrument(), symbol);
        }
        order.setSymbol(symbol);
        return order;
    }
}
