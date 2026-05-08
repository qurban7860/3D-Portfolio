import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const BackToTop = ({ scrollThreshold = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > scrollThreshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.12, y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          className="fixed bottom-6 right-6 z-[999] w-12 h-12 rounded-full flex items-center
                     justify-center cursor-pointer transition-shadow duration-300"
          style={{
            background: "linear-gradient(135deg, #915EFF, #56ccf2)",
            boxShadow: "0 4px 24px rgba(145,94,255,0.45), 0 2px 8px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 8px 32px rgba(145,94,255,0.65), 0 2px 12px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 24px rgba(145,94,255,0.45), 0 2px 8px rgba(0,0,0,0.3)";
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

BackToTop.propTypes = {
  scrollThreshold: PropTypes.number,
};

export default BackToTop;
