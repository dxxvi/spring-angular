package home;

import home.model.Order;
import home.model.Quote;
import org.junit.Ignore;
import org.junit.Test;

import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Set;
import java.util.TimeZone;
import java.util.TreeSet;
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
        TimeZone timeZone = Calendar.getInstance().getTimeZone();
        System.out.println("Number of hours we need to add to Robinhood time to get our time: " +
                (timeZone.getRawOffset() + timeZone.getDSTSavings()) / 3600 / 1000);
    }

    @Test public void f() {
        LocalDateTime now = LocalDateTime.now();

        Order o1 = new Order(); o1.setSymbol("AMD"); o1.setId("1"); o1.setCreatedAt(now.minusMinutes(1));
        Order o2 = new Order(); o2.setSymbol("AMD"); o2.setId("2"); o2.setCreatedAt(now.minusMinutes(3));
        Order o3 = new Order(); o3.setSymbol("AMD"); o3.setId("3"); o3.setCreatedAt(now.minusMinutes(2));
        Order o4 = new Order(); o4.setSymbol("WLL"); o4.setId("4"); o4.setCreatedAt(now.minusMinutes(5));
        Order o5 = new Order(); o5.setSymbol("WLL"); o5.setId("5"); o5.setCreatedAt(now.minusMinutes(4));

        Map<String, TreeSet<Order>> map = Stream.of(o1, o2, o3, o4, o5).collect(groupingBy(
                Order::getSymbol, Collectors.mapping(Function.identity(), Collectors.toCollection(() -> new TreeSet<Order>(Comparator.comparing(Order::getCreatedAt))))
        ));
        map = null;
    }
}
