import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { styles } from "../styles";
import { resolveAssetUrl } from "../utils/assetResolver";

const Showcase = () => {
  const { data } = usePortfolio();
  const { username } = useParams();
  const basePath = username ? `/${username}` : "";
  
  const latestProject = (data?.projects ?? [])[0];
  const latestExperience = (data?.experiences ?? [])[0];

  const [projError, setProjError] = useState(false);
  const [expError, setExpError] = useState(false);

  const resolvedProjUrl = latestProject ? resolveAssetUrl(latestProject.imageUrl) : null;
  const resolvedExpUrl = latestExperience ? resolveAssetUrl(latestExperience.iconUrl) : null;

  return (
    <div className="flex flex-col gap-10 items-center">
      <motion.div variants={textVariant()} className="flex flex-col items-center text-center gap-2">
        <span className="section-badge">Portfolio Highlights</span>
        <h2 className={styles.sectionHeadText}>
          Featured <span className="text-gradient">Work & Experience</span>
        </h2>
      </motion.div>

      <div className="w-full flex flex-col lg:flex-row gap-6 max-w-6xl">
        {/* Flagship Project Mini Card */}
        {latestProject && (
          <motion.div
            variants={fadeIn("right", "spring", 0.2, 0.8)}
            className="flex-1"
          >
            <div className="premium-glass-card glass-reflection overflow-hidden shadow-xl border-white/5 group h-full">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="sm:w-[40%] aspect-video sm:aspect-auto overflow-hidden relative">
                   {!projError && resolvedProjUrl ? (
                     <img 
                       src={resolvedProjUrl} 
                       alt={latestProject.name}
                       onError={() => setProjError(true)}
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-[#050816] relative overflow-hidden min-h-[160px]">
                        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
                        <span className="text-3xl opacity-40 group-hover:scale-110 transition-transform duration-500">🖼️</span>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#915EFF]/10 rounded-full blur-3xl" />
                     </div>
                   )}
                </div>
                <div className="sm:w-[60%] p-6 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-white text-lg font-black">{latestProject.name}</h3>
                    <p className="text-secondary text-[13px] line-clamp-2 mt-2">{latestProject.description}</p>
                  </div>
                  <Link to={`${basePath}/portfolio`} className="text-[#915EFF] font-bold text-[13px] hover:text-white transition-all">
                    Case Study →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Experience Mini Strip */}
        {latestExperience && (
          <motion.div
            variants={fadeIn("left", "spring", 0.4, 0.8)}
            className="flex-1"
          >
            <div className="premium-glass-card glass-reflection p-6 flex items-center gap-6 group h-full">
              <div className="w-16 h-16 shrink-0 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 p-3 inner-glow relative overflow-hidden">
                 {!expError && resolvedExpUrl ? (
                   <img 
                     src={resolvedExpUrl} 
                     alt={latestExperience.companyName} 
                     onError={() => setExpError(true)}
                     className="w-full h-full object-contain" 
                   />
                 ) : (
                   <span className="text-white font-black text-xl tracking-tighter opacity-80">
                     {latestExperience.companyName?.charAt(0).toUpperCase() || "?"}
                   </span>
                 )}
              </div>
              <div className="flex-1">
                 <h4 className="text-white text-lg font-black leading-tight">{latestExperience.title}</h4>
                 <p className="text-secondary text-[13px] mt-1">{latestExperience.companyName}</p>
                 <Link to={`${basePath}/experience`} className="text-[#915EFF] font-bold text-[13px] hover:text-white mt-3 block transition-all">
                   Professional Journey →
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Link to={`${basePath}/portfolio`} className={`${styles.glassButton}`}>
         See All Projects
      </Link>
    </div>
  );
};

export default SectionWrapper(Showcase, "showcase", { noTopPadding: true });
