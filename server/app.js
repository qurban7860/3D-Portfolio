/* eslint-env node */
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import { initializeDatabase } from "./db.js";
import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false, // Required for displaying local/uploaded images
}));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static uploads (handled by express locally, and by the function on Vercel)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Initialize Database
await initializeDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Dynamic portfolio API is running." });
});

app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use((err, _req, res) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

export default app;
