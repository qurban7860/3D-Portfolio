/* eslint-disable no-undef */
import path from "path";
import { fileURLToPath } from "url";
import { seedDatabase } from "./utils/seed.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let database;
let initPromise = null;

// ─────────────────────────────────────────────────────────────
//  Turso / libsql adapter (production / Vercel)
//  @libsql/client/http returns rows as plain {col: val} objects
// ─────────────────────────────────────────────────────────────
class TursoAdapter {
  constructor(client) {
    this.client = client;
  }

  /** Normalise positional args so they are always a flat array */
  _args(params) {
    if (!params || params.length === 0) return [];
    const args = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
    return args.map((v) => (v === undefined ? null : v));
  }

  async all(sql, ...params) {
    try {
      const rs = await this.client.execute({ sql, args: this._args(params) });
      // rows are already plain {col:val} objects
      return Array.from(rs.rows);
    } catch (err) {
      console.error("TursoAdapter.all error:", err);
      throw err;
    }
  }

  async get(sql, ...params) {
    try {
      const rs = await this.client.execute({ sql, args: this._args(params) });
      return rs.rows[0] ?? undefined;
    } catch (err) {
      console.error("TursoAdapter.get error:", err);
      throw err;
    }
  }

  async run(sql, ...params) {
    try {
      const rs = await this.client.execute({ sql, args: this._args(params) });
      return {
        lastID: Number(rs.lastInsertRowid ?? 0),
        changes: rs.rowsAffected ?? 0,
      };
    } catch (err) {
      const msg = String(err).toLowerCase();
      const isExpectedMigrationErr =
        msg.includes("duplicate column name") ||
        msg.includes("already exists") ||
        (msg.includes("no such column") && sql.toLowerCase().includes("index"));
      if (!isExpectedMigrationErr) {
        console.error("TursoAdapter.run error:", err);
      }
      throw err;
    }
  }

  async exec(sql) {
    try {
      // Split multi-statement SQL and run each statement individually
      const statements = sql
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
      for (const stmt of statements) {
        await this.client.execute({ sql: stmt, args: [] });
      }
    } catch (err) {
      console.error("TursoAdapter.exec error:", err);
      throw err;
    }
  }
}


// ─────────────────────────────────────────────────────────────
//  SQLite (local dev) adapter
// ─────────────────────────────────────────────────────────────
class SqliteAdapter {
  constructor(db) {
    this.db = db;
  }

  _args(params) {
    if (!params || params.length === 0) return [];
    const args = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
    return args.map((v) => (v === undefined ? null : v));
  }

  async all(sql, ...params) {
    try {
      return await this.db.all(sql, this._args(params));
    } catch (err) {
      console.error("SqliteAdapter.all error:", err);
      throw err;
    }
  }

  async get(sql, ...params) {
    try {
      return await this.db.get(sql, this._args(params));
    } catch (err) {
      console.error("SqliteAdapter.get error:", err);
      throw err;
    }
  }

  async run(sql, ...params) {
    try {
      const result = await this.db.run(sql, this._args(params));
      return {
        lastID: result.lastID || 0,
        changes: result.changes || 0,
      };
    } catch (err) {
      const msg = String(err).toLowerCase();
      const isExpectedMigrationErr =
        msg.includes("duplicate column name") ||
        msg.includes("already exists") ||
        (msg.includes("no such column") && sql.toLowerCase().includes("index"));
      if (!isExpectedMigrationErr) {
        console.error("SqliteAdapter.run error:", err);
      }
      throw err;
    }
  }

  async exec(sql) {
    try {
      return await this.db.exec(sql);
    } catch (err) {
      console.error("SqliteAdapter.exec error:", err);
      throw err;
    }
  }
}

// ─────────────────────────────────────────────────────────────
//  Schema DDL
// ─────────────────────────────────────────────────────────────
const SCHEMA = [
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
    icon       TEXT DEFAULT '',
    visible    INTEGER DEFAULT 1,
    orderIndex INTEGER DEFAULT 0
  )`,
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
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id   INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name      TEXT NOT NULL,
    config    TEXT NOT NULL,
    isPublic  INTEGER DEFAULT 0,
    isDefault INTEGER DEFAULT 0,
    createdAt TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_themes_user_id ON themes(user_id)`,
];

