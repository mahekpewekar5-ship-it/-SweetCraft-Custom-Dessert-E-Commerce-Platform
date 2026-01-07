import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Badge,
  Paper,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IcecreamIcon from "@mui/icons-material/Icecream";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../api/cart";

// Add these fonts in your index.html
// <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500&family=Sacramento&display=swap" rel="stylesheet">

export default function Navbar({ currentUser, onLogout }) {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role === "ADMIN") {
      setCount(0);
      return;
    }

    getCart(currentUser.username)
      .then((res) => {
        const items = res.data || [];
        const total = items.reduce((s, it) => s + (it.quantity || 1), 0);
        setCount(total);
      })
      .catch(() => setCount(0));
  }, [currentUser]);

  return (
    <Paper
      elevation={6}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 2000,
        borderRadius: "0 0 25px 25px",
        background: "rgba(255, 230, 240, 0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "2px solid #ff9cbc",
      }}
    >
      <AppBar
        elevation={0}
        position="static"
        sx={{
          background: "linear-gradient(90deg, #ffe0eb, #ffd7e8, #ffc2d8)",
          borderRadius: "0 0 25px 25px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1.5 }}>
          
          {/* Logo */}
          <Box display="flex" alignItems="center" component={Link} to="/" sx={{ textDecoration: "none" }}>
            <IcecreamIcon sx={{ color: "#ff6f91", fontSize: 36, mr: 1 }} />
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Sacramento', cursive",
                fontSize: "2rem",
                color: "#d6246c",
              }}
            >
              SweetCraft
            </Typography>
          </Box>

          {/* Middle Menu */}
          <Box>
            {["Home", "Categories"].map((item, i) => (
              <Button
                key={i}
                component={Link}
                to={item === "Home" ? "/" : "/categories"}
                sx={{
                  mx: 1,
                  fontSize: "1.1rem",
                  fontFamily: "'Quicksand', sans-serif",
                  color: "#a12456",
                  textTransform: "none",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#ff4f7b",
                    transform: "scale(1.08)",
                    textShadow: "0 0 5px #ffb0c4",
                  },
                }}
              >
                {item}
              </Button>
            ))}

            {currentUser?.role !== "ADMIN" && (
              <Button
                component={Link}
                to="/orders"
                sx={{
                  mx: 1,
                  fontSize: "1.1rem",
                  fontFamily: "'Quicksand', sans-serif",
                  color: "#a12456",
                  textTransform: "none",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#ff4f7b",
                    transform: "scale(1.08)",
                    textShadow: "0 0 5px #ffb0c4",
                  },
                }}
              >
                My Orders
              </Button>
            )}

            {currentUser?.role === "ADMIN" && (
              <Button
                component={Link}
                to="/admin"
                sx={{
                  mx: 1,
                  fontSize: "1.1rem",
                  fontFamily: "'Quicksand', sans-serif",
                  color: "#a12456",
                  textTransform: "none",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#ff4f7b",
                    transform: "scale(1.08)",
                    textShadow: "0 0 5px #ffb0c4",
                  },
                }}
              >
                Admin
              </Button>
            )}
          </Box>

          {/* Right Side */}
          <Box display="flex" alignItems="center">
            {!currentUser ? (
              <>
                <Button sx={{ mx: 1, fontFamily: "'Quicksand', sans-serif", color: "#a12456", textTransform: "none" }} onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button sx={{ mx: 1, fontFamily: "'Quicksand', sans-serif", color: "#a12456", textTransform: "none" }} onClick={() => navigate("/register")}>
                  Register
                </Button>
              </>
            ) : (
              <>
                <Typography sx={{ mr: 2, fontFamily: "'Quicksand', sans-serif", fontSize: "1.15rem", color: "#8a2e4d" }}>
                  {currentUser.username}
                </Typography>
                <Button sx={{ fontFamily: "'Quicksand', sans-serif", color: "#a12456", textTransform: "none" }} onClick={onLogout}>
                  Logout
                </Button>
              </>
            )}

            {currentUser?.role !== "ADMIN" && (
              <IconButton onClick={() => navigate("/cart")} sx={{ ml: 1 }}>
                <Badge
                  badgeContent={count}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#ff4f7b",
                      color: "white",
                      fontSize: "0.8rem",
                    },
                  }}
                >
                  <ShoppingCartIcon sx={{ color: "#d6246c", fontSize: 32 }} />
                </Badge>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}
