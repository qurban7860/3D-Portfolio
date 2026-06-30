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
  { slug: '01-landing', title: 'Landing Page', detail: 'Hero section and CTA', url: `${BASE_URL}/`, requiresAuth: false },
  { slug: '02-portfolio', title: 'Portfolio Showcase', detail: 'Core product showcase', url: `${BASE_URL}/portfolio`, requiresAuth: false },
  { slug: '03-dashboard', title: 'Dashboard', detail: 'System control center', url: `${BASE_URL}/admin`, requiresAuth: true },
  { slug: '04-experience', title: 'Experience', detail: 'Engineering background', url: `${BASE_URL}/experience`, requiresAuth: false },
  { slug: '05-services', title: 'Services', detail: 'Offerings overview', url: `${BASE_URL}/services`, requiresAuth: false },
  { slug: '06-about', title: 'About', detail: 'Profile summary', url: `${BASE_URL}/about`, requiresAuth: false },
  { slug: '07-contact', title: 'Contact', detail: 'Lead capture system', url: `${BASE_URL}/contact`, requiresAuth: false },
];

/* ========================= */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const wait = (ms) => new Promise(r => setTimeout(r, ms));

/* =========================
   NAVIGATION
========================= */
async function gotoStable(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await wait(1500);
}

/* =========================
   AUTH HANDLER
========================= */
async function isLoginScreen(page) {
  return await page.locator('input[type="email"]').first().isVisible().catch(() => false);
}

async function login(page) {
  await gotoStable(page, `${BASE_URL}/admin/login`);

  await page.locator('input[type="email"]').fill(EMAIL);
  await page.locator('input[type="password"]').fill(PASSWORD);
  await page.locator('button[type="submit"]').click();

  await page.waitForURL(url => !url.toString().includes('/admin/login'), { timeout: 60000 }).catch(() => { });
  await wait(1200);
}

async function ensurePageReady(page, target) {
  await gotoStable(page, target.url);

  if (target.requiresAuth && await isLoginScreen(page)) {
    await login(page);
    await gotoStable(page, target.url);
  }
}

/* =========================
   🎬 VIDEO (NO SCROLLING CHAOS)
========================= */
async function scrollForVideo(page) {
  const sections = await page.locator('header, section, main').all();

  for (const section of sections) {
    await section.scrollIntoViewIfNeeded().catch(() => { });
    await wait(800);
  }

  await page.evaluate(() => window.scrollTo({ top: 0 }));
  await wait(1000);
}

/* =========================
   🖼️ SCREENSHOT (STANDARD 16:9)
========================= */
async function capture(page, filePath) {
  // Budget time for animations to finish loading and components to settle
  await wait(2000);

  await page.screenshot({
    path: filePath,
    fullPage: false,
    clip: {
      x: 0,
      y: 0,
      width: 1920,
      height: 1080
    },
    animations: 'disabled'
  });
}

/* =========================
   📄 HTML REPORT
========================= */
function makeReportHtml(shots) {
  const cards = shots.map(s => `
    <section class="card">
      <h2>${s.title}</h2>
      <div class="img-container">
        <img src="../output/screenshots/${s.file}" />
      </div>
      <p>${s.detail}</p>
    </section>
  `).join('');

  return `
<!doctype html>
<html>
<head>
<style>
@page { size: A4 landscape; margin: 10mm; }

body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  background: #0a0f1c;
  color: white;
  padding: 10mm;
}

.hero {
  padding: 20px;
  background: linear-gradient(135deg, #111827, #1e1b4b, #312e81);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 20px;
}

.hero h1 {
  margin: 0;
  font-size: 24px;
  letter-spacing: -0.025em;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.card {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  page-break-inside: avoid;
  break-inside: avoid;
}

.img-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #020617;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.card h2 {
  margin: 14px 14px 4px 14px;
  font-size: 16px;
  font-weight: 600;
}
.card p {
  margin: 0 14px 14px 14px;
  color: #94a3b8;
  font-size: 13px;
}
</style>
</head>

<body>
<div class="hero">
  <h1>Enterprise Portfolio Report</h1>
</div>

<div class="grid">
  ${cards}
</div>

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
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1, // Standardizes absolute 1080p layout scaling
    recordVideo: {
      dir: videoTempDir,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  const video = page.video();

  const shots = [];

  for (const target of pages) {
    console.log(`Processing: ${target.title}`);
    await ensurePageReady(page, target);

    const file = `${target.slug}.png`;
    const filePath = path.join(screenshotsDir, file);

    // 1. Capture pristine, non-scrolled 16:9 thumbnail frame
    await capture(page, filePath);

    // 2. Perform smooth video documentation scroll afterwards
    await scrollForVideo(page);

    shots.push({ ...target, file });
  }

  await wait(800);
  await context.close();

  const rawVideo = await video.path();
  if (rawVideo && fs.existsSync(rawVideo)) {
    fs.copyFileSync(rawVideo, finalVideoPath);
  }

  await browser.close();

  /* =========================
      PDF GENERATION
  ========================= */
  console.log('Generating production-ready executive PDF report...');
  const pdfBrowser = await chromium.launch({ headless: true });
  const pdfPage = await pdfBrowser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  const html = makeReportHtml(shots);
  fs.writeFileSync(reportHtmlPath, html);

  await pdfPage.goto(`file:///${reportHtmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
  await wait(2000);

  await pdfPage.pdf({
    path: reportPdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' }
  });

  await pdfBrowser.close();

  // Cleanup local raw video segment files
  if (fs.existsSync(videoTempDir)) {
    fs.rmSync(videoTempDir, { recursive: true, force: true });
  }

  console.log('\n✅ Asset generation complete');
  console.log('🎬 Video:', finalVideoPath);
  console.log('📄 PDF:', reportPdfPath);
  console.log('🖼️ Screenshots:', screenshotsDir);
}

main().catch(err => {
  console.error('Pipeline failed:', err);
  process.exit(1);
});