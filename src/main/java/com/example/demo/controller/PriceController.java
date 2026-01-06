package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.PriceRequest;
import com.example.demo.service.PriceService;

@RestController
@RequestMapping("/api/price")
@CrossOrigin("*")
public class PriceController {
	@Autowired
	PriceService priceService;

	@PostMapping("/calculate")
	public ResponseEntity<Map<String, Object>> calc(@RequestBody PriceRequest req) {
		double price = priceService.calculatePrice(req.getBasePrice(), req.getSelectedSingle(),
				req.getSelectedToppings(), req.getQuantity());
		return ResponseEntity.ok(Map.of("total", price));
	}
}