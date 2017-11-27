package home;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Ignore;
import org.junit.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import static java.nio.file.StandardOpenOption.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

/**
 * Created by ly on 1/6/17
 */
public class Tests {
    @Test
    public void writeBase64ImageTest() throws Exception {
        new SafariRestController().writeBase64Image("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", "/dev/shm", "test.jpg");
    }

    @Ignore
    @Test public void f() {
        IntStream.rangeClosed(0, 255).forEach(i -> {
            System.out.printf("G=\"\\[$(tput setaf %d)\\]\" && R=\"\\[$(tput sgr0)\\]\" && export PS1=\"${G}\\h:\\w${R} $ \"\n", i);
        });
    }

    @Ignore
    @Test public void g() throws IOException {
/*
        Path path = Paths.get("/dev/shm/book/index.html");

        Files.write(
                Paths.get("/dev/shm/book/test.html"),
                Files.lines(path)
                        .flatMap(l -> {
                            int i = l.indexOf("</pre>");
                            if (i < 0) {
                                return Stream.of(l);
                            } else {
                                return Stream.of(l.substring(0, i + 6), l.substring(i + 6));
                            }
                        })
                        .collect(Collectors.toList()),
                CREATE, TRUNCATE_EXISTING
        );
*/
        ObjectMapper objectMapper = new ObjectMapper();
        Path path = Paths.get("/dev/shm/book/test.html");
        AtomicInteger id = new AtomicInteger(1);
        Map<String, List<String>> map = new HashMap<>();
        List<String> result = new LinkedList<>();
        AtomicBoolean processingPre = new AtomicBoolean(false);
        Files.lines(path).forEach(l -> {
            if (l.startsWith("<pre")) {
                map.put("mark" + id.get(), new LinkedList<>(Collections.singletonList(l)));
                processingPre.set(true);
            }
            else if (processingPre.get()) {
                map.get("mark" + id.get()).add(l);
                if (l.endsWith("</pre>")) {
                    processingPre.set(false);
                    result.add(String.format("<div id=\"mark%d\"></div>", id.getAndIncrement()));
                }
            }
            else {
                result.add(l);
            }
        });
        Files.write(
                Paths.get("/dev/shm/json.txt"),
                Collections.singletonList(objectMapper.writeValueAsString(map)),
                CREATE, TRUNCATE_EXISTING
        );
        Files.write(
                Paths.get("/dev/shm/book/test2.html"),
                result,
                CREATE, TRUNCATE_EXISTING
        );
    }
}
