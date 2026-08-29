package in.samrasyafudz.orderservice.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    private Long id;
    private Long addressId;
    private String status;
    private BigDecimal totalAmount;
    private List<OrderItemResponse> items;
    private LocalDateTime createdAt;

    public OrderResponse(Long id, Long addressId, String status, BigDecimal totalAmount,
                         List<OrderItemResponse> items, LocalDateTime createdAt) {
        this.id = id;
        this.addressId = addressId;
        this.status = status;
        this.totalAmount = totalAmount;
        this.items = items;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getAddressId() {
        return addressId;
    }

    public String getStatus() {
        return status;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public List<OrderItemResponse> getItems() {
        return items;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}