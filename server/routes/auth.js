/* eslint-env node */
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "../db.js";
import authMiddleware from "../middleware/auth.js";
import { SettingsRepository } from "../repositories/SettingsRepository.js";

const router = express.Router();
const SALT_ROUNDS = 12;

function signToken(user) {
  const JWT_SECRET  = process.env.JWT_SECRET  || "change-this-secret-for-production";
  const TOKEN_EXPIRY = "8h";
  
  return jwt.sign(
    {
      id:       user.id,
      email:    user.email,
      username: user.username,
      role:     user.role,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

function usernameFromEmail(email) {
  return email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .slice(0, 30);
}

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters." });
  }

  const db = getDb();

  let resolvedUsername = (username || usernameFromEmail(email))
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .slice(0, 30);
  const taken = await db.get("SELECT id FROM users WHERE username = ?", resolvedUsername);
  if (taken) {
    resolvedUsername = `${resolvedUsername}_${Math.floor(Math.random() * 9000) + 1000}`;
  }

  const existingEmail = await db.get("SELECT id FROM users WHERE email = ?", email.toLowerCase());
  if (existingEmail) {
    return res.status(409).json({ message: "An account with that email already exists." });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await db.run(
    "INSERT INTO users (email, password, username, role, createdAt) VALUES (?, ?, ?, ?, ?)",
    email.toLowerCase(),
    passwordHash,
    resolvedUsername,
    "user",
    new Date().toISOString()
  );

  const userId = result.lastID;

  const settingsRepo = new SettingsRepository(db);
  const defaultSettings = {
    hero: {
      headline: "Hi, I'm " + (username || "Developer"),
      subtitle: "Full Stack Engineer crafting digital experiences.",
    },
    about: {
      overview: "Welcome to my portfolio! I'm a passionate developer...",
      summary: "I build scalable web applications.",
      details: "Detailed bio coming soon.",
    },
    contact: {
      email: email,
      availabilityStatus: "Open for Work",
    },
    navLinks: [
      { id: "about",      title: "About",      path: "/about" },
      { id: "portfolio",  title: "Work",        path: "/portfolio" },
      { id: "experience", title: "Experience",  path: "/experience" },
      { id: "services",   title: "Skills",      path: "/services" },
      { id: "contact",    title: "Contact",     path: "/contact" },
    ],
    seo: {
      title: (username || "Developer") + " | Portfolio",
      description: "My professional 3D portfolio.",
      author: username || "Developer",
    }
  };

  for (const [key, value] of Object.entries(defaultSettings)) {
    await settingsRepo.upsert(userId, key, value);
  }

  const newUser = await db.get("SELECT id, email, username, role FROM users WHERE id = ?", userId);
  const token   = signToken(newUser);

  return res.status(201).json({
    token,
    user: { email: newUser.email, username: newUser.username, role: newUser.role },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const db   = getDb();
  const user = await db.get(
    "SELECT id, email, username, password, role FROM users WHERE email = ?",
    email.toLowerCase()
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = signToken(user);

  return res.json({
    token,
    user: { email: user.email, username: user.username, role: user.role },
  });
});

router.get("/me", authMiddleware, (req, res) => {
  return res.json({ user: req.user });
});

export default router;
