/* eslint-disable react/no-unknown-property */
import React, { Suspense } from "react";
import PropTypes from "prop-types"; 
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

class BallErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("BallCanvas error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; 
    }
    return this.props.children;
  }
}

BallErrorBoundary.propTypes = {
  children: PropTypes.node,
};

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture(imgUrl ? [imgUrl] : ["/fallback-icon.png"]);

  if (!imgUrl) return null;

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {decal && (
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1}
            map={decal}
            flatShading
          />
        )}
      </mesh>
    </Float>
  );
};

Ball.propTypes = {
  imgUrl: PropTypes.string,
};

const BallCanvas = ({ icon }) => {
  if (!icon) return null;

  return (
    <BallErrorBoundary>
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls enableZoom={false} />
          <Ball imgUrl={icon} />
        </Suspense>

        <Preload all />
      </Canvas>
    </BallErrorBoundary>
  );
};

BallCanvas.propTypes = {
  icon: PropTypes.string,
};

export default BallCanvas;
