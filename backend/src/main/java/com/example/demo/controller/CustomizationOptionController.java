package com.example.demo.controller;

import com.example.demo.entity.CustomizationOption;
import com.example.demo.repository.CustomizationOptionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/options")
@CrossOrigin("*")
public class CustomizationOptionController {

    @Autowired
    private CustomizationOptionRepository optionRepo;

    @GetMapping("/all")
    public List<CustomizationOption> getAll() {
        return optionRepo.findAll();
    }

    @PostMapping("/add")
    public CustomizationOption add(@RequestBody CustomizationOption option) {
        return optionRepo.save(option);
    }

    @GetMapping("/type/{type}")
    public List<CustomizationOption> getByType(@PathVariable String type) {
        return optionRepo.findByType(type);
    }
}