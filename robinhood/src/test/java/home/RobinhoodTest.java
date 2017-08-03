package home;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import home.model.RobinhoodOrdersResult;
import org.junit.Ignore;
import org.junit.Test;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Random;
import java.util.function.Consumer;

public class RobinhoodTest {
    @Ignore
    @Test public void test() throws IOException {
        List<String> debloats =
                Files.readAllLines(Paths.get("/home/ly/IdeaProjects/spring-angular/robinhood/src/test/resources/debloat.txt"));

        Files.lines(Paths.get("/home/ly/IdeaProjects/spring-angular/robinhood/src/test/resources/origin.txt"))
                .filter(l -> l.endsWith(".apk"))
                .forEach(l -> {
                    int i = l.lastIndexOf("/");
                    if (i > 0) {
                        String apk = l.substring(i + 1);
                        if (debloats.stream().noneMatch(debloatLine -> debloatLine.contains(apk))) {
                            System.out.println(l.substring(0, i));
                        }
                    }
                });
    }

    @Ignore
    @Test public void bufferedImage() throws IOException {
        Random random = new Random();

        BufferedImage bi = new BufferedImage(450, 100, BufferedImage.TYPE_BYTE_GRAY);
        Graphics2D g2d = bi.createGraphics();

        g2d.setColor(new Color(232, 232, 232));
        g2d.fillRect(0, 0, 450, 100);

        g2d.setColor(new Color(194, 194, 194));
        for (int i = 0; i < 449; i++) {
            int height = random.nextInt(98) + 1;
            g2d.fillRect(i, 100 - height, 1, height);
        }

        g2d.dispose();

        ImageIO.write(bi, "png", new File("/dev/shm/test.png"));
    }

    @Test public void testReadingOrdersResult() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
        try (InputStream is = HttpServiceLocal.class.getResourceAsStream("/orders.json")) {
            RobinhoodOrdersResult o = objectMapper.readValue(is, RobinhoodOrdersResult.class);
            o = null;
        }
    }
}
