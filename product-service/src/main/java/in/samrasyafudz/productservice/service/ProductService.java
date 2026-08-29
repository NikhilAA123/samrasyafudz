package in.samrasyafudz.productservice.service;

import in.samrasyafudz.productservice.dto.ProductResponse;
import in.samrasyafudz.productservice.dto.ProductVariantResponse;
import in.samrasyafudz.productservice.exception.ProductNotFoundException;
import in.samrasyafudz.productservice.model.Product;
import in.samrasyafudz.productservice.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public ProductResponse findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        return toResponse(product);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> findAll(Long categoryId) {
        List<Product> products = (categoryId != null)
                ? productRepository.findByCategoryId(categoryId)
                : productRepository.findAll();

        return products.stream()
                .map(this::toResponse)
                .toList();
    }

    private ProductResponse toResponse(Product product) {
        List<ProductVariantResponse> variants = product.getVariants().stream()
                .map(v -> new ProductVariantResponse(
                        v.getId(),
                        v.getWeightGrams(),
                        v.getPrice(),
                        v.getStockQuantity()
                ))
                .toList();

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImageUrl(),
                product.getCategory().getId(),
                product.getCategory().getName(),
                variants
        );
    }
}