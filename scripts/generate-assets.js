import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:3000';
const EMAIL = 'admin@gmail.com';
const PASSWORD = 'Admin123!';

const outputRoot = path.resolve(__dirname, '..', 'output');
const screenshotsDir = path.join(outputRoot, 'screenshots');
const artifactsDir = path.join(outputRoot, 'artifacts');
const videoTempDir = path.join(artifactsDir, 'video-temp');

const reportHtmlPath = path.join(outputRoot, 'ENTERPRISE_DEMO_REPORT.html');
const reportPdfPath = path.join(artifactsDir, 'ENTERPRISE_DEMO_REPORT.pdf');
const finalVideoPath = path.join(artifactsDir, 'ENTERPRISE_DEMO_VIDEO.webm');

/* =========================
   🔥 CONVERSION OPTIMIZED ORDER
========================= */
const pages = [
  { slug: '01-landing', title: 'Landing Page', detail: 'Hero section and primary lead conversion CTA', url: `${BASE_URL}/`, requiresAuth: false },
  { slug: '02-portfolio', title: 'Portfolio Showcase', detail: 'Interactive gallery of core product features', url: `${BASE_URL}/portfolio`, requiresAuth: false },
  { slug: '03-dashboard', title: 'Admin Dashboard', detail: 'Secure, authenticated system control center', url: `${BASE_URL}/admin`, requiresAuth: true },
  { slug: '04-experience', title: 'Engineering Experience', detail: 'Detailed technical background and timeline', url: `${BASE_URL}/experience`, requiresAuth: false },
  { slug: '05-services', title: 'Core Services', detail: 'Breakdown of consulting and development offerings', url: `${BASE_URL}/services`, requiresAuth: false },
  { slug: '06-about', title: 'About the Architect', detail: 'Professional profile and mission summary', url: `${BASE_URL}/about`, requiresAuth: false },
  { slug: '07-contact', title: 'Lead Capture', detail: 'Integrated contact and communication system', url: `${BASE_URL}/contact`, requiresAuth: false },
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const wait = (ms) => new Promise(r => setTimeout(r, ms));

/* =========================
   🎬 CINEMATIC NAVIGATION ENGINE
========================= */
async function prepareAndRevealPage(page, target) {
  await page.goto(target.url, { waitUntil: 'load', timeout: 60000 });

  if (target.requiresAuth && (page.url().includes('/login') || await page.locator('input[type="email"]').first().isVisible().catch(() => false))) {
    console.log(`🔑 Authenticating secure channel for: ${target.title}`);
    await page.locator('input[type="email"]').first().fill(EMAIL);
    await page.locator('input[type="password"]').first().fill(PASSWORD);
    await page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first().click();
    await page.waitForURL(url => !url.toString().includes('/login'), { timeout: 60000 }).catch(() => { });
    await page.goto(target.url, { waitUntil: 'load' });
  }

  await page.evaluate(() => {
    const overlay = document.createElement('div');
    overlay.id = 'cinematic-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0B0F19;z-index:2147483647;opacity:1;pointer-events:none;transition:opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1);';
    document.body.appendChild(overlay);
  });

  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 150));
    window.scrollTo(0, 0);
  });
  await wait(600);

  await page.evaluate(() => {
    const overlay = document.getElementById('cinematic-overlay');
    if (overlay) overlay.style.opacity = '0';
  });
  await wait(1000);
}

async function triggerDarkFadeOut(page) {
  await page.evaluate(() => {
    let overlay = document.getElementById('cinematic-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'cinematic-overlay';
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0B0F19;z-index:2147483647;opacity:0;pointer-events:none;transition:opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1);';
      document.body.appendChild(overlay);
    }
    void overlay.offsetWidth;
    overlay.style.opacity = '1';
  });
  await wait(700);
}

/* =========================
   🎬 OPTIMIZED SMOOTH SCROLL
========================= */
async function scrollForVideo(page) {
  const sections = await page.locator('header, section, main, footer').all();

  for (const section of sections) {
    await section.scrollIntoViewIfNeeded().catch(() => { });
    await wait(350);
  }

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await wait(900);
}

