package home;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Quote implements Serializable {
    @JsonProperty(value = "symbol") private String symbol;
    @JsonProperty(value = "last_trade_price") private float price;
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

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
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
}
