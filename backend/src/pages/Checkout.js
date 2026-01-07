import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { getCart, removeFromCart } from "../api/cart";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function Checkout({ currentUser }) {
const [cart, setCart] = useState([]);
const [name, setName] = useState("");
const [address, setAddress] = useState("");
const [deliveryDate, setDeliveryDate] = useState(dayjs().format("YYYY-MM-DD"));
const [deliverySlot, setDeliverySlot] = useState("Morning");
const navigate = useNavigate();

useEffect(() => {
if (!currentUser) {
alert("Please login first to checkout!");
navigate("/login");
return;
}
getCart(currentUser.username).then(res => setCart(res.data || []));
}, [currentUser, navigate]);

const total = cart.reduce((sum, it) => sum + (it.totalPrice ?? it.basePrice * (it.quantity || 1)), 0);

const submitOrder = async () => {
  if (!name || !address) return alert("Please fill name and address");
  if (cart.length === 0) return alert("Your cart is empty!");

  const items = cart.map(it => ({
    productId: it.productId || it.product?.id || it.id,
    name: it.product?.name || it.name,
    quantity: it.quantity,
    selectedSingle: JSON.stringify(it.selectedSingle || {}),
    selectedToppings: JSON.stringify(it.selectedToppings || []),
    totalPrice: it.totalPrice ?? it.basePrice * it.quantity
  }));

  const payload = {
    userName: currentUser.username,
    deliveryDate: new Date(deliveryDate),
    deliverySlot,
    items,
    totalPrice: total,
    status: "Pending",
    address,
    name
  };

  try {
    // 1️⃣ Place the order
    await axios.post("http://localhost:8080/api/orders/place", payload);
    alert("Order placed successfully!");

    // 2️⃣ Clear cart items safely
    const deletionPromises = cart
      .filter(it => it.id) // only try to delete items with a valid id
      .map(it =>
        removeFromCart(it.id).catch(err => {
          console.warn(`Failed to delete cart item ${it.id}:`, err);
          // Ignore errors if item is already deleted
        })
      );

    await Promise.all(deletionPromises);

    // 3️⃣ Clear cart state locally
    setCart([]);

    // 4️⃣ Navigate to orders page
    navigate("/orders");
  } catch (error) {
    console.error("Failed to place order:", error);
    alert("Failed to place order. Please try again.");
  }
};

if (!cart.length)
return <Typography sx={{ p: 3 }}>Your cart is empty.</Typography>;

return (
<Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
<Typography variant="h4" sx={{ mb: 3 }}>Checkout</Typography>


  <TextField
    label="Name"
    fullWidth
    value={name}
    onChange={(e) => setName(e.target.value)}
    sx={{ mb: 2 }}
  />

  <TextField
    label="Address"
    fullWidth
    multiline
    rows={4}
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    sx={{ mb: 2 }}
  />

  <TextField
    label="Delivery Date"
    type="date"
    fullWidth
    value={deliveryDate}
    onChange={(e) => setDeliveryDate(e.target.value)}
    sx={{ mb: 2 }}
    InputLabelProps={{ shrink: true }}
  />

  <TextField
    select
    label="Delivery Slot"
    fullWidth
    value={deliverySlot}
    onChange={(e) => setDeliverySlot(e.target.value)}
    sx={{ mb: 2 }}
  >
    <MenuItem value="Morning">Morning (8 AM - 12 PM)</MenuItem>
    <MenuItem value="Afternoon">Afternoon (12 PM - 4 PM)</MenuItem>
    <MenuItem value="Evening">Evening (4 PM - 8 PM)</MenuItem>
  </TextField>

  <Typography variant="h6" sx={{ mt: 2 }}>
    Total: ₹{total}
  </Typography>

  <Button
    variant="contained"
    color="primary"
    sx={{ mt: 3 }}
    onClick={submitOrder}
  >
    Place Order
  </Button>
</Box>


);
}
