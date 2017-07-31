package home.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import static java.time.format.DateTimeFormatter.*;

public class Quote {
    @JsonProperty(value = "symbol") private String symbol;
    @JsonProperty(value = "last_trade_price") private BigDecimal price;
    @JsonProperty(value = "updated_at") private LocalDateTime updatedAt;
    private String instrument;         // I think this instrument url is mapped 1:1 to the symbol

    @JsonIgnore private LocalTime from;
    @JsonIgnore private LocalTime to;

    public LocalTime getTo() {
        return to;
    }

    public Quote setTo(LocalTime to) {
        this.to = to;
        return this;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getInstrument() {
        return instrument;
    }

    public void setInstrument(String instrument) {
        this.instrument = instrument;
    }

    public LocalTime getFrom() {
        return from;
    }

    public Quote setFrom(LocalTime from) {
        this.from = from;
        return this;
    }

    @Override public String toString() {
        return String.format("{\"symbol\":\"%s\",\"price\":%-6.2f,\"updatedAt\":\"%s\",\"from\":\"%s\",\"to\":\"%s\"}",
                symbol, price, updatedAt.format(ISO_LOCAL_DATE_TIME),
                from.format(ISO_LOCAL_TIME), to.format(ISO_LOCAL_TIME));
    }

    public QuoteDO minified() {
        return new QuoteDO(symbol, price, from.withSecond(0), to.withSecond(0));
    }
}

