package home;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import home.model.BuySellOrder;
import home.model.DB;
import home.model.Order;
import home.model.RobinhoodOrderResult;
import home.model.RobinhoodOrdersResult;
import home.model.Stock;
import home.model.Tuple2;
import home.model.Tuple4;
import home.web.socket.handler.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static java.util.Comparator.*;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.BiFunction;
import java.util.function.Function;

import static java.util.stream.Collectors.*;

public class OrderService {
    private static final double DELTA_TO_CANCEL = 0.92;
    private final Logger logger = LoggerFactory.getLogger(OrderService.class);
    private final HttpService httpService;
    private final DB db;
    private final WebSocketHandler wsh;
    private final ObjectMapper objectMapper;
    private final SortedSet<String> orderIdsNeedSound = new ConcurrentSkipListSet<>();

    @Value("${username}") private String username;
    @Value("${password}") private String password;
    @Value("${far-back-for-orders}") private long farBackForOrders;

    private final BiFunction<Tuple2<RobinhoodOrdersResult, Long>, Throwable, Tuple2<RobinhoodOrdersResult, Long>> fn;

    public OrderService(DB db, HttpService httpService, WebSocketHandler wsh, ObjectMapper objectMapper) {
        this.db = db;
        this.httpService = httpService;
        this.wsh = wsh;
        this.objectMapper = objectMapper;
        this.fn = (t, throwable) -> {
            if (throwable != null) {
                logger.error("Got exception in fn", throwable);
                t._1().setNext(null);
                return t;
            }
            String loginToken = httpService.login(username, password);
            if (t._1().getNext() == null) {
                return t;
            }
            RobinhoodOrdersResult innerRosr = httpService.nextOrders(t._1().getNext(), loginToken);
            t._1().getResults().addAll(innerRosr.getResults());

            int n = innerRosr.getResults().size();
            RobinhoodOrderResult ror = innerRosr.getResults().get(n - 1);
            t._1().setNext(ror.getCreatedAt().plusHours(t._2()).isBefore(LocalDateTime.now()) ? null : innerRosr.getNext());
            return t;
        };
    }

    /*
     * trigger sound, put orders into each stock to prepare for auto buy/sell
     */
    public RobinhoodOrdersResult orders() {
        String loginToken = httpService.login(username, password);
        if (loginToken == null) {
            throw new RuntimeException("Unable to get orders because the loginToken is null.");
        }
        RobinhoodOrdersResult robinhoodOrdersResult = httpService.orders(loginToken);

        Map<String, SortedSet<Order>> symbolOrdersMap = Utils.buildSymbolOrdersMap(robinhoodOrdersResult, db, httpService);

        symbolOrdersMap.values().stream()
                .flatMap(Collection::stream)
                .peek(o -> {
                    if ("confirmed".equals(o.getState()))  {
                        if ("buy".equals(o.getSide())
                                // the following will be null if no such symbol in wanted-symbols but there are orders
                                //   for that symbol
                                && db.getStock(o.getSymbol()) != null
                                && db.getStock(o.getSymbol()).getPrice() != null
                                // auto cancel buy orders if the price is too high
                                && db.getStock(o.getSymbol()).getPrice().subtract(o.getPrice()).doubleValue() > DELTA_TO_CANCEL) {
                            db.addCancelledOrderId(o);
                            orderIdsNeedSound.remove(o.getId());
                        }
                        else {
                            orderIdsNeedSound.add(o.getId());
                        }
                    }
                    else if ("filled".equals(o.getState()) && orderIdsNeedSound.contains(o.getId())) {
                        wsh.send("SOUND: " + o.getSide());
                        orderIdsNeedSound.remove(o.getId());
                    }
                })
                .filter(o -> "filled".equals(o.getState()))
                .map(o -> {
                    BuySellOrder bso = db.getBuySellOrderNeedsFlipped(o.getId());
                    if (bso != null) {
                        bso.setQuantity(o.getQuantity());
                    }
                    return bso;
                })
                .filter(Objects::nonNull)
                .forEach(bso -> {
                    String filledId = bso.getId();
                    buySell(bso.flip());
                    db.removeBuySellOrderNeedsFlipped(filledId);
                });

        symbolOrdersMap.forEach((symbol, orders) -> {
            Stock stock = db.getStock(symbol);
            if (stock != null) {
                stock.set_orders(orders);
            }
        });

        return robinhoodOrdersResult;
    }

    public void sendOrdersToBrowser(RobinhoodOrdersResult robinhoodOrdersResult) {
        CompletableFuture<Tuple2<RobinhoodOrdersResult, Long>> cf =
                CompletableFuture.completedFuture(new Tuple2<>(robinhoodOrdersResult, farBackForOrders));
        try {
            while (cf.get()._1().getNext() != null) {
                cf = cf.handle(fn);
            }
            robinhoodOrdersResult = cf.get()._1();
            Map<String, SortedSet<Order>> symbolOrdersMap = Utils.buildSymbolOrdersMap(robinhoodOrdersResult, db, httpService);
            addPatientBuySellOrders(symbolOrdersMap);
            try {
                wsh.send("ORDERS: " + objectMapper.writeValueAsString(symbolOrdersMap));
            }
            catch (JsonProcessingException jpex) {
                logger.error("Fix me", jpex);
            }
        }
        catch (ExecutionException | InterruptedException ex) {
            logger.error("Got this exception when doing the completableFuture: {}: {}",
                    ex.getClass().getName(), ex.getMessage());
        }
    }

    private void addPatientBuySellOrders(Map<String, SortedSet<Order>> symbolOrdersMap) {
        symbolOrdersMap.forEach((symbol, orders) -> {
            List<Order> patientOrders = db.gePatienttBuySellOrders(symbol).stream()
                    .map(bso ->
                            new Order(bso.getId(), bso.getQuantity(), bso.getPrice(),
                                    "patient", bso.getSide(), LocalDateTime.now(), LocalDateTime.now())
                                    .setSymbol(symbol)
                    )
                    .collect(toList());
            orders.addAll(patientOrders);
        });
    }

    public RobinhoodOrderResult buySell(BuySellOrder buySellOrder) {
        String loginToken = httpService.login(username, password);
        RobinhoodOrderResult ror = httpService.buySell(buySellOrder, loginToken);
        if (ror != null && "confirmed".equals(ror.getState())) {
            try {
                wsh.send("NEW ORDER: " + buySellOrder.humanBeingString());
                logger.debug("NEW ORDER: {}", objectMapper.writeValueAsString(Utils.toOrder(ror, db, httpService)));
            }
            catch (JsonProcessingException jpex) {
                logger.error("Fix me.", jpex);
            }
        }
        return ror;
    }

    public long getFarBackForOrders() {
        return farBackForOrders;
    }

    public void setFarBackForOrders(long farBackForOrders) {
        this.farBackForOrders = farBackForOrders;
    }
}
