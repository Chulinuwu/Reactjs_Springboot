package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductController(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    static class PurchaseRequest {
        public Long productId;
        public int quantity;
    }
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/buy")
    public String buyProduct(@RequestBody PurchaseRequest request) {
        System.out.println("🔹 Buying product: " + request.productId + ", quantity: " + request.quantity);
        // ✅ ดึงข้อมูล User ปัจจุบันจาก JWT Token
        String email = getCurrentUserEmail();
        Optional<User> userOpt = userRepository.findByEmail(email);
        Optional<Product> productOpt = productRepository.findById(request.productId);

        if (userOpt.isEmpty()) return "❌ User not found!";
        if (productOpt.isEmpty()) return "❌ Product not found!";

        User user = userOpt.get();
        Product product = productOpt.get();

        double totalPrice = product.getPrice() * request.quantity;

        // ✅ เช็คว่า User มีเงินพอไหม
        if (user.getBalance() < totalPrice) return "❌ Not enough balance!";

        // ✅ เช็คว่าสินค้าในสต็อกพอไหม
        if (product.getQuantity() < request.quantity) return "❌ Not enough stock!";

        // ✅ อัปเดตข้อมูล
        user.setBalance(user.getBalance() - totalPrice);
        product.setQuantity(product.getQuantity() - request.quantity);

        userRepository.save(user);
        productRepository.save(product);

        return "✅ Purchase successful! New balance: " + user.getBalance();
    }

    private String getCurrentUserEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
