package in.samrasyafudz.orderservice.dto;

import java.math.BigDecimal;

public class OrderItemResponse {
    private Long productId;
    private Long variantId;
    private String productName;
    private Integer weightGrams;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal subtotal;

    public OrderItemResponse(Long productId, Long variantId, String productName,
                             Integer weightGrams, BigDecimal unitPrice, Integer quantity, BigDecimal subtotal) {
        this.productId = productId;
        this.variantId = variantId;
        this.productName = productName;
        this.weightGrams = weightGrams;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }

    public Long getProductId() {
        return productId;
    }

    public Long getVariantId() {
        return variantId;
    }

    public String getProductName() {
        return productName;
    }

    public Integer getWeightGrams() {
        return weightGrams;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }
}