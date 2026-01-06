// src/pages/Home.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Button,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../api/products";
import Categories from "../components/Categories";

const Home = ({ currentUser }) => { // receive currentUser as prop
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCustomize = (productId) => {
    navigate(`/customize/${productId}`);
  };

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#ffb6c1" }} />
      </Box>
    );

  return (
    <Fade in timeout={600}>
      <Box
        sx={{
          p: 4,
          background: "linear-gradient(to bottom, #fdeef4, #fff5fa)",
          minHeight: "100vh",
          fontFamily: "'Quicksand', sans-serif",
        }}
      >
        {/* ---- Welcome Message ---- */}
        {currentUser && (
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: "#bf2e6a",
              fontFamily: "'Sacramento', cursive",
              textAlign: "center",
            }}
          >
            Welcome, {currentUser.username} 🎂 to SweetCraft!!
          </Typography>
        )}

        {/* ---- Hero Section ---- */}
        <Paper
          elevation={0}
          sx={{
            p: 6,
            mb: 5,
            borderRadius: 4,
            background: "linear-gradient(135deg, #f89bc2ff 0%, #fff1f7 100%)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#bf2e6a",
              fontFamily: "'Sacramento', cursive",
              fontWeight: 500,
            }}
          >
            Sweet Elegance for Every Bite 🍓
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 1,
              maxWidth: 700,
              margin: "0 auto",
              color: "#7a3550",
            }}
          >
            Explore handcrafted waffles, pancakes, pastries, cookies,
            bento cakes & more — all customizable to your taste.
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            sx={{
              mt: 4,
              background: "linear-gradient(45deg, #ff9ebc, #ff6f91)",
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "1.2rem",
              borderRadius: 3,
              px: 5,
              py: 1.5,
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 15px rgba(255,111,145,0.5)",
                background: "linear-gradient(45deg, #ff6388ff, #ff9ebc)",
              },
            }}
            onClick={() => navigate("/categories")}
          >
            Order Now 🍰
          </Button>
        </Paper>

        {/* ---- Categories Section ---- */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#c2185b",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Dessert Categories
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#fff0f6",
              border: "1px solid #ffd1df",
              "&:hover": {
                boxShadow: "0 8px 25px rgba(255,182,193,0.3)",
              },
            }}
          >
            <Categories />
          </Paper>
        </Box>

        {/* ---- Divider ---- */}
        <Box
          sx={{
            height: 10,
            background: "linear-gradient(to right, #f74a64ff, #ffd1df, #ffb6c1)",
            borderRadius: 2,
            mb: 4,
          }}
        />

        {/* ---- Product Section ---- */}
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#c2185b",
            fontFamily: "'Quicksand', sans-serif",
          }}
        >
          Freshly Crafted Desserts
        </Typography>

        <Grid container spacing={4}>
          {products.map((product, idx) => (
            <Fade in timeout={800 + idx * 100} key={product.id}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 1,
                    borderRadius: 3,
                    backgroundColor: "#f0cddeff",
                    border: "1px solid #ffe0eb",
                    transition: "0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px) scale(1.02)",
                      boxShadow: "0 10px 25px rgba(255,182,193,0.35)",
                    },
                  }}
                >
                  <ProductCard
                    product={product}
                    onCustomize={handleCustomize}
                  />
                </Paper>
              </Grid>
            </Fade>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
};

export default Home;
