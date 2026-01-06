import axios from "axios";
const BASE = "http://localhost:8080/api/options";

export const getAllOptions = () => axios.get(`${BASE}/all`);
export const getOptionsByType = (type) => axios.get(`${BASE}/type/${type}`);
export const addOption = (opt) => axios.post(`${BASE}/add`, opt);
