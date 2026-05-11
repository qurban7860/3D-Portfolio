import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { styles } from "../styles";

/* ── About Section ────────────────────────────────────────────── */
const About = ({ isSummary = false, hideHeader = false }) => {
  const { data } = usePortfolio();
  const about = data?.settings?.about ?? {};
  const overview =
    about.overview ||
    "I'm a passionate Full Stack Developer with a Bachelor's degree in Software Engineering from Punjab University (PUCIT) and over 3+ years of professional experience building responsive, high-performance web and mobile applications.  I specialize in creating scalable, user-centric solutions using modern technologies including React, Next.js, Node.js, Express, and MongoDB.";
  const summary =
    about.summary ||
    "My expertise spans full-stack development, real-time applications, RESTful API design, performance optimization, and responsive UI/UX design. I'm committed to writing clean, maintainable code and delivering innovative solutions that drive business growth and user satisfaction.";
  const details = about.details || "";


  return (
    <>
      {/* ── Section Header ── */}
      <motion.div
        variants={textVariant()}
        className={`flex flex-col items-start gap-4 ${!hideHeader ? "md:mt-0 -mt-8" : ""} ${!isSummary ? styles.paddingX : ""}`}
      >
        {!hideHeader && (
          <>
            <span className="section-badge">About Me</span>
            <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
              Overview
            </h2>
          </>
        )}
        <p className="text-secondary text-base sm:text-lg leading-relaxed mt-2">{overview}</p>
        {!isSummary && (
          <>
            <p className="text-secondary text-base sm:text-lg leading-relaxed mt-2">{summary}</p>
            {details && (
              <p className="text-secondary text-base sm:text-lg leading-relaxed mt-2">{details}</p>
            )}
          </>
        )}

        {!isSummary && (
          <motion.div
            variants={fadeIn("up", "spring", 0.2, 0.75)}
            className="mt-16 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
              {[
                {
                  title: "Precision Engineering",
                  desc: "Writing clean, scalable, and maintainable code is my top priority.",
                  icon: "⚙️",
                },
                {
                  title: "User-Centric Design",
                  desc: "I believe technology should serve people, not the other way around.",
                  icon: "💡",
                },
                {
                  title: "Agile Problem Solving",
                  desc: "Adapting quickly to challenges and delivering efficient results.",
                  icon: "🚀",
                },
              ].map((val, i) => (
                <div 
                  key={i} 
                  className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl 
                             hover:bg-white/[0.05] hover:border-[#915EFF]/30 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{val.icon}</div>
                  <h4 className="text-white font-bold text-lg mb-2">{val.title}</h4>
                  <p className="text-secondary text-sm leading-relaxed opacity-80">{val.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {isSummary && (
          <motion.div 
            variants={fadeIn("up", "spring", 0.3, 0.75)}
            className="mt-8"
          >
            <Link 
              to="/about" 
              className={`${styles.glassButtonPurple} px-8 py-3 text-[14px] shadow-xl shadow-purple-500/10`}
              onClick={() => window.scrollTo(0, 0)}
            >
              Discover Full Journey →
            </Link>
          </motion.div>
        )}
      </motion.div>

    </>
  );
};

About.propTypes = {
  isSummary: PropTypes.bool,
  hideHeader: PropTypes.bool,
};

const AboutSection = SectionWrapper(About, "about", { noBottomPadding: true });
export { About };
export default AboutSection;
