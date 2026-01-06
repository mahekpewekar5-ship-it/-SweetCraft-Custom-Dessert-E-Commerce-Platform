import axios from "axios";
const BASE = "http://localhost:8080/api/categories";

export const getAllCategories = () => axios.get(`${BASE}/all`);
export const getCategoryProducts = (categoryId) =>
  axios.get(`${BASE}/${categoryId}/products`);
export const addCategory = (cat) => axios.post(`${BASE}/add`, cat);
