import { Html, useProgress } from "@react-three/drei";
import PropTypes from "prop-types";

const CanvasLoader = ({ isFullScreen = false }) => {
  const { progress } = useProgress();

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: isFullScreen ? 9999 : "auto",
        width: "100%",
        height: "100%"
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--accent)]/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-[var(--secondary)]/30 animate-pulse" />
          <div className="absolute inset-0 rounded-full border-t-2 border-[var(--accent)] animate-spin shadow-[0_0_15px_var(--glow-color)]" />
          <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] blur-[2px] opacity-80" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-white font-black text-[12px] tracking-[0.4em] uppercase opacity-40 animate-shimmer bg-clip-text" style={{ backgroundSize: '200% auto' }}>
             Initializing 3D Space
          </p>
          <p className="text-[var(--accent)] font-black text-[18px] tracking-tight drop-shadow-[0_0_10px_var(--glow-color)]">
            {progress.toFixed(0)}%
          </p>
        </div>
      </div>
    </Html>
  );
};

CanvasLoader.propTypes = {
  isFullScreen: PropTypes.bool,
};

export default CanvasLoader;

