package com.example.demo.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.CustomizationOption;
import com.example.demo.repository.CustomizationOptionRepository;

@Service
public class PriceService {
	@Autowired
	CustomizationOptionRepository optRepo;

// Calculate final price for selection
	public double calculatePrice(double basePrice, Map<String, String> selectedSingle, List<String> selectedToppings,
			int qty) {
		double total = basePrice;
// single-select options: size, shape, flavor, decoration
		for (Map.Entry<String, String> e : selectedSingle.entrySet()) {
			Optional<CustomizationOption> o = optRepo.findByType(e.getKey()).stream()
					.filter(x -> x.getValue().equals(e.getValue())).findFirst();
			if (o.isPresent())
				total += o.get().getExtraPrice();
		}
// toppings (multi)
		for (String t : selectedToppings) {
			Optional<CustomizationOption> o = optRepo.findByType("topping").stream().filter(x -> x.getValue().equals(t))
					.findFirst();
			if (o.isPresent())
				total += o.get().getExtraPrice();
		}
		return total * qty;
	}
}