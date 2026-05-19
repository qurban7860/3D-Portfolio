export const adminSchema = {
  projects: {
    title: "Projects",
    label: "Project",
    icon: "🚀",
    fields: [
      { name: "name", label: "Project Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "imageUrl", label: "Image URL", type: "text", required: true },
      { name: "sourceCodeLink", label: "Repository URL", type: "text", required: true },
      { name: "liveDemoLink", label: "Live Demo URL", type: "text", required: false },
      { name: "tags", label: "Tags (comma-separated)", type: "text", required: false },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "visible", label: "Visible", type: "checkbox", defaultValue: true },
    ],
  },
  experiences: {
    title: "Experience",
    label: "Experience",
    icon: "💼",
    fields: [
      { name: "title", label: "Role / Title", type: "text", required: true },
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "instituteUrl", label: "Company URL", type: "text", required: true },
      { name: "iconUrl", label: "Logo / Icon URL", type: "text", required: true },
      { name: "iconBg", label: "Icon Background Color", type: "text", required: true },
      { name: "date", label: "Date Range", type: "text", required: true },
      { name: "points", label: "Bullet Points (newline separated)", type: "textarea", required: true },
      { name: "visible", label: "Visible", type: "checkbox", defaultValue: true },
    ],
  },
  educations: {
    title: "Education",
    label: "Education Entry",
    icon: "🎓",
    fields: [
      { name: "degree", label: "Degree", type: "text", required: true },
      { name: "instituteName", label: "Institute Name", type: "text", required: true },
      { name: "instituteUrl", label: "Institute URL", type: "text", required: true },
      { name: "imageUrl", label: "Image URL", type: "text", required: true },
      { name: "points", label: "Bullet Points (newline separated)", type: "textarea", required: true },
      { name: "visible", label: "Visible", type: "checkbox", defaultValue: true },
    ],
  },
  technologies: {
    title: "Technologies",
    label: "Technology",
    icon: "⚡",
    fields: [
      { name: "name", label: "Technology Name", type: "text", required: true },
      { name: "icon", label: "Icon (React Icon Name)", type: "text", required: false },
      { name: "iconUrl", label: "Icon Image URL", type: "text", required: false },
      { name: "visible", label: "Visible", type: "checkbox", defaultValue: true },
    ],
  },
  services: {
    title: "Services",
    label: "Service",
    icon: "🛠️",
    fields: [
      { name: "title", label: "Service Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "icon", label: "Icon", type: "text", required: true },
      { name: "features", label: "Features (newline separated)", type: "textarea", required: true },
      { name: "visible", label: "Visible", type: "checkbox", defaultValue: true },
    ],
  },
  testimonials: {
    title: "Testimonials",
    label: "Testimonial",
    icon: "💬",
    fields: [
      { name: "testimonial", label: "Testimonial Text", type: "textarea", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "imageUrl", label: "Image URL", type: "text", required: true },
      { name: "visible", label: "Visible", type: "checkbox", defaultValue: true },
    ],
  },
  socials: {
    title: "Social Links",
    label: "Social Link",
    icon: "🌐",
    fields: [
      { name: "title", label: "Name", type: "text", required: true },
      { name: "url", label: "URL", type: "text", required: true },
      { name: "icon", label: "Icon Name", type: "text", required: true },
      { name: "visible", label: "Visible", type: "checkbox", defaultValue: true },
    ],
  },
  certifications: {
    title: "Certifications",
    label: "Certification",
    icon: "📜",
    fields: [
      { name: "title", label: "Certification Title", type: "text", required: true },
      { name: "issuer", label: "Issuer / Organization", type: "text", required: true },
      { name: "date", label: "Date Issued", type: "text", required: true },
      { name: "credentialUrl", label: "Credential URL", type: "text", required: false },
      { name: "icon", label: "Icon / Emoji", type: "text", required: true },
      { name: "visible", label: "Visible", type: "checkbox", defaultValue: true },
    ],
  },
  stats: {
    title: "Quick Stats",
    label: "Stat Card",
    icon: "📊",
    fields: [
      { name: "stat", label: "Statistic (e.g. 50+)", type: "text", required: true },
      { name: "label", label: "Label (e.g. Projects)", type: "text", required: true },
      { name: "description", label: "Subtext / Description", type: "text", required: true },
      { name: "visible", label: "Visible", type: "checkbox", defaultValue: true },
    ],
  },
  faqs: {
    title: "FAQs",
    label: "FAQ Item",
    icon: "❓",
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "visible", label: "Visible", type: "checkbox", defaultValue: true },
    ],
  },
};

export const adminSettingsSchema = {
  hero: {
    title: "Hero Section",
    fields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "textarea", required: true },
    ],
  },
  about: {
    title: "About Section",
    fields: [
      { name: "overview", label: "Overview", type: "textarea", required: true },
      { name: "summary", label: "Summary", type: "textarea", required: true },
      { name: "details", label: "Details", type: "textarea", required: true },
    ],
  },
  contact: {
    title: "Contact Info & Availability",
    fields: [
      { name: "email", label: "Email Address", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "text", required: false },
      { name: "whatsapp", label: "WhatsApp Number", type: "text", required: false },
      { name: "location", label: "Location", type: "text", required: false },
      { name: "availabilityStatus", label: "Availability Status", type: "text", required: false },
    ],
  },
};
