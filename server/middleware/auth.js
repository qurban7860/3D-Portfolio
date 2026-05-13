/* eslint-env node */
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-for-production";

export default function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: missing token" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {
      id:       Number(payload.id),
      email:    payload.email,
      username: payload.username,
      role:     payload.role,
    };
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized: invalid or expired token" });
  }
}

export function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin privileges required" });
  }
  next();
}
