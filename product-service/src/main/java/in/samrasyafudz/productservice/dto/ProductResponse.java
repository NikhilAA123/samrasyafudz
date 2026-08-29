package in.samrasyafudz.productservice.dto;

import java.util.List;

public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private Long categoryId;
    private String categoryName;
    private List<ProductVariantResponse> variants;

    public ProductResponse(Long id, String name, String description, String imageUrl,
                           Long categoryId, String categoryName, List<ProductVariantResponse> variants) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.variants = variants;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public Long getCategoryId() { return categoryId; }
    public String getCategoryName() { return categoryName; }
    public List<ProductVariantResponse> getVariants() { return variants; }
}