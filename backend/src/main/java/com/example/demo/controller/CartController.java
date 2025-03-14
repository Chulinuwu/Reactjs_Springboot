package com.example.demo.controller;

import com.example.demo.model.CartItem;
import com.example.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public List<CartItem> getCartByUser(@PathVariable Long userId) {
        return cartService.getCartItems(userId);
    }

    @PostMapping
    public CartItem addToCart(@PathVariable Long userId ,@RequestBody CartItem cartItem, int quantity) {
        return cartService.addToCart(userId, cartItem.getId(), quantity);
    }

    @DeleteMapping("/{cartItemId}")
    public void removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
    }

    @DeleteMapping("/clear/{userId}")
    public void clearCart(@PathVariable Long userId) {
        cartService.removeFromCart(userId);
    }
}
