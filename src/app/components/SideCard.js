"use client";

import { Box, Paper, Typography } from "@mui/material";
import { accent } from "../accent";

// Seitenkarte mit Bild, Titel und Datenzeilen; nur auf breiten Bildschirmen sichtbar (lg)
// `column` = Grid-Spalte im Seitenlayout (1 = links, 3 = rechts)
export default function SideCard({ column, image, alt, eyebrow, title, groupLabel, rows }) {
  return (
    <Box
      component="aside"
      sx={{ display: { xs: "none", lg: "block" }, gridColumn: column, gridRow: 2, position: "sticky", top: 24 }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(15, 23, 42, 0.06)"
        }}
      >
        <Box component="img" src={image} alt={alt} sx={{ display: "block", width: "100%", height: "auto" }} />
        <Box sx={{ p: 2 }}>
          <Typography
            variant="overline"
            sx={{ display: "block", lineHeight: 1.6, color: accent.main, fontWeight: 700, letterSpacing: "0.14em" }}
          >
            {eyebrow}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            {title}
          </Typography>

          {rows && (
            <Box sx={{ mt: 1.5 }}>
              {groupLabel && (
                <Typography variant="caption" sx={{ display: "block", color: "text.secondary", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", mb: 0.5 }}>
                  {groupLabel}
                </Typography>
              )}
              <Box component="dl" sx={{ m: 0 }}>
                {rows.map(([label, value]) => (
                  <Box
                    key={label}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 1,
                      py: 0.75,
                      borderTop: "1px solid #eef2f6",
                      fontSize: 13
                    }}
                  >
                    <Box component="dt" sx={{ color: "text.secondary" }}>{label}</Box>
                    <Box component="dd" sx={{ m: 0, fontWeight: 700, textAlign: "right" }}>{value}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
