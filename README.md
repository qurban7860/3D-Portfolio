# 🌌 Interactive 3D SaaS Portfolio Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-LibSQL-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://github.com/tursodatabase/libsql)
[![Express](https://img.shields.io/badge/Express-Node.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

A premium, full-stack, multi-tenant portfolio platform engineered with modern SaaS principles, immersive WebGL-powered 3D environments, and a robust administrative control panel. This is not just a landing page—it is a production-grade content management engine designed to show off software engineering skills at the highest level.

---

## ✨ Core Highlights & Technical Showcase

### 🎨 Immersive 3D Experience
- **WebGL Rendering Engine:** Implemented with `three.js` and `@react-three/fiber` for responsive, interactive 3D assets.
- **Glassmorphism UI/UX:** Styled using curated HSL color schemes, backdrop-filter blurs (`backdrop-blur-2xl`), and interactive micro-animations using `framer-motion`.
- **Dynamic Themes:** Real-time client-side theme transitions. Users can select and preview cinematic color schemes directly from the navigation bar, updating CSS custom variables globally without layout shifts.

### ⚙️ Full CMS Control & Dynamic Content
- **Admin Control Panel:** Fully integrated portal supporting complete CRUD operations on projects, experiences, skills, services, FAQs, and settings.
- **JWT-Protected REST API:** Robust API backend secure against unauthorized modifications.
- **Dynamic Icon Resolution:** Map string representation of icons stored in the database to live React Icons (`react-icons/fi`, `react-icons/hi`) on the fly, eliminating hardcoded assets.

### 🏢 Production-Grade Multi-Tenant Architecture
- **Dynamic Sub-Portfolio Resolution:** Path-based username routing (`/:username`) resolves and fetches corresponding user configurations from the database.
- **Serverless File Upload System:** Multer-based uploader with built-in path fallback to `/tmp/3d-portfolio/uploads` for read-only environments (like Vercel), ensuring media uploads remain functional without dedicated block storage.
- **Robust Database Adapter:** Enhanced database connection module with automatic parameter sanitization, translating JavaScript `undefined` parameters to database-safe `null` values dynamically.

---

## 🛠️ Technology Stack & Architecture

### Frontend Architecture
- **Framework:** React 18 & Vite
- **Animations:** Framer Motion (page transitions and interactive card hover states) & React-Tilt (3D perspective-guided tilts)
- **3D Canvas:** Three.js, React Three Fiber, Drei
- **Routing:** React Router DOM v6
- **Metadata/SEO:** React Helmet Async (dynamic page title and meta tag updates)

### Backend Architecture
- **Server Engine:** Node.js & Express.js
- **Database Client:** `@libsql/client` (SQLite-compatible driver supporting both local files and remote Turso cloud databases)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt-hashed administrator accounts
- **File Management:** Multer with dual directory static serving (local server directory + system temporary directories for serverless runtime fallbacks)

---

## ⚙️ Quick Start & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/qurban7860/3D-Portfolio.git
cd 3D-Portfolio
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the **root** folder:
```env
# Server Configuration
PORT=3000
JWT_SECRET=your-premium-jwt-secret-key-here

# Database Configuration (Leave empty to use local SQLite)
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

### 3. Initialize Database
Initialize the database and seed the default tables and themes:
```bash
npm run db:migrate
```

### 4. Run Development Servers
Start both the Vite dev frontend server and Express backend server concurrently:
```bash
# In the project root:
npm run dev
```

The application will be running at:
- Frontend: `http://localhost:5173/`
- Backend API: `http://localhost:3000/`

---

## 🔒 Security & Admin Provisioning

To access the administrative dashboard (`http://localhost:5173/admin/login`):
1. Register a new administrator account via the registration route `/admin/register`.
2. Logging in provides a secure JSON Web Token stored locally.
3. Once authenticated, administrators can build and customize themes, upload project screenshots, write new experiences, update contact preferences, and change hero sections in real-time.

---

## 👨‍💻 Author Profile & Links

**Qurban Hanif** — Full Stack Software Engineer specializing in premium interactive web architectures.

- **Portfolio Website:** [qurbanportfolio.vercel.app](https://qurbanportfolio.vercel.app/)
- **LinkedIn Profile:** [linkedin.com/in/qurban015](https://www.linkedin.com/in/qurban015)
- **GitHub Repository:** [github.com/qurban7860/3D-Portfolio](https://github.com/qurban7860/3D-Portfolio)

---

Developed with absolute passion for modern interactive web design, performance optimization, and premium user experience. If you are a recruiter or client looking for high-quality developer resources, **[connect with me on LinkedIn](https://www.linkedin.com/in/qurban015)**!
