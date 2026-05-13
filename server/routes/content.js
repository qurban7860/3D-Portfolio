import express from "express";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { getDb } from "../db.js";
import { BaseRepository } from "../repositories/BaseRepository.js";
import { SettingsRepository } from "../repositories/SettingsRepository.js";

const router = express.Router();

export const contentMap = {
  projects:       { table: "projects",       jsonColumns: ["tags"],     booleanColumns: ["featured", "visible"], orderColumn: "orderIndex" },
  experiences:    { table: "experiences",    jsonColumns: ["points"],   booleanColumns: ["visible"],             orderColumn: "orderIndex" },
  educations:     { table: "educations",     jsonColumns: ["points"],   booleanColumns: ["visible"],             orderColumn: "orderIndex" },
  technologies:   { table: "technologies",   jsonColumns: [],           booleanColumns: ["visible"],             orderColumn: "orderIndex" },
  services:       { table: "services",       jsonColumns: ["features"], booleanColumns: ["visible"],             orderColumn: "orderIndex" },
  testimonials:   { table: "testimonials",   jsonColumns: [],           booleanColumns: ["visible"],             orderColumn: "orderIndex" },
  socials:        { table: "socials",        jsonColumns: [],           booleanColumns: ["visible"],             orderColumn: "orderIndex" },
  certifications: { table: "certifications", jsonColumns: [],           booleanColumns: ["visible"],             orderColumn: "orderIndex" },
  stats:          { table: "stats",          jsonColumns: [],           booleanColumns: ["visible"],             orderColumn: "orderIndex" },
};

function makeRepo(db, type) {
  const meta = contentMap[type];
  if (!meta) return null;
  return new BaseRepository(db, meta.table, meta);
}

function makeSettingsRepo(db) {
  return new SettingsRepository(db);
}

router.get("/", async (_req, res) => {
  const db     = getDb();
  const userId = 1;

  const settingsRepo = makeSettingsRepo(db);
  const settings     = await settingsRepo.findAll(userId);

  const [
    projects, experiences, educations, technologies,
    services, testimonials, socials, certifications, stats,
  ] = await Promise.all(
    ["projects","experiences","educations","technologies",
     "services","testimonials","socials","certifications","stats"]
      .map((type) => makeRepo(db, type).findVisible(userId))
  );

  return res.json({ settings, projects, experiences, educations, technologies, services, testimonials, socials, certifications, stats });
});

router.get("/admin/settings", authMiddleware, async (req, res) => {
  const db       = getDb();
  const settings = await makeSettingsRepo(db).findAll(req.user.id);
  return res.json(settings);
});

router.put("/admin/settings/:key", authMiddleware, async (req, res) => {
  const db     = getDb();
  const result = await makeSettingsRepo(db).upsert(req.user.id, req.params.key, req.body.value);
  return res.json(result);
});

router.post("/admin/upload", authMiddleware, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file provided." });
  }
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  return res.json({ url });
});

router.get("/admin/:type", authMiddleware, async (req, res) => {
  const repo = makeRepo(getDb(), req.params.type);
  if (!repo) return res.status(400).json({ message: "Unsupported content type." });
  return res.json(await repo.findAll(req.user.id));
});

router.post("/admin/:type", authMiddleware, async (req, res) => {
  const repo = makeRepo(getDb(), req.params.type);
  if (!repo) return res.status(400).json({ message: "Unsupported content type." });
  const created = await repo.create(req.user.id, req.body);
  return res.status(201).json(created);
});

router.put("/admin/:type/:id", authMiddleware, async (req, res) => {
  const repo = makeRepo(getDb(), req.params.type);
  if (!repo) return res.status(400).json({ message: "Unsupported content type." });
  const updated = await repo.update(req.user.id, req.params.id, req.body);
  return res.json(updated);
});

router.delete("/admin/:type/:id", authMiddleware, async (req, res) => {
  const repo = makeRepo(getDb(), req.params.type);
  if (!repo) return res.status(400).json({ message: "Unsupported content type." });
  await repo.remove(req.user.id, req.params.id);
  return res.status(204).send();
});

router.patch("/admin/:type/order", authMiddleware, async (req, res) => {
  const { order } = req.body;
  const repo = makeRepo(getDb(), req.params.type);
  if (!repo || !Array.isArray(order)) {
    return res.status(400).json({ message: "Unsupported content type or invalid order payload." });
  }
  const reordered = await repo.reorder(req.user.id, order);
  return res.json(reordered);
});

export default router;
