package in.samrasyafudz.productservice.dto;

import java.math.BigDecimal;

public class ProductVariantResponse {

    private Long id;
    private Integer weightGrams;
    private BigDecimal price;
    private Integer stockQuantity;

    public ProductVariantResponse(Long id, Integer weightGrams, BigDecimal price, Integer stockQuantity) {
        this.id = id;
        this.weightGrams = weightGrams;
        this.price = price;
        this.stockQuantity = stockQuantity;
    }

    public Long getId() {
        return id;
    }

    public Integer getWeightGrams() {
        return weightGrams;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }
}