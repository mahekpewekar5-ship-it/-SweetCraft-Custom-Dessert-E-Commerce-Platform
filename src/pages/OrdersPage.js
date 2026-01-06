import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, CircularProgress, CardMedia } from "@mui/material";
import { getAllOrders } from "../api/orders";
import { ShoppingBasket as ShoppingBasketIcon, LocalShipping as LocalShippingIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { productImagePath } from "../utils/imageHelpers"; // Assuming this is correct

// --- THEME PALETTE (Consistent with Home.js and Footer.js) ---
const themeColors = {
    primary: '#faadd3ff',     // Hot Pink - for emphasis
    secondary: '#FFC0CB',   // Light Pink - accents
    tertiary: '#F08080',    // Light Coral - for titles
    background: '#FFF0F5',  // Lavender Blush - main page background
    textColor: '#A00045',   // Dark Pink/Berry - text
};

// Helper function to determine the icon and color based on status
const getStatusDisplay = (status) => {
    switch (status?.toLowerCase()) {
        case 'delivered':
            return {
                icon: <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20, mr: 1 }} />,
                text: 'Delivered',
                color: 'success.main',
            };
        case 'shipped':
        case 'out for delivery':
            return {
                icon: <LocalShippingIcon sx={{ color: 'warning.main', fontSize: 20, mr: 1 }} />,
                text: 'Shipped',
                color: 'warning.main',
            };
        default:
            return {
                icon: <LocalShippingIcon sx={{ color: themeColors.primary, fontSize: 20, mr: 1 }} />,
                text: 'Processing',
                color: themeColors.primary,
            };
    }
};
// -----------------------------------------------------------

// Option ID → Label mappings
const OPTION_LABELS = {
    size: { 4: "Small", 5: "Medium", 6: "Large" },
    flavor: { 1: "Chocolate", 2: "Vanilla", 3: "Strawberry" },
    shape: { 7: "Round", 8: "Heart", 9: "Square" },
    toppings: { 10: "Choco Chips", 11: "Rainbow Sprinkler", 12: "Nuts", 13: "Fruits", 14: "Cherries" },
};

