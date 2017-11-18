package home;

import org.junit.Test;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class UtilsTest {
    @Test public void g() {
        double d = 6.0123;
        double x = (int)(d*100);
        d = x / 100d;
        System.out.println(d);

        d = 6.0193;
        x = (int)(d*100) + 1;
        d = x / 100d;
        System.out.println(d);
    }
}
