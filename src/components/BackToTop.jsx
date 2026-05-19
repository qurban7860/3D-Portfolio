import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowUp } from "react-icons/hi";

const BackToTop = ({ scrollThreshold = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > scrollThreshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (typeof document === "undefined") return null;

  return createPortal(
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
                     justify-center cursor-pointer transition-all duration-300
                     bg-[var(--accent)]/20 backdrop-blur-md border border-[var(--accent)]/40
                     hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/80
                     hover:shadow-[0_0_24px_var(--glow-color)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
        >
          <HiOutlineArrowUp className="text-white text-xl" />
        </motion.button>
      )}
    </AnimatePresence>,
    document.body
  );
};

BackToTop.propTypes = {
  scrollThreshold: PropTypes.number,
};

export default BackToTop;
