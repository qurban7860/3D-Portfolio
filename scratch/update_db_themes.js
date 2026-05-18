import { initializeDatabase } from "../server/db.js";

async function run() {
  console.log("🔄 Initializing database adapter...");
  const db = await initializeDatabase();
  
  console.log("📥 Fetching all stored themes...");
  const rows = await db.all("SELECT id, name, config FROM themes");
  console.log(`Found ${rows.length} themes.`);

  for (const row of rows) {
    const config = JSON.parse(row.config);
    if (config.effects) {
      console.log(`Updating theme: "${row.name}"...`);
      config.effects.glowColor = "rgba(0, 0, 0, 0)";
      config.effects.glowIntensity = "0";
      
      await db.run(
        "UPDATE themes SET config = ? WHERE id = ?",
        JSON.stringify(config),
        row.id
      );
    }
  }

  console.log("✅ Database themes successfully updated!");
  process.exit(0);
}

run().catch(err => {
  console.error("❌ Migration error:", err);
  process.exit(1);
});
