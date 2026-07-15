# 🌌 Interactive 3D SaaS Portfolio Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![LibSQL](https://img.shields.io/badge/LibSQL-SQLite_Compatible-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://github.com/tursodatabase/libsql)
[![Express](https://img.shields.io/badge/Express-Node.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> A production-grade, multi-tenant portfolio CMS platform engineered with modern SaaS principles, immersive WebGL 3D environments, a full admin control panel, and a JWT-secured REST API.

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Admin Dashboard](#-admin-dashboard)
- [Multi-Tenant Routing](#-multi-tenant-routing)
- [Deployment](#-deployment)
- [Author](#-author)

---

## ✨ Features

### 🎨 Immersive 3D Visual Experience
- **WebGL Rendering** via `three.js` and `@react-three/fiber` — interactive animated 3D assets with demand-based frame rendering for performance.
- **Cinematic Glassmorphism UI** — curated HSL color palettes, `backdrop-filter` blur layers, and animated light beams compose a premium dark-mode aesthetic.
- **Real-Time Theme Studio** — users select and preview multiple cinematic themes directly from the navbar. Theme state is persisted to both `localStorage` and the database; CSS custom properties update instantly with zero layout shifts.
- **Micro-Animations** — `framer-motion` powers page transitions, staggered list entries, hover shimmer effects, and interactive card tilts via `react-tilt`.

### ⚙️ Dynamic CMS & Admin Control Panel
- **Full CRUD Engine** — administrators manage all portfolio sections (Hero, About, Projects, Experience, Skills, Services, Certifications, FAQs, Contact, and Social Links) through a typed schema-driven form system.
- **JWT-Protected REST API** — `jsonwebtoken` + `bcryptjs` authenticate sessions with 8-hour rotating tokens. All write endpoints are gated by `authMiddleware`.
- **Dynamic Icon Resolution** — icon names are stored as plain strings in the database and resolved to live React Icon components at runtime, eliminating hardcoded SVG assets.
- **Media Upload Pipeline** — `multer` handles image uploads with an automatic fallback to system `tmp/` directories for serverless runtime compatibility (Vercel, Railway, Render).

### 🏢 Multi-Tenant SaaS Architecture
- **Path-Based Tenant Routing** — `/:username` in React Router resolves individual user portfolios from a shared database, enabling one deployment to serve unlimited portfolio instances.
- **Robust LibSQL Database Adapter** — custom `DatabaseAdapter` wrapper normalises `undefined` → `null` on all query parameters, preventing silent SQLite binding failures across environments.
- **Repository Pattern** — `ContentRepository`, `SettingsRepository`, and `ThemeRepository` abstract all DB interactions behind clean interfaces, making persistence layer swaps trivial.

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     CLIENT (Vite + React)                │
│  ThemeContext ──┐                                        │
│  AuthContext ───┼── React Router (/:username)            │
│  PortfolioCtx ──┘      │                                 │
│                        ▼                                 │
│          Page Components + 3D Canvas (Three.js)          │
└───────────────────────┬──────────────────────────────────┘
                        │ /api/*  (JWT Bearer)
┌───────────────────────▼──────────────────────────────────┐
│                  SERVER (Express.js)                     │
│  authMiddleware ──► Routes (auth / content / admin /     │
│                              portfolio / themes)         │
│                        │                                 │
│              Repositories (Content / Settings / Theme)   │
│                        │                                 │
│              DatabaseAdapter (@libsql/client)            │
│                        │                                 │
│              SQLite file  ─or─  Turso Cloud              │
└──────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18, Vite 5 |
| 3D Rendering | Three.js, @react-three/fiber, @react-three/drei |
| Animations | Framer Motion, React-Tilt |
| Styling | Tailwind CSS 3, Vanilla CSS Custom Properties |
| Routing | React Router DOM v6 |
| SEO | React Helmet Async |
| Backend | Node.js 20, Express.js 4 |
| Authentication | JSON Web Tokens, bcryptjs |
| Database | LibSQL / SQLite (@libsql/client) + Turso Cloud support |
| File Uploads | Multer |
| Email | EmailJS Browser SDK |

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** ≥ 20
- **npm** ≥ 9

### 1. Clone & Install

```bash
git clone https://github.com/qurban7860/3D-Portfolio.git
cd 3D-Portfolio
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Server
PORT=4000
JWT_SECRET=replace-with-a-strong-random-secret

# Database — leave blank to use a local SQLite file
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

### 3. Initialize the Database

```bash
npm run db:migrate
```

### 4. Start Development Servers

```bash
# Terminal 1 — Frontend (Vite dev server on :3000)
npm run dev

# Terminal 2 — Backend API (Express on :4000)
npm run dev:server
```

- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:4000/api`

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Express server port (default: `4000`) |
| `JWT_SECRET` | **Yes** | Secret key for signing JWT tokens |
| `TURSO_DATABASE_URL` | No | Turso remote database URL (leave blank for local SQLite) |
| `TURSO_AUTH_TOKEN` | No | Turso auth token (required if `TURSO_DATABASE_URL` is set) |

---

## 📁 Project Structure

```
3D-Portfolio/
├── server/
│   ├── index.js              # Server entry point — DB init + app.listen
│   ├── app.js                # Express app, middleware, route mounting
│   ├── db.js                 # DatabaseAdapter, schema init, migrations
│   ├── middleware/
│   │   └── auth.js           # JWT authMiddleware + isAdmin guard
│   ├── repositories/
│   │   ├── ContentRepository.js
│   │   ├── SettingsRepository.js
│   │   └── ThemeRepository.js
│   ├── routes/
│   │   ├── auth.js           # /api/auth — register, login, /me
│   │   ├── admin.js          # /api/admin — protected CRUD
│   │   ├── content.js        # /api/content — public reads
│   │   ├── portfolio.js      # /api/portfolio — public multi-tenant reads
│   │   └── themes.js         # /api/themes — theme CRUD
│   └── utils/
│       ├── seed.js           # Default data seeder
│       └── migrate.js        # Database migration runner
│
├── src/
│   ├── api/                  # Axios API layer (content.js, auth.js, themes.js)
│   ├── assets/               # Static images and resume PDF
│   ├── components/
│   │   ├── canvas/           # Three.js canvas components (Stars, Earth, Computers)
│   │   ├── admin/            # CMS components (ContentManager, ItemForm, ItemList)
│   │   └── common/           # Shared UI (Logo, SectionWrapper)
│   ├── constants/
│   │   └── adminSchema.js    # Schema definitions driving all CMS forms
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── PortfolioContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── Admin/            # Dashboard, Login, Register pages
│   │   └── Public/           # All public portfolio section pages
│   ├── utils/
│   │   └── iconMapping.js    # String-to-ReactIcon resolver
│   ├── styles.js             # Shared Tailwind class utility strings
│   └── index.css             # Global CSS, design tokens, glassmorphism utilities
│
├── public/                   # Static assets (3D models, hero background)
├── vite.config.js            # Vite config with chunk splitting & prod console drop
└── tailwind.config.js        # Tailwind theme extension (maps to CSS custom props)
```

---

## 🔒 Admin Dashboard

Navigate to `/admin/login` to authenticate. After login, the dashboard provides:

| Section | Operations |
|---|---|
| **General Settings** | Hero headline, About bio, Contact details, SEO metadata, Nav links |
| **Theme Studio** | Create / edit / delete / activate cinematic color themes |
| **Content Sections** | Projects, Experience, Skills, Services, Certifications, FAQs, Social Links |
| **User Directory** *(admin only)* | View and manage registered portfolio users |

---

## 🌐 Multi-Tenant Routing

Each registered user automatically receives a public portfolio URL at `/:username`. The platform resolves the username via React Router and fetches that user's content from the shared database — no subdomain configuration required.

```
https://yourdomain.com/         → Owner portfolio
https://yourdomain.com/alice    → Alice's portfolio
https://yourdomain.com/bob      → Bob's portfolio
```

---

## 🚀 Deployment

### Vercel (Recommended for Frontend)

The frontend builds to a static bundle with `npm run build`. Upload the `dist/` folder or connect the repo directly. The Vite proxy config is for local dev only — configure API rewrites in `vercel.json` for production.

The server uses `@libsql/client` which supports Turso remote databases out of the box — no additional driver setup needed.

---

## 👨‍💻 Author

**Qurban Hanif** — Full Stack Software Engineer

- 🌐 [Portfolio](https://qurbanportfolio.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/qurban015)
- 🐙 [GitHub](https://github.com/qurban7860)

---

*Engineered with precision for maximum visual impact, runtime performance, and engineering excellence. Built to impress recruiters and clients who expect more than a template.*
