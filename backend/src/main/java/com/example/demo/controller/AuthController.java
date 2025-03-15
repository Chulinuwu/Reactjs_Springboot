package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.security.JwtUtil;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService; // ✅ เพิ่ม userService

    static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("🔹 Login Attempt: email=" + loginRequest.email + ", password=" + loginRequest.password);

        Optional<User> user = userRepository.findByEmail(loginRequest.email);

        if (user.isEmpty()) {
            System.out.println("❌ User not found");
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        if (!passwordEncoder.matches(loginRequest.password, user.get().getPassword())) {
            System.out.println("❌ Password mismatch");
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        // ✅ สร้าง JWT Token
        String token = jwtUtil.generateToken(user.get().getEmail());
        System.out.println("✅ Login Successful: " + token);

        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User createdUser = userService.createUser(user); // ✅ ใช้ userService ได้แล้ว
            return ResponseEntity.ok(createdUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
