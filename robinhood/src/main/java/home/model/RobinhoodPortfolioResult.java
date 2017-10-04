package home.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RobinhoodPortfolioResult {
    private BigDecimal equity;
    @JsonProperty("extended_hours_equity") private BigDecimal extendedHoursEquity;

    public BigDecimal getEquity() {
        return equity;
    }

    public void setEquity(BigDecimal equity) {
        this.equity = equity;
    }

    public BigDecimal getExtendedHoursEquity() {
        return extendedHoursEquity;
    }

    public void setExtendedHoursEquity(BigDecimal extendedHoursEquity) {
        this.extendedHoursEquity = extendedHoursEquity;
    }
}
