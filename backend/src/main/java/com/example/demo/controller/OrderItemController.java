package com.example.demo.controller;

import com.example.demo.entity.OrderItem;
import com.example.demo.repository.OrderItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/order-items")
@CrossOrigin("*")
public class OrderItemController {

    @Autowired
    private OrderItemRepository itemRepo;

    @GetMapping("/all")
    public List<OrderItem> getAll() {
        return itemRepo.findAll();
    }

    @PostMapping("/add")
    public OrderItem add(@RequestBody OrderItem item) {
        return itemRepo.save(item);
    }

    @GetMapping("/order/{orderId}")
    public List<OrderItem> getByOrderId(@PathVariable Integer orderId) {
        return itemRepo.findByOrderId(orderId);
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemRepo.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public OrderItem updateItem(@PathVariable Long id, @RequestBody OrderItem updatedItem) {
        OrderItem item = itemRepo.findById(id).orElseThrow();
        item.setQuantity(updatedItem.getQuantity());
        item.setFinalPrice(updatedItem.getFinalPrice());
        return itemRepo.save(item);
    }

}
