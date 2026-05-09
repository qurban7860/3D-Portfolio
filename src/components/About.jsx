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

        {isSummary && (
          <motion.div 
            variants={fadeIn("up", "spring", 0.3, 0.75)}
            className="mt-8"
          >
            <Link 
              to="/about" 
              className={`${styles.glassButtonPurple} px-8 py-3 text-[14px]`}
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
