package home.model;

import java.math.BigDecimal;

public class BuySellOrder {
    private String id;
    private String account;
    private String instrument;
    private String symbol;
    private final String type = "limit";
    private final String time_in_force = "gfd";
    private final String trigger = "immediate";
    private BigDecimal price;
    private int quantity;
    private String side;               // buy or sell
    /*
     * true means this is a buy order, as soon as this buy order is filled, auto-create a sell order with the new price
     * which is the old price + resellDelta.
     */
    private boolean resell;
    private BigDecimal resellDelta;

    public BuySellOrder() {
    }

    public BuySellOrder(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public BuySellOrder setId(String id) {
        this.id = id;
        return this;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getInstrument() {
        return instrument;
    }

    public void setInstrument(String instrument) {
        this.instrument = instrument;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getType() {
        return type;
    }

    public String getTime_in_force() {
        return time_in_force;
    }

    public String getTrigger() {
        return trigger;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BuySellOrder setPrice(BigDecimal price) {
        this.price = price;
        return this;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getSide() {
        return side;
    }

    public BuySellOrder setSide(String side) {
        this.side = side;
        return this;
    }

    public boolean isResell() {
        return resell;
    }

    public void setResell(boolean resell) {
        this.resell = resell;
    }

    public BigDecimal getResellDelta() {
        return resellDelta;
    }

    public void setResellDelta(BigDecimal resellDelta) {
        this.resellDelta = resellDelta;
    }

    @Override
    public String toString() {
        return "BuySellOrder {" +
                "id='" + id + '\'' +
                ", account='" + account + '\'' +
                ", instrument='" + instrument + '\'' +
                ", symbol='" + symbol + '\'' +
                ", type='" + type + '\'' +
                ", time_in_force='" + time_in_force + '\'' +
                ", trigger='" + trigger + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", side='" + side + '\'' +
                ", resell=" + resell +
                ", resellDelta=" + resellDelta +
                '}';
    }
}
