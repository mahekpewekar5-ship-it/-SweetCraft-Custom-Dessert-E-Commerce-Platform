import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, Paper, Button, TextField,  Stack } from "@mui/material"; // Added Grid, Stack for styling
import { getCart, removeFromCart, updateCartItem } from "../api/cart";
import { useNavigate } from "react-router-dom";

// Option mappings
const OPTION_LABELS = {
size: { 4: "Small", 5: "Medium", 6: "Large" },
flavor: { 1: "Chocolate", 2: "Vanilla", 3: "Strawberry" },
shape: { 7: "Round", 8: "Heart", 9: "Square" },
toppings: { 10: "Choco Chips", 11: "Rainbow Sprinkler", 12: "Nuts", 13: "Fruits", 14: "Cherries" },
};

// Safe JSON parse
const safeParse = (val) => {
if (!val) return null;
try { return JSON.parse(val); } catch { return null; }
};

// Helper for image path
const productImagePath = (it) => `/images/${it.image}`;

export default function CartPage({ currentUser }) {
const [items, setItems] = useState([]);
const navigate = useNavigate();

// loadCart wrapped in useCallback to avoid ESLint warning
const loadCart = useCallback(async () => {
if (!currentUser?.username) return;
try {
const res = await getCart(currentUser.username);
setItems(res.data || []);
} catch (err) {
console.error("Failed to load cart:", err);
}
}, [currentUser?.username]);

useEffect(() => {
if (!currentUser?.username) {
alert("Please login or register first to view your cart!");
navigate("/login");
return;
}
loadCart();
}, [currentUser, loadCart, navigate]);

const removeItem = async (id) => {
  try {
    await removeFromCart(id, currentUser.username);
    loadCart();
  } catch (err) {
    console.error("Failed to remove item:", err);
  }
};

const updateQty = async (id, qty) => {
if (qty < 1) return;
try {
await updateCartItem(id, { quantity: qty });
loadCart();
} catch (err) {
console.error("Failed to update quantity:", err);
}
};

const totalPrice = items.reduce((sum, it) => sum + (it.totalPrice ?? it.basePrice * it.quantity), 0);

if (!items.length) return (
    <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#fefefe', borderRadius: 2, maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Typography variant="h5" color="#FF69B4" sx={{ mb: 2 }}>
            Your cart is empty.
        </Typography>
        <Typography color="text.secondary">
            Let's find some sweet treats for you!
        </Typography>
    </Box>
);

// ... existing imports and functions ...

return ( 
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', bgcolor: '#fefefe' }}>
        <Typography 
            variant="h4" 
            sx={{ 
                mb: 4, 
                fontWeight: '900', 
                color: '#FF69B4', // Soft Pink Accent
                borderBottom: '4px solid #fce4ec', // Lighter Pink line
                pb: 1,
                textAlign: 'center'
            }}
        >
            Your Sweet Cart 🛒 {/* <-- Changed text content and added emoji here */}
        </Typography> 
        
        <Box display="grid" gap={3}>
            {items.map((it) => {
                const selected = safeParse(it.selectedSingle) || {};
                const toppings = safeParse(it.selectedToppings) || [];
                return (
                    <Paper 
                        key={it.id} 
                        elevation={6} 
                        sx={{ 
                            display: "flex", 
                            p: 3, 
                            borderRadius: 4, // Large rounded corners
                            alignItems: "stretch", 
                            bgcolor: '#fff3f5', // Very light pink background
                            border: '1px solid #f8bbd0'
                        }}
                    >
                        {/* Image */}
                        <img
                            src={productImagePath(it)}
                            alt={it.name}
                            style={{ 
                                width: 120, 
                                height: 120,
                                borderRadius: 12, 
                                marginRight: 24, 
                                objectFit: "cover",
                                border: '3px solid #FFCDD2' // Pink border around image
                            }}
                        />
                        
                        {/* Details */}
                        <Box sx={{ flex: 1 }}> 
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF69B4' }}>
                                {it.name}
                            </Typography> 
                            <Stack spacing={0.5} sx={{ mt: 1, color: '#333' }}>
                                <Typography variant="body2">
                                    <Box component="span" sx={{ fontWeight: 'bold', color: '#555' }}>Size:</Box> {OPTION_LABELS.size[selected.size] ?? "None"}
                                </Typography> 
                                <Typography variant="body2">
                                    <Box component="span" sx={{ fontWeight: 'bold', color: '#555' }}>Flavor:</Box> {OPTION_LABELS.flavor[selected.flavor] ?? "None"}
                                </Typography> 
                                <Typography variant="body2">
                                    <Box component="span" sx={{ fontWeight: 'bold', color: '#555' }}>Shape:</Box> {OPTION_LABELS.shape[selected.shape] ?? "None"}
                                </Typography> 
                                <Typography variant="body2"> 
                                    <Box component="span" sx={{ fontWeight: 'bold', color: '#555' }}>Toppings:</Box> {toppings.length ? toppings.map(id => OPTION_LABELS.toppings[id]).join(", ") : "None"} 
                                </Typography>
                            </Stack>
                        </Box>
                        
                        {/* Quantity, Price, and Actions */}
                        <Box sx={{ textAlign: "right", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', ml: 2 }}>
                            <TextField
                                type="number"
                                value={it.quantity}
                                onChange={(e) => updateQty(it.id, Math.max(1, Number(e.target.value)))}
                                sx={{ width: 80, mb: 1 }}
                                InputProps={{ inputProps: { min: 1 } }}
                                size="small"
                                label="Qty"
                            /> 
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FF69B4', my: 1 }}>
                                ₹{it.totalPrice ?? it.basePrice * it.quantity}
                            </Typography>
                            <Button 
                                color="error" 
                                size="small"
                                sx={{ 
                                    color: '#FF69B4', // Pink remove button
                                    '&:hover': { bgcolor: '#fce4ec' } 
                                }}
                                onClick={() => removeItem(it.id)}
                            >
                                Remove
                            </Button> 
                        </Box> 
                    </Paper>
                );
            })} 
        </Box>

        {/* Total and Checkout Section */}
        <Paper elevation={8} sx={{ mt: 4, p: 3, bgcolor: '#fefefe', borderRadius: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mr: 2 }}>
                    Total: 
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: '900', color: '#FF69B4' }}>
                    ₹{totalPrice}
                </Typography>
            </Box>
            <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                sx={{ 
                    mt: 3, 
                    py: 1.5, 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold',
                    bgcolor: '#FF69B4', // Strong Pink button
                    '&:hover': { bgcolor: '#F06292', transform: 'scale(1.01)' } 
                }} 
                onClick={() => navigate("/checkout")}
            >
                Proceed to Checkout
            </Button> 
        </Paper>
    </Box>
);
}