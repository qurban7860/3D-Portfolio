/* eslint-disable no-undef */
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@libsql/client";
import { seedDatabase } from "./utils/seed.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "portfolio.db");

let database;

// Unified Database Adapter using @libsql/client
class DatabaseAdapter {
  constructor(client) {
    this.client = client;
  }

  async all(sql, ...params) {
    try {
      const args = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
      const result = await this.client.execute({ sql, args });
      return result.rows;
    } catch (err) {
      console.error("DB Query All Error:", err);
      throw err;
    }
  }

  async get(sql, ...params) {
    try {
      const args = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
      const result = await this.client.execute({ sql, args });
      return result.rows[0];
    } catch (err) {
      console.error("DB Query Get Error:", err);
      throw err;
    }
  }

  async run(sql, ...params) {
    try {
      const args = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
      const result = await this.client.execute({ sql, args });
      return { 
        lastID: result.lastInsertRowid !== null && result.lastInsertRowid !== undefined ? Number(result.lastInsertRowid) : 0,
        changes: result.rowsAffected 
      };
    } catch (err) {
      console.error("DB Run Error:", err);
      throw err;
    }
  }

  async exec(sql) {
    try {
      return await this.client.executeMultiple(sql);
    } catch (err) {
      console.error("DB Exec Error:", err);
      throw err;
    }
  }
}

let initPromise = null;

