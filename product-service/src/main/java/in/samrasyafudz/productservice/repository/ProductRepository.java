package in.samrasyafudz.productservice.repository;

import in.samrasyafudz.productservice.model.Product;
import in.samrasyafudz.productservice.model.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

    List<Product> findByCategoryId(Long categoryId);

}