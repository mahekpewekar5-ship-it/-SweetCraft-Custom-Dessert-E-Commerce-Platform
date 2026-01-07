import React from "react";
import { Typography, Paper } from "@mui/material";

export default function PriceBox({ price }) {
  return (
    <Paper sx={{ display: "inline-block", p: 2, mt: 2, background: "#fff0f4", border: "1px solid #ffd6e0" }}>
      <Typography variant="subtitle2" color="primary">Total Price</Typography>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>₹{price}</Typography>
    </Paper>
  );
}