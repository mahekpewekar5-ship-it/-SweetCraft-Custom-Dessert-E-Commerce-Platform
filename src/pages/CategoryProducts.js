import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../api/products";
import { useNavigate } from "react-router-dom";

export default function CategoryProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts()
      .then(res => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box sx={{ textAlign: "center", mt: 6 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>All Categories / Products</Typography>
      <Grid container spacing={2}>
        {products.map(p => (
          <Grid item xs={12} sm={6} md={3} key={p.id}>
            <ProductCard product={p} onCustomize={(id) => navigate(`/customize/${id}`)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
