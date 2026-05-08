import { Tech as RawTech } from "../components/Tech";
import { Services as RawServices } from "../components/Services";
import { StarsCanvas, BackToTop, Navbar } from "../components";
import { usePortfolio } from "../context/PortfolioContext";
import LoadingState from "../components/common/LoadingState";
import ErrorMessage from "../components/common/ErrorMessage";
import DynamicSEO from "../components/common/DynamicSEO";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../Animation/motion";

const ServicesPage = () => {
  const { isLoading, error } = usePortfolio();

  return (
    <div className="relative z-0 bg-primary w-full min-h-screen overflow-x-hidden">
      <DynamicSEO title="Skills & Services | Expertise" />
      <Navbar />

      {/* Page Header */}
      <div className="pt-28 pb-4 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#915EFF] font-bold uppercase tracking-[0.3em] text-sm">
            Expertise
          </span>
          <h1 className={`${styles.sectionHeadText} mt-2`}>Skills & Services</h1>
        </motion.div>
      </div>

      <div className="relative z-0">
        {error ? (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <ErrorMessage message={error} />
          </div>
        ) : isLoading ? (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <LoadingState message="Loading skills and services..." />
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <motion.section
              variants={staggerContainer()}
              initial="hidden"
              animate="show"
              className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
              id="tech"
            >
              <RawTech />
            </motion.section>
            <motion.section
              variants={staggerContainer()}
              initial="hidden"
              animate="show"
              className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
              id="services"
            >
              <RawServices />
            </motion.section>
          </div>
        )}
        <StarsCanvas />
      </div>

      <BackToTop scrollThreshold={300} />
    </div>
  );
};

export default ServicesPage;
