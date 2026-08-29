package in.samrasyafudz.orderservice.client;

import in.samrasyafudz.orderservice.exception.ProductNotAvailableException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

@Component
public class ProductServiceClient {

    private final RestClient restClient;

    public ProductServiceClient(@Value("${product-service.url}") String productServiceUrl) {
        this.restClient = RestClient.builder().baseUrl(productServiceUrl).build();
    }

    public ProductDto getProduct(Long productId) {
        try {
            ProductDto product = restClient.get()
                    .uri("/api/products/{id}", productId)
                    .retrieve()
                    .body(ProductDto.class);
            if (product == null) {
                throw new ProductNotAvailableException(productId);
            }
            return product;
        } catch (RestClientException e) {
            throw new ProductNotAvailableException(productId);
        }
    }

    public ProductDto.VariantDto getVariant(Long productId, Long variantId) {
        ProductDto product = getProduct(productId);
        return product.getVariants().stream()
                .filter(v -> v.getId().equals(variantId))
                .findFirst()
                .orElseThrow(() -> new ProductNotAvailableException(productId));
    }
}