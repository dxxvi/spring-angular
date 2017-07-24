package home;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import static java.nio.file.StandardOpenOption.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Created by ly on 1/5/17
 */
@RestController
public class SafariRestController {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final List<String> list = new CopyOnWriteArrayList<>();
    private final List<Book> books = new CopyOnWriteArrayList<>();

    @Value("${application.output.path}")
    private String path;
    @Value("${application.output.text-file}")
    private String textFile;

    @PostMapping(path = {"/safaribooksonline-text", "/playframework-text"})
    public ResponseEntity<String> receiveText(@RequestBody Data data) {
        if (data.getTextarea() != null && !data.getTextarea().isEmpty()) {
            list.add(data.getTextarea());
        }
        return ResponseEntity.ok(LocalDateTime.now().toString());
    }

    @PostMapping(path = "/safaribooksonline-image")
    public ResponseEntity<String> receiveImage(@RequestBody Data data) {
        if (data.getTextarea() == null || data.getTextarea().isEmpty() || data.getWgetimg() == null
                || data.getWgetimg().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + data);
        }
        int i = data.getTextarea().lastIndexOf('/');
        String fileName = i < 0 ? data.getTextarea() : data.getTextarea().substring(i + 1);
        try {
            i = data.getWgetimg().indexOf(',');
            if (i < 0) {
                throw new RuntimeException("Weird base64: " + data.getWgetimg());
            }
            writeBase64Image(data.getWgetimg().substring(i + 1), path, fileName);
            return ResponseEntity.ok(LocalDateTime.now() + ": " + fileName);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + ex.getMessage());
        }
    }

    void writeBase64Image(String base64, String path, String fileName) throws Exception {
        try (OutputStream stream = new FileOutputStream(path + File.separator + fileName)) {
            stream.write(Base64.decodeBase64(base64));
        }
    }

    @GetMapping(path = "/write")
    public ResponseEntity<String> writeIndex() {
        try {
            Files.write(Paths.get(path, textFile), list, CREATE, TRUNCATE_EXISTING);
            return ResponseEntity.ok(LocalDateTime.now().toString());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + ex.getMessage());
        }
    }

    @PostMapping(path = "/books", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postBooks(@RequestBody List<Book> books) {
        this.books.addAll(books);
        return ResponseEntity.ok("");
    }

    @GetMapping(path = "/books")
    public ResponseEntity<String> books(@RequestParam(required = false) String clear) throws JsonProcessingException {
        if (clear != null) {
            books.clear();
            return ResponseEntity.ok("");
        }
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
                .body(objectMapper.writeValueAsString(books));
    }
}