import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { styles } from "../styles";
import { resolveAssetUrl } from "../utils/assetResolver";
import { BallCanvas } from "./canvas";

const Showcase = () => {
  const { data } = usePortfolio();
  
  // Extract latest data
  const latestProject = (data?.projects ?? [])[0];
  const latestExperience = (data?.experiences ?? [])[0];
  const topTechnologies = (data?.technologies ?? []).slice(0, 4);

  return (
    <div className="flex flex-col gap-20">
      {/* ── Section Header ── */}
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-4">
        <span className="section-badge">Current Focus</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Latest Excellence &amp; Professional Path
        </h2>
        <p className="text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
          A snapshot of my most recent professional milestones, flagship project, and core 
          technical foundation. High-impact results delivered with precision.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ── Latest Flagship Project (Left - 7 cols) ── */}
        {latestProject && (
          <motion.div
            variants={fadeIn("right", "spring", 0.2, 1)}
            className="lg:col-span-7 flex flex-col group"
          >
            <div className="relative h-full rounded-3xl overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/10 shadow-2xl transition-all duration-500 hover:border-[#915EFF]/40">
              {/* Image with overlay */}
              <div className="relative h-[250px] sm:h-[320px] w-full overflow-hidden">
                 <img 
                   src={resolveAssetUrl(latestProject.imageUrl)} 
                   alt={latestProject.name}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent opacity-80" />
                 
                 <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-[#915EFF]/20 border border-[#915EFF]/50 backdrop-blur-md text-[#c4a7ff] text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      ✦ Latest Project
                    </span>
                 </div>
              </div>

              {/* Content */}
              <div className="p-8 -mt-20 relative z-10">
                <h3 className="text-white text-3xl font-extrabold mb-3 group-hover:text-gradient transition-all duration-300">
                  {latestProject.name}
                </h3>
                <p className="text-secondary text-base leading-relaxed mb-6 line-clamp-3">
                  {latestProject.description}
                </p>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <Link
                    to="/portfolio"
                    className={`${styles.glassButtonPremium} px-6 py-2.5 text-[13px]`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    View Project Details
                  </Link>
                  <a 
                    href={latestProject.sourceCodeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white text-[13px] font-bold transition-colors"
                  >
                    Source Code →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Latest Experience & Tech (Right - 5 cols) ── */}
        <motion.div
          variants={fadeIn("left", "spring", 0.4, 1)}
          className="lg:col-span-5 flex flex-col gap-10"
        >
          {/* Recent Role */}
          {latestExperience && (
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/10 shadow-2xl relative overflow-hidden group hover:border-[#915EFF]/30 transition-all duration-500">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#915EFF]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#915EFF]/10 transition-all" />
               
               <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c4a7ff] block mb-4">
                 Recent Work
               </span>
               <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#915EFF]/20 flex items-center justify-center border border-[#915EFF]/30 p-2">
                     <img src={resolveAssetUrl(latestExperience.iconUrl)} alt={latestExperience.companyName} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-bold">{latestExperience.title}</h4>
                    <p className="text-secondary font-medium">{latestExperience.companyName}</p>
                  </div>
               </div>
               <p className="text-secondary text-sm leading-relaxed mb-6 italic">
                  &quot;{latestExperience.points[0]}&quot;
               </p>
               <Link
                 to="/experience"
                 className="text-[#915EFF] font-bold text-[13px] hover:underline"
                 onClick={() => window.scrollTo(0, 0)}
               >
                 View Career Path →
               </Link>
            </div>
          )}

          {/* Core Tech Stack */}
          <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/10 shadow-2xl relative overflow-hidden">
             <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#56ccf2] block mb-6">
               Core specialized Stack
             </span>
             <div className="grid grid-cols-4 gap-4">
                {topTechnologies.map((tech) => (
                  <div key={tech.name} className="w-16 h-16 sm:w-20 sm:h-20" title={tech.name}>
                     <BallCanvas icon={resolveAssetUrl(tech.iconUrl || tech.icon)} />
                  </div>
                ))}
             </div>
             <div className="mt-8">
                <Link
                  to="/services"
                  className={`${styles.outlineButtonCyan} px-6 py-2.5 text-[12px] w-full`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Explore Full Tech Stack
                </Link>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Showcase, "showcase");
