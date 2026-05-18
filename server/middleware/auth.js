/* eslint-env node */
import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: missing token" });
  }

  try {
    const secret = process.env.JWT_SECRET || "change-this-secret-for-production";
    const payload = jwt.verify(token, secret);
    req.user = {
      id:       Number(payload.id),
      email:    payload.email,
      username: payload.username,
      role:     payload.role,
    };
    return next();
  } catch (err) {
    console.error(`🔐 Auth Verification Failed: ${err.message}`);
    return res.status(401).json({ 
      message: "Unauthorized: invalid or expired token",
      debug: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}

export function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin privileges required" });
  }
  next();
}
