package home.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;

import static java.util.stream.Collectors.joining;

public class Stock extends StockDO {
    private transient final Logger logger = LoggerFactory.getLogger(Stock.class);
    private transient final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("HH:mm:ss");
    private ConcurrentLinkedQueue<Quote> quotes;

    public Stock() {}
    public Stock(String symbol, String instrument) {
        super(symbol, instrument);
    }

    public Quote getLatestQuote() {
        if (quotes == null || quotes.isEmpty()) {
            return null;
        }
        return new LinkedList<>(quotes).peekLast();
    }

    public void addQuote(Quote q) {
        if (quotes == null || quotes.isEmpty()) {
            quotes = new ConcurrentLinkedQueue<>(Collections.singleton(q));
        }
        else {
            Quote lastQ = new LinkedList<>(quotes).getLast();
            int h1 = lastQ.getUpdatedAt().getHour();
            int m1 = lastQ.getUpdatedAt().getMinute();
            int s1 = lastQ.getUpdatedAt().getSecond();
            int h2 = q.getUpdatedAt().getHour();
            int m2 = q.getUpdatedAt().getMinute();
            int s2 = q.getUpdatedAt().getSecond();
            if (h1 != h2 || m1 != m2 || s1 != s2) {
                quotes.add(q);
                price = q.getPrice();
            }
        }

        recalculateDayMinMax(q);
    }

    private void recalculateDayMinMax(Quote q) {
        if (dayMax.compareTo(q.getPrice()) < 0) {
            dayMax = q.getPrice();
        }
        if (dayMin.compareTo(q.getPrice()) > 0) {
            dayMin = q.getPrice();
        }
    }

    public Quote getFirstQuoteOfDay() {
        if (quotes == null) {
            return null;
        }
        Quote result = null;
        Iterator<Quote> iterator = quotes.iterator();
        while (iterator.hasNext()) {   // I don't use forEach because the iterator is said to go from head to tail
            result = iterator.next();
        }
        return result;
    }

    public ConcurrentLinkedQueue<Quote> getQuotes() {
        return quotes;
    }

    @Override public int getDayPercentage() {
        if (price == null) {
            return 0;
        }
        long n = quotes.stream().filter(q -> price.compareTo(q.getPrice()) < 0).count();
        return Math.round((float)n / (float)(quotes.size()) * 100f);
    }

    public StockDO minified() {
        BigDecimal last5minsMin = null, last5minsMax = null;
        Tuple2<BigDecimal, BigDecimal> minMaxLast5Mins = getMinMaxLast15Mins();
        if (minMaxLast5Mins != null) {
            last5minsMin = minMaxLast5Mins._1;
            last5minsMax = minMaxLast5Mins._2;
        }
        Quote latestQuote = getLatestQuote();
        LocalDateTime ua = latestQuote.getUpdatedAt();
        return new StockDO(symbol, instrument, latestQuote.getPrice(), dayMin, dayMax, day5Min, day5Max, orders,
                getDayPercentage(), last5minsMin, last5minsMax,
                _getDown(), _getUp(),
                ua.getYear(), ua.getMonthValue(), ua.getDayOfMonth(), ua.getHour(), ua.getMinute(), ua.getSecond());
    }

    private Tuple2<BigDecimal, BigDecimal> getMinMaxLast15Mins() {
        if (quotes == null || quotes.isEmpty()) {
            return null;
        }
        LinkedList<Quote> _quotes = new LinkedList<>(quotes);
        BigDecimal min = BigDecimal.valueOf(Double.MAX_VALUE);
        BigDecimal max = BigDecimal.valueOf(Double.MIN_VALUE);
        Quote lastQuote = _quotes.pollLast();
        Quote q = lastQuote;
        while (q != null && q.getUpdatedAt() != null
                && q.getUpdatedAt().until(lastQuote.getUpdatedAt(), ChronoUnit.SECONDS) < 601) {
            min = min.compareTo(q.getPrice()) > 0 ? q.getPrice() : min;
            max = max.compareTo(q.getPrice()) < 0 ? q.getPrice() : max;
            q = _quotes.pollLast();
        }
        return new Tuple2<>(min, max);
    }

    private Going _getDown() {
        if (quotes.isEmpty()) {
            return new Going(0, null, null);
        }

        LinkedList<Quote> _quotes = new LinkedList<>(quotes);

        boolean foul = false;
        Quote head = _quotes.pollLast(), tail = head, _tail;

        List<Quote> debugList = new LinkedList<>(Collections.singleton(head));

        while ((_tail = _quotes.pollLast()) != null) {
            debugList.add(_tail);
            if (_tail.getPrice().compareTo(tail.getPrice()) >= 0) {
                tail = _tail;
                foul = false;
            }
            else if (foul) {
                break;
            }
            else {
                foul = true;
                if (_tail.getPrice().compareTo(head.getPrice()) <= 0) {
                    break;
                }
            }
        }

        Going result = new Going(tail.getUpdatedAt().until(head.getUpdatedAt(), ChronoUnit.SECONDS),
                tail.getPrice(), head.getPrice());
/*
        logger.debug("going down: tail: {}, debugList:\n{}\nresult: {}", tail, debugList.stream()
                .map(q -> String.format("%s | %s | %s",
                        q.getFrom().format(DTF),
                        q.getTo().format(DTF),
                        q.getPrice())
                )
                .collect(joining("\n")), result
        );
*/
        return result;
    }

    private Going _getUp() {
        if (quotes.isEmpty()) {
            return new Going(0, null, null);
        }

        LinkedList<Quote> _quotes = new LinkedList<>(quotes);

        boolean foul = false;
        Quote head = _quotes.pollLast(), tail = head, _tail;

        List<Quote> debugList = new LinkedList<>(Collections.singleton(head));

        while ((_tail = _quotes.pollLast()) != null) {
            debugList.add(_tail);
            if (_tail.getPrice().compareTo(tail.getPrice()) < 0) {
                tail = _tail;
                foul = false;
            }
            else if (foul) {
                break;
            }
            else {
                foul = true;
                if (_tail.getPrice().compareTo(head.getPrice()) >= 0) {
                    break;
                }
            }
        }

        Going result = new Going(tail.getUpdatedAt().until(head.getUpdatedAt(), ChronoUnit.SECONDS),
                tail.getPrice(), head.getPrice());
/*
        logger.debug("going up: tail: {}, debugList:\n{}\nresult: {}", tail, debugList.stream()
                .map(q -> String.format("%s | %s | %s",
                        q.getFrom().format(DTF),
                        q.getTo().format(DTF),
                        q.getPrice())
                )
                .collect(joining("\n")), result
        );
*/
        return result;
    }

    @Override
    public String toString() {
        return "Stock {" +
                "symbol='" + symbol + '\'' +
                ", price=" + price +
                ", dayMin=" + dayMin +
                ", dayMax=" + dayMax +
                ", day5Min=" + day5Min +
                ", day5Max=" + day5Max +
                ", weekPercentage=" + weekPercentage +
                ", dayPercentage=" + dayPercentage +
                '}';
    }

    public Stock clone() {             // to remove the orders
        Stock replica = new Stock(symbol, instrument);
        quotes.forEach(replica::addQuote);
        return replica;
    }
}
