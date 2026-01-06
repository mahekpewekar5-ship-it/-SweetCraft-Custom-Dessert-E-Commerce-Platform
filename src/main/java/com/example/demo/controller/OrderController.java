package com.example.demo.controller;

import com.example.demo.entity.Order;
import com.example.demo.entity.OrderRequest;
import com.example.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // USER — Place Order
    @PostMapping("/place")
    public String placeOrder(@RequestBody OrderRequest orderRequest) {
        return orderService.placeOrder(orderRequest);
    }

    // ADMIN — Get All Orders
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // USER — Get Orders by Username
    @GetMapping("/user/{username}")
    public List<Order> getOrdersByUser(@PathVariable String username) {
        return orderService.getOrdersByUser(username);
    }

    // ADMIN — Update Order Status
    @PutMapping("/status/{id}")
    public String updateStatus(@PathVariable Integer id, @RequestParam String status) {
        return orderService.updateStatus(id, status);
    }

    // ADMIN — Send Tracking Message
    @PutMapping("/track/{id}")
    public String updateTracking(@PathVariable Integer id, @RequestParam String msg) {
        return orderService.updateTrackingMessage(id, msg);
    }

    // ADMIN / USER — Get Order by ID
    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Integer id) {
        return orderService.getOrderById(id);
    }
}
