import { About } from "../components/About";
import { WhyWorkWithMe, StarsCanvas, BackToTop, Navbar } from "../components";
import { usePortfolio } from "../context/PortfolioContext";
import LoadingState from "../components/common/LoadingState";
import ErrorMessage from "../components/common/ErrorMessage";
import DynamicSEO from "../components/common/DynamicSEO";
import { motion } from "framer-motion";
import { styles } from "../styles";

const AboutPage = () => {
  const { isLoading, error } = usePortfolio();

  return (
    <div className="relative z-0 bg-primary w-full min-h-screen overflow-x-hidden">
      <DynamicSEO title="About Me | Professional Background" />
      <Navbar />
      
      {/* Stars Background */}
      <div className='fixed inset-0 z-0'>
        <StarsCanvas />
      </div>

      {/* Premium Page Header */}
      <div className="pt-32 pb-10 px-6 max-w-7xl mx-auto text-center relative">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#915EFF]/10 blur-[80px] rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center gap-3"
        >
          <span
            className="text-[11px] font-bold uppercase tracking-[0.35em] px-4 py-1.5 rounded-full backdrop-blur-md bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
            style={{ color: "#c4a7ff" }}
          >
            Overview
          </span>
          <h1 className={`${styles.sectionHeadText} mt-1`}>About My Journey</h1>
          <div className="w-16 h-[4px] rounded-full bg-white/10 relative overflow-hidden">
             <div className="absolute inset-0 bg-[#915EFF] animate-shimmer" style={{ backgroundSize: '200% auto' }} />
          </div>
        </motion.div>
      </div>

      <div className="relative z-0">
        {error ? (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <ErrorMessage message={error} />
          </div>
        ) : isLoading ? (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <LoadingState message="Loading about information..." />
          </div>
        ) : (
          <div className="flex flex-col gap-10 pb-20">
            <About hideHeader={true} />
            <WhyWorkWithMe />
          </div>
        )}
      </div>

      <BackToTop scrollThreshold={300} />
    </div>
  );
};

export default AboutPage;
