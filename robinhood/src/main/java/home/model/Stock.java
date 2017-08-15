package home.model;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.LinkedList;

public class Stock extends StockDO {
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
        return new StockDO(symbol, instrument, getPrice(), dayMin, dayMax, day5Min, day5Max, orders,
                getDayPercentage());
    }

    // returns true if
    public boolean lastQuotesDown(int n) {
        if (quotes == null || quotes.size() < n) {
            return false;
        }

    }
}
