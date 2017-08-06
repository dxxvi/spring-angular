package home.model;

public class BuySellOrder {
    private String account;
    private String instrument;
    private String symbol;
    private final String type = "limit";
    private final String time_in_force = "gfd";
    private final String trigger = "immediate";
    private float price;
    private int quantity;
    private String side;               // buy or sell

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

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
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

    public void setSide(String side) {
        this.side = side;
    }
}
