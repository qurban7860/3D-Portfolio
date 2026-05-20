import 'dotenv/config';
import app from "./app.js";
import { initializeDatabase } from "./db.js";

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    console.log("⏳ Initializing Database...");
    await initializeDatabase();
    console.log("✅ Database initialized successfully.");
    
    app.listen(PORT, () => {
      console.log(`Portfolio API server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server due to database error:", err);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

startServer();
