package com.example.demo.entity;

import java.util.List;
import java.util.Map;

public class PriceRequest {

	private double basePrice;
	private Map<String, String> selectedSingle; // size, shape, flavor, decoration
	private List<String> selectedToppings; // multi-select toppings
	private int quantity;

	
	public double getBasePrice() {
		return basePrice;
	}

	public void setBasePrice(double basePrice) {
		this.basePrice = basePrice;
	}

	public Map<String, String> getSelectedSingle() {
		return selectedSingle;
	}

	public void setSelectedSingle(Map<String, String> selectedSingle) {
		this.selectedSingle = selectedSingle;
	}

	public List<String> getSelectedToppings() {
		return selectedToppings;
	}

	public void setSelectedToppings(List<String> selectedToppings) {
		this.selectedToppings = selectedToppings;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
