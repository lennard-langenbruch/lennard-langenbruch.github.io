"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import NavMenu from "../components/NavMenu";
import mqtt from "mqtt";
import PageBackground from "../components/PageBackground";

export default function LiveCurrent() {
const [latest, setLatest] = useState(null);
const [connected, setConnected] = useState(false);

// MQTT Connector — einzige Datenquelle
useEffect(() => {
const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt");

client.on("connect", () => {
    console.log("MQTT connected");
    setConnected(true);
    client.subscribe("fhswf/lennard/json");
});

client.on("message", (topic, message) => {
    try {
    const payload = JSON.parse(message.toString());
    const now = new Date();

    setLatest({
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        temperature: payload.temperature ?? "-",
        humidity: payload.humidity ?? "-",
        lon: payload.lon ?? "-",
        lat: payload.lat ?? "-",
        battery: payload.battery ?? "-",
        gps: payload.gps ?? "-",
    });
    } catch (err) {
    console.error("Invalid MQTT message:", err);
    }
});

client.on("close", () => setConnected(false));
client.on("error", (err) => {
    console.error("MQTT error:", err);
    setConnected(false);
});

return () => client.end();
}, []);

return (
<Box sx={{ fontFamily: "Arial, sans-serif" }}>
    <PageBackground variant="dark" />

    {/* HEADER */}
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
        backgroundPosition: "center",
    }}
    >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <NavMenu active="live" />
    </Box>
    </Box>

    {/* Aktueller Wert */}
    <Box
    sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 6,
        px: 3,
    }}
    >
    <Box
        sx={{
        width: "100%",
        maxWidth: "500px",
        textAlign: "center",
        fontSize: "32px",
        fontWeight: "bold",
        mb: 1,
        color: "#f1f5f9",
        }}
    >
        🔴 Live Dashboard
    </Box>

    <Box
        sx={{
        fontSize: "14px",
        color: connected ? "#4ade80" : "#94a3b8",
        mb: 3,
        }}
    >
        {connected ? "● Live connected" : "○ Connect..."}
    </Box>

    {!latest ? (
        <Box sx={{ color: "#cbd5e1" }}>Waiting for data ...</Box>
    ) : (
        <Box
        sx={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "white",
            border: "1px solid black",
            borderRadius: "8px",
            overflow: "hidden",
        }}
        >
        <Box
            sx={{
            px: 3,
            py: 1.5,
            borderBottom: "1px solid #ccc",
            fontSize: "14px",
            color: "#666",
            }}
        >
            {latest.date} — {latest.time}
        </Box>

        <Box sx={{ px: 3, py: 2 }}>
            <Row label="Temperature" value={`${latest.temperature} °C`} big />
            <Row
            label="Humidity"
            value={`${latest.humidity} %`}
            big
            />
            <Row label="Battery" value={`${latest.battery} %`} />
            <Row label="GPS Status" value={latest.gps} />
            <Row label="Latitude" value={latest.lat} />
            <Row label="Longitude" value={latest.lon} />
        </Box>
        </Box>
    )}
    </Box>
</Box>
);
}

function Row({ label, value, big }) {
return (
<Box
    sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    py: big ? 1.5 : 1,
    borderBottom: "1px solid #eee",
    }}
>
    <Box sx={{ color: "#666", fontSize: big ? "16px" : "14px" }}>{label}</Box>
    <Box sx={{ fontWeight: "bold", fontSize: big ? "28px" : "16px" }}>
    {value}
    </Box>
</Box>
);
}