package home.model;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;

public class Stock extends StockDO {
    private BigDecimal max5minsDelta;  // the max 5 mins delta in the last 5 days
    private LinkedList<Quote> quotes;

    public Stock(String symbol, String instrument) {
        super(symbol, instrument);
    }

    public BigDecimal getPrice() {
        if (quotes == null || quotes.isEmpty()) {
            return null;
        }
        return quotes.getLast().getPrice();
    }

    public BigDecimal getMax5minsDelta() {
        return max5minsDelta;
    }

    public void setMax5minsDelta(BigDecimal max5minsDelta) {
        if (this.max5minsDelta == null || this.max5minsDelta.compareTo(max5minsDelta) < 0) {
            this.max5minsDelta = max5minsDelta;
        }
    }

    public void addMax5minsDeltas(Collection<BigDecimal> max5minsDeltas) {
        max5minsDeltas.forEach(this::setMax5minsDelta);
    }

    public void addQuote(Quote q) {
        if (quotes == null) {
            quotes = new LinkedList<>(Collections.singleton(q));
        }
        else {
            Quote lastQ = quotes.getLast();
            if (lastQ.getPrice().equals(q.getPrice()) && lastQ.getTo().equals(q.getFrom())) {
                lastQ.setTo(q.getTo());
            }
            else {
                quotes.add(q);
            }
        }

        recalculateDayMinMax(q);
    }

    public void prependQuote(Quote q) {
        if (quotes == null) {
            quotes = new LinkedList<>(Collections.singleton(q));
        }
        else {
            Quote firstQ = quotes.getFirst();
            if (firstQ.getPrice().equals(q.getPrice()) && q.getTo().equals(firstQ.getFrom())) {
                firstQ.setFrom(q.getFrom());
            }
            else {
                quotes.addFirst(q);
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
        return quotes.peekFirst();
    }

    public LinkedList<Quote> getQuotes() {
        return quotes;
    }

    @Override public int getDayPercentage() {
        BigDecimal price = getPrice();
        long n = quotes.stream().filter(q -> price.compareTo(q.getPrice()) < 0).count();
        return Math.round((float)n / (float)(quotes.size()) * 100f);
    }

    public StockDO minified() {
        BigDecimal estMin = null, estMax = null;
        Tuple2<BigDecimal, BigDecimal> minMaxLast5Mins = getMinMaxLast5Mins();
        if (minMaxLast5Mins != null) {
            BigDecimal _estMin = minMaxLast5Mins._2.subtract(max5minsDelta);
            BigDecimal _estMax = minMaxLast5Mins._1.add(max5minsDelta);
            estMin = _estMin.compareTo(minMaxLast5Mins._1) < 0 ? _estMin : minMaxLast5Mins._1;
            estMax = _estMax.compareTo(minMaxLast5Mins._2) > 0 ? _estMax : minMaxLast5Mins._2;
        }
        return new StockDO(symbol, instrument, getPrice(), dayMin, dayMax, day5Min, day5Max, orders,
                getDayPercentage(), estMin, estMax);
    }

    private Tuple2<BigDecimal, BigDecimal> getMinMaxLast5Mins() {
        if (quotes == null || quotes.isEmpty()) {
            return null;
        }
        LinkedList<Quote> _quotes = new LinkedList<>(quotes);
        BigDecimal min = BigDecimal.valueOf(Double.MAX_VALUE);
        BigDecimal max = BigDecimal.valueOf(Double.MIN_VALUE);
        Quote lastQuote = _quotes.pollLast();
        Quote q = lastQuote;
        while (q != null && q.getUpdatedAt() != null && q.getFrom().until(lastQuote.getTo(), ChronoUnit.SECONDS) < 301) {
            min = min.compareTo(q.getPrice()) > 0 ? q.getPrice() : min;
            max = max.compareTo(q.getPrice()) < 0 ? q.getPrice() : max;
            q = _quotes.pollLast();
        }
        return new Tuple2<>(min, max);
    }

    // returns true if the last n quotes are going down
    public boolean lastQuotesDown(int n) {
        if (quotes == null || quotes.size() < n) {
            return false;
        }
        return false;
    }
}
