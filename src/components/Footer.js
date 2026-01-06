// src/components/Footer.js
import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Link 
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";

// NOTE: You must ensure 'Playfair Display' and 'Quicksand' are loaded in your main CSS or HTML file.

// --- DARK PINK PALETTE (Adjusted for Font Color) ---
const darkPinkTheme = {
  // Darker Pink for background and major elements (from previous step)
  mainBackground: '#F8BBD0', 
  gradientStart: '#E91E63', 
  gradientEnd: '#FF4081',   
  hoverColor: '#D81B60',     
  lightAccent: '#FCE4EC',   
  
  // New Text Color: Darker Pink/Berry (Replaces the deep purple/berry)
  textColor: '#A00045', 
};
// ----------------------------

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Helper component for styled links
  const NavLink = ({ children, to }) => (
    <Link 
      href={to} 
      underline="none" 
      color="inherit" 
      variant="body2" 
      sx={{ 
        cursor: "pointer", 
        mb: 0.5, 
        display: 'block', 
        transition: 'color 0.2s',
        // Text is now the primary dark pink color
        color: darkPinkTheme.textColor, 
        "&:hover": { color: darkPinkTheme.hoverColor, fontWeight: 600 } 
      }}
    >
      {children}
    </Link>
  );

  return (
    <Box
      sx={{
        mt: 8,
        p: 6,
        // Background remains the same dark pink gradient
        background: `linear-gradient(180deg, ${darkPinkTheme.mainBackground}, #f3d4db)`, 
        // Default text color set to the new dark pink
        color: darkPinkTheme.textColor, 
        fontFamily: "'Quicksand', sans-serif", // Default body font
        borderTop: `5px solid ${darkPinkTheme.gradientEnd}`, 
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        
        {/* 1. About Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography 
            variant="h5"
            sx={{ 
              mb: 2, 
              // LOGO FONT STYLE CHANGE
              fontFamily: "'Playfair Display', serif", 
              fontSize: "2rem", 
              color: darkPinkTheme.gradientEnd, 
              fontWeight: 'bold'
            }}
          >
            SweetCraft 🧁
          </Typography>
          <Typography variant="body3" sx={{ fontFamily: "'Quicksand', sans-serif" }}>
Every treat is a blank canvas, allowing you to design the perfect dessert for any moment—from custom flavors and fillings to personalized decorations and messages. We use only the finest ingredients to ensure every bite is pure bliss!          </Typography>
        </Grid>

        {/* 2. Quick Links */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              fontWeight: 700, 
              // HEADER FONT STYLE CHANGE
              fontFamily: "'Playfair Display', serif", 
              color: darkPinkTheme.textColor 
            }}
          >
            Quick Links
          </Typography>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/orders">My Orders</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </Grid>

        {/* 3. Newsletter */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              fontWeight: 700,
              // HEADER FONT STYLE CHANGE
              fontFamily: "'Playfair Display', serif", 
              color: darkPinkTheme.textColor 
            }}
          >
            Newsletter 💌
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, fontFamily: "'Quicksand', sans-serif" }}>
            Subscribe for updates, special offers & **sweet surprises**!
          </Typography>
          <Box display="flex" gap={1}>
            <TextField
              placeholder="Your email"
              size="small"
              variant="outlined"
              InputProps={{ 
                sx: { 
                    backgroundColor: darkPinkTheme.lightAccent, 
                    borderRadius: 2,
                    color: darkPinkTheme.textColor // Input text color
                }
              }}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              sx={{
                background: `linear-gradient(45deg, ${darkPinkTheme.gradientStart}, ${darkPinkTheme.gradientEnd})`,
                color: 'white',
                fontWeight: 700,
                '&:hover': { background: darkPinkTheme.hoverColor },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Grid>

        {/* 4. Social / Contact */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              fontWeight: 700,
              // HEADER FONT STYLE CHANGE
              fontFamily: "'Playfair Display', serif", 
              color: darkPinkTheme.textColor 
            }}
          >
            Connect With Us
          </Typography>
          <Box display="flex" gap={1}>
            <IconButton sx={{ color: darkPinkTheme.gradientEnd }}><FacebookIcon /></IconButton>
            <IconButton sx={{ color: darkPinkTheme.gradientEnd }}><InstagramIcon /></IconButton>
            <IconButton sx={{ color: darkPinkTheme.gradientEnd }}><TwitterIcon /></IconButton>
            <IconButton sx={{ color: darkPinkTheme.gradientEnd }}><PinterestIcon /></IconButton>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>
            Email: <Link href="mailto:support@sweetcraft.com" color="inherit" underline="hover">support@sweetcraft.com</Link>
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>
            Phone: +91 98765 43210
          </Typography>
        </Grid>
      </Grid>

      {/* Copyright Bar */}
      <Box sx={{ textAlign: "center", mt: 6, borderTop: `1px solid ${darkPinkTheme.hoverColor}`, pt: 3 }}>
        <Typography variant="body2" sx={{ color: darkPinkTheme.textColor, fontWeight: 500, fontFamily: "'Quicksand', sans-serif" }}>
          © {currentYear} SweetCraft. All rights reserved. Made with love.
        </Typography>
      </Box>
    </Box>
  );
}