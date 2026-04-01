/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader"; 

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  const { position, scale } = useMemo(() => {
    if (isMobile) {
      return {
        position: [0, -2.8, 0],
        scale: 0.5, 
      };
    }
    return {
      position: [0, -3.2, -1.5], 
      scale: 0.7,
    };
  }, [isMobile]);

  return (
    <group>
      <ambientLight intensity={0.25} />
      <hemisphereLight intensity={0.15} groundColor="#000000" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1.2}
        castShadow
        shadow-mapSize={2048}
      />
      <pointLight intensity={0.8} position={[10, 10, 10]} />
      <primitive
        object={computer.scene}
        scale={scale}
        position={position}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </group>
  );
};

Computers.propTypes = { isMobile: PropTypes.bool.isRequired };

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    setIsLoaded(true);

    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25, near: 0.1, far: 100 }}
        gl={{ 
          preserveDrawingBuffer: true, 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ height: '100%', width: '100%', background: 'transparent' }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            target={[0, 0, 0]}
          />
          {isLoaded && <Computers isMobile={isMobile} />}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;