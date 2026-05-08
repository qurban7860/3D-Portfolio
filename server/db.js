/* eslint-disable no-undef */
import { mkdirSync, existsSync } from "fs";
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
    const result = await this.client.execute({ sql, args: params });
    return result.rows;
  }

  async get(sql, ...params) {
    const result = await this.client.execute({ sql, args: params });
    return result.rows[0];
  }

  async run(sql, ...params) {
    const result = await this.client.execute({ sql, args: params });
    return { 
      lastID: result.lastInsertRowid ? Number(result.lastInsertRowid) : undefined,
      changes: result.rowsAffected 
    };
  }

  async exec(sql) {
    return this.client.executeMultiple(sql);
  }
}

let initPromise = null;

export async function initializeDatabase() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const tursoUrl = process.env.TURSO_DATABASE_URL;
    const tursoToken = process.env.TURSO_AUTH_TOKEN;

    let client;

    if (tursoUrl && tursoUrl.startsWith("libsql://")) {
      console.log("🚀 Initializing Turso (Serverless SQLite)...");
      client = createClient({
        url: tursoUrl,
        authToken: tursoToken,
      });
    } else {
      console.log("🏠 Initializing Local Libsql (File)...");
      if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true });
      }
      
      client = createClient({
        url: `file:${dbPath}`,
      });
    }

    database = new DatabaseAdapter(client);

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

    await seedDatabase(database);
    return database;
  })();

  return initPromise;
}

export function getDb() {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }
  return database;
}
