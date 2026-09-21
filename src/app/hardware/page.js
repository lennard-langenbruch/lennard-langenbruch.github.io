"use client";

import { Box, Typography } from "@mui/material";
import PageBackground from "../components/PageBackground";
import SiteHeader from "../components/SiteHeader";
import InfoCard from "../components/InfoCard";
import { accent } from "../accent";

export default function Hardware() {
  return (
    <Box sx={{ fontFamily: "Arial, sans-serif" }}>
      <PageBackground />
      <SiteHeader active="hardware" />

      <Box sx={{ color: "#1a2027", minHeight: "calc(100vh - 90px)", px: { xs: 1.5, sm: 3 }, py: 6 }}>
        <Box sx={{ maxWidth: 1000, mx: "auto" }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="overline"
              sx={{ display: "block", lineHeight: 1.6, color: accent.main, fontWeight: 700, letterSpacing: "0.14em" }}
            >
              Weather Station
            </Typography>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.01em",
                lineHeight: 1.15,
                background: `linear-gradient(90deg, ${accent.ink} 0%, ${accent.main} 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Hardware
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))"
              },
              gap: 3,
              alignItems: "start"
            }}
          >
            <InfoCard
              image="/images/bme680.webp"
              alt="BME680 sensor board"
              eyebrow="Sensor"
              title="BME680"
              groupLabel="Deviation"
              rows={[
                ["Temperature", "±1.0 °C"],
                ["Humidity", "±3 % RH"],
                ["Pressure", "±1 hPa"]
              ]}
            />
            <InfoCard
              image="/images/t-sim7000g.webp"
              alt="T-SIM7000G board"
              eyebrow="Hardware"
              title="T-SIM7000G"
              rows={[
                ["Cores", "2 (dual-core)"],
                ["Clock", "80 MHz"],
                ["Cellular", "LTE"],
                ["Positioning", "GPS"]
              ]}
            />
            <InfoCard eyebrow="Coming soon" title="More hardware" text="Lorem ipsum dolor sit amet." />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
