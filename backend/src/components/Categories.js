import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../api/categories";
import getCategoryImage from "../utils/categoryImageMap";

export default function Categories() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories()
      .then((res) => setList(res.data))
      .catch(console.error);
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", color: "#c2185b" }}
      >
        Shop by Category
      </Typography>

      <Grid container spacing={3}>
        {list.map((cat) => (
          <Grid item key={cat.id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: "18px",
                overflow: "hidden",
                border: "1px solid #ffc9dd",
                backgroundColor: "#fff5f9",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0px 6px 14px rgba(255, 182, 193, 0.35)",
                },
              }}
            >
              <CardActionArea onClick={() => navigate(`/category/${cat.id}`)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={getCategoryImage(cat)}
                  alt={cat.name}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    sx={{ fontWeight: "bold", color: "#a32456" }}
                  >
                    {cat.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
