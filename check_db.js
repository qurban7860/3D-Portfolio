import { initializeDatabase, getDb } from "./server/db.js";

async function checkThemes() {
  try {
    await initializeDatabase();
    const db = getDb();
    const themes = await db.all("SELECT id, name, isPublic, user_id FROM themes");
    console.log("THEMES_DATA:", JSON.stringify(themes));
  } catch (err) {
    console.error(err);
  }
}

checkThemes();
