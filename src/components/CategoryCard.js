import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CakeIcon from "@mui/icons-material/Cake";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart } from "../api/cart";

export default function Navbar() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getCart()
      .then((res) => {
        const items = res.data || [];
        const c = items.reduce((s, it) => s + (it.quantity || 1), 0);
        setCount(c);
      })
      .catch(() => setCount(0));
  }, []);

  return (
    <AppBar position="sticky" sx={{ background: "#ffebf0", borderBottom: "1px solid #ffd6df" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" component={Link} to="/" sx={{ textDecoration: "none" }}>
          <CakeIcon sx={{ color: "#ff4f7b", mr: 1 }} />
          <Typography variant="h6" sx={{ color: "#ff4f7b", fontWeight: "700" }}>
            SweetCraft
          </Typography>
        </Box>

        <Box>
          <Button component={Link} to="/" sx={{ color: "#a32456" }}>Home</Button>
          <Button component={Link} to="/categories" sx={{ color: "#a32456" }}>Categories</Button>
          <Button component={Link} to="/customize/1" sx={{ color: "#a32456" }}>Customize</Button>
        </Box>

        <IconButton onClick={() => navigate("/cart")} sx={{ color: "#ff4f7b" }}>
          <Badge badgeContent={count} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
