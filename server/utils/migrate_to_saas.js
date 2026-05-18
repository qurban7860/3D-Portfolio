/* eslint-env node */
import { initializeDatabase, getDb } from "../db.js";

async function migrate() {
  console.log("🚀 Starting SaaS Multi-tenant Migration...");
  
  await initializeDatabase();
  const db = getDb();

  try {
    await db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        email     TEXT UNIQUE NOT NULL,
        password  TEXT NOT NULL,
        username  TEXT UNIQUE,
        role      TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )
    `);

    const tables = [
      "projects", "experiences", "educations", "technologies", 
      "services", "testimonials", "socials", "certifications", 
      "stats", "faqs", "settings", "themes"
    ];

    for (const table of tables) {
      const info = await db.all(`PRAGMA table_info(${table})`);
      const hasUserId = info.some(col => col.name === "user_id");

      if (!hasUserId) {
        console.log(`➕ Adding user_id to ${table}...`);
        try {
          await db.run(`ALTER TABLE ${table} ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE`);
        } catch (err) {
          console.warn(`⚠️ Could not add user_id to ${table}: ${err.message}`);
        }
      }
    }

    const adminUser = await db.get("SELECT id FROM users WHERE id = 1");
    if (!adminUser) {
      console.log("👤 Creating default admin user (id: 1)...");
      await db.run(`
        INSERT OR IGNORE INTO users (id, email, password, username, role, createdAt)
        VALUES (1, 'admin@gmail.com', 'placeholder_hash', 'admin', 'admin', ?)
      `, new Date().toISOString());
    }

    for (const table of tables) {
      console.log(`📦 Migrating data for ${table}...`);
      await db.run(`UPDATE ${table} SET user_id = 1 WHERE user_id IS NULL OR user_id = 0`);
    }

    console.log("🌱 Force-seeding premium themes...");
    const { PREMIUM_THEMES } = await import("./themes.js");
    for (const theme of PREMIUM_THEMES) {
      const existing = await db.get("SELECT id FROM themes WHERE name = ? AND user_id = 1", theme.name);
      if (!existing) {
        await db.run(
          "INSERT INTO themes (user_id, name, config, isPublic, isDefault, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
          1, theme.name, JSON.stringify(theme.config), theme.isPublic, theme.isDefault, new Date().toISOString()
        );
      } else {
        await db.run(
          "UPDATE themes SET config = ?, isPublic = ?, isDefault = ? WHERE id = ?",
          JSON.stringify(theme.config), theme.isPublic, theme.isDefault, existing.id
        );
      }
    }

    console.log("✅ Migration completed successfully.");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

migrate();
