package in.samrasyafudz.productservice.service;

import in.samrasyafudz.productservice.dto.CategoryResponse;
import in.samrasyafudz.productservice.exception.CategoryNotFoundException;
import in.samrasyafudz.productservice.model.Category;
import in.samrasyafudz.productservice.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryResponse findById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        return new CategoryResponse(
                category.getId(),
                category.getName()
        );
    }

    public List<CategoryResponse> findAll() {
        return categoryRepository.findAll().stream()
                .map(cat -> new CategoryResponse(cat.getId(), cat.getName()))
                .collect(java.util.stream.Collectors.toList());
    }

    public void updateImageUrl(Long categoryId, String imageUrl) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));

        category.setImageUrl(imageUrl);
        categoryRepository.save(category);
    }
}