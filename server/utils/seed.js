/* eslint-env node */
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@portfolio.local";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin123!";

const defaultSettings = {
  hero: {
    headline: "Hi, I'm Qurban",
    subtitle: "Turning your ideas into powerful web and mobile solutions with clean code and smooth user experiences.",
  },
  about: {
    overview: "I'm a passionate Full Stack Developer with a Bachelor's degree in Software Engineering from Punjab University (PUCIT) and over 3+ years of experience building responsive, high-performance web and mobile applications.",
    summary: "I specialize in creating scalable, user-centric solutions using modern technologies including React, Next.js, Node.js, Express, and MongoDB.",
    details: "My expertise spans full-stack development, real-time applications, RESTful API design, performance optimization, and responsive UI/UX design. I'm committed to writing clean, maintainable code and delivering innovative solutions that drive business growth and user satisfaction.",
  },
  contact: {
    email: "qurbanhanif120@gmail.com",
    phone: "+92-308-5651015",
    whatsapp: "+92-308-5651015",
    github: "https://github.com/qurban7860",
    linkedin: "https://www.linkedin.com/in/qurban015",
    twitter: "https://twitter.com/qurban7860",
    location: "Lahore, Pakistan",
    availabilityStatus: "Open for Work",
  },
  stats: [
    { id: 1, stat: "3+", label: "Years of Experience", description: "Building scalable web solutions" },
    { id: 2, stat: "50+", label: "Projects Completed", description: "From startups to enterprises" },
    { id: 3, stat: "30+", label: "Satisfied Clients", description: "International & local businesses" },
    { id: 4, stat: "100%", label: "Project Success Rate", description: "On-time & budget deliveries" },
  ],
  certifications: [
    { id: 1, title: "Full Stack Web Development (MERN)", issuer: "Complete Course - Udemy", date: "Feb 2024", icon: "🏆", credentialUrl: "" },
    { id: 2, title: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", date: "Aug 2023", icon: "⭐", credentialUrl: "" },
    { id: 3, title: "Meta Front-End Developer Certificate", issuer: "Coursera", date: "Jan 2024", icon: "📚", credentialUrl: "" },
  ],
  seo: {
    title: "Qurban Hanif | Full Stack Developer | React | Node.js | MERN",
    description: "Full Stack Developer specializing in MERN stack, React, Next.js, and clean code. 3+ years of experience building high-performance web and mobile applications.",
    author: "Qurban Hanif",
    url: "https://qurbanhanif.com",
    image: "/og-image.png",
  },
  navLinks: [
    { id: "about", title: "About" },
    { id: "projects", title: "Work" },
    { id: "contact", title: "Contact" },
  ],
};

export async function seedDatabase(db) {
  const existingAdmin = await db.get("SELECT id FROM users WHERE email = ?", ADMIN_EMAIL);
  if (!existingAdmin) {
    const hashedPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);
    await db.run(
      "INSERT INTO users (email, password, role, createdAt) VALUES (?, ?, ?, ?)",
      ADMIN_EMAIL,
      hashedPassword,
      "admin",
      new Date().toISOString()
    );
  }

  const existingSettings = await db.get("SELECT key FROM settings LIMIT 1");
  if (!existingSettings) {
    for (const [key, value] of Object.entries(defaultSettings)) {
      await db.run("INSERT INTO settings (key, value) VALUES (?, ?)", key, JSON.stringify(value));
    }
  }

  const projectCount = await db.get("SELECT COUNT(*) as count FROM projects");
  if (projectCount.count === 0) {
    await db.run(
      "INSERT INTO projects (name, description, imageUrl, sourceCodeLink, tags, featured, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      "Amazon Services",
      "Built a modern e-commerce platform featuring product search, filtering, detailed item pages, user reviews, recommendations, and a responsive cart system integrated with external APIs.",
      "Project1.png",
      "https://github.com/qurban7860/AmazonClone.git",
      JSON.stringify([
        { name: "MERN", color: "blue-text-gradient" },
        { name: "Material-UI", color: "green-text-gradient" },
        { name: "Javascript", color: "pink-text-gradient" },
      ]),
      1,
      1,
      1
    );
    await db.run(
      "INSERT INTO projects (name, description, imageUrl, sourceCodeLink, tags, featured, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      "AI Portfolio Builder",
      "Quickly create a personalized portfolio with AI-generated content, real-time preview, PDF export, and user authentication. Built with Mern, Firebase, and Material-UI for a seamless, responsive experience.",
      "carrent.png",
      "https://github.com/qurban7860/ai-portfolio-builder.git",
      JSON.stringify([
        { name: "MERN", color: "blue-text-gradient" },
        { name: "Firebase", color: "green-text-gradient" },
        { name: "Material-UI", color: "pink-text-gradient" },
      ]),
      1,
      1,
      2
    );
    await db.run(
      "INSERT INTO projects (name, description, imageUrl, sourceCodeLink, tags, featured, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      "Final Year Project - ICE AGE",
      "Developed an ML model utilizing CNNs to analyze remote sensing data. Utilized ReactJS and NodeJS to develop a user-friendly web application.",
      "fyp.png",
      "https://github.com/qurban7860/FinalYearProject.git",
      JSON.stringify([
        { name: "ML", color: "blue-text-gradient" },
        { name: "MERN", color: "green-text-gradient" },
        { name: "Tailwind", color: "pink-text-gradient" },
      ]),
      1,
      1,
      3
    );
  }

  const experienceCount = await db.get("SELECT COUNT(*) as count FROM experiences");
  if (experienceCount.count === 0) {
    await db.run(
      "INSERT INTO experiences (title, companyName, instituteUrl, iconUrl, iconBg, date, points, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      "Software Engineer",
      "TMC",
      "https://tmcltd.com/",
      "tmc.png",
      "#E6DEDD",
      "July 2025 - Present",
      JSON.stringify([
        "Developing and maintaining web applications using React.js, Next.js, typescript, and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      ]),
      1,
      1
    );
    await db.run(
      "INSERT INTO experiences (title, companyName, instituteUrl, iconUrl, iconBg, date, points, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      "Software Engineer | MERN",
      "Terminus Technologies",
      "https://terminustech.co.nz/",
      "terminus.png",
      "#E6DEDD",
      "June 2024 - July 2025",
      JSON.stringify([
        "Developed an ERP system with dynamic UI features using React, Material-UI and Redux for a New Zealand-based firm.",
        "Created and Implemented RESTful APIs with Node.js and MongoDB, ensuring smooth integration and efficient state management.",
      ]),
      1,
      2
    );
    await db.run(
      "INSERT INTO experiences (title, companyName, instituteUrl, iconUrl, iconBg, date, points, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      "Frontend Developer",
      "COSVM Labs (React, Tailwind)",
      "https://cosvm.network/en",
      "starbucks.png",
      "#383E56",
      "Feb 2024 - June 2024",
      JSON.stringify([
        "Responsible developing web pages using React, Tailwind and integrating them into the live server.",
        "Collaborated closely with the development team to create engaging and user-friendly interfaces that met clients' needs.",
      ]),
      1,
      3
    );
    await db.run(
      "INSERT INTO experiences (title, companyName, instituteUrl, iconUrl, iconBg, date, points, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      "Full Stack Developer",
      "Upwork (MERN)",
      "https://www.upwork.com/",
      "tesla.png",
      "#E6DEDD",
      "Aug 2023 - Dec 2024",
      JSON.stringify([
        "Created a responsive and user-friendly dashboard application using React, leading to a 30% improvement in user engagement.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
      ]),
      1,
      4
    );
  }

  const educationCount = await db.get("SELECT COUNT(*) as count FROM educations");
  if (educationCount.count === 0) {
    await db.run(
      "INSERT INTO educations (degree, instituteName, instituteUrl, imageUrl, points, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?)",
      "Bachelor of Science in Software Engineering",
      "University Of The Punjab (PUCIT), Lahore Pakistan",
      "https://pucit.edu.pk/",
      "pucit.png",
      JSON.stringify([
        "Courses in Web Development, Software Engineering, OOP, DSA, DBMS, Operating System, Computer Network.",
        "Honors: Dean's List (2020-2024)",
      ]),
      1,
      1
    );
  }

  const technologiesCount = await db.get("SELECT COUNT(*) as count FROM technologies");
  if (technologiesCount.count === 0) {
    const techRows = [
      { name: "React JS", iconUrl: "reactjs.png" },
      { name: "JavaScript", iconUrl: "javascript.png" },
      { name: "TypeScript", iconUrl: "typescript.png" },
      { name: "Tailwind CSS", iconUrl: "tailwind.png" },
      { name: "Node JS", iconUrl: "nodejs.png" },
      { name: "Git", iconUrl: "git.png" },
      { name: "Figma", iconUrl: "figma.png" },
    ];
    for (let index = 0; index < techRows.length; index += 1) {
      const tech = techRows[index];
      await db.run(
        "INSERT INTO technologies (name, iconUrl, visible, orderIndex) VALUES (?, ?, ?, ?)",
        tech.name,
        tech.iconUrl,
        1,
        index + 1
      );
    }
  }

  const servicesCount = await db.get("SELECT COUNT(*) as count FROM services");
  if (servicesCount.count === 0) {
    await db.run(
      "INSERT INTO services (title, description, icon, features, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?)",
      "Web Development",
      "Custom responsive websites using React, Next.js, and modern stack",
      "🌐",
      JSON.stringify(["Responsive Design", "Fast Performance", "SEO Optimized", "Mobile First"]),
      1,
      1
    );
    await db.run(
      "INSERT INTO services (title, description, icon, features, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?)",
      "E-Commerce Solutions",
      "Full-featured online stores with payment integration and inventory management",
      "🛒",
      JSON.stringify(["Product Management", "Payment Gateway", "Analytics", "Scalable"]),
      1,
      2
    );
    await db.run(
      "INSERT INTO services (title, description, icon, features, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?)",
      "Mobile Development",
      "Native and cross-platform mobile apps using React Native",
      "📱",
      JSON.stringify(["iOS Ready", "Android Ready", "Fast Performance", "User Friendly"]),
      1,
      3
    );
    await db.run(
      "INSERT INTO services (title, description, icon, features, visible, orderIndex) VALUES (?, ?, ?, ?, ?, ?)",
      "Web App Development",
      "Complex web applications with real-time features and data management",
      "⚙️",
      JSON.stringify(["Real-time Updates", "Database Design", "API Development", "Security"]),
      1,
      4
    );
  }

  const testimonialsCount = await db.get("SELECT COUNT(*) as count FROM testimonials");
  if (testimonialsCount.count === 0) {
    await db.run(
      "INSERT INTO testimonials (testimonial, name, imageUrl, visible, orderIndex) VALUES (?, ?, ?, ?, ?)",
      "I thought it was impossible to make a website as beautiful as our product, but Qurban proved me wrong.",
      "Sara Henry",
      "https://randomuser.me/api/portraits/women/4.jpg",
      1,
      1
    );
    await db.run(
      "INSERT INTO testimonials (testimonial, name, imageUrl, visible, orderIndex) VALUES (?, ?, ?, ?, ?)",
      "I've never met a web developer who truly cares about their clients' success like Qurban does.",
      "Harsh Kumar",
      "https://randomuser.me/api/portraits/men/5.jpg",
      1,
      2
    );
    await db.run(
      "INSERT INTO testimonials (testimonial, name, imageUrl, visible, orderIndex) VALUES (?, ?, ?, ?, ?)",
      "After Qurban optimized our website, our traffic increased by 50%. We can't thank them enough!",
      "Lisa William",
      "https://randomuser.me/api/portraits/women/6.jpg",
      1,
      3
    );
  }

  const socialsCount = await db.get("SELECT COUNT(*) as count FROM socials");
  if (socialsCount.count === 0) {
    await db.run(
      "INSERT INTO socials (title, url, icon, visible, orderIndex) VALUES (?, ?, ?, ?, ?)",
      "GitHub",
      "https://github.com/qurban7860",
      "github",
      1,
      1
    );
    await db.run(
      "INSERT INTO socials (title, url, icon, visible, orderIndex) VALUES (?, ?, ?, ?, ?)",
      "LinkedIn",
      "https://www.linkedin.com/in/qurban015",
      "linkedin",
      1,
      2
    );
    await db.run(
      "INSERT INTO socials (title, url, icon, visible, orderIndex) VALUES (?, ?, ?, ?, ?)",
      "Twitter",
      "https://twitter.com/qurban7860",
      "twitter",
      1,
      3
    );
  }
}
