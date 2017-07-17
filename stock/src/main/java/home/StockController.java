package home;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.concurrent.atomic.AtomicInteger;

@Controller
public class StockController {
    private final Logger logger = LoggerFactory.getLogger(StockController.class);
    private final Map<String, byte[]> db = new ConcurrentHashMap<>();
    private final ConcurrentSkipListSet<String> symbols = new ConcurrentSkipListSet<>();
    private final AtomicInteger i = new AtomicInteger(0);

    @Value("${canvas.x}") private int x;
    @Value("${canvas.y}") private int y;
    @Value("${canvas.width}")  private int width;
    @Value("${canvas.height}") private int height;

    private byte[] worryPicture;       // don't use this directly, use getWorryPicture instead

    @GetMapping(path = "/need", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> needGraph() {
        if (symbols.isEmpty()) {
            symbols.add("AMD");
        }
        i.compareAndSet(symbols.size(), 0);
        return ResponseEntity.ok(new ArrayList<>(symbols).get(i.getAndIncrement()));
    }

    @PostMapping(path = "/symbol", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postPicture(@RequestBody PostData postData) throws IOException {
        StringBuilder message = new StringBuilder();
        String base64 = postData.getPicture().substring("data:image/png;base64,".length());
        String symbol = postData.getSymbol();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        BufferedImage bufferedImage;
        if (symbol.endsWith("5")) {
            BufferedImage br1 = ImageIO.read(new ByteArrayInputStream(Base64.getDecoder().decode(base64)));
            BufferedImage bottom = br1.getSubimage(0, 200, 380, 15);
            bufferedImage = br1.getSubimage(0, 0, 420, 160);
            Graphics2D g2d = bufferedImage.createGraphics();
            g2d.drawImage(bottom, null, 0, 145);
            g2d.dispose();
        }
        else {
            bufferedImage = ImageIO.read(new ByteArrayInputStream(Base64.getDecoder().decode(base64)))
                    .getSubimage(x, y, width, height);
        }
        ImageIO.write(bufferedImage, "png", baos);
        db.put(symbol, baos.toByteArray());

        if (symbol.endsWith("5") || db.containsKey(symbol + 5)) {
            return ResponseEntity.ok("");
        }
        else {
            return ResponseEntity.ok("need 5 days for " + symbol);
        }
    }

    @GetMapping(path = "/symbol/{symbol}")
    public void getPicture(@PathVariable String symbol, HttpServletResponse response) throws IOException {
        StringBuilder message = new StringBuilder();

        response.setContentType(MediaType.IMAGE_PNG_VALUE);
        if (db.containsKey(symbol)) {
            message.append(symbol.endsWith("5") ?
                    "Asked for 5-day graph of " + symbol.substring(0, symbol.length() - 1) + " & we have it."
                    : "Asked for 1-day graph of " + symbol + " and we have it."
            );
            response.getOutputStream().write(db.get(symbol));
        }
        else {
            if (!symbol.endsWith("5")) {
                message.append("Asked for 1-day graph of ").append(symbol);
                symbols.add(symbol);
            }
            else {
                message.append("Asked for 5-day graph of ").append(symbol.substring(0, symbol.length() - 1));
            }
            message.append(". Don't have it yet. So return a sad face.");
            response.getOutputStream().write(getWorryPicture());
        }

//        logger.debug(message.toString());
        response.getOutputStream().flush();
    }

    @GetMapping(path = "/refresh")
    public ResponseEntity<String> refresh() {
        logger.debug("Removing all 5-day graphs");
        symbols.forEach(symbol -> db.remove(symbol + "5"));
        return ResponseEntity.ok("");
    }

    private byte[] getWorryPicture() throws IOException {
        if (worryPicture == null) createWorryPicture();
        return worryPicture;
    }

    private void createWorryPicture() throws IOException {
        if (worryPicture != null) return;

        int w = width / 4, h = height / 4;
        BufferedImage worry = ImageIO.read(StockController.class.getResourceAsStream("/worry.png"));
        BufferedImage bufferedImage = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
        Graphics2D graphics2D = bufferedImage.createGraphics();
        graphics2D.drawImage(worry, (w - 32)/2, (h - 32)/2, null);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "png", baos);
        worryPicture = baos.toByteArray();
        graphics2D.dispose();
    }
}
