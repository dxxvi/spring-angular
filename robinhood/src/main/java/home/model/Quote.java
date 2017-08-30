package home.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import home.RobinhoodDateTimeDeserializer;
import home.RobinhoodTimeDeserializer;
import home.RobinhoodTimeSerializer;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import static java.time.format.DateTimeFormatter.*;

public class Quote {
    @JsonProperty(value = "symbol") private String symbol;
    @JsonProperty(value = "last_trade_price") private BigDecimal price;

    @JsonProperty(value = "updated_at")
    @JsonDeserialize(using = RobinhoodDateTimeDeserializer.class)
    private LocalDateTime updatedAt;
    private String instrument;         // I think this instrument url is mapped 1:1 to the symbol

    @JsonDeserialize(using = RobinhoodTimeDeserializer.class)
    @JsonSerialize(using = RobinhoodTimeSerializer.class)
    private LocalTime from;

    @JsonDeserialize(using = RobinhoodTimeDeserializer.class)
    @JsonSerialize(using = RobinhoodTimeSerializer.class)
    private LocalTime to;

    public Quote() {
    }

    public Quote(String symbol, BigDecimal price, String instrument, LocalTime from, LocalTime to) {
        this.symbol = symbol;
        this.price = price;
        this.instrument = instrument;
        this.from = from;
        this.to = to;
    }

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
                symbol, price,
                updatedAt == null ? null : updatedAt.format(ISO_LOCAL_DATE_TIME),
                from == null ? null : from.format(ISO_LOCAL_TIME),
                to == null ? null : to.format(ISO_LOCAL_TIME));
    }

    public Quote clone() {
        Quote q = new Quote(symbol, price, instrument, from, to);
        q.setUpdatedAt(updatedAt);
        return q;
    }
}