// Safe parser for selectedOptions JSON
const safeParseOptions = (val) => {
    if (!val) return { single: {}, toppings: [] };
    try {
        const parsed = JSON.parse(val);
        return {
            single: parsed.single || {},
            toppings: Array.isArray(parsed.toppings) ? parsed.toppings : []
        };
    } catch {
        return { single: {}, toppings: [] };
    }
};

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ... (API fetching and user check logic remains the same)
        const currentUserJSON = localStorage.getItem("currentUser");
        if (!currentUserJSON) {
            setOrders([]);
            setLoading(false);
            return;
        }

        let username;
        try {
            const currentUser = JSON.parse(currentUserJSON);
            username = currentUser.username;
        } catch {
            setOrders([]);
            setLoading(false);
            return;
        }

        if (!username) {
            setOrders([]);
            setLoading(false);
            return;
        }

        getAllOrders()
            .then((res) => {
                const userOrders = res.data.filter(
                    (order) => order.userName.toLowerCase() === username.toLowerCase()
                );
                setOrders(userOrders);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Render Size, Flavor, Shape, and Toppings (logic remains the same)
    const renderCustomOptions = (item) => {
        const { single, toppings } = safeParseOptions(item.selectedOptions);

        const toppingNames = toppings
            .map((id) => OPTION_LABELS.toppings[id])
            .filter(Boolean)
            .join(", ");

        const hasOptions = Object.keys(single).length > 0 || toppings.length > 0;

        return (
            <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ color: themeColors.primary, fontWeight: 'bold', fontSize: '0.85rem' }}>
                    Custom Options:
                </Typography>
                {hasOptions ? (
                    <>
                        {Object.entries(single).map(([key, id]) => (
                            <Typography key={key} sx={{ pl: 2, fontSize: '0.9rem', color: themeColors.textColor }}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}: **{OPTION_LABELS[key]?.[id] ?? 'N/A'}**
                            </Typography>
                        ))}
                        {toppingNames && (
                            <Typography sx={{ pl: 2, fontSize: '0.9rem', color: themeColors.textColor }}>
                                Toppings: **{toppingNames}**
                            </Typography>
                        )}
                    </>
                ) : (
                    <Typography sx={{ pl: 2, fontSize: '0.9rem', color: themeColors.textColor }}>None</Typography>
                )}
            </Box>
        );
    };

    if (loading)
        return (
            <Box sx={{ textAlign: "center", mt: 5, p: 6, minHeight: '100vh', backgroundColor: themeColors.background }}>
                <CircularProgress sx={{ color: themeColors.primary }} />
                <Typography variant="h6" sx={{ ml: 2, color: themeColors.textColor }}>Loading your sweet history...</Typography>
            </Box>
        );

    if (!orders.length)
        return (
            <Box sx={{ p: 5, textAlign: "center", minHeight: '80vh', backgroundColor: themeColors.background }}>
                <ShoppingBasketIcon sx={{ fontSize: 60, color: themeColors.secondary, mb: 2 }} />
                <Typography variant="h5" sx={{ color: themeColors.tertiary }}>
                    You haven't placed any orders yet.
                </Typography>
                <Typography sx={{ color: themeColors.textColor, mt: 1 }}>
                    Time to customize your first delicious treat!
                </Typography>
            </Box>
        );

    return (
        <Box sx={{ p: { xs: 2, sm: 4, md: 6 }, backgroundColor: themeColors.background, minHeight: '100vh' }}>
            <Typography variant="h4" sx={{ mb: 4, color: themeColors.tertiary, fontWeight: 700, borderBottom: `3px solid ${themeColors.tertiary}`, pb: 1 }}>
                My Past Orders 📝
            </Typography>

            <Grid container spacing={4}>
                {orders.map((order) => {
                    // Get display properties for status
                    const statusDisplay = getStatusDisplay(order.status);

                    return (
                        <Grid item xs={12} sm={6} md={4} key={order.id}>
                            <Paper 
                                sx={{ 
                                    p: 3, 
                                    height: '100%', 
                                    borderLeft: `5px solid ${themeColors.primary}`, 
                                    boxShadow: 5, 
                                    backgroundColor: 'white',
                                    borderRadius: 3
                                }}
                            >
                                {/* --- ORDER STATUS DISPLAY --- */}
                                <Box display="flex" alignItems="center" mb={1} sx={{ bgcolor: themeColors.secondary, p: 1, borderRadius: 1 }}>
                                    {statusDisplay.icon}
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: statusDisplay.color }}>
                                        Status: {statusDisplay.text}
                                    </Typography>
                                </Box>
                                
                                {/* --- ADMIN TRACKING MESSAGE --- */}
                                {order.trackingMessage && (
                                    <Box mb={2} sx={{ p: 1, border: `1px solid ${themeColors.secondary}`, borderRadius: 1 }}>
                                        <Typography variant="body2" sx={{ color: themeColors.textColor, fontStyle: 'italic' }}>
                                            **Tracking Update:** {order.trackingMessage}
                                        </Typography>
                                    </Box>
                                )}
                                {/* ------------------------------ */}

                                <Typography variant="h6" sx={{ color: themeColors.tertiary, fontWeight: 'bold' }}>
                                    Order ID: #{order.id}
                                </Typography>
                                <Typography sx={{ color: themeColors.textColor }}>
                                    Total: **₹{order.totalPrice}**
                                </Typography>
                                <Typography sx={{ color: themeColors.textColor }}>
                                    Delivery Date: **{new Date(order.deliveryDate).toLocaleDateString()}**
                                </Typography>
                                <Typography sx={{ mb: 2, color: themeColors.textColor }}>
                                    Delivery Slot: **{order.deliverySlot}**
                                </Typography>

                                <hr style={{ borderTop: `1px dashed ${themeColors.secondary}` }} />

                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: themeColors.textColor }}>
                                        Items Ordered:
                                    </Typography>
                                    {order.items && order.items.length ? (
                                        order.items.map((item) => (
                                            <Paper 
                                                key={item.id} 
                                                sx={{ 
                                                    p: 1.5, 
                                                    mt: 1.5, 
                                                    display: 'flex', 
                                                    gap: 2, 
                                                    alignItems: 'center', 
                                                    backgroundColor: themeColors.lightAccent || '#FCE4EC' 
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    sx={{ 
                                                        width: 60, 
                                                        height: 60, 
                                                        borderRadius: 1, 
                                                        flexShrink: 0, 
                                                        objectFit: 'cover',
                                                        border: `2px solid ${themeColors.secondary}`
                                                    }}
                                                    image={productImagePath(item.product)} 
                                                    alt={item.product?.name ?? item.name}
                                                />

                                                <Box>
                                                    <Typography fontWeight="bold" sx={{ color: themeColors.textColor }}>
                                                        {item.product?.name ?? item.name}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: themeColors.textColor }}>
                                                        Qty: **{item.quantity}** | Price: **₹{item.finalPrice}**
                                                    </Typography>
                                                    {renderCustomOptions(item)}
                                                </Box>
                                            </Paper>
                                        ))
                                    ) : (
                                        <Typography sx={{ color: themeColors.textColor }}>
                                            No items found
                                        </Typography>
                                    )}
                                </Box>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}