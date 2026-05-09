import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { styles } from "../styles";

/* ── Availability Badge ────────────────────────────────────────── */
const AvailabilityBadge = ({ status, icon }) => (
  <motion.div
    animate={{ scale: [1, 1.04, 1] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    className="flex items-center gap-3 px-6 py-3 rounded-full w-fit animate-glow-pulse"
    style={{
      background: "rgba(52,211,153,0.12)",
      border: "1px solid rgba(52,211,153,0.50)",
      backdropFilter: "blur(10px)",
    }}
  >
    <span className="text-xl">{icon}</span>
    <p className="text-green-400 font-bold text-[15px]">{status}</p>
    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
  </motion.div>
);

AvailabilityBadge.propTypes = {
  status: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

/* ── Hire Card ────────────────────────────────────────────────── */
const HireCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02 }}
    className="glass-purple rounded-xl p-6 flex flex-col items-center gap-4 text-center
               hover:bg-[#915EFF]/12 hover:shadow-[0_8px_32px_rgba(145,94,255,0.18)]
               transition-all duration-500 glow-purple group"
  >
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl
                    bg-white/5 border border-white/10 group-hover:border-[#915EFF]/50 
                    group-hover:shadow-[0_0_20px_rgba(145,94,255,0.25)] transition-all duration-300 backdrop-blur-sm">
      {icon}
    </div>
    <h3 className="text-white font-bold text-[17px]">{title}</h3>
    <p className="text-secondary text-[13px] leading-relaxed">{description}</p>
  </motion.div>
);

HireCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

/* ── Quick Fact Item ───────────────────────────────────────────── */
const QuickFact = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1 text-center">
    <p className="stat-number text-[28px] font-extrabold">{value}</p>
    <p className="text-secondary text-[13px]">{label}</p>
  </div>
);

QuickFact.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

/* ── Main Component ───────────────────────────────────────────── */
const ReadyForWork = () => {
  const { data } = usePortfolio();
  const contact = data?.settings?.contact ?? {};
  const availabilityStatus = contact.availabilityStatus || "Open for Work";
  const emailLink = contact.email
    ? `mailto:${contact.email}`
    : "mailto:qurbanhanif120@gmail.com";
  const linkedinLink =
    contact.linkedin || "https://www.linkedin.com/in/qurban015";

  const hiringPoints = [
    {
      icon: "⚡",
      title: "Quick Response",
      description: "Get in touch and receive a response within 24 hours",
    },
    {
      icon: "📅",
      title: "Flexible Timeline",
      description: "Full-time, part-time, or project-based engagement",
    },
    {
      icon: "🌍",
      title: "Remote Ready",
      description: "Available for international projects and collaborations",
    },
    {
      icon: "💼",
      title: "Professional",
      description: "Industry-standard practices and communication",
    },
  ];

  const quickFacts = [
    { value: "3+ Years", label: "Professional Development" },
    { value: "50+ Projects", label: "Successfully Delivered" },
    { value: "5+ Countries", label: "Global Clients" },
  ];

  return (
    <>
      {/* ── Section Header ── */}
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-4">
        <span className="section-badge">Get In Touch</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Available for New Opportunities
        </h2>
        <p className="text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
          I&apos;m actively looking for exciting opportunities to collaborate with innovative teams
          and tackle challenging problems. Whether you need a full-time developer, a freelance
          expert, or a technical consultant — I&apos;m ready to bring value to your organization.
        </p>
      </motion.div>

      {/* ── Availability Badge ── */}
      <motion.div variants={fadeIn("up", "spring", 0.2, 0.75)} className="mt-6">
        <AvailabilityBadge status={availabilityStatus} icon="🚀" />
      </motion.div>

      {/* ── Hire Cards Grid ── */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {hiringPoints.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
          >
            <HireCard {...item} />
          </motion.div>
        ))}
      </div>

      {/* ── CTA Buttons ── */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className="mt-12 flex flex-col sm:flex-row gap-4 flex-wrap"
      >
        <a href="/contact" className={`${styles.gradientButton} px-8 py-4 text-[15px]`}>
          📧 Start a Conversation
        </a>
        <a href={emailLink} className={`${styles.outlineButton} px-8 py-4 text-[15px]`}>
          ✉️ Send Email Directly
        </a>
        <a
          href={linkedinLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.outlineButtonCyan} px-8 py-4 text-[15px]`}
        >
          💼 Connect on LinkedIn
        </a>
      </motion.div>

      {/* ── Quick Facts ── */}
      <motion.div
        variants={fadeIn("up", "spring", 0.6, 0.75)}
        className="mt-10 p-8 rounded-2xl relative overflow-hidden backdrop-blur-xl bg-white/[0.04] border border-white/10 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#56ccf2]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#915EFF]/10 rounded-full blur-[80px] pointer-events-none" />
        <p className="text-white text-[17px] font-bold mb-6 text-center">Quick Facts</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {quickFacts.map((fact, i) => (
            <QuickFact key={i} {...fact} />
          ))}
        </div>
      </motion.div>
    </>
  );
};

const ReadyForWorkSection = SectionWrapper(ReadyForWork, "ready-for-work");
export default ReadyForWorkSection;
