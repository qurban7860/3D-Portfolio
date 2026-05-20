/* eslint-env node */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";
import { initializeDatabase } from "./db.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import contentRoutes from "./routes/content.js";
import portfolioRoutes from "./routes/portfolio.js";
import themeRoutes from "./routes/themes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false,
}));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(os.tmpdir(), "3d-portfolio", "uploads")));

app.get("/api/health", (_req, res) => res.json({ status: "ok", message: "Dynamic portfolio API is running." }));
app.use(async (req, res, next) => {
  try {
    await initializeDatabase();
    next();
  } catch (err) {
    console.error("Database initialization error:", err);
    res.status(503).json({ message: "Database connection failed." });
  }
});

app.use((req, res, next) => {
  if (req.url.startsWith("/api")) {
    console.log(`🌍 API Request: ${req.method} ${req.url}`);
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/super-admin", adminRoutes); 
app.use("/api/content", contentRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/themes", themeRoutes);

app.all("/api/*", (req, res) => {
  console.warn(`🕵️ 404 Not Found (API Fallback): ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: `API Resource not found: ${req.originalUrl}` });
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error("🔥 Server Error:", err);
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

export default app;
