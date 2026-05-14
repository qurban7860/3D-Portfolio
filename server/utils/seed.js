/* eslint-env node */
import bcrypt from "bcryptjs";

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || "admin@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin123!";

const defaultSettings = {
  hero: {
    headline: "Hi, I'm Qurban ",
    subtitle: "Turning your ideas into powerful web and mobile solutions with clean code and smooth user experiences.",
  },
  about: {
    overview: "I'm a passionate Full Stack Developer with a Bachelor's degree in Software Engineering from Punjab University (PUCIT) and over 3+ years of experience building responsive, high-performance web and mobile applications.",
    summary:  "I specialize in creating scalable, user-centric solutions using modern technologies including React, Next.js, Node.js, Express, and MongoDB.",
    details:  "My expertise spans full-stack development, real-time applications, RESTful API design, performance optimization, and responsive UI/UX design. I'm committed to writing clean, maintainable code and delivering innovative solutions that drive business growth and user satisfaction.",
  },
  contact: {
    email:              "qurbanhanif120@gmail.com",
    phone:              "+92-308-5651015",
    whatsapp:           "+92-308-5651015",
    location:           "Lahore, Pakistan",
    availabilityStatus: "Open for Work",
  },
  seo: {
    title:       "Qurban Hanif | Full Stack Developer | React | Node.js | MERN",
    description: "Full Stack Developer specializing in MERN stack, React, Next.js, and clean code. 3+ years of experience building high-performance web and mobile applications.",
    author:      "Qurban Hanif",
    url:         "https://qurbanhanif.com",
    image:       "/og-image.png",
  },
  navLinks: [
    { id: "about",      title: "About",      path: "/about" },
    { id: "portfolio",  title: "Work",        path: "/portfolio" },
    { id: "experience", title: "Experience",  path: "/experience" },
    { id: "services",   title: "Skills",      path: "/services" },
    { id: "contact",    title: "Contact",     path: "/contact" },
  ],
};

const defaultFaqs = [
  { question: "What is your primary tech stack?",      answer: "I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js for high-performance web applications." },
  { question: "Are you available for freelance work?",  answer: "Yes, I am open to freelance projects, full-time opportunities, and technical consulting." },
  { question: "Do you offer maintenance services?",     answer: "Absolutely. I provide ongoing support and maintenance to ensure your applications remain secure and up-to-date." },
];

const defaultSocials = [
  { title: "GitHub",   url: "https://github.com/qurban7860",          icon: "github"   },
  { title: "LinkedIn", url: "https://www.linkedin.com/in/qurban015",  icon: "linkedin" },
  { title: "Twitter",  url: "https://twitter.com/qurban7860",          icon: "twitter"  },
];

