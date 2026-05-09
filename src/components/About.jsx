import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { resolveAssetUrl } from "../utils/assetResolver";
import { styles } from "../styles";

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
        className="w-full p-[1.5px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-card hover:border-[#915EFF]/40 transition-colors duration-300"
      >
        <div className="bg-tertiary/40 backdrop-blur-xl rounded-2xl py-5 px-10 min-h-[280px] flex flex-col justify-center items-center border border-white/5 hover:bg-[#915EFF]/5 hover:shadow-[0_8px_32px_rgba(145,94,255,0.15)] transition-all duration-300">
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


/* ── About Section ────────────────────────────────────────────── */
const About = ({ isSummary = false }) => {
  const { data } = usePortfolio();
  const services = data?.services ?? [];
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
        className="flex flex-col items-start gap-4 md:mt-0 -mt-8"
      >
        <span className="section-badge">About Me</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Overview
        </h2>
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

      {/* ── Service Cards ── */}
      {!isSummary && (
        <div className="my-16 flex flex-wrap gap-10 justify-evenly">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      )}
    </>
  );
};

const AboutSection = SectionWrapper(About, "about", { noBottomPadding: true });
export { About };
export default AboutSection;
