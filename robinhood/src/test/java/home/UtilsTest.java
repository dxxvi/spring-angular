package home;

import org.junit.Test;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Stack;
import java.util.concurrent.ConcurrentLinkedQueue;

public class UtilsTest {
    @Test public void g() {
        ConcurrentLinkedQueue<String> quotes = new ConcurrentLinkedQueue<>();
        quotes.add("A");
        quotes.add("B");
        quotes.add("C");

        System.out.println(quotes.peek());

        Stack<String> stack = new Stack<>();
        stack.addAll(quotes);
        System.out.printf("%s %s %s\n", stack.pop(), stack.pop(), stack.pop());
    }
}
