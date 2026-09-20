// Exportiert data/wetterdaten.db nach public/readings.json (statischer Ersatz für die frühere Server Action)
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "wetterdaten.db");
const outPath = path.join(process.cwd(), "public", "readings.json");

let rows = [];
if (fs.existsSync(dbPath)) {
  const db = new Database(dbPath, { readonly: true });
  rows = db
    .prepare(
      "SELECT time, temperature, humidity, lon, lat, battery FROM readings ORDER BY id DESC"
    )
    .all();
  db.close();
} else {
  console.warn(`export-readings: ${dbPath} nicht gefunden, schreibe leere Liste`);
}

fs.writeFileSync(outPath, JSON.stringify(rows));
console.log(`export-readings: ${rows.length} Messwerte -> public/readings.json`);
