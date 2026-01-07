// src/pages/Login.js (Aesthetic Pastel Pink Theme)
import React, { useState } from "react";
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Paper, 
    InputAdornment, 
} from "@mui/material";
import { 
    Lock as LockIcon, 
    Person as PersonIcon,
    FavoriteBorder as FavoriteBorderIcon // Changed icon to a softer heart
} from '@mui/icons-material';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Define the custom PASTEL PINK palette
const PASTEL_THEME = {
    primary: '#F8BBD0', // Light Pink / Main Pastel Accent (MUI Pink 100/200)
    secondary: '#FFEBEE', // Very Light Pink / Background Accent (MUI Red A100)
    darkText: '#D81B60', // Rose Pink / Stronger Pink for text/icons
    lightBg: '#FAFAFA', // Near white background
};

export function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/api/user/login", {
                username,
                password,
            });

            // Backend sends STRING response like "Login successful"
            if (typeof res.data === "string") {
                alert(res.data);
                if (!res.data.toLowerCase().includes("successful")) return;
            }

            // Fetch the full user details after success
            const userRes = await axios.get(
                `http://localhost:8080/api/user/${username}`
            );

            const user = userRes.data; // {id, username, role}

            // Save logged-in user
            localStorage.setItem("currentUser", JSON.stringify(user));
            onLogin(user);

            // Redirect based on role
            if (user.role === "ADMIN") navigate("/admin");
            else navigate("/cart");

        } catch (error) {
            console.error(error);
            alert("Login failed. Please try again.");
        }
    };

    return (
        // Main container with very light background
        <Box 
            sx={{ 
                pt: 10, 
                pb: 10, 
                minHeight: '100vh', 
                bgcolor: PASTEL_THEME.secondary, // Overall light background
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}
        >
            {/* Login form container (Paper) */}
            <Paper 
                elevation={8} // Subtle elevation
                sx={{ 
                    maxWidth: 420, 
                    width: '90%',
                    p: 5, 
                    borderRadius: 3, 
                    bgcolor: PASTEL_THEME.lightBg,
                    textAlign: 'center',
                    // Soft border accent
                    border: `1px solid ${PASTEL_THEME.primary}`,
                    boxShadow: `0 4px 20px 0 rgba(248, 187, 208, 0.4)`, // Soft pink shadow
                }}
            >
                {/* Title */}
                <Typography 
                    variant="h4" 
                    sx={{ 
                        mb: 4, 
                        fontWeight: '600', 
                        color: PASTEL_THEME.darkText, // Rose Pink text
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'serif', // Optional: Use a softer font
                    }}
                >
                    <FavoriteBorderIcon sx={{ mr: 1, fontSize: '2rem' }} /> Welcome Back
                </Typography>

                {/* Username Field */}
                <TextField
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 3 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon sx={{ color: PASTEL_THEME.darkText }} />
                            </InputAdornment>
                        ),
                    }}
                    // Pastel pink border on focus
                    color="primary" 
                    focused
                />

                {/* Password Field */}
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 4 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon sx={{ color: PASTEL_THEME.darkText }} />
                            </InputAdornment>
                        ),
                    }}
                    // Pastel pink border on focus
                    color="primary"
                    focused
                />

                {/* Login Button */}
                <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={handleSubmit}
                    sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        bgcolor: PASTEL_THEME.primary, // Pastel Pink button
                        color: PASTEL_THEME.darkText, // Rose Pink text on button
                        '&:hover': {
                            bgcolor: PASTEL_THEME.darkText, // Darker pink on hover
                            color: 'white',
                            transform: 'scale(1.02)',
                        }
                    }}
                >
                    Log In
                </Button>

                {/* Register Link */}
                <Typography sx={{ mt: 3, color: '#666' }}>
                    Don't have an account? 
                    <Link 
                        to="/register" 
                        style={{ 
                            color: PASTEL_THEME.darkText, // Rose Pink link
                            fontWeight: '600', 
                            textDecoration: 'none' 
                        }}
                    >
                        &nbsp;Create an account
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}