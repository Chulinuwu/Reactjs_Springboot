package com.example.demo.service;

import com.example.demo.model.Order;
import com.example.demo.model.OrderItem;
import com.example.demo.model.User;
import com.example.demo.Repository.OrderRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Long userId, List<OrderItem> items) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PREPARING");

        for (OrderItem item : items) {
            item.setOrder(order);
        }

        order.setItems(items);
        return orderRepository.save(order);
    }

    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        // ตรวจสอบค่าของ status
        if (!isValidStatus(status)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status value");
        }

        order.setStatus(status);
        return orderRepository.save(order);
    }

    private boolean isValidStatus(String status) {
        return status.equalsIgnoreCase("PREPARING") ||
            status.equalsIgnoreCase("SHIPPING") ||
            status.equalsIgnoreCase("DELIVERED");
    }
    
    
}
