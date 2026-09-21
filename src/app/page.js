"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import CampaignIcon from "@mui/icons-material/Campaign";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import Link from "next/link";
import mqtt from "mqtt";

const ROWS_PER_PAGE = 10;

const isNum = (v) => typeof v === "number" && !Number.isNaN(v);

function temperatureColor(t) {
  if (t < 10) return "info";
  if (t <= 25) return "success";
  if (t <= 30) return "warning";
  return "error";
}

function batteryColor(b) {
  if (b < 20) return "error";
  if (b < 50) return "warning";
  return "success";
}

const headCellSx = {
  bgcolor: "#f8fafc",
  color: "text.secondary",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  borderBottom: "1px solid #e2e8f0",
  whiteSpace: "nowrap"
};

const numSx = { fontVariantNumeric: "tabular-nums" };

function Empty() {
  return <Box component="span" sx={{ color: "text.disabled" }}>–</Box>;
}

export default function Home() {


  const [data, setData] = useState([
    { name: "Temp", value: 0 },
    { name: "Humidity", value: 0 },
    { name: "Battery", value: 0 }
  ]);

  const [rows, setRows] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);

  // Historie aus dem statischen Export der Datenbank laden
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch("/readings.json");
        const dbRows = await res.json();
        const mapped = dbRows.map((r) => {
          const d = new Date(r.time);
          return {
            date: d.toLocaleDateString(),
            time: d.toLocaleTimeString(),
            temperature: r.temperature ?? "-",
            humidity: r.humidity ?? "-",
            lon: r.lon ?? "-",
            lat: r.lat ?? "-",
            battery: r.battery ?? "-"
          };
        });
        // Live-Zeilen, die schon per MQTT eingetroffen sind, bleiben oben
        setRows((prev) => [...prev, ...mapped]);
      } catch (err) {
        console.error("Failed to load readings:", err);
      }
    }
    loadHistory();
  }, []);

  // MQTT Connector
  useEffect(() => {
    const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt");

    client.on("connect", () => {
      console.log("MQTT connected");
      client.subscribe("fhswf/lennard/json");
    });

    client.on("message", (topic, message) => {
      try {
        console.log("RAW:", message.toString());
        const payload = JSON.parse(message.toString());

        // Aktuelle Sensordaten
        setData([
          { name: "Temperature", value: payload.temperature ?? 0 },
          { name: "Humidity", value: payload.humidity ?? 0 },
          { name: "Battery", value: payload.battery ?? 0 }
        ]);

        // Neue Zeile an die Tabelle anhängen (live, on top)
        const now = new Date();
        setRows((prev) => [
          {
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            temperature: payload.temperature ?? "-",
            humidity: payload.humidity ?? "-",
            lon: payload.lon ?? "-",
            lat: payload.lat ?? "-",
            battery: payload.battery ?? "-"
          },
          ...prev
        ]);
      } catch (err) {
        console.error("Invalid MQTT message:", err);
      }
    });

    client.on("error", (err) => {
      console.error("MQTT error:", err);
    });

    return () => client.end();
  }, []);

  // Paginierte Zeilen berechnen
  const pageCount = Math.max(1, Math.ceil(rows.length / ROWS_PER_PAGE));
  const paginatedRows = rows.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ fontFamily: "Arial, sans-serif" }}>
      <style jsx global>{`
        a.nav-link:link,
        a.nav-link:visited {
          color: white;
        }
        a.nav-link-history:link,
        a.nav-link-history:visited {
          color: lightblue;
        }
      `}</style>

      {/* Header */}
      <Box
        sx={{
          width: "100%",
          height: 90,
          display: "flex",
          justifyContent: "center",
          px: 3,
          color: "white",
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
            url("https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <h3 style={{ margin: 0 }}>
            <Link className="nav-link" href="/live"> Live Dashboard </Link> | <Link className="nav-link nav-link-history" href="/">Weatherdata History</Link>
          </h3>
        </Box>
      </Box>

      {/* Tabelle */}
      <Box sx={{ color: "#1a2027", minHeight: "calc(100vh - 90px)", px: { xs: 1.5, sm: 3 }, py: 6 }}>
        <Box sx={{ maxWidth: 1000, mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              mb: 3
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 3,
                  color: "white",
                  background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 60%, #7c3aed 100%)",
                  boxShadow: "0 8px 20px rgba(79, 70, 229, 0.35)"
                }}
              >
                <ThermostatIcon sx={{ fontSize: 30 }} />
              </Box>
              <Box>
                <Typography
                  variant="overline"
                  sx={{ display: "block", lineHeight: 1.6, color: "#6366f1", fontWeight: 700, letterSpacing: "0.14em" }}
                >
                  Weather Station
                </Typography>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    background: "linear-gradient(90deg, #1e1b4b 0%, #4f46e5 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Weather History Log
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                  Temperature, humidity and battery over time
                </Typography>
              </Box>
            </Box>
            <Chip
              label={`${rows.length} Messwerte`}
              sx={{ bgcolor: "#eef2ff", color: "#4338ca", fontWeight: 600, border: "1px solid #c7d2fe" }}
            />
          </Box>

          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #e2e8f0",
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(15, 23, 42, 0.06)"
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 720 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={headCellSx}>Date</TableCell>
                    <TableCell sx={headCellSx}>Time</TableCell>
                    <TableCell sx={headCellSx}>Temperature</TableCell>
                    <TableCell sx={headCellSx}>Humidity</TableCell>
                    <TableCell sx={headCellSx} align="right">Latitude</TableCell>
                    <TableCell sx={headCellSx} align="right">Longitude</TableCell>
                    <TableCell sx={headCellSx}>Battery</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedRows.map((row, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{
                        "&:nth-of-type(even)": { bgcolor: "#fafbfc" },
                        "&:last-child td": { borderBottom: 0 },
                        "& td": { borderBottom: "1px solid #eef2f6", py: 1.5 }
                      }}
                    >
                      <TableCell sx={{ ...numSx, fontWeight: 600 }}>{row.date}</TableCell>
                      <TableCell sx={{ ...numSx, color: "text.secondary" }}>{row.time}</TableCell>
                      <TableCell>
                        {isNum(row.temperature) ? (
                          <Chip
                            size="small"
                            variant="outlined"
                            color={temperatureColor(row.temperature)}
                            label={`${row.temperature} °C`}
                            sx={{ fontWeight: 600, ...numSx }}
                          />
                        ) : (
                          <Empty />
                        )}
                      </TableCell>
                      <TableCell sx={numSx}>
                        {isNum(row.humidity) ? `${row.humidity} %` : <Empty />}
                      </TableCell>
                      <TableCell align="right" sx={{ ...numSx, color: "text.secondary" }}>
                        {isNum(row.lat) ? row.lat : <Empty />}
                      </TableCell>
                      <TableCell align="right" sx={{ ...numSx, color: "text.secondary" }}>
                        {isNum(row.lon) ? row.lon : <Empty />}
                      </TableCell>
                      <TableCell sx={{ minWidth: 130 }}>
                        {isNum(row.battery) ? (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <LinearProgress
                              variant="determinate"
                              value={Math.min(100, Math.max(0, row.battery))}
                              color={batteryColor(row.battery)}
                              sx={{ flex: 1, height: 6, borderRadius: 3, bgcolor: "#e9eef3" }}
                            />
                            <Box component="span" sx={{ ...numSx, fontSize: 13, minWidth: 34, textAlign: "right" }}>
                              {row.battery} %
                            </Box>
                          </Box>
                        ) : (
                          <Empty />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}

                  {paginatedRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 6, color: "text.secondary" }}>
                        Noch keine Messwerte
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
                px: 2,
                py: 1.5,
                borderTop: "1px solid #e2e8f0",
                bgcolor: "#f8fafc"
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {rows.length === 0
                  ? "0 Einträge"
                  : `${(page - 1) * ROWS_PER_PAGE + 1}–${Math.min(page * ROWS_PER_PAGE, rows.length)} von ${rows.length}`}
              </Typography>
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
                size="small"
                sx={{
                  "& .MuiPaginationItem-root.Mui-selected": {
                    bgcolor: "#4f46e5",
                    color: "white",
                    "&:hover": { bgcolor: "#4338ca" }
                  }
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
