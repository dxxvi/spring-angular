package home.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import home.RobinhoodDateTimeSerializer;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Order implements Serializable {
    private String id;
    private int quantity;
    private BigDecimal price;
    private String symbol;
    private String state;              // filled, confirmed
    private String side;               // sell, buy
    @JsonSerialize(using = RobinhoodDateTimeSerializer.class) private LocalDateTime createdAt;

    public Order() {
    }

    public Order(String id, int quantity, BigDecimal price, String state, String side, LocalDateTime createdAt) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.state = state;
        this.side = side;
        this.createdAt = createdAt;
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
}
