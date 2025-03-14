package com.example.demo.Repository;

import com.example.demo.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserId(Long userId);
}
