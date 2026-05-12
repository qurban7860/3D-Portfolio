# 🚀 Premium 3D Developer Portfolio

![Status](https://img.shields.io/badge/Status-Production%20Ready-00cea8?style=for-the-badge&logo=rocket)
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

A cinematic, immersive 3D portfolio engineered to top-1% industry standards. Built with **React 18**, **Three.js**, **Framer Motion**, a **Node.js/SQLite backend CMS**, and a **secure Admin Dashboard** for full real-time content control.

---

## ✨ Feature Highlights

### 🎨 Immersive Visual Design
- **Cinematic 3D Scenes**: Interactive `@react-three/fiber` visualizations — Computers, Earth globe, Star field
- **Glassmorphic Design System**: Bespoke `backdrop-blur`, satin borders, deep mesh gradients, and ambient glow effects
- **Micro-animations**: Spring-physics hover states, entrance transitions, stagger reveals with Framer Motion
- **Premium Navbar**: Glassmorphic `Connect` social dropdown with live API data, animated Resume button with View/Download sub-menu
- **Dark-first Aesthetic**: HSL-tuned color palette — deep navy, violet accent `#915EFF`, cyan highlight `#56ccf2`

### ⚙️ Enterprise-Grade Architecture
- **Full CMS Backend**: Node.js + Express + SQLite with `better-sqlite3` for zero-dependency local storage
- **Secure Admin Dashboard**: JWT-authenticated admin panel for real-time CRUD on all content types
- **Dynamic Icon Resolution**: `getIcon()` utility resolves icon strings (`"FaGithub"`, `"FaLinkedIn"`) to live React components at runtime — no hardcoded mappings
- **Unified Social Link System**: Social links managed from a single **Social Links** table in the CMS; all UI components (Navbar, Hero, Footer, Contact) consume `data.socials` dynamically
- **Settings API**: Clean `settings` store for `hero`, `about`, `seo`, `navLinks`, `faqs`, and `contact` (location & availability only — direct links are managed separately)

### 📱 Responsiveness & Performance
- **Fluid Multi-Breakpoint Layouts**: Optimized from ultra-wide 4K to 320px mobile
- **Lazy-loaded 3D Canvases**: `Suspense` + `OrbitControls` ensure non-blocking 3D rendering
- **Global Error Boundary**: Prevents canvas crashes from propagating to the rest of the UI
- **Skeleton Loaders**: `LoadingState` component with animated spinner and pulse glow
- **Zero-Layout-Shift**: Content slots pre-sized before data arrives to prevent CLS

### 🔐 Security & Auth
- **JWT Admin Authentication**: Secure token-based login for the Admin Dashboard
- **Protected API Routes**: All admin endpoints guarded by `authMiddleware`
- **Content Filtering**: Visible/hidden flag on every content item; soft-control without deletion

---

## 🗂️ Content Types (CMS Managed)

| Type | Description |
|---|---|
| **Projects** | Portfolio projects with tags, images, GitHub & live demo links |
| **Experience** | Work history with company, dates, role, and bullet points |
| **Education** | Academic background |
| **Technologies** | Skill icons rendered dynamically |
| **Services** | Service cards with features list |
| **Testimonials** | Client/colleague testimonials |
| **Social Links** | All social/contact links (GitHub, LinkedIn, WhatsApp, Twitter, etc.) — single source of truth |
| **Certifications** | Certifications with issuer and date |
| **Quick Stats** | Animated metric cards (e.g. "50+ Projects") |
| **Settings** | Hero headline/subtitle, About text, SEO, Nav links, FAQs, Location & Availability |

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion |
| **3D Engine** | Three.js, React Three Fiber (`@react-three/fiber`), Drei |
| **State Management** | React Context API (`PortfolioContext`, `AuthContext`) |
| **Backend / API** | Node.js, Express.js |
| **Database** | SQLite via `better-sqlite3` |
| **Auth** | JSON Web Tokens (JWT) |
| **Email** | EmailJS (Professional Tier) |
| **Icons** | React Icons (FA, MD, SI, HI) via dynamic `getIcon()` resolver |
| **Animations** | Framer Motion (spring physics, AnimatePresence, variants) |
| **Linting / DX** | ESLint, Vite HMR |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **npm** v9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/qurban7860/3D-Portfolio.git
cd 3D-Portfolio

# 2. Install all dependencies
npm install

# 3. Create environment file
cp .env.example .env
```

### Environment Variables (`.env`)

```env
# Backend Server
PORT=5000
JWT_SECRET=your_super_secret_jwt_key

# Frontend API Base (auto-proxied in dev)
VITE_API_URL=http://localhost:5000/api
```

### Development

```bash
# Run frontend (Vite dev server on :5173)
npm run dev

# Run backend API server (Express on :5000) — in a separate terminal
npm run dev:server
```

### Admin Access

Navigate to `/admin` and log in with credentials seeded during database initialization.  
Default seed credentials are set in `server/utils/seed.js`.

---

## 📁 Project Structure

```
3D-Portfolio/
├── public/                     # Static assets (logo, OG image)
├── server/                     # Express backend
│   ├── db.js                   # SQLite connection & schema init
│   ├── middleware/             # Auth & upload middleware
│   ├── routes/
│   │   └── content.js          # All API routes (CRUD + settings)
│   └── utils/
│       └── seed.js             # Database seeder
├── src/
│   ├── api/
│   │   └── content.js          # Typed fetch helpers
│   ├── assets/                 # Images, resume PDF
│   ├── components/
│   │   ├── admin/              # Admin Dashboard components
│   │   │   ├── ContentManager.jsx
│   │   │   ├── ItemForm.jsx
│   │   │   ├── ItemList.jsx
│   │   │   └── SettingsManager.jsx
│   │   ├── canvas/             # Three.js scene components
│   │   ├── common/             # Shared UI (LoadingState, ConfirmDialog)
│   │   ├── About.jsx
│   │   ├── Contact.jsx         # EmailJS form + dynamic social cards
│   │   ├── Footer.jsx          # Dynamic social links from CMS
│   │   ├── Hero.jsx            # CMS-driven headline + dynamic socials
│   │   ├── Navbar.jsx          # Premium Connect dropdown from data.socials
│   │   ├── Services.jsx
│   │   ├── Works.jsx
│   │   └── ...
│   ├── constants/
│   │   └── adminSchema.js      # Field definitions for CMS forms
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── PortfolioContext.jsx
│   ├── pages/                  # Route-level page components
│   ├── styles.js               # Design token utility classes
│   ├── utils/
│   │   ├── assetResolver.js    # Smart URL resolver for images
│   │   └── iconMapping.js      # Dynamic React Icon resolver
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

---

## 🌐 Key Architectural Decisions

### Unified Social Links (`data.socials`)
All social/contact links are managed from a **single Social Links table** in the CMS. Every UI component — `Navbar`, `Hero`, `Footer`, `Contact` — reads from `data.socials` exclusively. This eliminates duplication and makes updates instant across the entire site.

### Dynamic Icon Resolution
Icons are stored as strings (e.g. `"FaGithub"`) in the database. The `getIcon(name)` utility resolves them at render time using a merged icon map from `react-icons/fa`, `react-icons/md`, `react-icons/si`, and `react-icons/hi`. Case-insensitive matching ensures resilience against capitalisation differences.

### Settings API — Clean Separation
The `settings` store contains only configuration data: `hero`, `about`, `seo`, `navLinks`, `faqs`, and `contact` (location & availability only). Direct social URLs live in `socials` — not `contact` — preventing stale duplicates.

---

## 📊 Roadmap

- [x] Full CMS with real-time Admin Dashboard
- [x] JWT-secured backend API
- [x] Dynamic social links system (single source of truth)
- [x] Premium glassmorphic UI with 3D scenes
- [x] EmailJS contact form with status feedback
- [x] Global loading, error, and fallback states
- [x] Responsive mobile sidebar navigation
- [x] SEO meta tags via settings
- [ ] Multi-language (i18n) support
- [ ] Light mode with glassmorphism contrast adaptation
- [ ] Portfolio analytics dashboard

---

## 👨‍💻 Author

**Qurban Hanif** — Full Stack Developer & Software Engineer

- **GitHub**: [@qurban7860](https://github.com/qurban7860)
- **Email**: qurbanhanif120@gmail.com
- **LinkedIn**: [Qurban Hanif](https://www.linkedin.com/in/qurban015)
- **Website**: [Live Demo](https://qurbanportfolio.vercel.app/)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
