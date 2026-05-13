/* eslint-env node */
import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data", "portfolio.db");

async function migrate() {
  console.log("🚀 Starting Multi-Tenant Migration...");

  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  let client;
  if (tursoUrl && tursoUrl.startsWith("libsql://")) {
    client = createClient({ url: tursoUrl, authToken: tursoToken });
  } else {
    const dataDir = path.join(__dirname, "..", "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    client = createClient({ url: `file:${dbPath}` });
  }

  try {
    console.log("Creating users table if not exists...");
    await client.execute(`
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
      
      const tableInfo = await client.execute(`PRAGMA table_info(${table})`);
      const hasUserId = tableInfo.rows.some(col => col.name === "user_id");

      if (!hasUserId) {
        console.log(`Adding user_id to ${table}...`);
        await client.execute(`ALTER TABLE ${table} ADD COLUMN user_id INTEGER`);
        
        console.log(`Assigning user_id = 1 to existing rows in ${table}...`);
        await client.execute(`UPDATE ${table} SET user_id = 1 WHERE user_id IS NULL`);
      }
    }
    console.log("Creating indices...");
    for (const table of tables) {
        if (table === 'settings') continue; 
        await client.execute(`CREATE INDEX IF NOT EXISTS idx_${table}_user_id ON ${table}(user_id)`);
    }

    console.log("✅ Migration completed successfully.");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  } finally {
    process.exit(0);
  }
}

migrate();
