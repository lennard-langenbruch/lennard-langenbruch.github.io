"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

// MUI-Komponenten sollen wie der Rest der Seite in Arial rendern (statt Roboto)
const theme = createTheme({
  typography: { fontFamily: "Arial, Helvetica, sans-serif" }
});

export default function Providers({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
