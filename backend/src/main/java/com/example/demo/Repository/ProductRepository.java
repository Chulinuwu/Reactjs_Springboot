package com.example.demo.Repository;

import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // เพิ่มฟังก์ชันค้นหาสินค้าจาก name
    Optional<Product> findByName(String name);
}
