package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepo;

    @GetMapping("/all")
    public List<Category> getAll() {
        return categoryRepo.findAll();
    }

    @PostMapping("/add")
    public Category add(@RequestBody Category category) {
        return categoryRepo.save(category);
    }
    
    
}
