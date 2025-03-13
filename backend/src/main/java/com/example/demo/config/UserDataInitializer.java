package com.example.demo.config;

import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public UserDataInitializer(UserRepository userRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        // เช็คว่ามีข้อมูลผู้ใช้อยู่แล้วหรือไม่
        if (userRepository.count() == 0) {
            User user1 = new User();
            user1.setName("John Doe");
            user1.setEmail("johndoe@example.com");

            User user2 = new User();
            user2.setName("Jane Smith");
            user2.setEmail("janesmith@example.com");

            userRepository.save(user1);
            userRepository.save(user2);

            System.out.println("✅ ข้อมูลผู้ใช้เริ่มต้นถูกเพิ่มลงในฐานข้อมูลเรียบร้อยแล้ว!");
        } else {
            System.out.println("ℹ️ มีข้อมูลผู้ใช้อยู่แล้ว ไม่ต้องเพิ่มใหม่");
        }

        // เช็คว่ามีข้อมูลสินค้าหรือไม่
        if (productRepository.count() == 0) {
            Product product1 = new Product();
            product1.setName("Milk");
            product1.setPrice(40.0);
            product1.setQuantity(100);
            product1.setCategory("Dairy");
            product1.setDescription("Fresh cow's milk");

            Product product2 = new Product();
            product2.setName("Bread");
            product2.setPrice(25.0);
            product2.setQuantity(50);
            product2.setCategory("Bakery");
            product2.setDescription("Whole wheat bread");

            Product product3 = new Product();
            product3.setName("Cheese");
            product3.setPrice(120.0);
            product3.setQuantity(30);
            product3.setCategory("Dairy");
            product3.setDescription("Aged cheddar cheese");

            Product product4 = new Product();
            product4.setName("Butter");
            product4.setPrice(60.0);
            product4.setQuantity(80);
            product4.setCategory("Dairy");
            product4.setDescription("Salted butter");

            Product product5 = new Product();
            product5.setName("Eggs");
            product5.setPrice(45.0);
            product5.setQuantity(200);
            product5.setCategory("Poultry");
            product5.setDescription("Free range eggs");

            Product product6 = new Product();
            product6.setName("Apple");
            product6.setPrice(15.0);
            product6.setQuantity(150);
            product6.setCategory("Fruits");
            product6.setDescription("Fresh red apples");

            Product product7 = new Product();
            product7.setName("Carrot");
            product7.setPrice(30.0);
            product7.setQuantity(100);
            product7.setCategory("Vegetables");
            product7.setDescription("Fresh carrots");

            Product product8 = new Product();
            product8.setName("Chicken Breast");
            product8.setPrice(150.0);
            product8.setQuantity(40);
            product8.setCategory("Meat");
            product8.setDescription("Boneless skinless chicken breasts");

            Product product9 = new Product();
            product9.setName("Rice");
            product9.setPrice(80.0);
            product9.setQuantity(60);
            product9.setCategory("Grains");
            product9.setDescription("Premium jasmine rice");

            Product product10 = new Product();
            product10.setName("Orange Juice");
            product10.setPrice(50.0);
            product10.setQuantity(100);
            product10.setCategory("Beverages");
            product10.setDescription("Freshly squeezed orange juice");

            // บันทึกข้อมูลสินค้า
            productRepository.save(product1);
            productRepository.save(product2);
            productRepository.save(product3);
            productRepository.save(product4);
            productRepository.save(product5);
            productRepository.save(product6);
            productRepository.save(product7);
            productRepository.save(product8);
            productRepository.save(product9);
            productRepository.save(product10);

            System.out.println("✅ ข้อมูลสินค้าถูกเพิ่มลงในฐานข้อมูลเรียบร้อยแล้ว!");
        } else {
            System.out.println("ℹ️ มีข้อมูลสินค้าหรืออยู่แล้ว ไม่ต้องเพิ่มใหม่");
        }
    }
}
