package home;

import home.model.Quote;
import org.junit.Ignore;
import org.junit.Test;

import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.TimeZone;

public class UtilsTest {
    @Test public void drawGraph() throws IOException {
        TimeZone timeZone = Calendar.getInstance().getTimeZone();
        System.out.println("Number of hours we need to add to Robinhood time to get our time: " +
                (timeZone.getRawOffset() + timeZone.getDSTSavings()) / 3600 / 1000);
    }
}
