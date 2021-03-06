package home.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import home.RobinhoodDateTimeSerializer;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class Order implements Serializable {
    private final static LocalDateTime LDT = LocalDateTime.now().plusDays(1);

    private String id;
    private int quantity;
    private BigDecimal price;
    private String symbol;
    private String state;              // filled, confirmed, failed
    private String side;               // sell, buy

    @JsonSerialize(using = RobinhoodDateTimeSerializer.ForOrder.class)
    private LocalDateTime createdAt;

    private long createdAtTimestamp;

    @JsonSerialize(using = RobinhoodDateTimeSerializer.ForOrder.class)
    private LocalDateTime updatedAt;

    public Order() {}                  // needed for deserialization
    public Order(String id, int quantity, BigDecimal price, String state, String side, LocalDateTime createdAt,
                 LocalDateTime updatedAt) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.state = state;
        this.side = side;
        this.createdAt = createdAt;
        this.createdAtTimestamp = createdAt.until(LDT, ChronoUnit.MILLIS);
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getSymbol() {
        return symbol;
    }

    public Order setSymbol(String symbol) {
        this.symbol = symbol;
        return this;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getSide() {
        return side;
    }

    public void setSide(String side) {
        this.side = side;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public long getCreatedAtTimestamp() {
        return createdAtTimestamp;
    }
}
