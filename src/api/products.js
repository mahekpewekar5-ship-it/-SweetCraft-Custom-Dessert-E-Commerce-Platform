import axios from "axios";
const BASE = "http://localhost:8080/api/products";

export const getAllProducts = () => axios.get(`${BASE}/all`);
export const getProductById = (id) => axios.get(`${BASE}/${id}`);
export const addProduct = (p) => axios.post(`${BASE}/add`, p);
export const getProductsByCategoryId = (categoryId) =>
  axios.get(`${BASE}/category/${categoryId}`);
export const getProductsByCategorySlug = (slug) =>
  axios.get(`${BASE}/category/slug/${slug}`);