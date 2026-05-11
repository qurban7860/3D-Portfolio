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
    <div className="flex flex-col gap-16 items-center">
      {/* ── Section Header ── */}
      <motion.div variants={textVariant()} className="flex flex-col items-center text-center gap-4">
        <span className="section-badge">Premium Showcase</span>
        <h2 className={styles.sectionHeadText}>
          Latest <span className="text-gradient">Innovations</span>
        </h2>
        <p className="text-secondary text-lg sm:text-xl leading-relaxed max-w-3xl mt-4 opacity-80">
          A focused look at my most impactful work and technical evolution.
        </p>
      </motion.div>

      <div className="w-full flex flex-col gap-12 items-center">
        {/* ── Latest Flagship Project (Compact Featured Card) ── */}
        {latestProject && (
          <motion.div
            variants={fadeIn("up", "spring", 0.2, 1)}
            whileHover={{ y: -5 }}
            className="w-full max-w-5xl group perspective-1000"
          >
            <div className="premium-glass-card glass-reflection overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-white/10 transition-all duration-700 hover:border-[#915EFF]/40 preserve-3d">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Image Section */}
                <div className="lg:w-[55%] aspect-video lg:aspect-auto overflow-hidden relative">
                   <img 
                     src={resolveAssetUrl(latestProject.imageUrl)} 
                     alt={latestProject.name}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                   />
                   <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                   
                   <div className="absolute top-6 left-6">
                      <div className="px-5 py-2 rounded-xl bg-[#915EFF]/20 border border-[#915EFF]/40 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                        ✦ Featured
                      </div>
                   </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center gap-6">
                  <div className="flex flex-wrap gap-3">
                     {latestProject.tags?.slice(0, 3).map((tag) => (
                       <span key={tag.name} className={`text-[11px] font-black uppercase tracking-widest ${tag.color || 'text-white'} opacity-80`}>
                         {tag.name}
                       </span>
                     ))}
                  </div>
                  
                  <h3 className="text-white text-3xl font-black group-hover:text-shadow-glow transition-all">
                    {latestProject.name}
                  </h3>
                  
                  <p className="text-secondary text-base leading-relaxed opacity-80 line-clamp-3">
                    {latestProject.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 items-center mt-4">
                    <Link
                      to="/portfolio"
                      className={`${styles.glassButtonPremium} px-8 py-3.5 text-[14px]`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Case Study
                    </Link>
                    <a 
                      href={latestProject.sourceCodeLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#915EFF]/50 transition-all text-white/50 hover:text-white"
                      title="View Source"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Sub-Sections Row ── */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Recent Experience Strip */}
           {latestExperience && (
             <motion.div
               variants={fadeIn("right", "spring", 0.4, 1)}
               className="premium-glass-card glass-reflection p-8 flex items-center gap-6 group/exp"
             >
                <div className="w-20 h-20 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 p-4 inner-glow group-hover/exp:border-[#915EFF]/50 transition-colors duration-500">
                   <img src={resolveAssetUrl(latestExperience.iconUrl)} alt={latestExperience.companyName} className="w-full h-full object-contain" />
                </div>
                <div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#915EFF] opacity-70 mb-2 block">Latest Role</span>
                   <h4 className="text-white text-lg font-black">{latestExperience.title}</h4>
                   <p className="text-secondary text-sm mt-1">{latestExperience.companyName}</p>
                   <Link to="/experience" className="text-[12px] font-bold text-white/40 hover:text-[#915EFF] mt-3 block transition-colors">
                     View Timeline →
                   </Link>
                </div>
             </motion.div>
           )}

           {/* Tech Stack Strip */}
           <motion.div
             variants={fadeIn("left", "spring", 0.6, 1)}
             className="premium-glass-card glass-reflection p-8 flex items-center justify-between group/tech"
           >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#56ccf2] opacity-70 mb-2 block">Core Stack</span>
                <div className="flex -space-x-4">
                   {topTechnologies.map((tech) => (
                     <div key={tech.name} className="w-12 h-12 rounded-full bg-[#050816] border-2 border-white/10 flex items-center justify-center p-2 shadow-2xl group-hover/tech:translate-y-[-5px] transition-transform duration-500" title={tech.name}>
                        <img src={resolveAssetUrl(tech.iconUrl || tech.icon)} alt={tech.name} className="w-full h-full object-contain" />
                     </div>
                   ))}
                </div>
              </div>
              <Link to="/services" className={`${styles.glassButton} px-6 py-2.5 text-[12px]`}>
                All Skills
              </Link>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Showcase, "showcase");
