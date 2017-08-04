package home.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class RobinhoodPositionResult {
    private String instrument;
    @JsonProperty("shares_held_for_sells") private BigDecimal heldForSells;
    private BigDecimal quantity;
    @JsonProperty("average_buy_price") private BigDecimal averageBuyPrice;

    public String getInstrument() {
        return instrument;
    }

    public void setInstrument(String instrument) {
        this.instrument = instrument;
    }

    public BigDecimal getHeldForSells() {
        return heldForSells;
    }

    public void setHeldForSells(BigDecimal heldForSells) {
        this.heldForSells = heldForSells;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getAverageBuyPrice() {
        return averageBuyPrice;
    }

    public void setAverageBuyPrice(BigDecimal averageBuyPrice) {
        this.averageBuyPrice = averageBuyPrice;
    }

    public Position toPosition() {
        return new Position(heldForSells.intValue(), quantity.intValue(), averageBuyPrice);
    }
}
