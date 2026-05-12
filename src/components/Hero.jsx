import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiDocument } from "react-icons/hi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { styles } from "../styles";
import ComputersCanvas from "./canvas/Computers";
import { usePortfolio } from "../context/PortfolioContext";
import resumePdf from "../assets/resume/Resume_Mern.pdf";

const Hero = () => {
  const { data } = usePortfolio();
  const navigate = useNavigate();
  const hero = data?.settings?.hero ?? {};
  const contact = data?.settings?.contact ?? {};
  const headline = hero.headline || "Hi, I'm Qurban";
  const subtitle = hero.subtitle || "Building high-performance web applications with precision.";

  return (
    <section className="relative w-full h-auto lg:h-[calc(100vh-4rem)] mx-auto overflow-hidden flex flex-col">
      {/* ── Advanced Background Layers ── */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-[0.4] z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.15] z-0" />
      
      {/* Immersive Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#915EFF]/10 rounded-full blur-[100px] sm:blur-[120px] animate-slow-ping z-0" />
      <div className="absolute bottom-[10%] right-[-5%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#56ccf2]/5 rounded-full blur-[80px] sm:blur-[100px] animate-pulse z-0" />

      {/* ── Main Content Container ── */}
      <div className={`relative z-40 max-w-7xl mx-auto ${styles.paddingX} h-full min-h-[600px] lg:min-h-0 flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-16 pt-32 lg:pt-20 pb-10 lg:pb-0 pointer-events-none`}>
        
        {/* Left Section: Branding & CTA */}
        <div className="flex-1 lg:flex-[1.8] flex flex-col gap-6 w-full text-center lg:text-left items-center lg:items-start mt-10 lg:mt-0 order-2 lg:order-1 relative z-50 pointer-events-auto">
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-1.5 rounded-full glass-badge-hero w-fit"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-white/90 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-sm">Available for projects</span>
          </motion.div>

          <div className="flex flex-col gap-5">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white font-black lg:text-[72px] md:text-[60px] sm:text-[50px] text-[32px] leading-[1.1] tracking-tighter lg:whitespace-nowrap"
            >
              {headline.split(" ").map((word, i) => (
                <span key={i} className={`${word === "Qurban" ? "text-gradient-shimmer" : ""}`}>
                  {word}{i === headline.split(" ").length - 1 ? "" : <>&nbsp;</>}
                </span>
              ))}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-secondary font-medium lg:text-[18px] text-[14px] sm:text-[16px] max-w-xl leading-relaxed opacity-80 px-4 lg:px-0"
            >
              {subtitle}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5 mt-4 w-full lg:w-auto"
          >
            <button
              onClick={() => navigate("/about")}
              className={`${styles.glassButtonPremium} whitespace-nowrap`}
            >
              Explore Portfolio
            </button>
            <button
              onClick={() => {
                const resumeUrl = data?.settings?.hero?.resumeUrl || `${resumePdf}`;
                window.open(resumeUrl, "_blank");
              }}
              className={`${styles.outlineButtonCyan} whitespace-nowrap group`}
            >
              <span className="group-hover:scale-110 transition-transform"><HiDocument /></span> View Resume
            </button>
            
            {/* Quick Socials - Hidden on very small screens to keep layout clean */}
            <div className="hidden sm:flex items-center gap-4 ml-2 sm:ml-4 border-l border-white/10 pl-4 sm:pl-6 h-10 shrink-0">
               {contact.linkedin && (
                 <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#915EFF] transition-colors">
                   <FaLinkedinIn size={18} />
                 </a>
               )}
               {contact.github && (
                 <a href={contact.github} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                   <FaGithub size={18} />
                 </a>
               )}
            </div>
          </motion.div>
        </div>

        {/* Right Section: 3D Visualization */}
        <div className="w-full h-[30vh] sm:h-[40vh] lg:h-[75vh] relative z-10 order-1 lg:order-2 lg:mt-0 flex items-center justify-center pointer-events-auto">
          <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#915EFF]/20 rounded-full blur-[60px] animate-pulse" />
             <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#56ccf2]/10 rounded-full blur-[80px] animate-float" />
          </div>
          <ComputersCanvas />
          {/* Subtle Decorative Elements */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#915EFF]/30 to-transparent" />
        </div>
      </div>

      {/* ── Scroll Indicator (Desktop only) ── */}
      <div className="absolute bottom-8 w-full hidden lg:flex justify-center items-center z-20">
        <a href="#about">
          <div className="w-[30px] h-[52px] rounded-3xl border-2 border-white/20 flex justify-center items-start p-2 backdrop-blur-sm hover:border-[#915EFF]/50 transition-colors">
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-2 h-2 rounded-full bg-[#915EFF] shadow-[0_0_10px_#915EFF]"
            />
          </div>
        </a>
      </div>
      
      {/* Global Transition Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-t from-primary to-transparent z-10" />
    </section>
  );
};

export default Hero;
