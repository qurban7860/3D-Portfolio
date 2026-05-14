import PropTypes from "prop-types";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { motion } from "framer-motion";

const ErrorMessage = ({ message, onRetry }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full rounded-[2rem] bg-red-500/5 backdrop-blur-xl border border-red-500/20 p-8 flex flex-col items-center text-center gap-6 shadow-2xl relative overflow-hidden group"
  >
    {/* Decorative background accent */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-red-500/10 transition-colors" />
    
    <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
      <FiAlertCircle className="text-red-400" />
    </div>
    
    <div className="flex flex-col gap-2 max-w-lg">
      <h3 className="text-white font-black text-xl uppercase tracking-tighter">System Alert</h3>
      <p className="text-red-100/70 text-sm leading-relaxed">
        {message || "An unexpected error occurred while processing your request. Please check your connection or try again later."}
      </p>
    </div>

    {onRetry && (
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-xl text-red-100 text-[13px] font-bold uppercase tracking-widest transition-all active:scale-95 group/btn"
      >
        <FiRefreshCw className="group-hover/btn:rotate-180 transition-transform duration-500" />
        Retry Operation
      </button>
    )}
  </motion.div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
