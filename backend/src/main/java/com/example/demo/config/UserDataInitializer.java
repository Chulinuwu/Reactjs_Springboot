package com.example.demo.config;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public UserDataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        // เช็คว่ามีข้อมูลอยู่แล้วหรือไม่
        if (userRepository.count() == 0) {
            // เพิ่มข้อมูลตัวอย่าง
            User user1 = new User();
            user1.setName("John Doe");
            user1.setEmail("johndoe@example.com");

            User user2 = new User();
            user2.setName("Jane Smith");
            user2.setEmail("janesmith@example.com");

            // บันทึกลงฐานข้อมูล
            userRepository.save(user1);
            userRepository.save(user2);

            System.out.println("✅ ข้อมูลเริ่มต้นถูกเพิ่มลงในฐานข้อมูลเรียบร้อยแล้ว!");
        } else {
            System.out.println("ℹ️ มีข้อมูลอยู่แล้ว ไม่ต้องเพิ่มใหม่");
        }
    }
}
