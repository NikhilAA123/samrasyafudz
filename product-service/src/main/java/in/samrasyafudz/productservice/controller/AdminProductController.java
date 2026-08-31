package in.samrasyafudz.productservice.controller;

import in.samrasyafudz.productservice.service.ImageStorageService;
import in.samrasyafudz.productservice.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    private final ImageStorageService imageStorageService;
    private final ProductService productService;

    public AdminProductController(ImageStorageService imageStorageService, ProductService productService) {
        this.imageStorageService = imageStorageService;
        this.productService = productService;
    }

    @PostMapping("/{productId}/image")
    public ResponseEntity<Map<String, String>> uploadImage(
            @PathVariable Long productId,
            @RequestParam("file") MultipartFile file) throws IOException {

        String imageUrl = imageStorageService.uploadProductImage(productId, file);

        productService.updateImageUrl(productId, imageUrl);

        return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    }
}
