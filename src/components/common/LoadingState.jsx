import PropTypes from "prop-types";

const LoadingState = ({ message = "Syncing..." }) => (
  <div className="w-full min-h-[300px] flex items-center justify-center rounded-[2.5rem] premium-glass-card border border-white/10 p-12 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/5 to-transparent animate-pulse pointer-events-none" />
    <div className="relative z-10">
      <div className="mx-auto mb-6 h-16 w-16 flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full border-[3px] border-white/5" />
        <div className="absolute inset-0 rounded-full border-[3px] border-t-[#915EFF] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div className="h-2 w-2 rounded-full bg-[#56ccf2] animate-pulse shadow-[0_0_15px_rgba(86,204,242,0.8)]" />
      </div>
      <p className="text-[#c4a7ff] text-[12px] font-black uppercase tracking-[0.4em] opacity-80">{message}</p>
    </div>
  </div>
);

LoadingState.propTypes = {
  message: PropTypes.string,
};

export default LoadingState;
