import { Works as RawWorks } from "../components/Works";
import { StarsCanvas, BackToTop, Navbar } from "../components";
import { usePortfolio } from "../context/PortfolioContext";
import LoadingState from "../components/common/LoadingState";
import ErrorMessage from "../components/common/ErrorMessage";
import DynamicSEO from "../components/common/DynamicSEO";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../Animation/motion";

const PortfolioPage = () => {
  const { isLoading, error } = usePortfolio();

  return (
    <div className="relative z-0 bg-primary w-full min-h-screen overflow-x-hidden">
      <DynamicSEO title="Portfolio | Featured Works" />
      <Navbar />

      {/* Page Header */}
      <div className="pt-28 pb-12 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#915EFF] font-bold uppercase tracking-[0.3em] text-sm">
            Portfolio
          </span>
          <h1 className={`${styles.sectionHeadText} mt-2`}>Featured Works</h1>
        </motion.div>
      </div>

      <div className="relative z-0">
        {error ? (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <ErrorMessage message={error} />
          </div>
        ) : isLoading ? (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <LoadingState message="Loading projects..." />
          </div>
        ) : (
          <motion.section
            variants={staggerContainer()}
            initial="hidden"
            animate="show"
            className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
            id="works"
          >
            <RawWorks />
          </motion.section>
        )}
        <StarsCanvas />
      </div>

      <BackToTop scrollThreshold={300} />
    </div>
  );
};

export default PortfolioPage;
