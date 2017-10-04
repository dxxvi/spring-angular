package home.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import home.RobinhoodDateTimeDeserializer;
import home.RobinhoodDateTimeSerializer;
import home.RobinhoodTimeDeserializer;
import home.RobinhoodTimeSerializer;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Random;

import static java.time.format.DateTimeFormatter.*;

public class Quote {
    @JsonProperty(value = "symbol") private String symbol;
    @JsonProperty(value = "last_trade_price") private BigDecimal price;

    @JsonProperty(value = "updated_at")
    @JsonDeserialize(using = RobinhoodDateTimeDeserializer.ForQuote.class)
    @JsonSerialize(using = RobinhoodDateTimeSerializer.ForQuote.class)
    private LocalDateTime updatedAt;
    private String instrument;         // I think this instrument url is mapped 1:1 to the symbol

    public Quote() {
    }

    public Quote(String symbol, BigDecimal price, LocalDateTime updatedAt, String instrument) {
        this.symbol = symbol;
        this.price = price;
        this.updatedAt = updatedAt;
        this.instrument = instrument;
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

    @Override public String toString() {
        return String.format("{\"symbol\":\"%s\",\"price\":%-6.2f,\"updatedAt\":\"%s\"}",
                symbol, price,
                updatedAt == null ? null : updatedAt.format(ISO_LOCAL_DATE_TIME));
    }

    public Quote clone() {
        return new Quote(symbol, price, updatedAt, instrument);
    }
}

