package home.web;

import home.model.DB;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class GraphController {
    private final Logger logger = LoggerFactory.getLogger(GraphController.class);

    private final DB db;

    public GraphController(DB db) {
        this.db = db;
    }

    @GetMapping(path = "/graph/{symbol}")
    public void graph(@PathVariable String symbol, HttpServletResponse response) throws IOException {
        response.setContentType(MediaType.IMAGE_PNG_VALUE);
        response.getOutputStream().write(db.getGraph(symbol));
        response.getOutputStream().flush();
    }
}
