/* eslint-disable no-undef */
import { createClient } from "@libsql/client";
import { PREMIUM_THEMES } from "../server/utils/themes.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env") });

async function sync() {
  try {
    console.log("URL:", process.env.TURSO_DATABASE_URL);
    const client = createClient({ 
      url: process.env.TURSO_DATABASE_URL, 
      authToken: process.env.TURSO_AUTH_TOKEN 
    });
    
    const rows = await client.execute("SELECT id, name FROM themes");
    console.log("Existing themes:", rows.rows);

    await client.execute("DELETE FROM themes WHERE isPublic = 1");
    console.log("Deleted old public themes.");

    for (const theme of PREMIUM_THEMES) {
      await client.execute({
        sql: "INSERT INTO themes (user_id, name, config, isPublic, isDefault, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
        args: [1, theme.name, JSON.stringify(theme.config), theme.isPublic, theme.isDefault, new Date().toISOString()]
      });
      console.log("Inserted:", theme.name);
    }
    console.log("Sync complete!");
  } catch (err) {
    console.error("Error syncing Turso:", err);
  }
}

sync();
