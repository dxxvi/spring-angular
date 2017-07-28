package home.web.socket;

import java.math.BigDecimal;
import java.time.LocalTime;

public class QuoteMini {
    private String symbol;
    private BigDecimal price;
    private LocalTime from;
    private LocalTime to;

    public QuoteMini(String symbol, BigDecimal price, LocalTime from, LocalTime to) {
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
