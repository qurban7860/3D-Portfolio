import PropTypes from "prop-types";
import { motion } from "framer-motion";

const LoadingState = ({ message = "Syncing with Database..." }) => (
  <div className="w-full min-h-[400px] flex items-center justify-center rounded-[3rem] premium-glass-card border border-white/10 p-12 text-center relative overflow-hidden bg-white/[0.01]">
    {/* Dynamic Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-[var(--secondary)]/5 animate-pulse pointer-events-none" />
    <div className="absolute -top-24 -left-24 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] animate-slow-ping" />
    
    <div className="relative z-10 flex flex-col items-center">
      <div className="mx-auto mb-8 h-20 w-20 flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full border-[2px] border-white/5" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-[2px] border-t-[var(--accent)] border-r-transparent border-b-transparent border-l-transparent shadow-[0_0_15px_var(--glow-color)]"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border-[2px] border-b-[var(--secondary)]/50 border-t-transparent border-l-transparent border-r-transparent shadow-[0_0_10px_var(--glow-color)]"
        />
        <div className="h-2 w-2 rounded-full bg-white animate-pulse shadow-[0_0_20px_#fff]" />
      </div>
      
      <div className="flex flex-col gap-3">
        <p className="text-white font-black text-[12px] tracking-[0.4em] uppercase opacity-40 animate-shimmer bg-clip-text" style={{ backgroundSize: '200% auto' }}>
          {message}
        </p>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

LoadingState.propTypes = {
  message: PropTypes.string,
};

export default LoadingState;
