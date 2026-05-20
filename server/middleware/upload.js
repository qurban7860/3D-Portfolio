import multer from "multer";
import path from "path";
import { mkdirSync, existsSync, writeFileSync, unlinkSync } from "fs";
import { fileURLToPath } from "url";
import os from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let baseUploadPath = path.join(__dirname, "..", "uploads");
let isWritable = false;

try {
  if (!existsSync(baseUploadPath)) {
    mkdirSync(baseUploadPath, { recursive: true });
  }
  const testFile = path.join(baseUploadPath, `.write-test-${Date.now()}`);
  writeFileSync(testFile, "test");
  unlinkSync(testFile);
  isWritable = true;
} catch (err) {
  console.warn("⚠️ Local uploads folder is not writable (e.g. serverless host). Falling back to /tmp/3d-portfolio/uploads.");
}

if (!isWritable) {
  baseUploadPath = path.join(os.tmpdir(), "3d-portfolio", "uploads");
  try {
    if (!existsSync(baseUploadPath)) {
      mkdirSync(baseUploadPath, { recursive: true });
    }
  } catch (err) {
    console.error("❌ Failed to create fallback tmp upload path:", err.message);
  }
}

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const userId = req.user?.id || "public";
    const userUploadPath = path.join(baseUploadPath, String(userId));
    
    try {
      if (!existsSync(userUploadPath)) {
        mkdirSync(userUploadPath, { recursive: true });
      }
    } catch (err) {
      console.warn("Could not create tenant uploads directory:", err.message);
    }
    
    cb(null, userUploadPath);
  },
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