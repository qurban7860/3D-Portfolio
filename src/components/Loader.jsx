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
      }}
    >
      <span className="canvas-loader" />
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
          textShadow: "0 0 10px rgba(145, 94, 255, 0.5)",
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

CanvasLoader.propTypes = {
  isFullScreen: PropTypes.bool,
};

export default CanvasLoader;

