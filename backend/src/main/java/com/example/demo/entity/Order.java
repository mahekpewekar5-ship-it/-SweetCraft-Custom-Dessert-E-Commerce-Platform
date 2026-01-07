package com.example.demo.entity;

import jakarta.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String userName;

    private Double totalPrice;
    private Date deliveryDate;
    private String deliverySlot;
    private String status = "Pending";

    @Column(columnDefinition = "TEXT")
    private String trackingMessage;

    @Column(insertable = false, updatable = false)
    private Timestamp createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<OrderItem> items;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Date getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getDeliverySlot() {
		return deliverySlot;
	}

	public void setDeliverySlot(String deliverySlot) {
		this.deliverySlot = deliverySlot;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTrackingMessage() {
		return trackingMessage;
	}

	public void setTrackingMessage(String trackingMessage) {
		this.trackingMessage = trackingMessage;
	}

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

	public List<OrderItem> getItems() {
		return items;
	}

	public void setItems(List<OrderItem> items) {
		this.items = items;
	}

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Order(Integer id, String userName, Double totalPrice, Date deliveryDate, String deliverySlot, String status,
			String trackingMessage, Timestamp createdAt, List<OrderItem> items) {
		super();
		this.id = id;
		this.userName = userName;
		this.totalPrice = totalPrice;
		this.deliveryDate = deliveryDate;
		this.deliverySlot = deliverySlot;
		this.status = status;
		this.trackingMessage = trackingMessage;
		this.createdAt = createdAt;
		this.items = items;
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", userName=" + userName + ", totalPrice=" + totalPrice + ", deliveryDate="
				+ deliveryDate + ", deliverySlot=" + deliverySlot + ", status=" + status + ", trackingMessage="
				+ trackingMessage + ", createdAt=" + createdAt + ", items=" + items + "]";
	}
    

    

}
