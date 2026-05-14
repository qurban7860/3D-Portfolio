import { StarsCanvas } from "../canvas";

const GlobalBackground = () => {
  return (
    <div className='fixed inset-0 z-[-1] pointer-events-none bg-primary bg-mesh overflow-hidden'>
      {/* Texture Layers */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-[0.25] z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.15] z-0" />
      
      {/* Interactive/3D Elements */}
      <StarsCanvas />
      
      {/* Subtle Ambient Mesh Gradients */}
      <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] bg-[#915EFF]/15 rounded-full blur-[120px] animate-slow-ping opacity-40" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-[#56ccf2]/10 rounded-full blur-[100px] animate-pulse opacity-30" />
      <div className="absolute -bottom-[10%] left-[20%] w-[500px] h-[500px] bg-[#00cea8]/10 rounded-full blur-[120px] animate-slow-ping opacity-30" />
    </div>
  );
};

export default GlobalBackground;
