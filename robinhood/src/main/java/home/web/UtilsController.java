package home.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import home.OrderService;
import home.model.DB;
import home.model.Stock;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/utils")
public class UtilsController {
    private final Logger logger = LoggerFactory.getLogger(UtilsController.class);
    private final DB db;
    private final OrderService orderService;
    private final ObjectMapper objectMapper;

    @Value("${path-to-memory}") private String pathToMemory;

    public UtilsController(DB db, OrderService orderService, ObjectMapper objectMapper) {
        this.db = db;
        this.orderService = orderService;
        this.objectMapper = objectMapper;
    }

    @GetMapping(path = "/clear-hidden-order-ids")
    public String clearHiddenOrderIds() throws IOException {
        db.clearHiddenOrderIds();
        return "Clear hidden order ids: done.";
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
        return "Check the json string.";
    }

    @GetMapping(path = "/far-back-for-orders")
    public String farBackForOrders(@RequestParam(name = "farBackForOrders") long farBackForOrders) {
        orderService.setFarBackForOrders(farBackForOrders);
        return "far-back-for-orders: done.";
    }
}
