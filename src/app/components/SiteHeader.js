"use client";

import Link from "next/link";
import { Box } from "@mui/material";
import { accent } from "../accent";

const items = [
  { key: "live", href: "/live", label: "Live Dashboard" },
  { key: "history", href: "/", label: "Weatherdata History" }
];

// Kopfbereich mit Hintergrundbild, Menü als Pill-Schalter (links) und Markenname (rechts)
// `active` = "live" | "history"
export default function SiteHeader({ active }) {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        boxSizing: "border-box",
        height: 90,
        px: { xs: 2, sm: 3 },
        color: "white",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        backgroundImage: `
          linear-gradient(rgba(10,16,38,0.72), rgba(10,16,38,0.55)),
          url("https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Box
        sx={{
          height: "100%",
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", sm: "space-between" }
        }}
      >
        <Box
          component="nav"
          aria-label="Hauptmenü"
          sx={{
            display: "flex",
            gap: 0.5,
            p: 0.5,
            borderRadius: 999,
            bgcolor: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)"
          }}
        >
          {items.map(({ key, href, label }) => {
            const isActive = active === key;
            return (
              <Box
                key={key}
                component={Link}
                href={href}
                aria-current={isActive ? "page" : undefined}
                sx={{
                  px: { xs: 1.75, sm: 2.5 },
                  py: 1,
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  color: isActive ? "white" : "rgba(255,255,255,0.82)",
                  bgcolor: isActive ? "rgba(66,99,235,0.88)" : "transparent",
                  boxShadow: isActive ? "0 4px 14px rgba(66,99,235,0.45)" : "none",
                  transition: "background-color .2s, color .2s",
                  "&:hover": {
                    color: "white",
                    bgcolor: isActive ? "rgba(66,99,235,0.95)" : "rgba(255,255,255,0.14)"
                  },
                  "&:focus-visible": { outline: "2px solid white", outlineOffset: 2 }
                }}
              >
                {label}
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 1.25,
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "0.02em"
          }}
        >
          <Box
            component="span"
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: accent.soft,
              boxShadow: `0 0 0 4px rgba(116,143,252,0.25)`
            }}
          />
          Weather Station (Wuppertal)
        </Box>
      </Box>
    </Box>
  );
}