export async function seedDatabase(db) {
  // ── 1. Admin user ──────────────────────────────────────────────────────────
  const existingAdmin = await db.get("SELECT id FROM users WHERE email = ?", ADMIN_EMAIL);
  if (!existingAdmin) {
    const hashedPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);
    await db.run(
      "INSERT INTO users (email, password, username, role, createdAt) VALUES (?, ?, ?, ?, ?)",
      ADMIN_EMAIL,
      hashedPassword,
      "admin",
      "admin",
      new Date().toISOString()
    );
  }

  const adminUser = await db.get("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
  const adminId   = adminUser?.id ?? 1;

  const settingsRow = await db.get(
    "SELECT key FROM settings WHERE user_id = ? LIMIT 1",
    adminId
  );
  if (!settingsRow) {
    for (const [key, value] of Object.entries(defaultSettings)) {
      await db.run(
        "INSERT OR IGNORE INTO settings (user_id, key, value) VALUES (?, ?, ?)",
        adminId, key, JSON.stringify(value)
      );
    }
  }

  // ── 3. Projects ────────────────────────────────────────────────────────────
  const projectCount = await db.get("SELECT COUNT(*) as count FROM projects");
  if (projectCount.count === 0) {
    await db.run(
      "INSERT INTO projects (user_id, name, description, imageUrl, sourceCodeLink, tags, featured, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      adminId,
      "Amazon Services",
      "Built a modern e-commerce platform featuring product search, filtering, detailed item pages, user reviews, recommendations, and a responsive cart system integrated with external APIs.",
      "Project1.png",
      "https://github.com/qurban7860/AmazonClone.git",
      JSON.stringify([
        { name: "MERN",        color: "blue-text-gradient"  },
        { name: "Material-UI", color: "green-text-gradient" },
        { name: "Javascript",  color: "pink-text-gradient"  },
      ]),
      1, 1, 1
    );
    await db.run(
      "INSERT INTO projects (user_id, name, description, imageUrl, sourceCodeLink, tags, featured, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      adminId,
      "AI Portfolio Builder",
      "Quickly create a personalized portfolio with AI-generated content, real-time preview, PDF export, and user authentication. Built with Mern, Firebase, and Material-UI for a seamless, responsive experience.",
      "carrent.png",
      "https://github.com/qurban7860/ai-portfolio-builder.git",
      JSON.stringify([
        { name: "MERN",        color: "blue-text-gradient"  },
        { name: "Firebase",    color: "green-text-gradient" },
        { name: "Material-UI", color: "pink-text-gradient"  },
      ]),
      1, 1, 2
    );
    await db.run(
      "INSERT INTO projects (user_id, name, description, imageUrl, sourceCodeLink, tags, featured, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      adminId,
      "Final Year Project - ICE AGE",
      "Developed an ML model utilizing CNNs to analyze remote sensing data. Utilized ReactJS and NodeJS to develop a user-friendly web application.",
      "fyp.png",
      "https://github.com/qurban7860/FinalYearProject.git",
      JSON.stringify([
        { name: "ML",      color: "blue-text-gradient"  },
        { name: "MERN",    color: "green-text-gradient" },
        { name: "Tailwind", color: "pink-text-gradient" },
      ]),
      1, 1, 3
    );
  }

  // ── 4. Experiences ────────────────────────────────────────────────────────
  const experienceCount = await db.get("SELECT COUNT(*) as count FROM experiences");
  if (experienceCount.count === 0) {
    const experiences = [
      {
        title: "Software Engineer", company: "TMC", url: "https://tmcltd.com/",
        icon: "tmc.png", bg: "#E6DEDD", date: "July 2025 - Present", order: 1,
        points: ["Developing and maintaining web applications using React.js, Next.js, typescript, and other related technologies.", "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products."],
      },
      {
        title: "Software Engineer | MERN", company: "Terminus Technologies", url: "https://terminustech.co.nz/",
        icon: "terminus.png", bg: "#E6DEDD", date: "June 2024 - July 2025", order: 2,
        points: ["Developed an ERP system with dynamic UI features using React, Material-UI and Redux for a New Zealand-based firm.", "Created and Implemented RESTful APIs with Node.js and MongoDB, ensuring smooth integration and efficient state management."],
      },
      {
        title: "Frontend Developer", company: "COSVM Labs (React, Tailwind)", url: "https://cosvm.network/en",
        icon: "starbucks.png", bg: "#383E56", date: "Feb 2024 - June 2024", order: 3,
        points: ["Responsible developing web pages using React, Tailwind and integrating them into the live server.", "Collaborated closely with the development team to create engaging and user-friendly interfaces that met clients' needs."],
      },
      {
        title: "Full Stack Developer", company: "Upwork (MERN)", url: "https://www.upwork.com/",
        icon: "tesla.png", bg: "#E6DEDD", date: "Aug 2023 - Dec 2024", order: 4,
        points: ["Created a responsive and user-friendly dashboard application using React, leading to a 30% improvement in user engagement.", "Implementing responsive design and ensuring cross-browser compatibility."],
      },
    ];
    for (const exp of experiences) {
      await db.run(
        "INSERT INTO experiences (user_id, title, companyName, instituteUrl, iconUrl, iconBg, date, points, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        adminId, exp.title, exp.company, exp.url, exp.icon, exp.bg, exp.date,
        JSON.stringify(exp.points), 1, exp.order
      );
    }
  }

  // ── 5. Educations ─────────────────────────────────────────────────────────
  const educationCount = await db.get("SELECT COUNT(*) as count FROM educations");
  if (educationCount.count === 0) {
    await db.run(
      "INSERT INTO educations (user_id, degree, instituteName, instituteUrl, imageUrl, points, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      adminId,
      "Bachelor of Science in Software Engineering",
      "University Of The Punjab (PUCIT), Lahore Pakistan",
      "https://pucit.edu.pk/",
      "pucit.png",
      JSON.stringify([
        "Courses in Web Development, Software Engineering, OOP, DSA, DBMS, Operating System, Computer Network.",
        "Honors: Dean's List (2020-2024)",
      ]),
      1, 1
    );
  }

  // ── 6. Technologies ───────────────────────────────────────────────────────
  const technologiesCount = await db.get("SELECT COUNT(*) as count FROM technologies");
  if (technologiesCount.count === 0) {
    const techRows = [
      { name: "React JS",     iconUrl: "reactjs.png"    },
      { name: "JavaScript",   iconUrl: "javascript.png" },
      { name: "TypeScript",   iconUrl: "typescript.png" },
      { name: "Tailwind CSS", iconUrl: "tailwind.png"   },
      { name: "Node JS",      iconUrl: "nodejs.png"     },
      { name: "Git",          iconUrl: "git.png"        },
      { name: "Figma",        iconUrl: "figma.png"      },
    ];
    for (let i = 0; i < techRows.length; i++) {
      await db.run(
        "INSERT INTO technologies (user_id, name, iconUrl, visible, orderIndex) VALUES (?, ?, ?, ?, ?)",
        adminId, techRows[i].name, techRows[i].iconUrl, 1, i + 1
      );
    }
  }

  // ── 7. Services ───────────────────────────────────────────────────────────
  const servicesCount = await db.get("SELECT COUNT(*) as count FROM services");
  if (servicesCount.count === 0) {
    const services = [
      { title: "Web Development",      desc: "Custom responsive websites using React, Next.js, and modern stack",                        icon: "🌐", features: ["Responsive Design","Fast Performance","SEO Optimized","Mobile First"],                order: 1 },
      { title: "E-Commerce Solutions", desc: "Full-featured online stores with payment integration and inventory management",             icon: "🛒", features: ["Product Management","Payment Gateway","Analytics","Scalable"],                       order: 2 },
      { title: "Mobile Development",   desc: "Native and cross-platform mobile apps using React Native",                                 icon: "📱", features: ["iOS Ready","Android Ready","Fast Performance","User Friendly"],                      order: 3 },
      { title: "Web App Development",  desc: "Complex web applications with real-time features and data management",                     icon: "⚙️", features: ["Real-time Updates","Database Design","API Development","Security"],                  order: 4 },
    ];
    for (const svc of services) {
      await db.run(
        "INSERT INTO services (user_id, title, description, icon, features, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?)",
        adminId, svc.title, svc.desc, svc.icon, JSON.stringify(svc.features), 1, svc.order
      );
    }
  }

  // ── 8. Testimonials ───────────────────────────────────────────────────────
  const testimonialsCount = await db.get("SELECT COUNT(*) as count FROM testimonials");
  if (testimonialsCount.count === 0) {
    const testimonials = [
      { text: "I thought it was impossible to make a website as beautiful as our product, but Qurban proved me wrong.", name: "Sara Henry",    img: "https://randomuser.me/api/portraits/women/4.jpg", order: 1 },
      { text: "I've never met a web developer who truly cares about their clients' success like Qurban does.",           name: "Harsh Kumar",   img: "https://randomuser.me/api/portraits/men/5.jpg",   order: 2 },
      { text: "After Qurban optimized our website, our traffic increased by 50%. We can't thank them enough!",           name: "Lisa William",  img: "https://randomuser.me/api/portraits/women/6.jpg", order: 3 },
    ];
    for (const t of testimonials) {
      await db.run(
        "INSERT INTO testimonials (user_id, testimonial, name, imageUrl, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?)",
        adminId, t.text, t.name, t.img, 1, t.order
      );
    }
  }

  // ── 9. Socials ────────────────────────────────────────────────────────────
  const socialsCount = await db.get("SELECT COUNT(*) as count FROM socials");
  if (socialsCount.count === 0) {
    for (let i = 0; i < defaultSocials.length; i++) {
      const social = defaultSocials[i];
      await db.run(
        "INSERT INTO socials (user_id, title, url, icon, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?)",
        adminId, social.title, social.url, social.icon, 1, i + 1
      );
    }
  }

  // ── 10. FAQs ──────────────────────────────────────────────────────────────
  const faqsCount = await db.get("SELECT COUNT(*) as count FROM faqs");
  if (faqsCount.count === 0) {
    for (let i = 0; i < defaultFaqs.length; i++) {
      const faq = defaultFaqs[i];
      await db.run(
        "INSERT INTO faqs (user_id, question, answer, visible, orderIndex) VALUES (?, ?, ?, ?, ?)",
        adminId, faq.question, faq.answer, 1, i + 1
      );
    }
  }

  // ── 10. Stats ─────────────────────────────────────────────────────────────
  const statsCount = await db.get("SELECT COUNT(*) as count FROM stats");
  if (statsCount.count === 0 && defaultSettings.stats) {
    for (const stat of defaultSettings.stats) {
      await db.run(
        "INSERT INTO stats (user_id, stat, label, description, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?)",
        adminId, stat.stat, stat.label, stat.description, 1, stat.id
      );
    }
  }

  // ── 11. Certifications ────────────────────────────────────────────────────
  const certificationsCount = await db.get("SELECT COUNT(*) as count FROM certifications");
  if (certificationsCount.count === 0 && defaultSettings.certifications) {
    for (const cert of defaultSettings.certifications) {
      await db.run(
        "INSERT INTO certifications (user_id, title, issuer, date, icon, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?)",
        adminId, cert.title, cert.issuer, cert.date, cert.icon, 1, cert.id
      );
    }
  }
}
