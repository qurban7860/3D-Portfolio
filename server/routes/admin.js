/* eslint-env node */
import express from "express";
import { getDb } from "../db.js";
import authMiddleware, { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`📡 Admin Router hit: ${req.method} ${req.url}`);
  next();
});
router.use(authMiddleware, isAdmin);

router.get("/users", async (req, res) => {
  try {
    const db = getDb();
    console.log("🔍 Fetching all users for super-admin...");
    
    const users = await db.all(
      "SELECT id, email, username, role, createdAt FROM users ORDER BY createdAt DESC"
    );

    if (!users || !Array.isArray(users)) {
      return res.json([]);
    }

    const usersWithStats = await Promise.all(users.map(async (u) => {
        try {
          const projectCount = await db.get("SELECT COUNT(*) as count FROM projects WHERE user_id = ?", u.id);
          return {
              ...u,
              projectsCount: projectCount?.count || 0
          };
        } catch (innerErr) {
          console.error(`Error fetching stats for user ${u.id}:`, innerErr);
          return { ...u, projectsCount: 0 };
        }
    }));

    return res.json(usersWithStats);
  } catch (err) {
    console.error("CRITICAL Error fetching users:", err);
    return res.status(500).json({ 
      message: "Internal server error",
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
});

router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    if (Number(id) === req.user.id) {
        return res.status(400).json({ message: "You cannot delete your own super-admin account." });
    }

    try {
        const db = getDb();
        await db.run("DELETE FROM users WHERE id = ?", id);
        return res.json({ message: "User deleted successfully." });
    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
