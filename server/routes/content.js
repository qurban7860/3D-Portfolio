import express from "express";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { getDb } from "../db.js";

const router = express.Router();

const contentMap = {
  projects: {
    table: "projects",
    jsonColumns: ["tags"],
    booleanColumns: ["featured", "visible"],
    orderColumn: "orderIndex",
  },
  experiences: {
    table: "experiences",
    jsonColumns: ["points"],
    booleanColumns: ["visible"],
    orderColumn: "orderIndex",
  },
  educations: {
    table: "educations",
    jsonColumns: ["points"],
    booleanColumns: ["visible"],
    orderColumn: "orderIndex",
  },
  technologies: {
    table: "technologies",
    jsonColumns: [],
    booleanColumns: ["visible"],
    orderColumn: "orderIndex",
  },
  services: {
    table: "services",
    jsonColumns: ["features"],
    booleanColumns: ["visible"],
    orderColumn: "orderIndex",
  },
  testimonials: {
    table: "testimonials",
    jsonColumns: [],
    booleanColumns: ["visible"],
    orderColumn: "orderIndex",
  },
  socials: {
    table: "socials",
    jsonColumns: [],
    booleanColumns: ["visible"],
    orderColumn: "orderIndex",
  },
  certifications: {
    table: "certifications",
    jsonColumns: [],
    booleanColumns: ["visible"],
    orderColumn: "orderIndex",
  },
  stats: {
    table: "stats",
    jsonColumns: [],
    booleanColumns: ["visible"],
    orderColumn: "orderIndex",
  },
};

function parseRow(row, type) {
  if (!row) {
    return null;
  }

  const meta = contentMap[type];
  if (!meta) {
    return row;
  }

  const parsed = { ...row };
  meta.jsonColumns.forEach((key) => {
    try {
      parsed[key] = row[key] ? JSON.parse(row[key]) : [];
    } catch {
      parsed[key] = [];
    }
  });
  meta.booleanColumns.forEach((key) => {
    parsed[key] = row[key] === 1 || row[key] === true || row[key] === "1";
  });

  return parsed;
}

router.get("/", async (_req, res) => {
  const db = getDb();

  const [projects, experiences, educations, technologies, services, testimonials, socials, certifications, stats] = await Promise.all([
    db.all("SELECT * FROM projects WHERE visible = 1 ORDER BY orderIndex ASC"),
    db.all("SELECT * FROM experiences WHERE visible = 1 ORDER BY orderIndex ASC"),
    db.all("SELECT * FROM educations WHERE visible = 1 ORDER BY orderIndex ASC"),
    db.all("SELECT * FROM technologies WHERE visible = 1 ORDER BY orderIndex ASC"),
    db.all("SELECT * FROM services WHERE visible = 1 ORDER BY orderIndex ASC"),
    db.all("SELECT * FROM testimonials WHERE visible = 1 ORDER BY orderIndex ASC"),
    db.all("SELECT * FROM socials WHERE visible = 1 ORDER BY orderIndex ASC"),
    db.all("SELECT * FROM certifications WHERE visible = 1 ORDER BY orderIndex ASC"),
    db.all("SELECT * FROM stats WHERE visible = 1 ORDER BY orderIndex ASC"),
  ]);

  const settingsRows = await db.all("SELECT key, value FROM settings");
  const settings = settingsRows.reduce((acc, item) => {
    const normalizedKey = item.key.toLowerCase().trim();
    if (normalizedKey === "certifications" || normalizedKey === "stats") return acc;
    
    try {
      acc[item.key] = JSON.parse(item.value);
    } catch {
      acc[item.key] = item.value;
    }
    return acc;
  }, {});

  delete settings.certifications;
  delete settings.stats;
  delete settings.Certifications;
  delete settings.Stats;

  res.json({
    settings,
    projects: projects.map((item) => parseRow(item, "projects")),
    experiences: experiences.map((item) => parseRow(item, "experiences")),
    educations: educations.map((item) => parseRow(item, "educations")),
    technologies: technologies.map((item) => parseRow(item, "technologies")),
    services: services.map((item) => parseRow(item, "services")),
    testimonials: testimonials.map((item) => parseRow(item, "testimonials")),
    socials: socials.map((item) => parseRow(item, "socials")),
    certifications: certifications.map((item) => parseRow(item, "certifications")),
    stats: stats.map((item) => parseRow(item, "stats")),
  });
});

// Settings Routes
router.get("/admin/settings", authMiddleware, async (_req, res) => {
  const db = getDb();
  const rows = await db.all("SELECT key, value FROM settings");
  const settings = rows.reduce((acc, item) => {
    const normalizedKey = item.key.toLowerCase().trim();
    if (normalizedKey === "certifications" || normalizedKey === "stats") return acc;
    
    try {
      acc[item.key] = JSON.parse(item.value);
    } catch {
      acc[item.key] = item.value;
    }
    return acc;
  }, {});

  delete settings.certifications;
  delete settings.stats;
  delete settings.Certifications;
  delete settings.Stats;

  return res.json(settings);
});

