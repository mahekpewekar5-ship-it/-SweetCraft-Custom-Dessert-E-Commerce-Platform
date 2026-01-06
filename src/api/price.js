import axios from "axios";
const BASE = "http://localhost:8080/api/price";

export const calculatePrice = (payload) => axios.post(`${BASE}/calculate`, payload);

