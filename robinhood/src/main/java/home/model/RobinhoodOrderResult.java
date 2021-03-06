package home.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import home.RobinhoodDateTimeDeserializerSSSSSS;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RobinhoodOrderResult {
    @JsonProperty("updated_at")
    @JsonDeserialize(using = RobinhoodDateTimeDeserializerSSSSSS.class)
    private LocalDateTime updatedAt;

    @JsonProperty("time_in_force") private String timeInForce;
    private String cancel;             // this is the cancel url
    private String id;
    @JsonProperty("cumulative_quantity") private BigDecimal cumQuantity;
    private String instrument;         // mapped 1:1 to symbol, this is a GET rest endpoint
    // queued, unconfirmed, confirmed, partially_filled, filled, rejected, cancelled, or failed
    private String state;
    private BigDecimal price;
    private List<RobinhoodOrderExecution> executions;
    private String account;
    private String url;
    @JsonProperty("created_at")
    @JsonDeserialize(using = RobinhoodDateTimeDeserializerSSSSSS.class)
    private LocalDateTime createdAt;
    private String side;               // sell, buy
    private String position;
    @JsonProperty("average_price") private BigDecimal averagePrice;
    private BigDecimal quantity;

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getTimeInForce() {
        return timeInForce;
    }

    public void setTimeInForce(String timeInForce) {
        this.timeInForce = timeInForce;
    }

    public String getCancel() {
        return cancel;
    }

    public void setCancel(String cancel) {
        this.cancel = cancel;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BigDecimal getCumQuantity() {
        return cumQuantity;
    }

    public void setCumQuantity(BigDecimal cumQuantity) {
        this.cumQuantity = cumQuantity;
    }

    public String getInstrument() {
        return instrument;
    }

    public void setInstrument(String instrument) {
        this.instrument = instrument;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public List<RobinhoodOrderExecution> getExecutions() {
        return executions;
    }

    public void setExecutions(List<RobinhoodOrderExecution> executions) {
        this.executions = executions;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getSide() {
        return side;
    }

    public void setSide(String side) {
        this.side = side;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public BigDecimal getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(BigDecimal averagePrice) {
        this.averagePrice = averagePrice;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public Order toOrder() {
        return new Order(id, quantity.intValue(), price, state, side, createdAt, updatedAt);
    }
}
