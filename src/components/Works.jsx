import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { github } from "../assets";
import { resolveAssetUrl } from "../utils/assetResolver";
import { SectionWrapper } from "../hoc";
import { usePortfolio } from "../context/PortfolioContext";
import { fadeIn, textVariant } from "../Animation/motion";

/* ── Project Card ─────────────────────────────────────────────── */
export const ProjectCard = ({ index, name, description, tags, imageUrl, sourceCodeLink, liveDemoLink }) => {
  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="group"
    >
      <Tilt
        options={{ max: 15, scale: 1.02, speed: 400 }}
        className="rounded-[2.5rem] w-full sm:w-[360px] premium-glass-card overflow-hidden"
      >
        {/* Image area */}
        <div className="relative w-full h-[210px] overflow-hidden">
          {/* Featured badge */}
          {index % 3 === 0 && (
            <div className="absolute top-4 left-4 z-20 text-[#c4a7ff] text-[10px] font-bold
                            px-4 py-1.5 rounded-full tracking-[0.2em]
                            bg-black/40 backdrop-blur-md border border-white/10
                            shadow-xl uppercase">
              ✦ Featured
            </div>
          )}

          <img
            src={resolveAssetUrl(imageUrl)}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Hover overlay with buttons */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-[2px]">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open(sourceCodeLink, "_blank")}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#915EFF]/20 hover:border-[#915EFF]/50 transition-all shadow-lg"
              title="GitHub Repository"
            >
              <img src={github} alt="GitHub" className="w-6 h-6 object-contain" />
            </motion.button>
            
            {liveDemoLink && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.open(liveDemoLink, "_blank")}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#56ccf2]/20 hover:border-[#56ccf2]/50 transition-all shadow-lg"
                title="Live Demo"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </motion.button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-white font-black text-[22px] tracking-tight group-hover:text-[#915EFF] transition-colors">{name}</h3>
          </div>
          
          <p className="text-secondary text-[14px] leading-relaxed mb-5 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
            {description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider
                            bg-white/5 border border-white/5 group-hover:border-white/10 transition-all ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* View link footer */}
          <div className="pt-4 border-t border-white/5 flex justify-between items-center">
             <span className="text-[11px] text-white/30 uppercase tracking-[0.2em] font-bold">Project details</span>
             <motion.a
                href={liveDemoLink || sourceCodeLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="text-[#915EFF] font-bold text-[13px] flex items-center gap-2 group/link"
              >
                Explore <span className="group-hover/link:translate-x-1 transition-transform">→</span>
             </motion.a>
          </div>
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
  liveDemoLink: PropTypes.string,
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
