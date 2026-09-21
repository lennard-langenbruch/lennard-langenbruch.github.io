"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

// MUI-Komponenten sollen wie der Rest der Seite in Arial rendern (statt Roboto)
const theme = createTheme({
  typography: { fontFamily: "Arial, Helvetica, sans-serif" },
  // lg = 1280: erst ab dieser Breite ist Platz für Tabelle plus zwei Seitenkarten
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1280, xl: 1536 } }
});

export default function Providers({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
