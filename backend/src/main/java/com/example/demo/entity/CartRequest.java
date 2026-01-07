package com.example.demo.entity;

public class CartRequest {
    private String username;
    private Long productId;
    private Integer quantity;
    private String selectedSingle;
    private String selectedToppings;
    private Double totalPrice; 
    private String customMessage;

    
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public String getSelectedSingle() {
		return selectedSingle;
	}
	public void setSelectedSingle(String selectedSingle) {
		this.selectedSingle = selectedSingle;
	}
	public String getSelectedToppings() {
		return selectedToppings;
	}
	public void setSelectedToppings(String selectedToppings) {
		this.selectedToppings = selectedToppings;
	}
    public Double getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
	public String getCustomMessage() {
		return customMessage;
	}
	public void setCustomMessage(String customMessage) {
		this.customMessage = customMessage;
	}

    
    
}
