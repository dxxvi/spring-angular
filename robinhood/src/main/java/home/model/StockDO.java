package home.model;

import java.math.BigDecimal;
import java.util.List;

public class StockDO {
    String symbol;
    String instrument;
    BigDecimal price;
    BigDecimal dayMin = new BigDecimal(2000);
    BigDecimal dayMax = new BigDecimal(-1);
    BigDecimal day5Min;
    BigDecimal day5Max;
    List<Order> orders;

    public StockDO(String symbol, String instrument) {
        this.symbol = symbol;
        this.instrument = instrument;
    }

    public StockDO(String symbol, String instrument, BigDecimal price, BigDecimal dayMin, BigDecimal dayMax,
                   BigDecimal day5Min, BigDecimal day5Max, List<Order> orders) {
        this.symbol = symbol;
        this.instrument = instrument;
        this.price = price;
        this.dayMin = dayMin;
        this.dayMax = dayMax;
        this.day5Min = day5Min;
        this.day5Max = day5Max;
        this.orders = orders;
    }

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Stock stock = (Stock) o;

        return symbol.equals(stock.symbol);
    }

    @Override public int hashCode() {
        return symbol.hashCode();
    }

    public String getSymbol() {
        return symbol;
    }

    public String getInstrument() {
        return instrument;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BigDecimal getDayMin() {
        return dayMin;
    }

    public BigDecimal getDayMax() {
        return dayMax;
    }

    public BigDecimal getDay5Min() {
        return day5Min;
    }

    public BigDecimal getDay5Max() {
        return day5Max;
    }

    public List<Order> getOrders() {
        return orders;
    }
}
