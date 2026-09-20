"use client";

import { useEffect, useState } from "react";
import { Box, Avatar, Pagination } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import CampaignIcon from "@mui/icons-material/Campaign";
import Link from "next/link";
import mqtt from "mqtt";

const ROWS_PER_PAGE = 10;

export default function Home() {


  const [data, setData] = useState([
    { name: "Temp", value: 0 },
    { name: "Humidity", value: 0 },
    { name: "Battery", value: 0 }
  ]);

  const [rows, setRows] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);

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

      {/* Live Dashboard + Tabelle */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 6,
          px: 3
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "900px",
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "bold",
            mb: 3,
            color: "#222"
          }}
        >
          🌻 Weather History Log
        </Box>

        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "white"
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "12px" }}>Date</th>
              <th style={{ border: "1px solid black", padding: "12px" }}>Time</th>
              <th style={{ border: "1px solid black", padding: "12px" }}>Temperature</th>
              <th style={{ border: "1px solid black", padding: "12px" }}>Humidity</th>
              <th style={{ border: "1px solid black", padding: "12px" }}>Latitude</th>
              <th style={{ border: "1px solid black", padding: "12px" }}>Longitude</th>
              <th style={{ border: "1px solid black", padding: "12px" }}>Battery</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRows.map((row, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "12px" }}>{row.date}</td>
                <td style={{ border: "1px solid black", padding: "12px" }}>{row.time}</td>
                <td style={{ border: "1px solid black", padding: "12px" }}>{row.temperature} °C</td>
                <td style={{ border: "1px solid black", padding: "12px" }}>{row.humidity} %</td>
                <td style={{ border: "1px solid black", padding: "12px" }}>{row.lat}</td>
                <td style={{ border: "1px solid black", padding: "12px" }}>{row.lon}</td>
                <td style={{ border: "1px solid black", padding: "12px" }}>{row.battery} %</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Box sx={{ mt: 3, mb: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Box>
    </Box>
  );
}