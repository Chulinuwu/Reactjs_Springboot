package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
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

    // ✅ ทุกคนสามารถดูสินค้าได้
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // ✅ Admin เท่านั้นที่สามารถเพิ่มสินค้าได้
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // ✅ Admin เท่านั้นที่สามารถแก้ไขสินค้าได้
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setQuantity(productDetails.getQuantity());
        product.setCategory(productDetails.getCategory());
        product.setDescription(productDetails.getDescription());
        return productRepository.save(product);
    }

    // ✅ Admin เท่านั้นที่สามารถลบสินค้าได้
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return "✅ Product deleted!";
    }

    // ✅ User สามารถซื้อสินค้าได้
    static class PurchaseRequest {
        public Long productId;
        public int quantity;
    }

    @PostMapping("/buy")
    @PreAuthorize("hasRole('USER')")
    public String buyProduct(@RequestBody PurchaseRequest request) {
        System.out.println("🔹 Buying product: " + request.productId + ", quantity: " + request.quantity);
        String email = getCurrentUserEmail();
        Optional<User> userOpt = userRepository.findByEmail(email);
        Optional<Product> productOpt = productRepository.findById(request.productId);

        if (userOpt.isEmpty()) return "❌ User not found!";
        if (productOpt.isEmpty()) return "❌ Product not found!";

        User user = userOpt.get();
        Product product = productOpt.get();
        double totalPrice = product.getPrice() * request.quantity;

        if (user.getBalance() < totalPrice) return "❌ Not enough balance!";
        if (product.getQuantity() < request.quantity) return "❌ Not enough stock!";

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
}
