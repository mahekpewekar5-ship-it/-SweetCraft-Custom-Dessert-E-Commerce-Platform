package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CustomizationOption {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String type; // flavor, topping, shape, size, decoration
	private String value;
	private Double extraPrice;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public Double getExtraPrice() {
		return extraPrice;
	}

	public void setExtraPrice(Double extraPrice) {
		this.extraPrice = extraPrice;
	}

	public CustomizationOption(Long id, String type, String value, Double extraPrice) {
		super();
		this.id = id;
		this.type = type;
		this.value = value;
		this.extraPrice = extraPrice;
	}

	public CustomizationOption() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "CustomizationOption [id=" + id + ", type=" + type + ", value=" + value + ", extraPrice=" + extraPrice
				+ "]";
	}

}