router.put("/admin/settings/:key", authMiddleware, async (req, res) => {
  const { key } = req.params;
  const db = getDb();
  const value = JSON.stringify(req.body.value);
  await db.run("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", key, value);
  return res.json({ key, value: JSON.parse(value) });
});

// Upload Route
router.post("/admin/upload", authMiddleware, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file provided." });
  }

  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  return res.json({ url });
});

// Dynamic Content Routes
router.get("/admin/:type", authMiddleware, async (req, res) => {
  const { type } = req.params;
  const meta = contentMap[type];
  if (!meta) {
    return res.status(400).json({ message: "Unsupported content type." });
  }

  const db = getDb();
  const rows = await db.all(`SELECT * FROM ${meta.table} ORDER BY ${meta.orderColumn} ASC`);
  return res.json(rows.map((item) => parseRow(item, type)));
});

router.post("/admin/:type", authMiddleware, async (req, res) => {
  const { type } = req.params;
  const meta = contentMap[type];
  if (!meta) {
    return res.status(400).json({ message: "Unsupported content type." });
  }

  const db = getDb();
  const payload = { ...req.body };
  const columns = Object.keys(payload).filter((key) => payload[key] !== undefined && payload[key] !== null);

  const normalized = columns.reduce((acc, key) => {
    let value = payload[key];
    if (meta.jsonColumns.includes(key)) {
      value = JSON.stringify(value);
    }
    if (meta.booleanColumns.includes(key)) {
      value = value ? 1 : 0;
    }
    acc[key] = value;
    return acc;
  }, {});

  const orderIndex = await db.get(`SELECT COALESCE(MAX(${meta.orderColumn}), 0) + 1 as nextOrder FROM ${meta.table}`);
  normalized[meta.orderColumn] = normalized[meta.orderColumn] ?? orderIndex.nextOrder;
  normalized.visible = normalized.visible !== undefined ? normalized.visible : 1;

  const keys = Object.keys(normalized);
  const placeholders = keys.map(() => "?").join(", ");
  const statement = `INSERT INTO ${meta.table} (${keys.join(", ")}) VALUES (${placeholders})`;

  const result = await db.run(statement, Object.values(normalized));
  const created = await db.get(`SELECT * FROM ${meta.table} WHERE id = ?`, result.lastID);

  return res.status(201).json(parseRow(created, type));
});

router.put("/admin/:type/:id", authMiddleware, async (req, res) => {
  const { type, id } = req.params;
  const meta = contentMap[type];
  if (!meta) {
    return res.status(400).json({ message: "Unsupported content type." });
  }

  const db = getDb();
  const payload = { ...req.body };
  const columns = Object.keys(payload).filter((key) => payload[key] !== undefined && payload[key] !== null);
  if (!columns.length) {
    return res.status(400).json({ message: "No fields provided to update." });
  }

  const normalized = columns.reduce((acc, key) => {
    let value = payload[key];
    if (meta.jsonColumns.includes(key)) {
      value = JSON.stringify(value);
    }
    if (meta.booleanColumns.includes(key)) {
      value = value ? 1 : 0;
    }
    acc[key] = value;
    return acc;
  }, {});

  const assignments = Object.keys(normalized).map((key) => `${key} = ?`).join(", ");
  await db.run(`UPDATE ${meta.table} SET ${assignments} WHERE id = ?`, [...Object.values(normalized), id]);
  const updated = await db.get(`SELECT * FROM ${meta.table} WHERE id = ?`, id);

  return res.json(parseRow(updated, type));
});

router.delete("/admin/:type/:id", authMiddleware, async (req, res) => {
  const { type, id } = req.params;
  const meta = contentMap[type];
  if (!meta) {
    return res.status(400).json({ message: "Unsupported content type." });
  }

  const db = getDb();
  await db.run(`DELETE FROM ${meta.table} WHERE id = ?`, id);
  return res.status(204).send();
});

router.patch("/admin/:type/order", authMiddleware, async (req, res) => {
  const { type } = req.params;
  const { order } = req.body;
  const meta = contentMap[type];
  if (!meta || !Array.isArray(order)) {
    return res.status(400).json({ message: "Unsupported content type or invalid order payload." });
  }

  const db = getDb();
  const updateTasks = order.map((id, index) => {
    return db.run(`UPDATE ${meta.table} SET ${meta.orderColumn} = ? WHERE id = ?`, index + 1, id);
  });
  await Promise.all(updateTasks);

  const items = await db.all(`SELECT * FROM ${meta.table} ORDER BY ${meta.orderColumn} ASC`);
  return res.json(items.map((item) => parseRow(item, type)));
});

export default router;
