// src/pages/Register.js (Styled with Pastel Pink)
import React, { useState } from "react";
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    MenuItem,
    Paper, // Added Paper for styling
    InputAdornment, // Added InputAdornment for icons
} from "@mui/material";
import { 
    Lock as LockIcon, 
    Person as PersonIcon,
    AssignmentInd as AssignmentIndIcon, 
    Favorite as FavoriteIcon // Added aesthetic icon
} from '@mui/icons-material'; // Added icon imports
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Define the custom PASTEL PINK palette (consistent with Login)
const PASTEL_THEME = {
    primary: '#F8BBD0', // Light Pink / Main Pastel Accent
    secondary: '#FFEBEE', // Very Light Pink / Background Accent
    darkText: '#D81B60', // Rose Pink / Stronger Pink for text/icons
    lightBg: '#FAFAFA', // Near white background
};

export function Register({ onRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!username || !password || !role) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/api/user/register", {
                username,
                password,
                role,
            });

            alert(res.data);

            if (res.data === "Registration successful!") {
                // redirect to login
                navigate("/login");
            }

        } catch (err) {
            console.error(err);
            alert("Registration failed");
        }
    };

    return (
        // Main container with very light pink background
        <Box 
            sx={{ 
                pt: 8, 
                pb: 10, 
                minHeight: '100vh', 
                bgcolor: PASTEL_THEME.secondary, // Overall light background
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}
        >
            {/* Registration form container (Paper) */}
            <Paper
                elevation={8} // Subtle elevation
                sx={{ 
                    maxWidth: 420, 
                    width: '90%',
                    p: 5, 
                    borderRadius: 3, 
                    bgcolor: PASTEL_THEME.lightBg,
                    textAlign: 'center',
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
                        fontFamily: 'serif', 
                    }}
                >
                    <FavoriteIcon sx={{ mr: 1, fontSize: '2rem' }} /> Register
                </Typography>

                {/* Username Field */}
                <TextField
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 3 }} // Increased margin for spacing
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon sx={{ color: PASTEL_THEME.darkText }} />
                            </InputAdornment>
                        ),
                    }}
                    color="primary" // Apply primary color styling
                    focused
                />

                {/* Password Field */}
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 3 }} // Increased margin for spacing
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon sx={{ color: PASTEL_THEME.darkText }} />
                            </InputAdornment>
                        ),
                    }}
                    color="primary"
                    focused
                />

                {/* Role Selection Field (Select) */}
                <TextField
                    select
                    label="Select Role"
                    fullWidth
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{ mb: 4 }} // Increased margin before button
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AssignmentIndIcon sx={{ color: PASTEL_THEME.darkText }} />
                            </InputAdornment>
                        ),
                    }}
                    color="primary"
                    focused
                >
                    <MenuItem value="USER">User</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                </TextField>

                {/* Register Button */}
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
                    Register
                </Button>

                {/* Login Link */}
                <Typography sx={{ mt: 3, textAlign: "center", color: '#666' }}>
                    Already have an account? 
                    <Link 
                        to="/login" 
                        style={{ 
                            color: PASTEL_THEME.darkText, // Rose Pink link
                            fontWeight: '600', 
                            textDecoration: 'none' 
                        }}
                    >
                        &nbsp;Login here
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}