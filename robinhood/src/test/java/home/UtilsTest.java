package home;

import home.model.BuySellOrder;
import home.model.Order;
import home.model.Quote;
import org.junit.Ignore;
import org.junit.Test;

import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import static java.nio.file.StandardOpenOption.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.stream.Collectors.groupingBy;

public class UtilsTest {
    @Test public void drawGraph() throws IOException {
        Random random = new Random();
        LinkedList<Quote> quotes = new LinkedList<>();
        LocalDateTime now = LocalDateTime.of(2017,1,1,9,30, 0);
        double price = 13;
        for (int i = 0; i < 290; i++) {
            LocalDateTime _now = now.plusSeconds(random.nextInt(6) + 1);
            quotes.add(new Quote(null, new BigDecimal(price + 2*random.nextDouble()), now, null));
            now = _now;
        }

        byte[] bytes = Utils.drawGraph((int)Main.graphWidth, Main.graphHeight, quotes);
        long start = System.currentTimeMillis();
        for (int i = 1; i <10; i ++)
            Files.write(Paths.get("/dev/shm/test.png"), bytes, CREATE, TRUNCATE_EXISTING);
        System.out.println(System.currentTimeMillis() - start);
    }

    @Test public void f() {
        LocalDateTime now = LocalDateTime.now();

        Order o1 = new Order(); o1.setSymbol("AMD"); o1.setId("1"); o1.setCreatedAt(now.minusMinutes(1));
        Order o2 = new Order(); o2.setSymbol("AMD"); o2.setId("2"); o2.setCreatedAt(now.minusMinutes(3));
        Order o3 = new Order(); o3.setSymbol("AMD"); o3.setId("3"); o3.setCreatedAt(now.minusMinutes(2));
        Order o4 = new Order(); o4.setSymbol("WLL"); o4.setId("4"); o4.setCreatedAt(now.minusMinutes(5));
        Order o5 = new Order(); o5.setSymbol("WLL"); o5.setId("5"); o5.setCreatedAt(now.minusMinutes(4));

        Map<String, TreeSet<Order>> map = Stream.of(o1, o2, o3, o4, o5).collect(groupingBy(
                Order::getSymbol, Collectors.mapping(Function.identity(),
                        Collectors.toCollection(() -> new TreeSet<Order>(Comparator.comparing(Order::getCreatedAt))))
        ));
        map = null;
    }

    @Test public void g() {
        BuySellOrder bso1 = new BuySellOrder("1").setSide("side1");
        BuySellOrder bso2 = new BuySellOrder("2").setSide("side2");
        BuySellOrder bso3 = new BuySellOrder("3").setSide("side3");
        SortedSet<BuySellOrder> set = new ConcurrentSkipListSet<>(Comparator.comparing(BuySellOrder::getId));
        set.add(bso2);
        set.add(bso3);
        set.add(bso1);
        set.remove(new BuySellOrder("3"));
        set = null;
    }
}
