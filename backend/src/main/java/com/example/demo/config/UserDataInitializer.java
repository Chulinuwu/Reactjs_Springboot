package com.example.demo.config;

import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder; // ใช้เข้ารหัสรหัสผ่าน

    public UserDataInitializer(UserRepository userRepository, ProductRepository productRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // 📌 1️⃣ เช็คว่ามี User อยู่แล้วหรือไม่ ถ้ามีให้ UPDATE ถ้าไม่มีให้ CREATE
        createOrUpdateUser("John Doe", "johndoe@example.com", "123456", "admin");
        createOrUpdateUser("Jane Smith", "janesmith@example.com", "654321", "customer");

        // 📌 2️⃣ เช็คและเพิ่มสินค้าถ้ายังไม่มี
        createOrUpdateProduct("Milk", 40.0, 100, "Dairy", "Fresh cow's milk");
        createOrUpdateProduct("Bread", 25.0, 50, "Bakery", "Whole wheat bread");
        createOrUpdateProduct("Cheese", 120.0, 30, "Dairy", "Aged cheddar cheese");
        createOrUpdateProduct("Butter", 60.0, 80, "Dairy", "Salted butter");
        createOrUpdateProduct("Eggs", 45.0, 200, "Poultry", "Free range eggs");
        createOrUpdateProduct("Apple", 15.0, 150, "Fruits", "Fresh red apples");
        createOrUpdateProduct("Carrot", 30.0, 100, "Vegetables", "Fresh carrots");
        createOrUpdateProduct("Chicken Breast", 150.0, 40, "Meat", "Boneless skinless chicken breasts");
        createOrUpdateProduct("Rice", 80.0, 60, "Grains", "Premium jasmine rice");
        createOrUpdateProduct("Orange Juice", 50.0, 100, "Beverages", "Freshly squeezed orange juice");
    }

    // 📌 3️⃣ ฟังก์ชันช่วยสร้างหรืออัปเดต User
    private void createOrUpdateUser(String name, String email, String password, String role) {
        Optional<User> existingUser = userRepository.findByEmail(email); // ค้นหา User จาก email

        if (existingUser.isPresent()) {
            // ถ้า User มีอยู่แล้ว → อัปเดตข้อมูล
            User user = existingUser.get();
            user.setName(name);
            user.setRole(role);

            // 📌 เข้ารหัสรหัสผ่านก่อนอัปเดต
            if (!passwordEncoder.matches(password, user.getPassword())) {
                user.setPassword(passwordEncoder.encode(password));
            }

            userRepository.save(user);
            System.out.println("🔄 อัปเดตข้อมูลผู้ใช้: " + email);
        } else {
            // ถ้าไม่มี → สร้างใหม่
            User newUser = new User();
            newUser.setName(name);
            newUser.setEmail(email);
            newUser.setPassword(passwordEncoder.encode(password)); // เข้ารหัสรหัสผ่าน
            newUser.setRole(role);
            newUser.setBalance(10000);

            userRepository.save(newUser);
            System.out.println("✅ เพิ่มผู้ใช้ใหม่: " + email);
        }
    }

    // 📌 4️⃣ ฟังก์ชันช่วยสร้างหรืออัปเดต Product
    private void createOrUpdateProduct(String name, double price, int quantity, String category, String description) {
        Optional<Product> existingProduct = productRepository.findByName(name); // ค้นหาสินค้าตามชื่อ

        if (existingProduct.isPresent()) {
            // ถ้ามีอยู่แล้ว → อัปเดตข้อมูลสินค้า
            Product product = existingProduct.get();
            product.setPrice(price);
            product.setQuantity(quantity);
            product.setCategory(category);
            product.setDescription(description);

            productRepository.save(product);
            System.out.println("🔄 อัปเดตสินค้า: " + name);
        } else {
            // ถ้าไม่มี → เพิ่มใหม่
            Product newProduct = new Product();
            newProduct.setName(name);
            newProduct.setPrice(price);
            newProduct.setQuantity(quantity);
            newProduct.setCategory(category);
            newProduct.setDescription(description);

            productRepository.save(newProduct);
            System.out.println("✅ เพิ่มสินค้าใหม่: " + name);
        }
    }
}
