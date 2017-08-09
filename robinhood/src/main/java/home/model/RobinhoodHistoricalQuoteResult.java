package home.model;

import java.util.LinkedList;

public class RobinhoodHistoricalQuoteResult {
    private String symbol;
    private LinkedList<RobinhoodHistoricalQuote> historicals;

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public LinkedList<RobinhoodHistoricalQuote> getHistoricals() {
        return historicals;
    }

    public void setHistoricals(LinkedList<RobinhoodHistoricalQuote> historicals) {
        this.historicals = historicals;
    }
}
