import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { github } from "../assets";
import { resolveAssetUrl } from "../utils/assetResolver";
import { SectionWrapper } from "../hoc";
import { usePortfolio } from "../context/PortfolioContext";
import { fadeIn, textVariant } from "../Animation/motion";

/* ── Project Card ─────────────────────────────────────────────── */
const ProjectCard = ({ index, name, description, tags, imageUrl, sourceCodeLink }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.45, 0.75)}>
      <Tilt
        options={{ max: 18, scale: 1.02, speed: 450 }}
        className="rounded-2xl w-full sm:w-[360px] transition-all duration-500
                   hover:shadow-[0_16px_56px_rgba(145,94,255,0.22)]"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        {/* Image area */}
        <div className="relative w-full h-[220px] overflow-hidden rounded-t-2xl">
          {/* Featured badge */}
          {index % 3 === 0 && (
            <div className="absolute top-3 left-3 z-20 text-white text-[10px] font-bold
                            px-3 py-1 rounded-full tracking-wider
                            bg-gradient-to-r from-[#915EFF] to-[#56ccf2]
                            shadow-[0_4px_12px_rgba(145,94,255,0.4)]">
              ✦ FEATURED
            </div>
          )}

          <img
            src={resolveAssetUrl(imageUrl)}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

          {/* GitHub button */}
          <div className="absolute top-3 right-3 z-20">
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => window.open(sourceCodeLink, "_blank")}
              title="View on GitHub"
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                         transition-all duration-300
                         hover:shadow-[0_4px_16px_rgba(145,94,255,0.5)]"
              style={{
                background: "rgba(5,8,22,0.85)",
                border: "1px solid rgba(145,94,255,0.40)",
                backdropFilter: "blur(6px)",
              }}
            >
              <img src={github} alt="GitHub" className="w-5 h-5 object-contain" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white font-bold text-[21px] mb-2">{name}</h3>
          <p className="text-secondary text-[14px] leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className={`text-[12px] font-semibold px-2 py-0.5 rounded-md
                            bg-white/5 border border-white/10 ${tag.color}`}
              >
                #{tag.name}
              </span>
            ))}
          </div>

          {/* View link */}
          <motion.a
            href={sourceCodeLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-1 text-[13px] font-bold
                       text-gradient hover:opacity-80 transition-opacity"
          >
            View Repository
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      </Tilt>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  imageUrl: PropTypes.string.isRequired,
  sourceCodeLink: PropTypes.string.isRequired,
};

/* ── Works Section ────────────────────────────────────────────── */
const Works = () => {
  const { data } = usePortfolio();

  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-4">
        <span className="section-badge">Portfolio</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Projects &amp; Case Studies
        </h2>
        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          A collection of projects demonstrating my ability to build scalable, performant, and
          user-focused applications using modern technologies.
        </p>
      </motion.div>

      <div className="mt-12 flex flex-wrap gap-7 justify-center lg:justify-start">
        {(data?.projects ?? []).map((project, index) => (
          <ProjectCard key={`project-${project.id ?? index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

const WorksSection = SectionWrapper(Works, "projects");

export { Works };
export default WorksSection;
