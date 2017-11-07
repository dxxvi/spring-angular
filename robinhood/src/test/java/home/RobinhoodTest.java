package home;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import home.model.DB;
import home.model.Order;
import home.model.RobinhoodOrdersResult;
import home.model.Tuple4;
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
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.function.BiFunction;
import java.util.function.Consumer;
import java.util.stream.IntStream;

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
/*
        try (InputStream is = HttpServiceLocal.class.getResourceAsStream("/orders.json")) {
            RobinhoodOrdersResult o = objectMapper.readValue(is, RobinhoodOrdersResult.class);
            o = null;
        }
*/
        Order order = new Order();
        order.setCreatedAt(LocalDateTime.now());
        order.setId("123-ABC");
        order.setQuantity(5);
        order.setPrice(new BigDecimal("13.51"));
        order.setSymbol("ON");
        order.setState("filled");
        order.setSide("buy");
        System.out.println(objectMapper.writeValueAsString(order));
    }

    @Test public void f() {
        int N = 1500;
        int[] amounts = new int[] { 1,  0,  0,  0,  0,   0,   0 };
        int[] prices  = new int[] { 0, -1, -2, -3, -5, -10, -11 };
        int[] profits = new int[] { 0,  9, 14, 20, 60,   1,   1 };

        for (int i = 1; i < amounts.length; i++) {
            int moneySpent = 0;
            int shares = 0;
            for (int j = 0; j < i; j++) {
                moneySpent += amounts[j] * (N + prices[j]);
                shares += amounts[j];
            }
            amounts[i] = moneySpent + profits[i] - shares * (N + prices[i] + 1);
        }
        System.out.println(Arrays.toString(amounts) + " " + IntStream.of(amounts).sum() + " shares");
        System.out.println(Arrays.toString(prices));
        System.out.println(Arrays.toString(profits));
    }

    /*
     * Use CompletableFuture to get Orders
     */
    @Test public void g() {
        RobinhoodOrdersResult rosr = new RobinhoodOrdersResult();
        rosr.setResults(Collections.emptyList());
        rosr.setNext("https://api.robinhood.com/orders/1");

        String username = "u", password = "p";

        BiFunction<Tuple4<DB, HttpService, RobinhoodOrdersResult, Integer>, Throwable, Tuple4<DB, HttpService, RobinhoodOrdersResult, Integer>> fn =
                (t, throwable) -> {
                    HttpService httpService =  t._2();
                    String loginToken = httpService.login(username, password);
                    String currentUrl = t._3().getNext();
                    int i = currentUrl.lastIndexOf('/') + 1;
                    String nextUrl = currentUrl.substring(0, i) + (Integer.parseInt(currentUrl.substring(i)) + 1);
                    RobinhoodOrdersResult innerRosr = httpService.nextOrders(t._3().getNext(), loginToken);
                    innerRosr.setNext(nextUrl);
                    return new Tuple4<>(t._1(), t._2(), innerRosr, t._4());
                };

        CompletableFuture<Tuple4<DB, HttpService, RobinhoodOrdersResult, Integer>> cf =
                CompletableFuture.completedFuture(new Tuple4<>(new DB(), new HttpServiceLocal(new ObjectMapper()), rosr, 194));
        try {
            while (cf.get()._3() != null) {
                cf = cf.handle(fn);
            }
        }
        catch (InterruptedException | ExecutionException ex) {
            System.err.println("What to do with this:");
            ex.printStackTrace();
        }
    }

    @Test public void h() {
        System.out.println(Utils.robinhoodAndMyTimeDifference());
    }
}
