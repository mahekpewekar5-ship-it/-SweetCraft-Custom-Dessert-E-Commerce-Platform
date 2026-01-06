package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private String name;
    private String image;
    private Double basePrice;
    private Integer quantity;
    

    @Column(columnDefinition = "TEXT")
    private String selectedSingle; // JSON string: {"size":"1","flavor":"2"}

    @Column(columnDefinition = "TEXT")
    private String selectedToppings; // JSON string: [1,2,3]

    private Double totalPrice;

    // --- Link Cart to User ---
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private String customMessage; 

    public Cart() {}


    public Cart(Long id, Long productId, String name, String image, Double basePrice, Integer quantity,
			String selectedSingle, String selectedToppings, Double totalPrice, User user, String customMessage) {
		super();
		this.id = id;
		this.productId = productId;
		this.name = name;
		this.image = image;
		this.basePrice = basePrice;
		this.quantity = quantity;
		this.selectedSingle = selectedSingle;
		this.selectedToppings = selectedToppings;
		this.totalPrice = totalPrice;
		this.user = user;
		this.customMessage = customMessage;
	}


	// --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public Double getBasePrice() { return basePrice; }
    public void setBasePrice(Double basePrice) { this.basePrice = basePrice; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getSelectedSingle() { return selectedSingle; }
    public void setSelectedSingle(String selectedSingle) { this.selectedSingle = selectedSingle; }

    public String getSelectedToppings() { return selectedToppings; }
    public void setSelectedToppings(String selectedToppings) { this.selectedToppings = selectedToppings; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }


	public String getCustomMessage() {
		return customMessage;
	}


	public void setCustomMessage(String customMessage) {
		this.customMessage = customMessage;
	}


	@Override
	public String toString() {
		return "Cart [id=" + id + ", productId=" + productId + ", name=" + name + ", image=" + image + ", basePrice="
				+ basePrice + ", quantity=" + quantity + ", selectedSingle=" + selectedSingle + ", selectedToppings="
				+ selectedToppings + ", totalPrice=" + totalPrice + ", user=" + user + ", customMessage="
				+ customMessage + "]";
	}
	

}
