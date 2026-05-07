/* eslint-env node */
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "../db.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-for-production";
const TOKEN_EXPIRY = "8h";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const db = getDb();
  const user = await db.get("SELECT id, email, password, role FROM users WHERE email = ?", email.toLowerCase());
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );

  return res.json({
    token,
    user: {
      email: user.email,
      role: user.role,
    },
  });
});

router.get("/me", authMiddleware, (_req, res) => {
  return res.json({ user: _req.user });
});

export default router;
