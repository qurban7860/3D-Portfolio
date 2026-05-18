import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { styles } from "../../styles";


const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, type = "danger" }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          className={`relative w-full max-w-[360px] overflow-hidden p-8 ${styles.glassCardStrong} bg-[#050816]/95`}
        >
          {/* Decorative glow */}
          <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full pointer-events-none ${
            type === "danger" ? "bg-red-500/10" : "bg-accent/10"
          }`} />

          <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-xl shadow-xl transition-transform duration-500 hover:rotate-[15deg] ${
            type === "danger" 
              ? "bg-red-500/10 text-red-500 border-red-500/20" 
              : "bg-accent/10 text-accent border-accent/20"
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h3 className="mb-2 text-xl font-bold text-white tracking-tight leading-tight">{title || "Secure Request"}</h3>
          <p className="mb-8 text-secondary text-[13px] font-medium leading-relaxed opacity-60">
            {message || "Authorize this system modification to proceed with the requested operation."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <button
              onClick={onCancel}
              className="flex-1 rounded-[1.25rem] border border-white/10 bg-white/5 px-8 py-4 text-[15px] font-bold text-white transition-all hover:bg-white/10 active:scale-95 shadow-xl"
            >
              Abort
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 rounded-[1.25rem] px-8 py-4 text-[15px] font-bold text-white shadow-2xl transition-all active:scale-95 ${
                type === "danger" 
                  ? "bg-red-500 shadow-red-500/20 hover:bg-red-600" 
                  : "bg-accent shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] hover:bg-accent/80"
              }`}
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["danger", "primary"]),
};

export default ConfirmDialog;
