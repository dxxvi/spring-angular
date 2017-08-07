package home.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class RobinhoodHistoricalQuote {
    @JsonProperty("high_price") private BigDecimal highPrice;
    @JsonProperty("low_price") private BigDecimal lowPrice;

    public BigDecimal getHighPrice() {
        return highPrice;
    }

    public void setHighPrice(BigDecimal highPrice) {
        this.highPrice = highPrice;
    }

    public BigDecimal getLowPrice() {
        return lowPrice;
    }

    public void setLowPrice(BigDecimal lowPrice) {
        this.lowPrice = lowPrice;
    }
}
