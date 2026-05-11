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
      <div className='fixed inset-0 z-[-1]'>
        <StarsCanvas />
      </div>
      
      {/* Subtle Ambient Orbs for the whole page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="glow-orb top-[20%] -left-[10%] w-[500px] h-[500px] bg-[#915EFF]/5 animate-slow-ping opacity-30" />
        <div className="glow-orb top-[60%] -right-[10%] w-[600px] h-[600px] bg-[#56ccf2]/5 animate-pulse opacity-20" />
        <div className="glow-orb -bottom-[10%] left-[30%] w-[400px] h-[400px] bg-[#00cea8]/5 animate-slow-ping opacity-20" />
      </div>

      <div className='bg-transparent w-full relative'>
        <Hero />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        {error && (
          <div className='mt-20'>
            <ErrorMessage message={error} />
          </div>
        )}

        {isLoading ? (
          <div className='mt-20'>
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
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
