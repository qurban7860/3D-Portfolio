import PropTypes from "prop-types";
import { useState } from "react"; 
import { resolveAssetUrl } from "../utils/assetResolver";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";

/* ── Experience Card ───────────────────────────────────────────── */
const ExperienceIcon = ({ experience }) => {
  const [error, setError] = useState(false);
  const firstLetter = experience.companyName?.charAt(0).toUpperCase() || "?";

  return (
    <div className="flex justify-center items-center w-full h-full relative group">
      <a
        href={experience.instituteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center w-full h-full"
      >
        {!error ? (
          <img
            src={resolveAssetUrl(experience.iconUrl)}
            alt={experience.companyName}
            onError={() => setError(true)}
            className="w-[60%] h-[60%] object-contain hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl rounded-full border border-white/20 group-hover:border-[var(--accent)]/50 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <span className="text-white font-black text-xl tracking-tighter drop-shadow-[0_0_10px_var(--glow-color)]">
              {firstLetter}
            </span>
          </div>
        )}
      </a>
      
      {/* Decorative pulse ring */}
      <div className="absolute inset-0 rounded-full bg-[var(--accent)]/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

ExperienceIcon.propTypes = {
  experience: PropTypes.shape({
    companyName: PropTypes.string,
    iconUrl: PropTypes.string,
    instituteUrl: PropTypes.string,
  }).isRequired,
};

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentClassName="premium-glass-card glass-reflection inner-glow"
    contentStyle={{
      background: "var(--glass-bg)",
      border: "1px solid var(--glass-border)",
      backdropFilter: "blur(var(--glass-blur))",
      WebkitBackdropFilter: "blur(var(--glass-blur))",
      borderRadius: "2.5rem",
      color: "var(--text-primary)",
      boxShadow: "none",
      padding: "2.5rem",
    }}
    contentArrowStyle={{ borderRight: "10px solid var(--glass-border)" }}
    date={
      <div className="flex sm:block">
        <span className="font-black tracking-[0.2em] text-[10px] sm:text-[11px] uppercase bg-[var(--accent)]/10 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[var(--accent)]/20 shadow-lg whitespace-nowrap"
              style={{ color: "color-mix(in srgb, var(--accent) 85%, white)" }}>
          {experience.date}
        </span>
      </div>
    }
    iconStyle={{
      background: experience.iconBg || "var(--tertiary)",
      boxShadow: "0 0 0 4px rgba(var(--accent-rgb), 0.2), 0 15px 35px rgba(var(--accent-rgb), 0.4)",
    }}
    icon={<ExperienceIcon experience={experience} />}
  >
    <div className="relative z-10">
      <h3 className="text-white text-[24px] font-black tracking-tight leading-tight">{experience.title}</h3>
      <p className="text-gradient font-bold text-[16px] mt-1" style={{ margin: 0 }}>
        {experience.companyName}
      </p>
    </div>

    <ul className="mt-6 space-y-3 relative z-10">
      {experience.points.map((point, index) => (
        <li
          key={`exp-point-${index}`}
          className="text-white/70 text-[14px] pl-1 tracking-wide leading-relaxed flex items-start gap-3 group"
        >
          <span className="text-[var(--accent)] mt-[4px] text-[10px] font-bold flex-shrink-0 group-hover:scale-125 transition-transform">✦</span>
          <span className="group-hover:text-white transition-colors">{point}</span>
        </li>
      ))}
    </ul>
    
    {/* Decorative corner accent */}
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--accent)]/5 rounded-full blur-2xl pointer-events-none" />
  </VerticalTimelineElement>
);

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    iconUrl: PropTypes.string.isRequired,
    iconBg: PropTypes.string.isRequired,
    instituteUrl: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

/* ── Education Card ────────────────────────────────────────────── */
const EducationCard = ({ education }) => {
  const [error, setError] = useState(false);
  const firstLetter = education.instituteName?.charAt(0).toUpperCase() || "?";

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.1, 0.75)}
      whileHover={{ y: -8, scale: 1.005 }}
      className="flex flex-col mb-8 rounded-[2.5rem] relative transition-all duration-700
                 premium-glass-card glass-reflection inner-glow group overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Institute logo */}
      <a
        href={education.instituteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-7 right-7 z-20"
        title={education.instituteName}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--accent)]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          {!error ? (
            <img
              src={resolveAssetUrl(education.imageUrl)}
              alt={`${education.instituteName} logo`}
              onError={() => setError(true)}
              className="w-10 h-10 sm:w-14 sm:h-14 object-contain hover:rotate-6 transition-transform duration-500
                         ring-1 ring-white/10 rounded-xl sm:rounded-2xl bg-black/20 backdrop-blur-sm p-1.5 sm:p-2"
            />
          ) : (
            <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 text-white font-black text-sm sm:text-xl shadow-lg ring-1 ring-white/5 group-hover:border-[var(--accent)]/50 transition-all">
               {firstLetter}
            </div>
          )}
        </div>
      </a>

      <div className="p-8 relative z-10">
      {/* Degree badge */}
      <div className="flex items-center gap-2 mb-5">
        <span className="inline-block text-[10px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full shadow-lg"
              style={{
                background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
                color: "color-mix(in srgb, var(--accent) 85%, white)",
              }}>
          🎓 Academic
        </span>
      </div>

      <h3 className="text-white text-[26px] font-black leading-tight tracking-tight pr-20 group-hover:text-gradient transition-all duration-500">{education.degree}</h3>
      <p className="text-secondary font-bold text-[16px] mt-2 mb-6 opacity-80">
        {education.instituteName}
      </p>

      <ul className="space-y-3">
        {education.points.map((point, index) => (
          <li
            key={`edu-point-${index}`}
            className="text-white/70 text-[15px] tracking-wide leading-relaxed flex items-start gap-3 group/item"
          >
            <span className="text-[var(--secondary)] mt-[5px] text-[10px] font-bold flex-shrink-0 group-hover/item:scale-125 transition-transform">✦</span>
            <span className="group-hover/item:text-white transition-colors">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
  );
};

EducationCard.propTypes = {
  education: PropTypes.shape({
    degree: PropTypes.string.isRequired,
    instituteName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    instituteUrl: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

/* ── Experience Section ────────────────────────────────────────── */
const Experience = () => {
  const { data } = usePortfolio();
  const experiences = data?.experiences ?? [];
  const educations = data?.educations ?? [];

  return (
    <>
      {/* Education */}
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-2">
        <span className="section-badge inline-block">Academic Background</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Education
        </h2>
      </motion.div>

      <div className="mt-8">
        {educations.map((edu, idx) => (
          <EducationCard key={idx} education={edu} />
        ))}
      </div>

      {/* Experience */}
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-2 mt-14">
        <span className="section-badge inline-block">Career History</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Work History
        </h2>
      </motion.div>

      <div className="mt-8">
        <VerticalTimeline>
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} experience={exp} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

const ExperienceSection = SectionWrapper(Experience, "experience");

export { Experience };
export default ExperienceSection;