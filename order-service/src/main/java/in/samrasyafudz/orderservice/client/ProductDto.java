package in.samrasyafudz.orderservice.client;

import java.math.BigDecimal;
import java.util.List;

public class ProductDto {
    private Long id;
    private String name;
    private List<VariantDto> variants;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<VariantDto> getVariants() {
        return variants;
    }

    public void setVariants(List<VariantDto> variants) {
        this.variants = variants;
    }

    public static class VariantDto {
        private Long id;
        private Integer weightGrams;
        private BigDecimal price;
        private Integer stockQuantity;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Integer getWeightGrams() {
            return weightGrams;
        }

        public void setWeightGrams(Integer weightGrams) {
            this.weightGrams = weightGrams;
        }

        public BigDecimal getPrice() {
            return price;
        }

        public void setPrice(BigDecimal price) {
            this.price = price;
        }

        public Integer getStockQuantity() {
            return stockQuantity;
        }

        public void setStockQuantity(Integer stockQuantity) {
            this.stockQuantity = stockQuantity;
        }
    }
}