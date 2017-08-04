package home.model;

import java.math.BigDecimal;

public class Position {
    private String symbol;
    private int heldForSells;
    private int quantity;
    private BigDecimal averageBuyPrice;

    public Position() {
    }

    public Position(int heldForSells, int quantity, BigDecimal averageBuyPrice) {
        this.heldForSells = heldForSells;
        this.quantity = quantity;
        this.averageBuyPrice = averageBuyPrice;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public int getHeldForSells() {
        return heldForSells;
    }

    public void setHeldForSells(int heldForSells) {
        this.heldForSells = heldForSells;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getAverageBuyPrice() {
        return averageBuyPrice;
    }

    public void setAverageBuyPrice(BigDecimal averageBuyPrice) {
        this.averageBuyPrice = averageBuyPrice;
    }
}
