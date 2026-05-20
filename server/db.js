/* eslint-disable no-undef */
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@libsql/client";
import { seedDatabase } from "./utils/seed.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "portfolio.db");

let database;

class DatabaseAdapter {
  constructor(client) {
    this.client = client;
  }

  async all(sql, ...params) {
    try {
      const args = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
      const sanitized = args.map(v => v === undefined ? null : v);
      const result = await this.client.execute({ sql, args: sanitized });
      return result.rows;
    } catch (err) {
      console.error("DB Query All Error:", err);
      throw err;
    }
  }

  async get(sql, ...params) {
    try {
      const args = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
      const sanitized = args.map(v => v === undefined ? null : v);
      const result = await this.client.execute({ sql, args: sanitized });
      return result.rows[0];
    } catch (err) {
      console.error("DB Query Get Error:", err);
      throw err;
    }
  }

  async run(sql, ...params) {
    try {
      const args = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
      const sanitized = args.map(v => v === undefined ? null : v);
      const result = await this.client.execute({ sql, args: sanitized });
      return {
        lastID: result.lastInsertRowid !== null && result.lastInsertRowid !== undefined
          ? Number(result.lastInsertRowid)
          : 0,
        changes: result.rowsAffected,
      };
    } catch (err) {
      const msg = String(err).toLowerCase();
      const isExpectedMigrationErr = msg.includes("duplicate column name") || 
                                     msg.includes("already exists") || 
                                     (msg.includes("no such column") && sql.toLowerCase().includes("index"));
      if (!isExpectedMigrationErr) {
        console.error("DB Run Error:", err);
      }
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
      const tursoUrl   = process.env.TURSO_DATABASE_URL;
      const tursoToken = process.env.TURSO_AUTH_TOKEN;

      let client;

      if (tursoUrl && tursoUrl.startsWith("libsql://")) {
        console.log("🚀 Connecting to Turso...");
        client = createClient({ url: tursoUrl, authToken: tursoToken });
      } else {
        console.log("🏠 Connecting to Local Libsql...");
        const { mkdirSync, existsSync } = await import("fs");
        if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
        client = createClient({ url: `file:${dbPath}` });
      }

      database = new DatabaseAdapter(client);
      await client.execute("SELECT 1");

      const schema = [
        `CREATE TABLE IF NOT EXISTS users (
          id        INTEGER PRIMARY KEY AUTOINCREMENT,
          email     TEXT UNIQUE NOT NULL,
          password  TEXT NOT NULL,
          username  TEXT UNIQUE,
          role      TEXT NOT NULL,
          createdAt TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS projects (
          id             INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id        INTEGER REFERENCES users(id) ON DELETE CASCADE,
          name           TEXT NOT NULL,
          description    TEXT NOT NULL,
          imageUrl       TEXT NOT NULL,
          sourceCodeLink TEXT NOT NULL,
          liveDemoLink   TEXT DEFAULT '',
          tags           TEXT NOT NULL,
          featured       INTEGER DEFAULT 0,
          visible        INTEGER DEFAULT 1,
          orderIndex     INTEGER DEFAULT 0
        )`,
        `CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id)`,
        `CREATE TABLE IF NOT EXISTS experiences (
          id           INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id      INTEGER REFERENCES users(id) ON DELETE CASCADE,
          title        TEXT NOT NULL,
          companyName  TEXT NOT NULL,
          instituteUrl TEXT NOT NULL,
          iconUrl      TEXT NOT NULL,
          iconBg       TEXT NOT NULL,
          date         TEXT NOT NULL,
          points       TEXT NOT NULL,
          visible      INTEGER DEFAULT 1,
          orderIndex   INTEGER DEFAULT 0
        )`,
        `CREATE INDEX IF NOT EXISTS idx_experiences_user_id ON experiences(user_id)`,
        `CREATE TABLE IF NOT EXISTS educations (
          id            INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
          degree        TEXT NOT NULL,
          instituteName TEXT NOT NULL,
          instituteUrl  TEXT NOT NULL,
          imageUrl      TEXT NOT NULL,
          points        TEXT NOT NULL,
          visible       INTEGER DEFAULT 1,
          orderIndex    INTEGER DEFAULT 0
        )`,
        `CREATE INDEX IF NOT EXISTS idx_educations_user_id ON educations(user_id)`,
        `CREATE TABLE IF NOT EXISTS technologies (
          id         INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
          name       TEXT NOT NULL,
          iconUrl    TEXT NOT NULL,
          visible    INTEGER DEFAULT 1,
          orderIndex INTEGER DEFAULT 0
        )`,
        `ALTER TABLE technologies ADD COLUMN icon TEXT DEFAULT ''`,
        `ALTER TABLE projects ADD COLUMN liveDemoLink TEXT DEFAULT ''`,
        `ALTER TABLE certifications ADD COLUMN credentialUrl TEXT DEFAULT ''`,
        `CREATE INDEX IF NOT EXISTS idx_technologies_user_id ON technologies(user_id)`,
        `CREATE TABLE IF NOT EXISTS services (
          id          INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
          title       TEXT NOT NULL,
          description TEXT NOT NULL,
          icon        TEXT NOT NULL,
          features    TEXT NOT NULL,
          visible     INTEGER DEFAULT 1,
          orderIndex  INTEGER DEFAULT 0
        )`,
        `CREATE INDEX IF NOT EXISTS idx_services_user_id ON services(user_id)`,
        `CREATE TABLE IF NOT EXISTS testimonials (
          id          INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
          testimonial TEXT NOT NULL,
          name        TEXT NOT NULL,
          imageUrl    TEXT NOT NULL,
          visible     INTEGER DEFAULT 1,
          orderIndex  INTEGER DEFAULT 0
        )`,
        `CREATE INDEX IF NOT EXISTS idx_testimonials_user_id ON testimonials(user_id)`,
        `CREATE TABLE IF NOT EXISTS socials (
          id         INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
          title      TEXT NOT NULL,
          url        TEXT NOT NULL,
          icon       TEXT NOT NULL,
          visible    INTEGER DEFAULT 1,
          orderIndex INTEGER DEFAULT 0
        )`,
        `CREATE INDEX IF NOT EXISTS idx_socials_user_id ON socials(user_id)`,
        `CREATE TABLE IF NOT EXISTS certifications (
          id            INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
          title         TEXT NOT NULL,
          issuer        TEXT NOT NULL,
          date          TEXT NOT NULL,
          icon          TEXT NOT NULL,
          credentialUrl TEXT DEFAULT '',
          visible       INTEGER DEFAULT 1,
          orderIndex    INTEGER DEFAULT 0
        )`,
        `CREATE INDEX IF NOT EXISTS idx_certifications_user_id ON certifications(user_id)`,
        `CREATE TABLE IF NOT EXISTS stats (
          id          INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
          stat        TEXT NOT NULL,
          label       TEXT NOT NULL,
          description TEXT NOT NULL,
          visible     INTEGER DEFAULT 1,
          orderIndex  INTEGER DEFAULT 0
        )`,
        `CREATE INDEX IF NOT EXISTS idx_stats_user_id ON stats(user_id)`,
        `CREATE TABLE IF NOT EXISTS faqs (
          id          INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
          question    TEXT NOT NULL,
          answer      TEXT NOT NULL,
          visible     INTEGER DEFAULT 1,
          orderIndex  INTEGER DEFAULT 0
        )`,
        `CREATE INDEX IF NOT EXISTS idx_faqs_user_id ON faqs(user_id)`,
        `CREATE TABLE IF NOT EXISTS settings (
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          key     TEXT    NOT NULL,
          value   TEXT    NOT NULL,
          PRIMARY KEY (user_id, key)
        )`,
        `CREATE INDEX IF NOT EXISTS idx_settings_user_id ON settings(user_id)`,
        `CREATE TABLE IF NOT EXISTS themes (
          id          INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
          name        TEXT NOT NULL,
          config      TEXT NOT NULL,
          isPublic    INTEGER DEFAULT 0,
          isDefault   INTEGER DEFAULT 0,
          createdAt   TEXT NOT NULL
        )`,
        `CREATE INDEX IF NOT EXISTS idx_themes_user_id ON themes(user_id)`,
      ];

      for (const sql of schema) {
        try {
          await database.run(sql);
        } catch (err) {
          if (String(err).includes("no such column") && sql.includes("CREATE INDEX")) {
             console.warn(`⚠️ Skipping index creation due to missing column: ${sql}`);
          } else if (
            sql.includes("ALTER TABLE") && (
              String(err).includes("duplicate column name") || 
              String(err).toLowerCase().includes("already exists") ||
              String(err).includes("SQLITE_ERROR") ||
              String(err).includes("SQLITE_UNKNOWN")
            )
          ) {
             const alterMatch = sql.match(/alter\s+table\s+(\w+)\s+add\s+(?:column\s+)?(\w+)/i);
             const desc = alterMatch ? `column "${alterMatch[2]}" on table "${alterMatch[1]}"` : sql.split(' ').pop();
             console.log(`ℹ️ Column already exists, skipping: ${desc}`);
          } else {
             console.error(`❌ DB Schema Error on query: ${sql}`, err);
             throw err;
          }
        }
      }

      // ── Seed / post-boot checks ────────────────────────────────────────────
      // Seed on first run (empty users table = fresh install).
      const userCount = await database.get("SELECT COUNT(*) as count FROM users");
      if (!userCount || userCount.count === 0) {
        console.log("🌱 Seeding database...");
        await seedDatabase(database);
      } else {
        // Seed missing tables on update
        const statsCount = await database.get("SELECT COUNT(*) as count FROM stats");
        const certsCount = await database.get("SELECT COUNT(*) as count FROM certifications");
        if ((statsCount && statsCount.count === 0) || (certsCount && certsCount.count === 0)) {
          console.log("🌱 Seeding missing default stats or certifications...");
          await seedDatabase(database);
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
