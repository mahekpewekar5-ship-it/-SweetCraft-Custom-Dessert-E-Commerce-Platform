import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { getCategoryProducts } from "../api/categories";
import { useParams, useNavigate } from "react-router-dom";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCategoryProducts(categoryId)
      .then(res => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <Box sx={{ textAlign: "center", mt: 6 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h" sx={{ mb: 2 }}>Category Products</Typography>
      <Grid container spacing={8}>
        {products.map(p => (
          <Grid item xs={12} sm={6} md={3} key={p.id}>
            <ProductCard product={p} onCustomize={(id) => navigate(`/customize/${id}`)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
