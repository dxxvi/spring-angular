package home.web;

import home.model.DB;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping(path = "/utils")
public class UtilsController {
    private final Logger logger = LoggerFactory.getLogger(UtilsController.class);
    private final DB db;

    public UtilsController(DB db) {
        this.db = db;
    }

    @GetMapping(path = "/clear-hidden-order-ids")
    public void clearHiddenOrderIds(HttpServletResponse response) throws IOException {
        db.clearHiddenOrderIds();
        response.setContentType(MediaType.TEXT_PLAIN_VALUE);
        response.getOutputStream().println("Clear hidden order ids: done.");
        response.getOutputStream().flush();
    }
}
