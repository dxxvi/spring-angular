package home;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class SymbolData implements Comparable<SymbolData>, Serializable {
    private transient DateTimeFormatter dtfRead  = DateTimeFormatter.ofPattern("M/d/yyyy");
    private transient DateTimeFormatter dtfWrite = DateTimeFormatter.ofPattern("yyyy/MM/dd");
    private String symbol;
    private String last_trade_date;
    private String low;
    private String high;

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getLast_trade_date() {
        return last_trade_date;
    }

    public void setLast_trade_date(String last_trade_date) {
        if (last_trade_date != null) {
            try {
                LocalDate ld = LocalDate.parse(last_trade_date, dtfRead);
                this.last_trade_date = ld.format(dtfWrite);
            }
            catch (DateTimeParseException dtpex) {
                this.last_trade_date = last_trade_date;
            }
        }
    }

    public String getLow() {
        return low;
    }

    public void setLow(String low) {
        this.low = low;
    }

    public String getHigh() {
        return high;
    }

    public void setHigh(String high) {
        this.high = high;
    }

    @Override
    public String toString() {
        return "SymbolData {" +
                "symbol='" + symbol + '\'' +
                ", last_trade_date='" + last_trade_date + '\'' +
                ", low='" + low + '\'' +
                ", high='" + high + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SymbolData that = (SymbolData) o;

        if (!symbol.equals(that.symbol)) return false;
        return last_trade_date.equals(that.last_trade_date);
    }

    @Override
    public int hashCode() {
        int result = symbol.hashCode();
        result = 31 * result + last_trade_date.hashCode();
        return result;
    }

    @Override
    public int compareTo(SymbolData o) {
        if (symbol.equals(o.getSymbol())) {
            return last_trade_date.compareTo(o.getLast_trade_date());
        }
        return symbol.compareTo(o.getSymbol());
    }
}
