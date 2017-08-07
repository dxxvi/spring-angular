package home.model;

import java.util.List;

public class RobinhoodHistoricalQuoteResult {
    private String symbol;
    private List<RobinhoodHistoricalQuote> historicals;

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public List<RobinhoodHistoricalQuote> getHistoricals() {
        return historicals;
    }

    public void setHistoricals(List<RobinhoodHistoricalQuote> historicals) {
        this.historicals = historicals;
    }
}
