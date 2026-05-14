# 🚀 AI-Powered 3D Portfolio CMS

[![Status](https://img.shields.io/badge/Status-Production%20Ready-00cea8?style=for-the-badge&logo=rocket)](https://github.com/qurban7860/3D-Portfolio)
[![Tech](https://img.shields.io/badge/Stack-MERN%20+%20Three.js-61DAFB?style=for-the-badge&logo=react)](https://github.com/qurban7860/3D-Portfolio)

A world-class, **3D Developer Portfolio** engineered with **React 18**, **Three.js**, and a **Node.js CMS**. Designed for maximum impact, this platform allows developers to manage their professional identity in real-time through a premium **Admin Dashboard**.

---

## 💎 Premium Features

*   **Cinematic 3D Visuals**: Immersive Three.js scenes (Computers, Earth, Stars) for a high-end user experience.
*   **Dynamic CMS**: Real-time management of Projects, Experience, Skills, and Testimonials via a secure Admin Panel.
*   **Vanity URLs**: Personalized public links (e.g., `portfolio.com/username`) for multi-tenant support.
*   **Glassmorphic UI**: State-of-the-art design with blurred textures, satin borders, and fluid animations.
*   **One-Click Deployment**: Optimized for Vercel, Railway, and Turso (SQLite/LibSQL) integration.
*   **SEO Optimized**: Fully customizable meta tags and social sharing configurations.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion |
| **3D Engine** | Three.js, React Three Fiber, Drei |
| **Backend** | Node.js, Express.js, JWT Authentication |
| **Database** | SQLite / LibSQL (Turso Ready) |
| **Icons** | Dynamic React Icons (FA, MD, SI, HI) |

---

## 🚀 Quick Start

### 1. Setup Environment
```bash
git clone https://github.com/qurban7860/3D-Portfolio.git
cd 3D-Portfolio
npm install
```

### 2. Configure `.env`
```env
PORT=4002
JWT_SECRET=your_secret_key
VITE_API_BASE_URL=http://localhost:4002/api
```

### 3. Launch Platform
```bash
# Terminal 1: API Server
npm run dev:server

# Terminal 2: Frontend
npm run dev
```

---

## 📁 Architecture Summary

*   `server/`: Express backend with SQLite persistence.
*   `src/components/admin/`: High-fidelity dashboard modules.
*   `src/context/`: Global state for Auth and Portfolio synchronization.
*   `src/styles.js`: Centralized design system tokens.

---

## 📄 License
MIT License. Built with passion for the developer community.
