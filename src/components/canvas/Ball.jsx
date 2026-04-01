/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from "react";
import PropTypes from "prop-types"; 
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);

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
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

Ball.propTypes = {
  imgUrl: PropTypes.string.isRequired,
};

const BallCanvas = ({ icon, index = 0 }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), index * 50 + 100);
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [index]);

  return (
    <div className="w-full h-full bg-transparent flex items-center justify-center">
      {isReady && (
        <Canvas
          frameloop="always"
          dpr={isMobile ? [1, 1] : [1, 2]}
          gl={{ 
            preserveDrawingBuffer: true,
            antialias: !isMobile
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls enableZoom={false} />
            <Ball imgUrl={icon} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

BallCanvas.propTypes = {
  icon: PropTypes.string.isRequired,
  index: PropTypes.number,
};

export default BallCanvas;
