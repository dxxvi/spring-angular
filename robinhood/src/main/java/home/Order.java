package home;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.time.LocalDateTime;

public class Order implements Serializable {
    private String id;
    private int quantity;
    private float price;
    private String instrument;         // I think this is mapped 1:1 to the symbol
    private String state;              // filled, cancelled
    private String side;               // sell, buy
    @JsonProperty(value = "created_at") private LocalDateTime createdAt;
    @JsonProperty(value = "updated_at") private LocalDateTime updatedAt;
}
