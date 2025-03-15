package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ ADMIN เท่านั้นที่ดู Users ได้
    public List<User> getAllUsers() {
        if (!isAdmin()) {
            throw new SecurityException("❌ Unauthorized: Only ADMIN can view all users!");
        }
        return userRepository.findAll();
    }

    public User createUser(User user) {
        // ✅ เช็คว่า email มีอยู่ในระบบแล้วหรือยัง
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("❌ Email is already taken!"); // ❌ ป้องกัน email ซ้ำ
        }

        // ✅ เข้ารหัสรหัสผ่านก่อนบันทึก
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Long id) {
        if (!isAdmin()) {
            throw new SecurityException("❌ Unauthorized: Only ADMIN can delete users!");
        }
        userRepository.deleteById(id);
    }

    // ✅ เช็คว่า user ปัจจุบันเป็น ADMIN หรือไม่
    private boolean isAdmin() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails userDetails) {
            return userRepository.findByEmail(userDetails.getUsername())
                    .map(user -> "ADMIN".equalsIgnoreCase(user.getRole()))
                    .orElse(false);
        }
        return false;
    }

    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
