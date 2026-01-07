    import axios from "axios";
    const BASE = "http://localhost:8080/api/orders";

    export const placeOrder = (order) => axios.post(`${BASE}/place`, order);
    export const getAllOrders = () => axios.get(`${BASE}/all`);
    export const getOrderById = (id) => axios.get(`${BASE}/${id}`);
    export const getOrdersByUser = (username) => axios.get(`${BASE}/user/${username}`);

