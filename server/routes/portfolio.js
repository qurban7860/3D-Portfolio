import express from "express";
import { getDb } from "../db.js";
import { BaseRepository } from "../repositories/BaseRepository.js";
import { SettingsRepository } from "../repositories/SettingsRepository.js";
import { contentMap } from "./content.js";

const router = express.Router();

const CONTENT_TYPES = [
  "projects", "experiences", "educations", "technologies",
  "services", "testimonials", "socials", "certifications", "stats",
];

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const db = getDb();

  const user = await db.get(
    "SELECT id, email, username FROM users WHERE username = ?",
    username.toLowerCase()
  );

  if (!user) {
    return res.status(404).json({ message: `Portfolio not found for username: "${username}".` });
  }

  const userId = user.id;

  const settingsRepo = new SettingsRepository(db);
  const settings     = await settingsRepo.findAll(userId);

  const contentResults = await Promise.all(
    CONTENT_TYPES.map((type) => {
      const meta = contentMap[type];
      const repo = new BaseRepository(db, meta.table, meta);
      return repo.findVisible(userId);
    })
  );

  const content = CONTENT_TYPES.reduce((acc, type, i) => {
    acc[type] = contentResults[i];
    return acc;
  }, {});
  return res.json({
    user: { username: user.username },
    settings,
    ...content,
  });
});

export default router;