// ALTER TABLE migrations — run these separately with graceful skip
const MIGRATIONS = [
  `ALTER TABLE technologies ADD COLUMN icon TEXT DEFAULT ''`,
  `ALTER TABLE projects ADD COLUMN liveDemoLink TEXT DEFAULT ''`,
  `ALTER TABLE certifications ADD COLUMN credentialUrl TEXT DEFAULT ''`,
];

async function runSchema(db) {
  for (const sql of SCHEMA) {
    try {
      await db.run(sql);
    } catch (err) {
      const msg = String(err).toLowerCase();
      if (msg.includes("already exists") || msg.includes("duplicate")) {
        // expected — table/index already created
      } else {
        console.error(`❌ DB Schema Error:\n${sql}\n`, err);
        throw err;
      }
    }
  }

  for (const sql of MIGRATIONS) {
    try {
      await db.run(sql);
    } catch (err) {
      const msg = String(err).toLowerCase();
      if (
        msg.includes("duplicate column name") ||
        msg.includes("already exists") ||
        msg.includes("sqlite_error") ||
        msg.includes("sqlite_unknown")
      ) {
        // column already added — skip silently
      } else {
        console.error(`❌ DB Migration Error:\n${sql}\n`, err);
        throw err;
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────
//  Main initializer — Turso in production, SQLite locally
// ─────────────────────────────────────────────────────────────
export async function initializeDatabase() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const tursoUrl   = process.env.TURSO_DATABASE_URL;
      const tursoToken = process.env.TURSO_AUTH_TOKEN;

      if (tursoUrl && tursoUrl.startsWith("libsql://")) {
        // ── Turso / libsql (production) ──────────────────────
        console.log("☁️  Connecting to Turso (libsql)…");
        const { createClient } = await import("@libsql/client/http");
        const client = createClient({ url: tursoUrl, authToken: tursoToken });

        database = new TursoAdapter(client);

        // Verify connection
        await database.get("SELECT 1 AS ok");
        console.log("✅ Turso connected.");
      } else {
        // ── Local SQLite (development) ────────────────────────
        console.log("🏠 Connecting to local SQLite…");
        const { open }                  = await import("sqlite");
        const sqlite3Module             = await import("sqlite3");
        const { mkdirSync, existsSync } = await import("fs");
        const osModule                  = await import("os");

        const dataDir = path.join(__dirname, "data");
        if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
        const dbPath = path.join(dataDir, "portfolio.db");

        const rawDb = await open({
          filename: dbPath,
          driver: sqlite3Module.default.Database,
        });
        await rawDb.run("PRAGMA journal_mode = WAL");
        await rawDb.run("PRAGMA foreign_keys = ON");

        database = new SqliteAdapter(rawDb);
        await database.get("SELECT 1");
        console.log("✅ SQLite connected.");

        void osModule; // suppress unused warning
      }

      // ── Apply schema & migrations ───────────────────────────
      await runSchema(database);

      // ── Seed if empty ───────────────────────────────────────
      const userCount = await database.get("SELECT COUNT(*) as count FROM users");
      if (!userCount || userCount.count === 0) {
        console.log("🌱 Seeding database…");
        await seedDatabase(database);
      } else {
        const statsCount = await database.get("SELECT COUNT(*) as count FROM stats");
        const certsCount = await database.get("SELECT COUNT(*) as count FROM certifications");
        if ((statsCount && statsCount.count === 0) || (certsCount && certsCount.count === 0)) {
          console.log("🌱 Seeding missing stats / certifications…");
          await seedDatabase(database);
        }
      }

      console.log("🎉 Database ready.");
      return database;
    } catch (err) {
      initPromise = null; // allow retry on next request
      console.error("CRITICAL Database Initialization Error:", err);
      throw err;
    }
  })();

  return initPromise;
}

export function getDb() {
  if (!database) {
    throw new Error("Database has not been initialized. Call initializeDatabase() first.");
  }
  return database;
}
