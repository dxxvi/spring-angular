package home.model;

import java.math.BigDecimal;
import java.time.LocalTime;

public class QuoteDO {
    private String symbol;
    private BigDecimal price;
    private LocalTime from;
    private LocalTime to;

    public QuoteDO(String symbol, BigDecimal price, LocalTime from, LocalTime to) {
        this.symbol = symbol;
        this.price = price;
        this.from = from;
        this.to = to;
    }

    public String getSymbol() {
        return symbol;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public LocalTime getFrom() {
        return from;
    }

    public LocalTime getTo() {
        return to;
    }
}
