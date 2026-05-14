/* eslint-env node */

export class SettingsRepository {
  constructor(db) {
    this.db = db;
  }

  static EXCLUDED_KEYS = new Set(["certifications", "stats", "faqs", "socials"]);

  _parseValue(raw) {
    try { return JSON.parse(raw); } catch { return raw; }
  }

  async findAll(userId) {
    const rows = await this.db.all(
      "SELECT key, value FROM settings WHERE user_id = ?",
      userId
    );
    return rows.reduce((acc, { key, value }) => {
      const nk = key.toLowerCase().trim();
      if (!SettingsRepository.EXCLUDED_KEYS.has(nk)) {
        let parsed = this._parseValue(value);
        
        // Strip social links from contact if present
        if (nk === "contact" && typeof parsed === "object" && parsed !== null) {
          const keysToRemove = ["github", "linkedin", "twitter", "whatsapp", "facebook", "instagram"];
          keysToRemove.forEach(k => delete parsed[k]);
        }
        
        acc[key] = parsed;
      }
      return acc;
    }, {});
  }

  async findByKey(userId, key) {
    const row = await this.db.get(
      "SELECT value FROM settings WHERE user_id = ? AND key = ?",
      userId, key
    );
    return row ? this._parseValue(row.value) : null;
  }

  async upsert(userId, key, value) {
    const serialized = JSON.stringify(value);
    await this.db.run(
      "INSERT OR REPLACE INTO settings (user_id, key, value) VALUES (?, ?, ?)",
      userId, key, serialized
    );
    return { key, value };
  }

  async remove(userId, key) {
    await this.db.run(
      "DELETE FROM settings WHERE user_id = ? AND key = ?",
      userId, key
    );
  }
}
