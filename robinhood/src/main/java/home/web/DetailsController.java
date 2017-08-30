package home.web;

import home.model.DB;
import home.model.Quote;
import home.model.Stock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Collections;

@RestController
public class DetailsController {
    private final Logger logger = LoggerFactory.getLogger(DetailsController.class);
    private final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("HH:mm:ss");
    private final DB db;

    public DetailsController(DB db) {
        this.db = db;
    }

    @GetMapping(path = "/details/{symbol}")
    public Collection<Quote> details(@PathVariable String symbol) throws IOException {
        Stock stock = db.getStock(symbol);
        return stock == null ? Collections.emptyList() : stock.getQuotes();
    }
}
