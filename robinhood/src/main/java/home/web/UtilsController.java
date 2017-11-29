package home.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import home.HttpService;
import home.OrderService;
import home.model.DB;
import home.model.Stock;
import home.web.socket.handler.WebSocketHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import static java.nio.file.StandardOpenOption.*;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/utils")
public class UtilsController {
    private final Logger logger = LoggerFactory.getLogger(UtilsController.class);
    private final DB db;
    private final OrderService orderService;
    private final ObjectMapper objectMapper;
    private final WebSocketHandler wsh;
    private final HttpService httpService;

    @Value("${username}") private String username;
    @Value("${password}") private String password;
    @Value("${path-to-memory}") private String pathToMemory;

    public UtilsController(DB db, OrderService orderService, ObjectMapper objectMapper, WebSocketHandler wsh,
                           HttpService httpService) {
        this.db = db;
        this.orderService = orderService;
        this.objectMapper = objectMapper;
        this.wsh = wsh;
        this.httpService = httpService;
    }

    @GetMapping(path = "/clear-hidden-order-ids")
    public String clearHiddenOrderIds() throws IOException {
        db.clearHiddenOrderIds();
        return "{\"Clear hidden order ids\":\"done.\"}";
    }

    @GetMapping(path = "/write-db-to-json")
    public String writeDbToJson() throws IOException {
        String s = objectMapper.writeValueAsString(db.getStocksStream().map(Stock::clone).collect(Collectors.toList()));
        try {
            Files.write(Paths.get(pathToMemory), s.getBytes(), CREATE, TRUNCATE_EXISTING);
        }
        catch (Exception ex) {
            logger.error("Unable to export to file", ex);
        }
        return "{\"message\":\"check the output json file\"}";
    }

    @GetMapping(path = "/far-back-for-orders")
    public String farBackForOrders(@RequestParam(name = "farBackForOrders") long farBackForOrders) {
        orderService.setFarBackForOrders(farBackForOrders);
        orderService.clearLastTimeDoCompletableFuture();
        return "{\"far-back-for-orders\":\"done.\"}";
    }

    @GetMapping(path = "/remove-symbol")
    public boolean removeSymbol(@RequestParam String symbol) {
        if (db.removeStock(symbol)) {
            wsh.send("REMOVE SYMBOL: " + symbol);
            return true;
        }
        return false;
    }

    @GetMapping(path = "/remove-autorun")
    public String removeAutoRun(@RequestParam String symbol) {
        Stock stock = db.getStock(symbol);
        if (stock == null) {
            return "Unable to find stock for symbol " + symbol;
        }
        stock.setAutoRun(0);
        return "{\"message\":\"Removed autoRun for " + symbol + "\"}";
    }

    @GetMapping(path = "/authentication-token")
    public Map<String, String> authenticationToken() {
        return Collections.singletonMap("token", httpService.login(username, password));
    }
}
