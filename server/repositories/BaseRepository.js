/* eslint-env node */

export class BaseRepository {

  constructor(db, table, meta) {
    this.db = db;
    this.table = table;
    this.meta = meta;
  }

  _serialize(payload) {
    return Object.entries(payload).reduce((acc, [key, value]) => {
      if (value === undefined || value === null) return acc;
      if (this.meta.jsonColumns.includes(key)) {
        acc[key] = JSON.stringify(value);
      } else if (this.meta.booleanColumns.includes(key)) {
        acc[key] = value ? 1 : 0;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
  }

  _deserialize(row) {
    if (!row) return null;
    const out = { ...row };
    this.meta.jsonColumns.forEach((key) => {
      try { out[key] = row[key] ? JSON.parse(row[key]) : []; }
      catch { out[key] = []; }
    });
    this.meta.booleanColumns.forEach((key) => {
      out[key] = row[key] === 1 || row[key] === true || row[key] === "1";
    });
    return out;
  }

  async findAll(userId) {
    const rows = await this.db.all(
      `SELECT * FROM ${this.table} WHERE user_id = ? ORDER BY ${this.meta.orderColumn} ASC`,
      userId
    );
    return rows.map((r) => this._deserialize(r));
  }

  async findVisible(userId) {
    const rows = await this.db.all(
      `SELECT * FROM ${this.table} WHERE user_id = ? AND visible = 1 ORDER BY ${this.meta.orderColumn} ASC`,
      userId
    );
    return rows.map((r) => this._deserialize(r));
  }

  async findById(userId, id) {
    const row = await this.db.get(
      `SELECT * FROM ${this.table} WHERE id = ? AND user_id = ?`,
      id, userId
    );
    return this._deserialize(row);
  }

  async create(userId, payload) {
    const normalized = this._serialize(payload);

    if (!("orderIndex" in normalized)) {
      const { nextOrder } = await this.db.get(
        `SELECT COALESCE(MAX(${this.meta.orderColumn}), 0) + 1 AS nextOrder FROM ${this.table} WHERE user_id = ?`,
        userId
      );
      normalized[this.meta.orderColumn] = nextOrder;
    }
    if (!("visible" in normalized)) normalized.visible = 1;
    normalized.user_id = userId;

    const keys = Object.keys(normalized);
    const placeholders = keys.map(() => "?").join(", ");
    const result = await this.db.run(
      `INSERT INTO ${this.table} (${keys.join(", ")}) VALUES (${placeholders})`,
      Object.values(normalized)
    );
    return this.findById(userId, result.lastID);
  }

  async update(userId, id, payload) {
    const normalized = this._serialize(payload);
    const keys = Object.keys(normalized);
    if (!keys.length) throw Object.assign(new Error("No fields provided to update."), { status: 400 });

    const assignments = keys.map((k) => `${k} = ?`).join(", ");
    const result = await this.db.run(
      `UPDATE ${this.table} SET ${assignments} WHERE id = ? AND user_id = ?`,
      [...Object.values(normalized), id, userId]
    );
    if (result.changes === 0) throw Object.assign(new Error("Item not found or access denied."), { status: 404 });
    return this.findById(userId, id);
  }

  async remove(userId, id) {
    const result = await this.db.run(
      `DELETE FROM ${this.table} WHERE id = ? AND user_id = ?`,
      id, userId
    );
    if (result.changes === 0) throw Object.assign(new Error("Item not found or access denied."), { status: 404 });
  }

  async reorder(userId, orderedIds) {
    await Promise.all(
      orderedIds.map((id, index) =>
        this.db.run(
          `UPDATE ${this.table} SET ${this.meta.orderColumn} = ? WHERE id = ? AND user_id = ?`,
          index + 1, id, userId
        )
      )
    );
    return this.findAll(userId);
  }
}
