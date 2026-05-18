import express from "express";
import ThemeRepository from "../repositories/ThemeRepository.js";
import { SettingsRepository } from "../repositories/SettingsRepository.js";
import authMiddleware from "../middleware/auth.js";
import { getDb } from "../db.js";

const router = express.Router();

router.get("/public", async (req, res) => {
  try {
    const themes = await ThemeRepository.getAllPublic();
    res.json(themes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/admin", authMiddleware, async (req, res) => {
  try {
    const userThemes = await ThemeRepository.getByUserId(req.user.id);
    const publicThemes = await ThemeRepository.getAllPublic();
    
    const publicIds = new Set(publicThemes.map(t => t.id));
    const uniqueUserThemes = userThemes.filter(t => !publicIds.has(t.id));
    const allThemes = [...publicThemes, ...uniqueUserThemes];
    res.json(allThemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/admin", authMiddleware, async (req, res) => {
  try {
    const { name, config, isPublic } = req.body;
    const themeId = await ThemeRepository.create(req.user.id, name, config, isPublic);
    res.json({ id: themeId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const { name, config, isPublic, isDefault } = req.body;
    await ThemeRepository.update(req.params.id, req.user.id, name, config, isPublic, isDefault);
    res.json({ message: "Theme updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/admin/:id", authMiddleware, async (req, res) => {
  try {
    await ThemeRepository.delete(req.params.id, req.user.id);
    res.json({ message: "Theme deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/admin/activate/:id", authMiddleware, async (req, res) => {
  try {
    const repo = new SettingsRepository(getDb());
    await repo.upsert(req.user.id, "active_theme_id", req.params.id);
    res.json({ message: "Theme activated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
