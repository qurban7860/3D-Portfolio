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
          <div className="w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full border border-white/10 group-hover:border-[#915EFF]/50 transition-all">
            <span className="text-white font-black text-xl tracking-tighter drop-shadow-[0_0_8px_rgba(145,94,255,0.8)]">
              {firstLetter}
            </span>
          </div>
        )}
      </a>
      
      {/* Decorative pulse ring */}
      <div className="absolute inset-0 rounded-full bg-[#915EFF]/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
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
    contentStyle={{
      background: "rgba(145,94,255,0.06)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      color: "#fff",
      border: "1px solid rgba(145,94,255,0.22)",
      borderRadius: "1.5rem",
      boxShadow: "0 8px 32px rgba(145,94,255,0.10), inset 0 1px 0 rgba(255,255,255,0.05)",
      padding: "2rem",
    }}
    contentArrowStyle={{ borderRight: "7px solid rgba(145,94,255,0.35)" }}
    date={<span className="text-[#c4a7ff] font-bold tracking-widest text-sm uppercase">{experience.date}</span>}
    iconStyle={{
      background: experience.iconBg,
      boxShadow: "0 0 0 4px rgba(145,94,255,0.30), 0 10px 24px rgba(145,94,255,0.4)",
    }}
    icon={<ExperienceIcon experience={experience} />}
  >
    <div>
      <h3 className="text-white text-[22px] font-bold">{experience.title}</h3>
      <p className="text-[#915EFF] text-[15px] font-semibold mt-1" style={{ margin: 0 }}>
        {experience.companyName}
      </p>
    </div>

    <ul className="mt-5 space-y-2">
      {experience.points.map((point, index) => (
        <li
          key={`exp-point-${index}`}
          className="text-white/75 text-[14px] pl-1 tracking-wide leading-relaxed flex items-start gap-2"
        >
          <span className="text-gradient mt-[3px] text-[12px] font-bold flex-shrink-0">▸</span>
          {point}
        </li>
      ))}
    </ul>
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
const EducationCard = ({ education }) => (
  <motion.div
    variants={fadeIn("up", "spring", 0.1, 0.75)}
    whileHover={{ y: -6, scale: 1.01 }}
    className="flex flex-col mb-6 rounded-2xl relative transition-all duration-500
               hover:shadow-[0_12px_40px_rgba(145,94,255,0.18)]"
    style={{
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      background:
        "linear-gradient(145deg, rgba(145,94,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
      border: "1px solid rgba(145,94,255,0.22)",
    }}
  >
    {/* Glow blob */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#915EFF]/10 rounded-full blur-2xl pointer-events-none" />

    {/* Institute logo */}
    <a
      href={education.instituteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute top-5 right-5 z-10"
      title={education.instituteName}
    >
      <img
        src={resolveAssetUrl(education.imageUrl)}
        alt={`${education.instituteName} logo`}
        className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300
                   ring-2 ring-[#915EFF]/30 rounded-xl"
      />
    </a>

    <div className="p-7 relative z-10">
      {/* Degree badge */}
      <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{
              background: "rgba(145,94,255,0.14)",
              border: "1px solid rgba(145,94,255,0.35)",
              color: "#c4a7ff",
            }}>
        🎓 Education
      </span>

      <h3 className="text-white text-[22px] font-bold leading-snug pr-16">{education.degree}</h3>
      <p className="text-[#915EFF] text-[15px] font-semibold mt-1 mb-4">
        {education.instituteName}
      </p>

      <ul className="space-y-2">
        {education.points.map((point, index) => (
          <li
            key={`edu-point-${index}`}
            className="text-white/75 text-[14px] tracking-wide leading-relaxed flex items-start gap-2"
          >
            <span className="text-gradient mt-[3px] text-[12px] font-bold flex-shrink-0">▸</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

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
        <span className="section-badge inline-block">Career Path</span>
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
        <span className="section-badge inline-block">Professional Journey</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Work Experience
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