package home.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class RobinhoodOrderExecution {
    private LocalDateTime timestamp;
    private BigDecimal price;
    @JsonProperty("settlement_date") private LocalDate settlementDate;
    private String id;
    private BigDecimal quantity;

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public LocalDate getSettlementDate() {
        return settlementDate;
    }

    public void setSettlementDate(LocalDate settlementDate) {
        this.settlementDate = settlementDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }
}
