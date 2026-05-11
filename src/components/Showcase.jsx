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
      <motion.div variants={textVariant()} className="flex flex-col items-center text-center gap-4">
        <span className="section-badge">Featured Portfolio</span>
        <h2 className={styles.sectionHeadText}>
          Latest <span className="text-gradient">Innovations</span>
        </h2>
        <p className="text-secondary text-lg sm:text-xl leading-relaxed max-w-3xl mt-4">
          A curated selection of my most recent work and professional milestones, 
          demonstrating technical precision and creative problem-solving.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* ── Latest Flagship Project (Featured Card) ── */}
        {latestProject && (
          <motion.div
            variants={fadeIn("up", "spring", 0.2, 1)}
            className="lg:col-span-8 group"
          >
            <div className="premium-glass-card h-full flex flex-col">
              <div className="relative aspect-video lg:aspect-auto lg:h-[400px] overflow-hidden">
                 <img 
                   src={resolveAssetUrl(latestProject.imageUrl)} 
                   alt={latestProject.name}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent" />
                 
                 <div className="absolute top-8 left-8">
                    <div className="px-6 py-2 rounded-full bg-[#915EFF]/20 border border-[#915EFF]/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                      ✦ Featured Project
                    </div>
                 </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col flex-1 -mt-20 relative z-10">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap gap-3">
                     {latestProject.tags?.map((tag) => (
                       <span key={tag.name} className={`text-[12px] font-bold ${tag.color || 'text-white'}`}>
                         #{tag.name}
                       </span>
                     ))}
                  </div>
                  
                  <h3 className="text-white text-3xl sm:text-4xl font-black group-hover:text-gradient transition-all duration-500">
                    {latestProject.name}
                  </h3>
                  
                  <p className="text-secondary text-lg leading-relaxed line-clamp-3 lg:line-clamp-none max-w-2xl">
                    {latestProject.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-6 items-center mt-6">
                    <Link
                      to="/portfolio"
                      className={`${styles.glassButtonPremium} px-10 py-4 text-[15px] shadow-2xl`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Case Study Details
                    </Link>
                    <a 
                      href={latestProject.sourceCodeLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#915EFF] hover:text-white font-bold text-[15px] transition-all flex items-center gap-2 group/link border-b border-[#915EFF]/20 hover:border-[#915EFF] pb-1"
                    >
                      Source Code <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Experience & Tech (Sidebar) ── */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Recent Role Card */}
          {latestExperience && (
            <motion.div
              variants={fadeIn("left", "spring", 0.4, 1)}
              className="p-8 premium-glass-card group/exp"
            >
               <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#915EFF] block mb-8">
                 Current Trajectory
               </span>
               
               <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 p-3 shadow-inner group-hover/exp:border-[#915EFF]/50 transition-colors">
                     <img src={resolveAssetUrl(latestExperience.iconUrl)} alt={latestExperience.companyName} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-black leading-tight">{latestExperience.title}</h4>
                    <p className="text-secondary text-sm font-medium mt-1">{latestExperience.companyName}</p>
                  </div>
               </div>

               <p className="text-secondary text-base leading-relaxed mb-8 italic border-l-2 border-[#915EFF]/30 pl-6 bg-white/[0.02] p-4 rounded-r-xl">
                  &quot;{latestExperience.points[0]}&quot;
               </p>

               <Link
                 to="/experience"
                 className="inline-flex items-center gap-3 text-white font-bold text-[14px] hover:text-[#915EFF] transition-all group/btn"
                 onClick={() => window.scrollTo(0, 0)}
               >
                 View Career Timeline <span className="text-[#915EFF] group-hover/btn:translate-x-2 transition-transform">→</span>
               </Link>
            </motion.div>
          )}

          {/* Tech Mini-Stack Card */}
          <motion.div
            variants={fadeIn("left", "spring", 0.6, 1)}
            className="p-8 premium-glass-card flex-1 flex flex-col justify-between"
          >
             <div>
               <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#56ccf2] block mb-8">
                 Core Expertise
               </span>
               <div className="grid grid-cols-4 gap-4 mb-8">
                  {topTechnologies.map((tech) => (
                    <div key={tech.name} className="aspect-square relative group/tech" title={tech.name}>
                       <BallCanvas icon={resolveAssetUrl(tech.iconUrl || tech.icon)} />
                    </div>
                  ))}
               </div>
             </div>
             
             <Link
               to="/services"
               className={`${styles.outlineButtonCyan} w-full py-4 text-[14px] font-bold`}
               onClick={() => window.scrollTo(0, 0)}
             >
               View All Capabilities
             </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Showcase, "showcase");
