import { 
  HomeIntro, 
  Showcase, 
  BackToTop, 
  Hero, 
  Navbar, 
  StarsCanvas, 
  Statistics, 
  ReadyForWork, 
  WhyWorkWithMe, 
  FAQ,
  Footer
} from "../components";
import { usePortfolio } from "../context/PortfolioContext";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingState from "../components/common/LoadingState";
import DynamicSEO from "../components/common/DynamicSEO";

const HomePage = () => {
  const { isLoading, error } = usePortfolio();

  return (
    <div className='relative z-0 bg-primary w-full min-h-screen overflow-x-hidden bg-mesh'>
      <DynamicSEO />
      <Navbar />
      
      {/* Background Elements */}
      <div className='fixed inset-0 z-[-1] pointer-events-none'>
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-[0.25] z-0 mix-blend-overlay" />
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.15] z-0" />
        <StarsCanvas />
      </div>
      
      {/* Subtle Ambient Mesh Gradients for the whole page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] bg-[#915EFF]/15 rounded-full blur-[120px] animate-slow-ping opacity-40" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-[#56ccf2]/10 rounded-full blur-[100px] animate-pulse opacity-30" />
        <div className="absolute -bottom-[10%] left-[20%] w-[500px] h-[500px] bg-[#00cea8]/10 rounded-full blur-[120px] animate-slow-ping opacity-30" />
      </div>

      <div className='bg-transparent w-full relative'>
        <Hero />
      </div>

      <div className="w-full relative z-0">
        {error && (
          <div className='max-w-7xl mx-auto px-6 sm:px-16 mt-20'>
            <ErrorMessage message={error} />
          </div>
        )}

        {isLoading ? (
          <div className='max-w-7xl mx-auto px-6 sm:px-16 mt-20'>
            <LoadingState message='Fetching portfolio content...' />
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            <HomeIntro />
            <Showcase />
            <Statistics />
            <WhyWorkWithMe />
            <FAQ />
            <ReadyForWork />
            
            <BackToTop scrollThreshold={300} />
            <div className="max-w-7xl mx-auto px-6 sm:px-16 w-full">
               <Footer />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
