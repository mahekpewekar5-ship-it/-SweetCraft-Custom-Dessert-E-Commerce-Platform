package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ---------------- REGISTER -------------------
    @PostMapping("/register")
    public String register(@RequestBody User userRequest) {

        // Check if username already exists
        Optional<User> existing = userRepository.findByUsername(userRequest.getUsername());
        if (existing.isPresent()) {
            return "Username already exists!";
        }

        // Check password
        if (userRequest.getPassword() == null || userRequest.getPassword().isEmpty()) {
            return "Password cannot be empty!";
        }

        // Default role if not provided
        if (userRequest.getRole() == null || userRequest.getRole().isEmpty()) {
            userRequest.setRole("USER");
        }

        userRepository.save(userRequest);
        return "Registration successful!";
    }

    // ---------------- LOGIN -------------------
    @PostMapping("/login")
    public Object login(@RequestBody User loginRequest) {

        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());

        if (userOpt.isEmpty()) {
            return "User not found!";
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return "Invalid password!";
        }

        // Hide password when sending back
        user.setPassword(null);

        return user;  // returns { id, username, role }
    }

    // ---------------- GET USER BY USERNAME -------------------
    @GetMapping("/{username}")
    public User getUser(@PathVariable String username) {

        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) {
            return null;
        }

        User user = userOpt.get();
        user.setPassword(null);
        return user;
    }
}
