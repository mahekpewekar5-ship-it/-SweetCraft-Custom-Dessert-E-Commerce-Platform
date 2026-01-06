import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Paper, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";
import { addToCart } from "../api/cart";

export default function ProductDetails({ currentUser }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(productId)
      .then(res => setProduct(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [productId]);

const handleAddToCart = () => {
  if (!currentUser?.username) {
    // Safely handle the user not being logged in
    alert("You must be logged in to add items to the cart.");
    navigate("/login");
    return;
  }

  if (!product) {
    // Extra safety check
    alert("Product data is not loaded yet. Please try again.");
    return;
  }

  const payload = {
    username: currentUser.username, // required by backend
    productId: product.id,
    name: product.name,
    image: product.image,
    basePrice: product.basePrice,
    quantity: 1,
    selectedSingle: {},
    selectedToppings: [],
  };

  addToCart(payload)
    .then(() => {
      alert("Item added to cart!");
      navigate("/cart");
    })
    .catch((err) => {
      console.error("Failed to add to cart:", err);
      alert("Failed to add item to cart. Please try again.");
    });
};


  if (loading) return <Box sx={{ textAlign: "center", mt: 6 }}><CircularProgress /></Box>;
  if (!product) return <Typography sx={{ p: 3 }}>Product not found.</Typography>;

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <img src={`/images/${product.image}`} alt={product.name} style={{ width: "100%", borderRadius: 8 }} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>{product.description}</Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>₹{product.basePrice}</Typography>
          <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={handleAddToCart}>Add to cart</Button>
          <Button variant="outlined" onClick={() => navigate(`/customize/${product.id}`)}>Customize</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
