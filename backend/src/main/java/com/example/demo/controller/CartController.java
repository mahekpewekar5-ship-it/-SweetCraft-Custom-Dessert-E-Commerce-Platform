package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartRequest;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // ---------------- GET CART FOR A USER ----------------
    @GetMapping("/{username}")
    public List<Cart> getCart(@PathVariable String username) {

        if (username == null || username.trim().isEmpty()) {
            throw new RuntimeException("Username is missing");
        }

        return cartRepository.findByUser_Username(username);
    }

    // ---------------- ADD TO CART ----------------
    @PostMapping("/add")
    public String addToCart(@RequestBody CartRequest request) {

        // Validate username
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username cannot be null");
        }

        // Validate productId
        if (request.getProductId() == null) {
            throw new RuntimeException("Product ID cannot be null");
        }

        // Fetch User
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("User not found: " + request.getUsername())
                );

        // Fetch Product
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("Product not found with ID: " + request.getProductId())
                );

        // Create Cart Item
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProductId(product.getId());
        cart.setName(product.getName());
        cart.setImage(product.getImage());
        cart.setBasePrice(product.getBasePrice());
        cart.setQuantity(request.getQuantity());
        cart.setSelectedSingle(request.getSelectedSingle());
        cart.setSelectedToppings(request.getSelectedToppings());
        cart.setTotalPrice(request.getTotalPrice());
        cart.setCustomMessage(request.getCustomMessage());
        

        // Save
        cartRepository.save(cart);

        return "Item added to cart!";
    }

    // ---------------- DELETE CART ITEM ----------------
    @DeleteMapping("/delete/{id}")
    public String deleteItem(@PathVariable Long id, @RequestParam String username) {

        Cart cart = cartRepository.findByIdAndUser_Username(id, username)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        cartRepository.delete(cart);

        return "Item deleted";
    }

    // ---------------- UPDATE QUANTITY ----------------
    
    @PutMapping("/{id}")
    public Cart updateQuantity(@PathVariable Long id, @RequestBody Cart updated) {

        Cart item = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (updated.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        item.setQuantity(updated.getQuantity());
        item.setTotalPrice(item.getBasePrice() * updated.getQuantity());

        return cartRepository.save(item);
    }
}
