import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // <-- import Footer
import Home from "./pages/Home";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import CustomizerPage from "./pages/CustomizerPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrdersPage from "./pages/OrdersPage";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) setCurrentUser(JSON.parse(user));
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      
      <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route path="/categories" element={<CategoryProducts />} />
          <Route 
            path="/product/:productId" 
            element={<ProductDetails currentUser={currentUser} />} 
          />
          <Route
            path="/customize/:productId"
            element={<CustomizerPage currentUser={currentUser} />}
          />

          {/* Auth pages */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />

          {/* Protected User Routes */}
          <Route
            path="/cart"
            element={
              currentUser ? <CartPage currentUser={currentUser} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/checkout"
            element={
              currentUser ? <Checkout currentUser={currentUser} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/orders"
            element={
              currentUser ? <OrdersPage currentUser={currentUser} /> : <Navigate to="/login" />
            }
          />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              currentUser?.role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/" />
            }
          />  

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>

      {/* Footer visible on every page */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