async function capture(page, filePath) {
  await page.screenshot({
    path: filePath,
    fullPage: false,
    animations: 'disabled'
  });
}

/* =========================
   📄 PREMIUM MULTI-PAGE HTML + BIO
========================= */
function makeReportHtml(shots) {
  const pagesHtml = shots.map((s, idx) => `
    <div class="pdf-page">
      <div class="header">
        <h1>Executive Platform Architecture</h1>
        <p>System Layer ${String(idx + 1).padStart(2, '0')} // ${s.title}</p>
      </div>
      <section class="card">
        <div class="img-wrapper">
          <img src="./screenshots/${s.file}" alt="${s.title}" />
        </div>
        <div class="info">
          <h2>Asset Scope: ${s.title}</h2>
          <p>${s.detail}</p>
        </div>
      </section>
      <div class="footer">
        <span>Confidential Technical Showcase Documentation</span>
        <span>Page ${idx + 1} of ${shots.length + 1}</span>
      </div>
    </div>
  `).join('');

  const executiveProfileHtml = `
    <div class="pdf-page profile-page">
      <div class="header">
        <h1>Executive Engineering Profile</h1>
        <p>System Layer ${String(shots.length + 1).padStart(2, '0')} // Architect Overview</p>
      </div>
      
      <div class="profile-content">
        <div class="lead-text">
          <p>I help startups, businesses, and founders build scalable SaaS platforms, AI-powered applications, enterprise software, and modern web products.</p>
          <p>With <strong>3+ years of experience</strong> as a Full Stack Software Engineer, I specialize in designing and developing production-ready applications using React, Next.js, Angular, TypeScript, Node.js, NestJS, PostgreSQL, MongoDB, and modern cloud technologies.</p>
          <p>I have built CRM platforms, workflow automation systems, ATS resume builders, enterprise dashboards, AI-powered assistants, ERP modules, and multi-tenant SaaS applications with a strong focus on scalability, performance, security, and user experience.</p>
        </div>

        <div class="skills-container">
          <div class="skills-column">
            <h3>Core Expertise</h3>
            <ul>
              <li><span>✔</span> Full Stack Development (React, Next.js, Angular, Node.js, NestJS)</li>
              <li><span>✔</span> SaaS Product Development & Multi-Tenant Architecture</li>
              <li><span>✔</span> AI Applications, LLM Integrations & RAG Systems</li>
              <li><span>✔</span> Enterprise Software & Business Platforms</li>
              <li><span>✔</span> REST APIs, WebSockets & Backend Engineering</li>
              <li><span>✔</span> PostgreSQL, MongoDB, Prisma & Database Design</li>
              <li><span>✔</span> Workflow Automation & Business Process Solutions</li>
              <li><span>✔</span> Performance Optimization & Scalable Architecture</li>
            </ul>
          </div>

          <div class="skills-column">
            <h3>Why Work With Me?</h3>
            <ul class="bullet-list">
              <li>Clean, maintainable, and scalable code</li>
              <li>Strong system design and architecture skills</li>
              <li>Production-ready solutions built for long-term growth</li>
              <li>Clear communication and reliable delivery</li>
              <li>Experience working with startups, enterprise teams, and international clients</li>
            </ul>
          </div>
        </div>

        <div class="closing-statement">
          Whether you need an MVP, SaaS platform, AI-powered product, CRM system, internal business tool, or a complete full-stack application, I can help turn your idea into a secure, scalable, and production-ready solution.
        </div>
      </div>

      <div class="footer">
        <span>Confidential Technical Showcase Documentation</span>
        <span>Page ${shots.length + 1} of ${shots.length + 1}</span>
      </div>
    </div>
  `;

  return `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

@page { size: A4 landscape; margin: 0; }

* { box-sizing: border-box; }

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background-color: #0B0F19;
  color: #F8FAFC;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

.pdf-page {
  width: 297mm;
  height: 210mm;
  padding: 15mm 20mm;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  page-break-after: always;
  break-after: page;
  position: relative;
  background-image: 
    radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.07) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(167, 139, 250, 0.07) 0px, transparent 50%);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 4mm;
  margin-bottom: 6mm;
}

.header h1 {
  margin: 0;
  font-size: 26px;
  font-weight: 900;
  letter-spacing: -0.03em;
  background: -webkit-linear-gradient(45deg, #A78BFA, #38BDF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header p {
  margin: 0;
  color: #38BDF8;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.card {
  background: rgba(30, 41, 59, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.7);
}

.img-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background: #020617;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.info {
  padding-top: 14px;
}

.info h2 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 700;
  color: #F1F5F9;
}

.info p {
  margin: 0;
  color: #94A3B8;
  font-size: 13px;
  line-height: 1.5;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 4mm;
  margin-top: 6mm;
  font-size: 11px;
  color: #64748B;
}

/* ==================== 
   PROFILE PAGE STYLES
==================== */
.profile-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.lead-text p {
  margin: 0 0 12px 0;
  font-size: 14.5px;
  line-height: 1.6;
  color: #CBD5E1;
}

.lead-text strong {
  color: #F8FAFC;
}

.skills-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
}

.skills-column h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 700;
  color: #38BDF8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skills-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skills-column ul li {
  font-size: 13px;
  color: #94A3B8;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  line-height: 1.4;
}

.skills-column ul li span {
  color: #10B981;
  margin-right: 8px;
  font-weight: bold;
}

.bullet-list li::before {
  content: '•';
  color: #A78BFA;
  font-size: 18px;
  margin-right: 8px;
  line-height: 0.8;
}

.closing-statement {
  background: linear-gradient(90deg, rgba(56, 189, 248, 0.1), rgba(167, 139, 250, 0.1));
  border-left: 4px solid #38BDF8;
  padding: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #E2E8F0;
  line-height: 1.6;
  border-radius: 0 8px 8px 0;
}
</style>
</head>
<body>

  ${pagesHtml}
  ${executiveProfileHtml}

</body>
</html>`;
}

