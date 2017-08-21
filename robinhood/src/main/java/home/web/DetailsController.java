package home.web;

import home.model.DB;
import home.model.Stock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;

@Controller public class DetailsController {
    private final Logger logger = LoggerFactory.getLogger(DetailsController.class);
    private final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("HH:mm:ss");
    private final DB db;

    public DetailsController(DB db) {
        this.db = db;
    }

    @GetMapping(path = "/details/{symbol}")
    public void details(@PathVariable String symbol, HttpServletResponse response) throws IOException {
        response.setContentType(MediaType.TEXT_PLAIN_VALUE);
        Stock stock = db.getStock(symbol);
        if (stock == null) {
            response.getOutputStream().println("Unable to find " + symbol);
        }
        else {
            response.getOutputStream().println(
                    stock.getQuotes().stream()
                            .map(q -> String.format("%s | %s | %s", q.getFrom().format(DTF), q.getTo().format(DTF), q.getPrice()))
                            .collect(Collectors.joining("\n"))
            );
        }

        response.getOutputStream().flush();
    }
}
