import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { resolveAssetUrl } from "../utils/assetResolver";

/* ── Service Card ─────────────────────────────────────────────── */
const ServiceCard = ({ index, title, icon }) => {
  const resolvedIcon = resolveAssetUrl(icon);
  const isEmoji =
    icon && !icon.startsWith("http") && !icon.includes(".") && !icon.includes("/");

  return (
    <Tilt
      options={{ max: 25, scale: 1, speed: 400 }}
      className="xs:w-[250px] w-full"
    >
      <motion.div
        variants={fadeIn("right", "spring", index * 0.3, 0.75)}
        className="w-full p-[1px] rounded-2xl green-pink-gradient shadow-card"
      >
        <div className="bg-tertiary rounded-2xl py-5 px-10 min-h-[280px] flex flex-col justify-center items-center border border-[#915EFF]/10 hover:shadow-lg hover:shadow-[#915EFF]/50 transition-all duration-300">
          {!isEmoji ? (
            <img
              src={resolvedIcon}
              alt={title}
              className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = "none";
                const fallback = e.target.nextSibling;
                if (fallback) fallback.style.display = "block";
              }}
            />
          ) : (
            <p className="text-5xl mb-2 hover:scale-110 transition-transform duration-300">
              {icon || "💼"}
            </p>
          )}
          {/* Fallback for broken images */}
          <p className="hidden text-5xl mb-2">💼</p>

          <h3 className="text-white text-[20px] font-bold text-center mt-4">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

/* ── Why Work With Me Feature Card ────────────────────────────── */
const WhyCard = ({ emoji, title, desc, delay }) => (
  <motion.div
    variants={fadeIn("up", "spring", delay, 0.6)}
    whileHover={{ y: -6, scale: 1.02 }}
    className="glass-purple rounded-xl p-5 flex flex-col gap-3 hover:bg-[#915EFF]/10 transition-all duration-500 glow-purple group"
  >
    {/* Icon badge */}
    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                    bg-gradient-to-br from-[#915EFF]/30 to-[#56ccf2]/20
                    border border-[#915EFF]/30 group-hover:border-[#915EFF]/60 transition-colors duration-300">
      {emoji}
    </div>
    <h4 className="text-white font-bold text-[17px]">{title}</h4>
    <p className="text-secondary text-[14px] leading-relaxed">{desc}</p>
  </motion.div>
);

WhyCard.propTypes = {
  emoji: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

/* ── About Section ────────────────────────────────────────────── */
const About = () => {
  const { data } = usePortfolio();
  const services = data?.services ?? [];
  const about = data?.settings?.about ?? {};
  const overview =
    about.overview ||
    "I'm a passionate Full Stack Developer with a Bachelor's degree in Software Engineering from Punjab University (PUCIT) and over 3+ years of professional experience building responsive, high-performance web and mobile applications. I specialize in creating scalable, user-centric solutions using modern technologies including React, Next.js, Node.js, Express, and MongoDB.";
  const summary =
    about.summary ||
    "My expertise spans full-stack development, real-time applications, RESTful API design, performance optimization, and responsive UI/UX design. I'm committed to writing clean, maintainable code and delivering innovative solutions that drive business growth and user satisfaction.";
  const details = about.details || "";

  const whyPoints = [
    {
      emoji: "🚀",
      title: "Fast Delivery",
      desc: "Efficient development with rapid turnaround times — shipping production-ready features without cutting corners.",
    },
    {
      emoji: "🎯",
      title: "Quality Focus",
      desc: "High-quality, tested, and production-ready code that scales gracefully as your business grows.",
    },
    {
      emoji: "🤝",
      title: "Collaboration",
      desc: "Excellent communication and team coordination — I treat your project as if it were my own.",
    },
  ];

  return (
    <>
      {/* ── Section Header ── */}
      <motion.div
        variants={textVariant()}
        className="flex flex-col items-start gap-4 md:mt-0 -mt-8"
      >
        <span className="section-badge">About Me</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Overview
        </h2>
        <p className="text-secondary text-base sm:text-lg leading-relaxed mt-2">{overview}</p>
        <p className="text-secondary text-base sm:text-lg leading-relaxed mt-2">{summary}</p>
        {details && (
          <p className="text-secondary text-base sm:text-lg leading-relaxed mt-2">{details}</p>
        )}
      </motion.div>

      {/* ── Service Cards ── */}
      <div className="mt-16 flex flex-wrap gap-10 justify-evenly">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      {/* ── Why Work With Me ── */}
      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.75)}
        className="mt-10 rounded-2xl overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, rgba(145,94,255,0.08) 0%, rgba(86,204,242,0.05) 50%, rgba(5,8,22,0.6) 100%)",
          border: "1px solid rgba(145,94,255,0.25)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 8px 48px rgba(145,94,255,0.10), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Decorative glow blobs */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#915EFF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#56ccf2]/8 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#915EFF] to-[#56ccf2] flex items-center justify-center text-sm">
              ⭐
            </div>
            <h3 className="text-[22px] font-bold text-white">Why Work With Me</h3>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whyPoints.map((item, i) => (
              <WhyCard key={i} {...item} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

const AboutSection = SectionWrapper(About, "about");
export default AboutSection;
