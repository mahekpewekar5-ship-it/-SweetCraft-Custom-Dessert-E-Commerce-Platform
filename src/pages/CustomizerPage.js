import React, { useEffect, useState, useMemo } from "react";
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    CircularProgress, 
    Paper, // Added Paper for elevation and grouping
    Grid,  // Added Grid for optional responsive layout, though keeping single column structure
    Stack  // Added Stack for consistent vertical spacing
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";
import { getOptionsByType } from "../api/options";
import { addToCart } from "../api/cart";
import SingleOptionSelector from "../components/SingleOptionSelector";
import ToppingsSelector from "../components/ToppingsSelector";
import PriceBox from "../components/PriceBox";

// Helper for image path (based on existing usage)
const productImagePath = (product) => `/images/${product.image}`;

export default function CustomizerPage({currentUser}) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [opts, setOpts] = useState({});
  const [selectedSingle, setSelectedSingle] = useState({});
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  // 1. Add state for the custom message
  const [customMessage, setCustomMessage] = useState("");

  // Fetch product + options
  useEffect(() => {
    Promise.all([
      getProductById(productId),
      getOptionsByType("topping"),
      getOptionsByType("size"),
      getOptionsByType("flavor"),
      getOptionsByType("shape"),
      getOptionsByType("decoration"),
    ])
      .then(([pRes, tRes, sizeRes, flavorRes, shapeRes, decoRes]) => {
        setProduct(pRes.data);
        setOpts({
          topping: tRes.data,
          size: sizeRes.data,
          flavor: flavorRes.data,
          shape: shapeRes.data,
          decoration: decoRes.data,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [productId]);

  // Calculate total price dynamically
  const totalPrice = useMemo(() => {
    if (!product) return 0;
    let tmp = product.basePrice;

    Object.entries(selectedSingle).forEach(([key, id]) => {
      const found = (opts[key] || []).find(o => o.id.toString() === id.toString());
      if (found) tmp += found.extraPrice ?? found.extra_price ?? 0;
    });

    selectedToppings.forEach(tid => {
      const found = (opts.topping || []).find(o => o.id.toString() === tid.toString());
      if (found) tmp += found.extraPrice ?? found.extra_price ?? 0;
    });

    return tmp * quantity;
  }, [product, selectedSingle, selectedToppings, quantity, opts]);

  useEffect(() => {
    setTotal(totalPrice);
  }, [totalPrice]);

const handleAddToCart = () => {
  if (!currentUser?.username) {
    alert("Please login first!");
    navigate("/login");
    return;
  }

  const payload = {
    username: currentUser.username,
    productId: product.id,
    name: product.name,
    image: product.image,
    basePrice: product.basePrice,
    quantity,
    totalPrice: total,
    selectedSingle: JSON.stringify(selectedSingle),
    selectedToppings: JSON.stringify(selectedToppings),
    // 3. Add the custom message to the payload
    customMessage: customMessage,
  };

  addToCart(payload)
    .then(() => navigate("/cart"))
    .catch(console.error);
};
  if (loading) return <Box sx={{ textAlign: "center", mt: 6 }}><CircularProgress color="secondary" /></Box>;
  if (!product) return <Typography sx={{ p: 3 }}>Product not found.</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: 'auto', bgcolor: '#f7f7f7' }}>
        <Paper elevation={8} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, bgcolor: '#ffffff' }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    mb: 3, 
                    fontWeight: '800', 
                    color: '#A00045', // Primary accent color
                    textAlign: 'center' 
                }}
            >
                Customize Your {product.name} 🎂
            </Typography>

            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <img 
                    src={productImagePath(product)} 
                    alt={product.name} 
                    style={{ 
                        width: '100%', 
                        maxWidth: 300, 
                        height: 'auto',
                        borderRadius: 12, 
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                        border: '3px solid #f8bbd0'
                    }} 
                />
            </Box>

            <Typography variant="body1" sx={{ mt: 2, mb: 3, color: 'text.secondary', textAlign: 'center' }}>
                {product.description}
            </Typography>

            {/* Customization Options Section */}
            <Paper variant="outlined" sx={{ mt: 3, p: 3, borderRadius: 2, bgcolor: '#fffafa', border: '1px solid #ffe5e5' }}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        mb: 3, 
                        pb: 1, 
                        fontWeight: 'bold',
                        color: '#A00045',
                        borderBottom: '2px solid #f8bbd0' 
                    }}
                >
                    Cake Options & Personalization
                </Typography>

                <Stack spacing={3}>
                    <SingleOptionSelector 
                  title="Size" 
                  options={opts.size || []} 
                  selected={selectedSingle.size} 
                  onChange={(v) => setSelectedSingle(prev => ({ ...prev, size: v }))} 
                />
                <SingleOptionSelector 
                  title="Flavor" 
                  options={opts.flavor || []} 
                  selected={selectedSingle.flavor} 
                  onChange={(v) => setSelectedSingle(prev => ({ ...prev, flavor: v }))} 
                />
                <SingleOptionSelector 
                  title="Shape" 
                  options={opts.shape || []} 
                  selected={selectedSingle.shape} 
                  onChange={(v) => setSelectedSingle(prev => ({ ...prev, shape: v }))} 
                />
                <SingleOptionSelector 
                  title="Decoration" 
                  options={opts.decoration || []} 
                  selected={selectedSingle.decoration} 
                  onChange={(v) => setSelectedSingle(prev => ({ ...prev, decoration: v }))} 
                />

                <ToppingsSelector 
                  title="Toppings" 
                  options={opts.topping || []} 
                  selected={selectedToppings} 
                  onChange={setSelectedToppings} 
                />

                {/* Custom Message Text Field */}
                <Box sx={{ mt: 1, p: 2, border: '1px solid #f8bbd0', borderRadius: 1, bgcolor: '#fefefe' }}>
                    <TextField
                        label="Custom Message (e.g., 'Happy Birthday, John!')"
                        placeholder="Enter a short message to be written to customize your desert or cake."
                        multiline
                        rows={3}
                        fullWidth
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        variant="outlined"
                    />
                </Box>
                </Stack>
            </Paper>


            {/* Price and Action Section */}
            <Box sx={{ 
                mt: 4, 
                p: 3, 
                bgcolor: '#e6e6fa', // Light, attractive background for the action area
                borderRadius: 2, 
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' 
            }}>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} sm={4}>
                        <TextField
                            type="number"
                            label="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value || "1")))}
                            fullWidth
                            InputProps={{ inputProps: { min: 1 } }}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} sx={{ textAlign: 'right' }}>
                         {/* PriceBox is assumed to be styled internally */}
                        <PriceBox price={total} /> 
                    </Grid>
                </Grid>

                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ 
                        mt: 3, 
                        py: 1.5, 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        bgcolor: '#A00045', // Strong primary color
                        '&:hover': { 
                            bgcolor: '#800037',
                            transform: 'scale(1.01)' 
                        },
                        transition: 'transform 0.2s'
                    }} 
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </Box>
        </Paper>
    </Box>
  );
}