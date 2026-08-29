package in.samrasyafudz.orderservice.dto;

import java.math.BigDecimal;

public class CartItemResponse {
    private Long id;
    private Long productId;
    private Long variantId;
    private String productName;
    private Integer weightGrams;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal subtotal;

    public CartItemResponse(Long id, Long productId, Long variantId, String productName,
                            Integer weightGrams, BigDecimal unitPrice, Integer quantity) {
        this.id = id;
        this.productId = productId;
        this.variantId = variantId;
        this.productName = productName;
        this.weightGrams = weightGrams;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.subtotal = unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    public Long getId() {
        return id;
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