# Enterprise Portfolio Automation Script

This robust Playwright automation script acts as a universal generator for recruiter-grade assets, producing high-conversion artifacts that immediately signal top-1% engineering quality. 

## Features
- **Deterministic UI Crawling**: Autonomously crawls target routes, resolving login screens automatically.
- **Continuous Scroll Recording**: Simulates smooth human interactions, outputting a highly polished `.webm` demo video.
- **Executive PDF Case Study**: Compiles high-resolution screenshots into an enterprise-grade HTML layout and generates a precisely scaled PDF.
- **Zero-Ripple Integration**: Operates completely external to your application state, ensuring no impact on production or bundle sizes.

---

## 🚀 The Universal Asset Generation Prompt

*Copy and paste the exact prompt below into any future AI coding assistant when starting a new project. This guarantees you will immediately receive the exact top-notch asset generation script pattern used here.*

> **Universal Prompt for AI Assistants:**
> 
> "I need a top-notch, enterprise-grade Playwright automation script to generate recruiter-grade portfolio assets. Use the exact robust pattern:
> 1. Use Playwright (Chromium only) to capture full-page screenshots, a continuous scrolling demo video (`recordVideo` at 1366x768), and a dynamic HTML-to-PDF executive case study report.
> 2. Implement an `ensurePageReady` function with `gotoStable` (using `waitUntil: 'domcontentloaded'` and manual buffers) that checks for and bypasses login screens dynamically via an `isLoginScreen` and `loginUi` handler.
> 3. Generate a stunning, landscape A4 HTML report dynamically mapping the screenshots, using a premium dark-mode aesthetic (linear gradients, pill summaries).
> 4. For PDF generation, wait for all images to decode using a robust `Promise.all` evaluation (`document.querySelectorAll('img')` with `load` and `decode` checks) before calling `page.pdf()` with zero margins and CSS page size.
> 5. Output structure should be `/output/screenshots`, `/output/artifacts/ENTERPRISE_DEMO_REPORT.pdf`, and `/output/artifacts/ENTERPRISE_DEMO_VIDEO.webm`.
> Ensure it's efficient, uses ES modules (if applicable), and has absolutely no ripple effect on the main app codebase."

---

## Usage Instructions

1. **Start the environment:** Ensure both your frontend (`npm run dev`) and backend (`npm run dev:server`) are actively running in separate terminals.
2. **Execute the script:**
   ```bash
   node scripts/generate-assets.js
   ```
3. **Retrieve outputs:** Find your assets in `output/artifacts` and `output/screenshots`.
