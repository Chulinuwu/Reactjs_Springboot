package com.example.demo.service;

import com.example.demo.model.CartItem;
import com.example.demo.model.User;
import com.example.demo.model.Product;
import com.example.demo.Repository.CartRepository;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CartItem> getCartItems(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public CartItem addToCart(Long userId, Long productId, int quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = new CartItem();
        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartRepository.save(cartItem);
    }

    public void removeFromCart(Long cartItemId) {
        cartRepository.deleteById(cartItemId);
    }
}
