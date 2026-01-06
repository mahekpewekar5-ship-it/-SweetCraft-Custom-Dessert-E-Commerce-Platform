import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#ff4b81" },
    secondary: { main: "#ffe6ea" },
    background: { default: "#fff0f4" },
    text: { primary: "#333" },
  },
  typography: {
    fontFamily: "Poppins, Roboto, Arial, sans-serif",
  },
});

export default theme;
