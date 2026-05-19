import { useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { github } from "../assets";
import { resolveAssetUrl } from "../utils/assetResolver";
import { SectionWrapper } from "../hoc";
import { usePortfolio } from "../context/PortfolioContext";
import { fadeIn, textVariant } from "../Animation/motion";

export const ProjectCard = ({ index, name, description, tags, imageUrl, sourceCodeLink, liveDemoLink }) => {
  const [imgError, setImgError] = useState(false);
  const resolvedUrl = resolveAssetUrl(imageUrl);

  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="group"
    >
      <Tilt
        options={{ max: 15, scale: 1.02, speed: 400 }}
        className="rounded-[2.5rem] w-full sm:w-[360px] premium-glass-card glass-reflection inner-glow overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image area */}
        <div className="relative w-full h-[210px] overflow-hidden bg-primary" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
          {/* Featured badge */}
          {index % 3 === 0 && (
            <div className="absolute top-4 left-4 z-20 text-[10px] font-bold
                            px-4 py-1.5 rounded-full tracking-[0.2em]
                            bg-black/40 backdrop-blur-md border border-white/10
                            shadow-xl uppercase"
                 style={{ color: 'color-mix(in srgb, var(--accent) 85%, white)', transform: "translateZ(40px)" }}>
              ✦ Featured
            </div>
          )}

          {!imgError && resolvedUrl ? (
            <img
              src={resolvedUrl}
              alt={name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-tertiary to-primary relative overflow-hidden">
               <div className="absolute inset-0 bg-dot-pattern opacity-10" />
               <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-2 relative z-10">
                  <span className="opacity-40 group-hover:scale-110 transition-transform duration-500">🖼️</span>
               </div>
               <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest relative z-10">Preview Unavailable</span>
               
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-3xl" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-[2px]" style={{ transformStyle: "preserve-3d" }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ transform: "translateZ(50px)" }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(sourceCodeLink, "_blank");
              }}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[var(--accent)]/20 hover:border-[var(--accent)]/50 transition-all shadow-lg cursor-pointer"
              title="GitHub Repository"
            >
              <img src={github} alt="GitHub" className="w-6 h-6 object-contain" />
            </motion.button>
            
            {liveDemoLink && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ transform: "translateZ(50px)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(liveDemoLink, "_blank");
                }}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[var(--secondary)]/20 hover:border-[var(--secondary)]/50 transition-all shadow-lg cursor-pointer"
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
        <div className="p-6 relative" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
          <div className="flex justify-between items-start mb-3" style={{ transform: "translateZ(40px)" }}>
            <h3 className="text-white font-black text-[22px] tracking-tight group-hover:text-[var(--accent)] transition-colors">{name}</h3>
          </div>
          
          <p className="text-secondary text-[14px] leading-relaxed mb-5 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity" style={{ transform: "translateZ(40px)" }}>
            {description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-2" style={{ transform: "translateZ(40px)" }}>
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
