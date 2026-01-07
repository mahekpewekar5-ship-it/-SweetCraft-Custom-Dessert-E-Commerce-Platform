// src/pages/AdminDashboard.js (FINALIZED with Images, Custom Options, and DESCENDING SORT)
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Divider,
    Stack,
} from "@mui/material";
import { CheckCircle as CheckCircleIcon, LocalShipping as LocalShippingIcon, Cake as CakeIcon } from '@mui/icons-material';

// CRITICAL IMPORT: This resolves the partial image path (e.g., 'cake.jpg') 
// into a full public path (e.g., '/images/cake.jpg').
import { productImagePath } from "../utils/imageHelpers"; 

// --- OPTIONS MAPPINGS (Copied from OrdersPage for consistency) ---
const OPTION_LABELS = {
    size: { 4: "Small", 5: "Medium", 6: "Large" },
    flavor: { 1: "Chocolate", 2: "Vanilla", 3: "Strawberry" },
    shape: { 7: "Round", 8: "Heart", 9: "Square" },
    toppings: { 10: "Choco Chips", 11: "Rainbow Sprinkler", 12: "Nuts", 13: "Fruits", 14: "Cherries" },
};

// Safe parser for selectedOptions JSON (Copied from OrdersPage)
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
// -------------------------------------------------------------------

// --- Helper for Status Display (Same as before) ---
const getStatusDisplay = (status) => {
    switch (status?.toLowerCase()) {
        case 'delivered':
            return {
                icon: <CheckCircleIcon sx={{ color: '#2e7d32', mr: 1 }} />, // Green
                color: '#2e7d32',
                text: 'Delivered',
            };
        case 'shipped':
        case 'out for delivery':
            return {
                icon: <LocalShippingIcon sx={{ color: '#ff9800', mr: 1 }} />, // Orange/Amber
                color: '#ff9800',
                text: 'Shipped / Out for Delivery',
            };
        default:
            return {
                icon: null,
                color: '#A00045', // Dark Pink/Berry
                text: status || 'Processing',
            };
    }
};
// -------------------------------------------------------------------

