import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { StarsCanvas, Navbar, Footer } from "../components";
import { styles } from "../styles";

const NotFound = () => {
  return (
    <div className="relative z-0 bg-primary w-full min-h-screen overflow-x-hidden flex flex-col">
      <Navbar />
      
      <div className="fixed inset-0 z-0">
        <StarsCanvas />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-6"
        >
          <div className="relative">
            <h1 className="text-[120px] sm:text-[180px] font-black leading-none text-white/5 tracking-tighter">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div
                 animate={{ 
                   rotate: [0, 360],
                   scale: [1, 1.1, 1]
                 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="w-32 h-32 sm:w-48 sm:h-48 border border-[var(--accent)]/30 rounded-full flex items-center justify-center"
               >
                 <div className="w-4 h-4 rounded-full bg-[var(--accent)] shadow-[0_0_20px_var(--glow-color)]" />
               </motion.div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="section-badge inline-block mx-auto">Lost in Space</span>
            <h2 className={styles.sectionHeadText}>Page Not <span className="text-gradient">Found</span></h2>
            <p className="text-secondary text-base sm:text-lg max-w-md mx-auto opacity-70">
              The coordinates you provided led to a void. Let&apos;s get you back to the known universe.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            <Link
              to="/"
              className={`${styles.glassButtonPremium} px-10 py-4 text-[15px]`}
            >
              Return to Base →
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <div className="max-w-7xl mx-auto px-6 sm:px-16 w-full relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default NotFound;
