"use server";

// database.js
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "../wetterdaten.db"); // liegt im Projekt-Root
const db = new Database(dbPath);

// Tabelle hier ebenfalls sicherstellen, falls das MQTT-Skript nicht läuft
db.exec(`
  CREATE TABLE IF NOT EXISTS readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    time VARCHAR(50) NOT NULL,
    temperature FLOAT,
    humidity FLOAT,
    lon FLOAT,
    lat FLOAT,
    battery FLOAT
  );
`);

export async function getReadings() {
  const rows = db.prepare(`SELECT * FROM readings ORDER BY id DESC`).all();
  return rows;
}