// Helper component to render item options
const renderAdminItemOptions = (item) => {
    const { single, toppings } = safeParseOptions(item.selectedOptions);

    const toppingNames = toppings
        .map((id) => OPTION_LABELS.toppings[id])
        .filter(Boolean)
        .join(", ");

    const hasOptions = Object.keys(single).length > 0 || toppings.length > 0;

    if (!hasOptions) {
        return <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#666' }}>No custom options selected.</Typography>;
    }

    return (
        <Box sx={{ mt: 1, p: 1, border: '1px solid #ffe5e5', borderRadius: 1, bgcolor: '#fffafa' }}>
            <Typography variant="body2" fontWeight="bold" sx={{ color: '#A00045' }}>
                <CakeIcon sx={{ fontSize: 14, mr: 0.5 }}/> Customizations:
            </Typography>
            {Object.entries(single).map(([key, id]) => (
                <Typography key={key} variant="body2" sx={{ pl: 1 }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: **{OPTION_LABELS[key]?.[id] ?? 'N/A'}**
                </Typography>
            ))}
            {toppingNames && (
                <Typography variant="body2" sx={{ pl: 1 }}>
                    Toppings: **{toppingNames}**
                </Typography>
            )}
        </Box>
    );
};

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [trackingMsgs, setTrackingMsgs] = useState({}); 

    // Fetch all orders and apply DESCENDING sort
    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/orders/all");
            
            // 🎯 NEW: Sort the orders by ID in descending order (newest first)
            const sortedOrders = res.data.sort((a, b) => b.id - a.id);
            
            setOrders(sortedOrders);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Update order status (Same as before)
    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:8080/api/orders/status/${id}?status=${status}`
            );
            // Re-fetch orders to get the updated status and maintain sort order
            fetchOrders(); 
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    // Send tracking message (Same as before)
    const handleTrackingMsg = async (id) => {
        try {
            const msg = trackingMsgs[id] || "";
            if (!msg.trim()) {
                alert("Please enter a tracking message.");
                return;
            }
            await axios.put(
                `http://localhost:8080/api/orders/track/${id}?msg=${encodeURIComponent(
                    msg
                )}`
            );
            alert("Tracking message sent!");
            setTrackingMsgs((prev) => {
                const newMsgs = { ...prev };
                delete newMsgs[id];
                return newMsgs;
            });
            // Re-fetch orders to get the updated tracking message and maintain sort order
            fetchOrders(); 
        } catch (err) {
            console.error("Failed to send tracking message:", err);
        }
    };

    const handleInputChange = (id, value) => {
        setTrackingMsgs({ ...trackingMsgs, [id]: value });
    };

    return (
        <Box sx={{ mt: 4, p: 3, maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                🚚 Admin Dashboard — All Orders
            </Typography>

            {orders.length === 0 && <Typography>No orders found.</Typography>}

            <Stack spacing={4}>
                {orders.map((order) => {
                    const statusDisplay = getStatusDisplay(order.status);
                    
                    return (
                        <Paper key={order.id} sx={{ p: 3, border: `1px solid #ddd` }}>
                            {/* --- HEADER: ID, USER, and CURRENT STATUS --- */}
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Order ID: {order.id} | User: {order.userName}
                                </Typography>
                                <Box display="flex" alignItems="center" sx={{ 
                                    p: 0.5, 
                                    borderRadius: 1, 
                                    bgcolor: statusDisplay.color ? `${statusDisplay.color}10` : '#eee' 
                                }}>
                                    {statusDisplay.icon}
                                    <Typography sx={{ color: statusDisplay.color, fontWeight: 'bold' }}>
                                        {statusDisplay.text}
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography>
                                <b>Total:</b> ₹{order.totalPrice}
                                &nbsp;|&nbsp;
                                <b>Delivery:</b> {new Date(order.deliveryDate).toLocaleDateString()} ({order.deliverySlot})
                            </Typography>
                            
                            {/* --- LAST SENT TRACKING MESSAGE --- */}
                            {order.trackingMessage && (
                                <Box sx={{ mt: 1, p: 1, borderLeft: '4px solid #faadd3ff', bgcolor: '#fdf3f8' }}>
                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                                        **Last Message Sent:** {order.trackingMessage}
                                    </Typography>
                                </Box>
                            )}

                            <Divider sx={{ my: 2 }} />

                            {/* --- ITEMS LIST (with Image and Options) --- */}
                            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                                Items Ordered:
                            </Typography>
                            <Stack spacing={1} sx={{ pl: 2 }}>
                                {order.items?.map((item) => (
                                    <Paper 
                                        key={item.id} 
                                        sx={{ 
                                            p: 2, 
                                            display: 'flex', 
                                            gap: 2, 
                                            border: '1px solid #f0f0f0', 
                                            alignItems: 'flex-start' 
                                        }}
                                    >
                                        {/* 1. Image Display (FIXED) */}
                                        <img
                                            // 🛑 FIX: Use the helper function to resolve the full public path
                                            src={productImagePath(item.product)}
                                            alt={item.product?.name || "Product image"}
                                            style={{ 
                                                width: 80, 
                                                height: 80, 
                                                objectFit: "cover", 
                                                borderRadius: 4, 
                                                flexShrink: 0 
                                            }}
                                            // Optional: Add a placeholder on error for debugging
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = "/images/placeholder.jpg"; // Fallback placeholder
                                            }}
                                        />
                                        
                                        <Box flexGrow={1}>
                                            <Typography fontWeight="bold">
                                                {item.product?.name} 
                                                <Typography component="span" variant="body2" sx={{ ml: 1, color: '#A00045' }}>
                                                    (Qty: {item.quantity} @ ₹{item.finalPrice})
                                                </Typography>
                                            </Typography>
                                            
                                            {/* 2. Custom Options Display */}
                                            {renderAdminItemOptions(item)}

                                            {/* 🎯 NEW CODE FOR CUSTOM MESSAGE DISPLAY 🎯 */}
                                            {item.customMessage && (
                                                <Box sx={{ mt: 1, p: 1, border: '1px solid #cce5ff', borderRadius: 1, bgcolor: '#f0f8ff' }}>
                                                    <Typography variant="body2" fontWeight="bold" sx={{ color: '#0056b3' }}>
                                                        💌 Customer Message:
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ pl: 1, whiteSpace: 'pre-wrap' }}>
                                                        {item.customMessage}
                                                    </Typography>
                                                </Box>
                                            )}
                                            {/* ------------------------------------------------------------- */}

                                        </Box>
                                    </Paper>
                                ))}
                            </Stack>

                            <Divider sx={{ my: 2 }} />

                            {/* --- ACTION SECTION --- */}
                            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                                Admin Actions:
                            </Typography>
                            <TextField
                                label="New Tracking Message for User"
                                fullWidth
                                multiline
                                rows={2}
                                sx={{ mb: 2 }}
                                value={trackingMsgs[order.id] || ""}
                                onChange={(e) => handleInputChange(order.id, e.target.value)}
                            />

                            <Box display="flex" gap={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleTrackingMsg(order.id)}
                                >
                                    Send Tracking Message
                                </Button>

                                {/* Mark Shipped */}
                                {order.status?.toLowerCase() !== 'delivered' && (
                                    <Button
                                        variant="outlined"
                                        color="warning"
                                        onClick={() => handleStatusUpdate(order.id, "Shipped")}
                                    >
                                        Mark Shipped
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleStatusUpdate(order.id, "Delivered")}
                                    disabled={order.status?.toLowerCase() === 'delivered'}
                                >
                                    Mark Delivered
                                </Button>
                            </Box>
                        </Paper>
                    );
                })}
            </Stack>
        </Box>
    );
}