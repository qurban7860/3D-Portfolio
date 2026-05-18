import 'dotenv/config';
import app from "./app.js";

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Portfolio API server running on http://localhost:${PORT}`);
});
