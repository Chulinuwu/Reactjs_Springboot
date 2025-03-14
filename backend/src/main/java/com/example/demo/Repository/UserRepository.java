package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // เพิ่มฟังก์ชันค้นหาผู้ใช้จาก email
    Optional<User> findByEmail(String email);
}
