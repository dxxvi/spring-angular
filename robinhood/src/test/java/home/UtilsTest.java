package home;

import org.junit.Test;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class UtilsTest {
    @Test public void g() {
        LocalDateTime ldt = LocalDateTime.ofEpochSecond(1504618200, 0, ZoneOffset.UTC);
        System.out.println(ldt);
    }
}
