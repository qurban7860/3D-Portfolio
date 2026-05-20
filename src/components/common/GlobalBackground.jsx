import { StarsCanvas } from "../canvas";

const GlobalBackground = () => {
  return (
    <div className='fixed inset-0 z-[-1] pointer-events-none bg-background overflow-hidden transition-colors duration-1000'>
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-[0.25] z-0" />
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.1] z-0" />
      
      <StarsCanvas />

      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light pointer-events-none z-10 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noise%29%22%2F%3E%3C%2Fsvg%3E')]" />
    </div>
  );
};

export default GlobalBackground;
