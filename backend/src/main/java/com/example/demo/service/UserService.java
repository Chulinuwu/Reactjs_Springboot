package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // เรียกใช้ BCrypt

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        // เข้ารหัสรหัสผ่านก่อนบันทึก
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // บันทึกข้อมูลลง DB
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
