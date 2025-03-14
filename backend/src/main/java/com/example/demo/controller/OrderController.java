package com.example.demo.controller;

import com.example.demo.model.Order;
import com.example.demo.model.OrderItem;
import com.example.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Optional<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @PostMapping
    public Order createOrder(@PathVariable Long id, @RequestBody List<OrderItem> orderItems) {
        return orderService.createOrder(id, orderItems);
    }

    @PutMapping("/{id}/status")
    public Order updateOrderStatus(@PathVariable Long id, @RequestParam String status) {

        if (!isValidStatus(status)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status value");
        }
        return orderService.updateOrderStatus(id, status);
    }

    private boolean isValidStatus(String status) {
        return status.equalsIgnoreCase("PREPARING") ||
            status.equalsIgnoreCase("SHIPPING") ||
            status.equalsIgnoreCase("DELIVERED");
    }
}
