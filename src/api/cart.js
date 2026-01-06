// src/api/cart.js
import axios from "axios";

const API_BASE = "http://localhost:8080/api/cart";

export const getCart = (username) => {
  if (!username) throw new Error("Username is required to fetch the cart");
  return axios.get(`${API_BASE}/${username}`);
};

export const addToCart = (item) => {
  if (!item.username) throw new Error("Username is required to add item to cart");
  return axios.post(`${API_BASE}/add`, item);
};

export const removeFromCart = (id, username) => {
  return axios.delete(`${API_BASE}/delete/${id}?username=${username}`);
};

export const updateCartItem = (id, updatedData) => {
  if (!id) throw new Error("Cart item ID is required to update item");
  return axios.put(`${API_BASE}/${id}`, updatedData);
};
