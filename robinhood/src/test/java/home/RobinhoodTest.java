package home;

import org.junit.Test;

import java.math.BigDecimal;

public class RobinhoodTest {
    @Test public void test() {
        BigDecimal f = new BigDecimal("37.40000");
        System.out.printf("%-6.2f\n", f);
    }
}
