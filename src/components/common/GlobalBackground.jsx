import { StarsCanvas } from "../canvas";

const GlobalBackground = () => {
  return (
    <div className='fixed inset-0 z-[-1] pointer-events-none bg-background overflow-hidden transition-colors duration-1000'>
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-[0.25] z-0" />
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.1] z-0" />
      
      <StarsCanvas />

      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light pointer-events-none z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default GlobalBackground;