/* =========================
   🚀 MAIN PIPELINE
========================= */
async function main() {
  ensureDir(screenshotsDir);
  ensureDir(artifactsDir);
  ensureDir(videoTempDir);

  for (const file of [finalVideoPath, reportPdfPath, reportHtmlPath]) {
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }

  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1.5,
    recordVideo: {
      dir: videoTempDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  const video = page.video();
  const shots = [];

  for (let i = 0; i < pages.length; i++) {
    const target = pages[i];
    console.log(`Processing Target Route: ${target.title}`);

    await prepareAndRevealPage(page, target);

    const file = `${target.slug}.png`;
    const filePath = path.join(screenshotsDir, file);

    await capture(page, filePath);
    await scrollForVideo(page);

    shots.push({ ...target, file });

    if (i < pages.length - 1) {
      await triggerDarkFadeOut(page);
    }
  }

  await triggerDarkFadeOut(page);
  await context.close();

  const rawVideo = await video.path();
  if (rawVideo && fs.existsSync(rawVideo)) {
    fs.copyFileSync(rawVideo, finalVideoPath);
  }

  console.log('Generating premium multi-page executive portfolio PDF...');

  const html = makeReportHtml(shots);
  fs.writeFileSync(reportHtmlPath, html);

  const pdfContext = await browser.newContext();
  const pdfPage = await pdfContext.newPage();

  await pdfPage.goto(`file:///${reportHtmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });

  await pdfPage.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.querySelectorAll('img'));
    await Promise.all(images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve);
      });
    }));
  });

  await pdfPage.pdf({
    path: reportPdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' }
  });

  await pdfContext.close();
  await browser.close();

  if (fs.existsSync(videoTempDir)) {
    fs.rmSync(videoTempDir, { recursive: true, force: true });
  }

  console.log('\n✅ Top 1% Enterprise Assets Generated');
  console.log('🎬 Cinematic Video:', finalVideoPath);
  console.log('📄 Executive PDF:', reportPdfPath);
  console.log('🖼️ Screenshots:', screenshotsDir);
}

main().catch(err => {
  console.error('Pipeline failed:', err);
  process.exit(1);
});