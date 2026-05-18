import { Contact as RawContact } from "../components/Contact";
import { BackToTop, Navbar, Footer } from "../components";
import { usePortfolio } from "../context/PortfolioContext";
import LoadingState from "../components/common/LoadingState";
import ErrorMessage from "../components/common/ErrorMessage";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../Animation/motion";

const ContactPage = () => {
  const { isLoading, error } = usePortfolio();

  return (
    <div className="relative z-0 bg-transparent w-full min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Premium Page Header */}
      <div className="pt-32 pb-10 px-6 max-w-7xl mx-auto text-center relative">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-80 h-32 bg-[var(--accent)]/12 blur-[80px] rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center gap-3"
        >
          <span
            className="text-[11px] font-bold uppercase tracking-[0.35em] px-4 py-1.5 rounded-full backdrop-blur-md bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
            style={{ color: "color-mix(in srgb, var(--accent) 85%, white)" }}
          >
            Communication
          </span>
          <h1 className={`${styles.sectionHeadText} mt-1`}>Get In Touch</h1>
          <div className="w-16 h-[4px] rounded-full bg-white/10 relative overflow-hidden">
             <div className="absolute inset-0 bg-[var(--accent)] animate-shimmer" style={{ backgroundSize: '200% auto' }} />
          </div>
          <p className="text-secondary text-base sm:text-lg max-w-lg mt-2">
            Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>
      </div>

      <div className="relative z-0">
        {error ? (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <ErrorMessage message={error} />
          </div>
        ) : isLoading ? (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <LoadingState message="Loading contact details..." />
          </div>
        ) : (
          <motion.section
            variants={staggerContainer()}
            initial="hidden"
            animate="show"
            className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
            id="contact"
          >
            <RawContact />
          </motion.section>
        )}
      </div>

      <BackToTop scrollThreshold={300} />
      <Footer />
    </div>
  );
};

export default ContactPage;
