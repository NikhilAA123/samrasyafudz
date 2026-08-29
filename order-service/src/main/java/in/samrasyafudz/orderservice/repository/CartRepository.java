package in.samrasyafudz.orderservice.repository;

import in.samrasyafudz.orderservice.entity.CartItem;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository {
    public List<CartItem> findByUserId(String userId);
}
