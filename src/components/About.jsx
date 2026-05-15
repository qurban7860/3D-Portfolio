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
  const stats = data?.stats ?? [];

  const overview =
    about.overview ||
    "I'm a passionate Full Stack Developer with over 3+ years of professional experience building responsive, high-performance web and mobile applications.";
  const summary =
    about.summary ||
    "My expertise spans full-stack development, real-time applications, RESTful API design, performance optimization, and responsive UI/UX design.";
  const details = about.details || "";

  const displayStats = stats.map((s, i) => ({
    label: s.label,
    value: s.stat,
    color: i % 4 === 0 ? "text-[#915EFF]" : i % 4 === 1 ? "text-[#56ccf2]" : i % 4 === 2 ? "text-[#00cea8]" : "text-[#bf61ff]"
  }));

  return (
    <>
      {/* ── Section Header ── */}
      <motion.div
        variants={textVariant()}
        className={`flex flex-col items-start gap-4 ${!hideHeader ? "md:mt-0 -mt-8" : ""} ${!isSummary ? styles.paddingX : ""}`}
      >
        {!hideHeader && (
          <>
            <span className="section-badge">Profile Summary</span>
            <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
              Background & <span className="text-gradient">Experience</span>
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
            {/* ── Premium Statistics Grid ── */}
            {displayStats.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
                {displayStats.map((stat, i) => (
                  <div key={i} className="relative group p-[1px] rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500">
                    {/* Animated Border/Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#915EFF]/10 opacity-50 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative bg-[#050816]/40 backdrop-blur-2xl p-6 sm:p-8 rounded-[23px] h-full flex flex-col items-center justify-center border border-white/5 group-hover:border-[#915EFF]/30 transition-all duration-500 shadow-2xl">
                      {/* Ambient Glow */}
                      <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#915EFF]/5 blur-3xl rounded-full group-hover:bg-[#915EFF]/15 transition-all" />
                      
                      <h4 className={`${stat.color} text-3xl sm:text-4xl font-black mb-2 drop-shadow-[0_0_15px_rgba(145,94,255,0.2)] transition-all group-hover:scale-110 tracking-tight`}>
                        {stat.value}
                      </h4>
                      <div className="h-[2px] w-8 bg-white/5 mb-3 group-hover:w-12 group-hover:bg-[#915EFF]/40 transition-all duration-500" />
                      <p className="text-white/30 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-center leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Core Values ── */}
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
                  className="p-10 rounded-[2.5rem] premium-glass-card group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="text-4xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">{val.icon}</div>
                  <h4 className="text-white font-black text-[20px] mb-3 tracking-tight group-hover:text-[#915EFF] transition-colors">{val.title}</h4>
                  <p className="text-secondary text-[14px] leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{val.desc}</p>
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
