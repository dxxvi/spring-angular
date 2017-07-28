package home.web;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.MediaType.*;

import home.QuoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;

@Controller public class QuoteController {
    private final QuoteService quoteService;

    public QuoteController(QuoteService quoteService) {
        this.quoteService = quoteService;
    }

    @GetMapping(path = "/write")
    public ResponseEntity<String> writeToFile() {
        try {
            quoteService.writeDbToFile();
            return ResponseEntity.ok("");
        }
        catch (Exception ex) {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ex.printStackTrace(new PrintWriter(baos, true));
            return ResponseEntity.status(INTERNAL_SERVER_ERROR)
                    .contentType(TEXT_PLAIN)
                    .body(baos.toString());
        }
    }
}
