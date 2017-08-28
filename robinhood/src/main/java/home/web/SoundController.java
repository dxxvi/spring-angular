package home.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Controller
@RequestMapping(path = "/sound")
public class SoundController {
    private final Logger logger = LoggerFactory.getLogger(SoundController.class);

    private Map<String, byte[]> wordByteArrayMap = new ConcurrentHashMap<>();

    @GetMapping(path = "/{word}.mp3")
    public void word(@PathVariable(name = "word") String word, HttpServletResponse response) throws IOException {
        response.setContentType("audio/mpeg");
        if (!wordByteArrayMap.containsKey(word)) {
            try (InputStream is = SoundController.class.getResourceAsStream("/" + word + ".mp3")) {
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                int nRead;
                byte[] data = new byte[1024];
                while ((nRead = is.read(data, 0, data.length)) != -1) {
                    baos.write(data, 0, nRead);
                }
                baos.flush();
                wordByteArrayMap.put(word, baos.toByteArray());
            }
        }
        response.getOutputStream().write(wordByteArrayMap.get(word));
        response.getOutputStream().flush();
    }
}