export async function initializeDatabase() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const tursoUrl = process.env.TURSO_DATABASE_URL;
      const tursoToken = process.env.TURSO_AUTH_TOKEN;

      let client;

      if (tursoUrl && tursoUrl.startsWith("libsql://")) {
        console.log("🚀 Connecting to Turso...");
        client = createClient({
          url: tursoUrl,
          authToken: tursoToken,
        });
      } else {
        console.log("🏠 Connecting to Local Libsql...");
        
        const { mkdirSync, existsSync } = await import("fs");
        
        if (!existsSync(dataDir)) {
          mkdirSync(dataDir, { recursive: true });
        }
        
        client = createClient({
          url: `file:${dbPath}`,
        });
      }

      database = new DatabaseAdapter(client);
      await client.execute("SELECT 1");

      await database.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL,
          createdAt TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS projects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          imageUrl TEXT NOT NULL,
          sourceCodeLink TEXT NOT NULL,
          tags TEXT NOT NULL,
          featured INTEGER DEFAULT 0,
          visible INTEGER DEFAULT 1,
          orderIndex INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS experiences (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          companyName TEXT NOT NULL,
          instituteUrl TEXT NOT NULL,
          iconUrl TEXT NOT NULL,
          iconBg TEXT NOT NULL,
          date TEXT NOT NULL,
          points TEXT NOT NULL,
          visible INTEGER DEFAULT 1,
          orderIndex INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS educations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          degree TEXT NOT NULL,
          instituteName TEXT NOT NULL,
          instituteUrl TEXT NOT NULL,
          imageUrl TEXT NOT NULL,
          points TEXT NOT NULL,
          visible INTEGER DEFAULT 1,
          orderIndex INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS technologies (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          iconUrl TEXT NOT NULL,
          visible INTEGER DEFAULT 1,
          orderIndex INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS services (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          icon TEXT NOT NULL,
          features TEXT NOT NULL,
          visible INTEGER DEFAULT 1,
          orderIndex INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS testimonials (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          testimonial TEXT NOT NULL,
          name TEXT NOT NULL,
          imageUrl TEXT NOT NULL,
          visible INTEGER DEFAULT 1,
          orderIndex INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS socials (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          url TEXT NOT NULL,
          icon TEXT NOT NULL,
          visible INTEGER DEFAULT 1,
          orderIndex INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS certifications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          issuer TEXT NOT NULL,
          date TEXT NOT NULL,
          icon TEXT NOT NULL,
          visible INTEGER DEFAULT 1,
          orderIndex INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS stats (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          stat TEXT NOT NULL,
          label TEXT NOT NULL,
          description TEXT NOT NULL,
          visible INTEGER DEFAULT 1,
          orderIndex INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL
        );
      `);

      // Seed if necessary (only if users table is empty)
      const userCount = await database.get("SELECT COUNT(*) as count FROM users");
      if (!userCount || userCount.count === 0) {
        console.log("🌱 Seeding database...");
        await seedDatabase(database);
      } else {
        try {
          const navLinksRow = await database.get("SELECT value FROM settings WHERE key = 'navLinks'");
          if (navLinksRow) {
            const currentNavLinks = JSON.parse(navLinksRow.value);
            if (Array.isArray(currentNavLinks) && currentNavLinks.length > 0 && !currentNavLinks[0].path) {
              console.log("🔄 Migrating legacy navigation links...");
              const newNavLinks = [
                { id: "about", title: "About", path: "/" },
                { id: "portfolio", title: "Work", path: "/portfolio" },
                { id: "experience", title: "Experience", path: "/experience" },
                { id: "services", title: "Skills", path: "/services" },
                { id: "contact", title: "Contact", path: "/contact" },
              ];
              await database.run("UPDATE settings SET value = ? WHERE key = 'navLinks'", JSON.stringify(newNavLinks));
            }
          }
          
          const faqRow = await database.get("SELECT value FROM settings WHERE key = 'faqs'");
          if (!faqRow || !faqRow.value || JSON.parse(faqRow.value).length === 0) {
            console.log("🔄 Initializing FAQ settings...");
            const defaultFaqs = [
              { id: 1, question: "What is your primary tech stack?", answer: "I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js for high-performance web applications." },
              { id: 2, question: "Are you available for freelance work?", answer: "Yes, I am open to freelance projects, full-time opportunities, and technical consulting." },
              { id: 3, question: "Do you offer maintenance services?", answer: "Absolutely. I provide ongoing support and maintenance to ensure your applications remain secure and up-to-date." },
            ];
            await database.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", "faqs", JSON.stringify(defaultFaqs));
          }

          const allSettings = await database.all("SELECT key FROM settings");
          console.log("🔍 Current settings keys in DB:", allSettings.map(s => s.key));

          const settingsToMigrate = await database.all("SELECT key, value FROM settings");
          
          for (const row of settingsToMigrate) {
            const normalizedKey = row.key.toLowerCase().trim();
            
            if (normalizedKey === 'certifications') {
              console.log(`🔄 Migrating certifications from settings key: "${row.key}"...`);
              const certs = JSON.parse(row.value);
              if (Array.isArray(certs)) {
                for (const cert of certs) {
                  const exists = await database.get("SELECT id FROM certifications WHERE title = ? AND issuer = ?", cert.title, cert.issuer);
                  if (!exists) {
                    await database.run(
                      "INSERT INTO certifications (title, issuer, date, icon, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?)",
                      cert.title, cert.issuer, cert.date, cert.icon, 1, cert.id || 0
                    );
                  }
                }
              }
              await database.run("DELETE FROM settings WHERE key = ?", row.key);
            }
            
            if (normalizedKey === 'stats') {
              console.log(`🔄 Migrating stats from settings key: "${row.key}"...`);
              const stats = JSON.parse(row.value);
              if (Array.isArray(stats)) {
                for (const stat of stats) {
                  const exists = await database.get("SELECT id FROM stats WHERE label = ?", stat.label);
                  if (!exists) {
                    await database.run(
                      "INSERT INTO stats (stat, label, description, visible, orderIndex) VALUES (?, ?, ?, ?, ?)",
                      stat.stat, stat.label, stat.description, 1, stat.id || 0
                    );
                  }
                }
              }
              await database.run("DELETE FROM settings WHERE key = ?", row.key);
            }
          }
        } catch (migErr) {
          console.warn("Migration failed (non-critical):", migErr.message);
        }
      }

      return database;
    } catch (err) {
      console.error("CRITICAL Database Initialization Error:", err);
      throw err;
    }
  })();

  return initPromise;
}

export function getDb() {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }
  return database;
}
