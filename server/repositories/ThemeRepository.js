import { getDb } from "../db.js";

class ThemeRepository {
  async getAllPublic() {
    const db = getDb();
    try {
      const { PREMIUM_THEMES } = await import("../utils/themes.js");
      for (const theme of PREMIUM_THEMES) {
        const existing = await db.get("SELECT id FROM themes WHERE name = ? AND user_id = 1", theme.name);
        if (!existing) {
          await db.run(
            "INSERT INTO themes (user_id, name, config, isPublic, isDefault, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
            1, theme.name, JSON.stringify(theme.config), theme.isPublic, theme.isDefault, new Date().toISOString()
          );
        }
      }
    } catch (err) {
      console.error("ThemeRepository: Preset auto-sync failed:", err);
    }
    const rows = await db.all("SELECT * FROM themes WHERE isPublic = 1");
    return rows.map(row => ({ ...row, config: JSON.parse(row.config) }));
  }

  async getByUserId(userId) {
    const db = getDb();
    const rows = await db.all("SELECT * FROM themes WHERE user_id = ?", userId);
    return rows.map(row => ({ ...row, config: JSON.parse(row.config) }));
  }

  async getById(id) {
    const db = getDb();
    const row = await db.get("SELECT * FROM themes WHERE id = ?", id);
    if (row) {
      return { ...row, config: JSON.parse(row.config) };
    }
    return null;
  }

  async create(userId, name, config, isPublic = 0, isDefault = 0) {
    const db = getDb();
    const result = await db.run(
      "INSERT INTO themes (user_id, name, config, isPublic, isDefault, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      userId,
      name,
      JSON.stringify(config),
      isPublic,
      isDefault,
      new Date().toISOString()
    );
    return result.lastID;
  }

  async update(id, userId, name, config, isPublic, isDefault) {
    const db = getDb();
    await db.run(
      "UPDATE themes SET name = ?, config = ?, isPublic = ?, isDefault = ? WHERE id = ? AND user_id = ?",
      name,
      JSON.stringify(config),
      isPublic,
      isDefault,
      id,
      userId
    );
  }

  async delete(id, userId) {
    const db = getDb();
    await db.run("DELETE FROM themes WHERE id = ? AND user_id = ?", id, userId);
  }
}

export default new ThemeRepository();
