package home.model;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class Stock {
    private String symbol;
    private BigDecimal price;
    private BigDecimal dayMin;
    private BigDecimal dayMax;
    private BigDecimal day5Min;
    private BigDecimal day5Max;
    private LinkedList<Quote> quotes;
    private List<Order> orders;

    public Stock(String symbol) {
        this.symbol = symbol;
    }

    public String getSymbol() {
        return symbol;
    }

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Stock stock = (Stock) o;

        return symbol.equals(stock.symbol);
    }

    @Override public int hashCode() {
        return symbol.hashCode();
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
            quotes.add(q);
        }

        Tuple2<BigDecimal, BigDecimal> minMax = quotes.stream().reduce(
                new Tuple2<>(BigDecimal.valueOf(999), BigDecimal.valueOf(-1)),
                (t, qu) -> new Tuple2<>(t._1().min(q.getPrice()), t._2().max(qu.getPrice())),
                (t1, t2) -> new Tuple2<>(t1._1().min(t2._1()), t1._2().max(t2._2()))
        );
        dayMin = minMax._1;
        dayMax = minMax._2;
    }

    public BigDecimal getDayMin() {
        return dayMin;
    }

    public BigDecimal getDayMax() {
        return dayMax;
    }

    public BigDecimal getDay5Min() {
        return day5Min;
    }

    public BigDecimal getDay5Max() {
        return day5Max;
    }
}
