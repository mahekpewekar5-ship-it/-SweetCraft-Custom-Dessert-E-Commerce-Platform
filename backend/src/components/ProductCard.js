import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { productImagePath } from "../utils/imageHelpers";

export default function ProductCard({ product, onCustomize }) {
  const img = productImagePath(product);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        border: "1px solid #ffd7e8",
        backgroundColor: "#fff7fa",
        transition: "0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0px 6px 16px rgba(255, 182, 193, 0.4)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={img}
        alt={product.name}
        sx={{ borderRadius: "16px 16px 0 0" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ color: "#b0205b", fontWeight: "bold" }}>
          {product.name}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: "#7a3550" }}>
          {product.description}
        </Typography>

        <Typography
          variant="h6"
          sx={{ mt: 1, fontWeight: "700", color: "#c2185b" }}
        >
          ₹{product.base_price ?? product.basePrice}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, gap: 1 }}>
        <Button
          fullWidth
          size="small"
          variant="contained"
          sx={{
            background: "#ff4f7b",
            "&:hover": { background: "#e63e69" },
            borderRadius: "10px",
          }}
          onClick={() => onCustomize(product.id)}
        >
          Customize
        </Button>

        <Button
          fullWidth
          size="small"
          sx={{
            borderRadius: "10px",
            color: "#b0205b",
            border: "1px solid #ffb6c1",
            "&:hover": { background: "#ffe6ef" },
          }}
          component="a"
          href={`/product/${product.id}`}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
