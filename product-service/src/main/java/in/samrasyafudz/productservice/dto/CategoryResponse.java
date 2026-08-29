package in.samrasyafudz.productservice.dto;

public class CategoryResponse {

    private Long id;
    private String name;
    private String slug;
    private String description;
    private Boolean active;

    public CategoryResponse() {
    }

    public CategoryResponse(Long id, String name, String slug, String description, Boolean active) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.active = active;
    }

    public CategoryResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}