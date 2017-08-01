package home;

import home.model.Quote;
import org.junit.Ignore;
import org.junit.Test;

import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.LinkedList;

public class UtilsTest {
    @Ignore
    @Test public void drawGraph() throws IOException {
        LocalTime open = LocalTime.of(9, 30, 0);
        LocalTime close = LocalTime.of(16, 0, 0);
        LinkedList<Quote> quotes = new LinkedList<>();

        Quote q = new Quote();
        q.setPrice(new BigDecimal(14.01));
        q.setFrom(LocalTime.of(9, 30, 0));
        q.setTo(LocalTime.of(9, 30, 30));
        quotes.add(q);

        q = new Quote();
        q.setPrice(new BigDecimal(14.02));
        q.setFrom(LocalTime.of(9, 30, 30));
        q.setTo(LocalTime.of(9, 31, 0));
        quotes.add(q);

        q = new Quote();
        q.setPrice(new BigDecimal(14.03));
        q.setFrom(LocalTime.of(9, 31, 0));
        q.setTo(LocalTime.of(9, 31, 30));
        quotes.add(q);

        q = new Quote();
        q.setPrice(new BigDecimal(14.14));
        q.setFrom(LocalTime.of(9, 31, 30));
        q.setTo(LocalTime.of(9, 32, 0));
        quotes.add(q);

        q = new Quote();
        q.setPrice(new BigDecimal(13.98));
        q.setFrom(LocalTime.of(9, 32, 0));
        q.setTo(LocalTime.of(9, 34, 30));
        quotes.add(q);

        byte[] barray = Utils.drawGraph(450, 100, open, close, quotes);
        try (FileOutputStream fos = new FileOutputStream("/dev/shm/test.png")) {
            fos.write(barray);
        }
    }
}
