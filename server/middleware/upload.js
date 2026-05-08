import multer from "multer";
import path from "path";
import { mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadPath = path.join(__dirname, "uploads");

try {
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }
} catch (err) {
  console.warn("Could not create uploads directory (expected in serverless):", err.message);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (_req, file, cb) => {
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${sanitized}`);
  },
});

const allowedExtensions = [".png", ".jpg", ".jpeg", ".svg", ".gif", ".webp"];

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowedExtensions.includes(ext));
  },
});

export default upload;