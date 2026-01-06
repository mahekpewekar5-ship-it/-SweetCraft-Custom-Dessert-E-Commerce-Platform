package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CategoryRepository categoryRepo;  // <-- needed for slug lookup

    @GetMapping("/all")
    public List<Product> getAll() {
        return productRepo.findAll();
    }

    @PostMapping("/add")
    public Product add(@RequestBody Product product) {
        return productRepo.save(product);
    }

    @GetMapping("/{id}")
    public Product get(@PathVariable Long id) {
        return productRepo.findById(id).orElse(null);
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> getByCategory(@PathVariable Integer categoryId) {
        return productRepo.findByCategoryId(categoryId);
    }

    //  Add this method for slug-based filtering
    @GetMapping("/category/slug/{slug}")
    public List<Product> getByCategorySlug(@PathVariable String slug) {
        Category cat = categoryRepo.findBySlug(slug);
        if (cat != null) {
            return productRepo.findByCategory(cat);
        }
        return List.of();
    }
}
