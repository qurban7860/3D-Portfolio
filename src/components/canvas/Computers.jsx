/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState, useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader"; 

const ContextRecovery = () => {
  const { gl } = useThree();
  
  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
      console.log('WebGL Context Lost - Recovering...');
    };
    
    const handleContextRestored = () => {
      console.log('WebGL Context Restored');
    };

    const canvas = gl.domElement;
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
      canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
      
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }
  }, [gl]);

  return null;
};

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  const modelConfig = useMemo(() => ({
    position: isMobile ? [0, -2.8, 0] : [0, -3.2, -1.5],
    scale: isMobile ? 0.5 : 0.7,
    rotation: [-0.01, -0.2, -0.1],
  }), [isMobile]);

  return (
    <group>
      <ambientLight intensity={isMobile ? 0.35 : 0.25} />
      <hemisphereLight intensity={isMobile ? 0.25 : 0.15} groundColor="#000000" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={isMobile ? 1.0 : 1.2}
        castShadow={!isMobile}
        shadow-mapSize={isMobile ? 1024 : 2048}
      />
      <pointLight intensity={0.8} position={[10, 10, 10]} />
      <primitive object={computer.scene} {...modelConfig} />
    </group>
  );
};

Computers.propTypes = { isMobile: PropTypes.bool.isRequired };

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  const checkMobile = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  }, []);

  const safeAddEventListener = useCallback((target, event, handler) => {
    if (target && target.addEventListener) {
      target.addEventListener(event, handler);
      return () => {
        if (target && target.removeEventListener) {
          target.removeEventListener(event, handler);
        }
      };
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsMobile(checkMobile());
    setIsLoaded(true);

    const mediaQuery = window.matchMedia?.("(max-width: 768px)");
    if (mediaQuery) {
      const handleChange = (e) => setIsMobile(e.matches);
      const cleanupMedia = safeAddEventListener(mediaQuery, 'change', handleChange);
      
      return cleanupMedia;
    }
  }, [checkMobile, safeAddEventListener]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        setIsMobile(checkMobile());
      }, 100);
    };

    const cleanupResize = safeAddEventListener(window, 'resize', handleResize);
    return cleanupResize;
  }, [checkMobile, safeAddEventListener]);

  useEffect(() => {
    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={canvasRef}
      className="w-full h-full absolute inset-0"
      style={{ 
        background: 'transparent',
        isolation: 'isolate',
        contain: 'paint strict',
        touchAction: 'none'
      }}
    >
      <Canvas
        key={`${isMobile ? 'mobile' : 'desktop'}`} // Force remount on mobile change
        frameloop={isMobile ? "no-loop" : "always"}
        shadows={!isMobile}
        dpr={isMobile ? 1 : [1, 2]}
        camera={{ 
          position: isMobile ? [20, 2, 3] : [20, 3, 5], 
          fov: 25, 
          near: 0.1, 
          far: 100 
        }}
        gl={{ 
          preserveDrawingBuffer: false,
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false, 
          stencil: false,
          depth: !isMobile,
          contextLossTimeout: 1000 
        }}
        style={{ 
          height: '100%', 
          width: '100%', 
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          touchAction: 'none'
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#00000000', 0);
        }}
        onPointerDown={(e) => e.preventDefault()}
      >
        <ContextRecovery />
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            enablePan={false}
            enableRotate={false}
            autoRotate={isLoaded}
            autoRotateSpeed={isMobile ? 0.3 : 0.5}
            target={[0, 0, 0]}
            dampingFactor={0.05}
          />
          {isLoaded && <Computers isMobile={isMobile} />}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;