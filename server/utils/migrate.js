/* eslint-env node */
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");
const dbPath = path.join(dataDir, "portfolio.db");

async function migrate() {
  console.log("🚀 Starting Multi-Tenant Migration...");

  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const db = await open({ filename: dbPath, driver: sqlite3.Database });
  await db.run("PRAGMA journal_mode = WAL");
  await db.run("PRAGMA foreign_keys = ON");

  try {
    console.log("Creating users table if not exists...");
    await db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        email     TEXT UNIQUE NOT NULL,
        password  TEXT NOT NULL,
        username  TEXT UNIQUE,
        role      TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `);

    const tables = [
      "projects", "experiences", "educations", "technologies",
      "services", "testimonials", "socials", "certifications", "stats", "settings"
    ];

    for (const table of tables) {
      console.log(`Checking table: ${table}`);

      const tableInfo = await db.all(`PRAGMA table_info(${table})`);
      const hasUserId = tableInfo.some(col => col.name === "user_id");

      if (!hasUserId) {
        console.log(`Adding user_id to ${table}...`);
        await db.run(`ALTER TABLE ${table} ADD COLUMN user_id INTEGER`);

        console.log(`Assigning user_id = 1 to existing rows in ${table}...`);
        await db.run(`UPDATE ${table} SET user_id = 1 WHERE user_id IS NULL`);
      }
    }

    console.log("Creating indices...");
    for (const table of tables) {
      if (table === "settings") continue;
      await db.run(`CREATE INDEX IF NOT EXISTS idx_${table}_user_id ON ${table}(user_id)`);
    }

    console.log("✅ Migration completed successfully.");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  } finally {
    await db.close();
    process.exit(0);
  }
}

migrate();
