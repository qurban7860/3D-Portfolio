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
  FAQ 
} from "../components";
import { usePortfolio } from "../context/PortfolioContext";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingState from "../components/common/LoadingState";
import DynamicSEO from "../components/common/DynamicSEO";

const HomePage = () => {
  const { isLoading, error } = usePortfolio();

  return (
    <div className='relative z-0 bg-primary w-full min-h-screen overflow-x-hidden'>
      <DynamicSEO />
      <Navbar />
      
      {/* Stars Background covering the whole page */}
      <div className='fixed inset-0 z-[-1]'>
        <StarsCanvas />
      </div>

      <div className='bg-transparent w-full relative'>
        <Hero />
      </div>

      <div className="max-w-7xl mx-auto">
        {error && (
          <div className='mt-20 px-6'>
            <ErrorMessage message={error} />
          </div>
        )}

        {isLoading ? (
          <div className='mt-20 px-6'>
            <LoadingState message='Fetching portfolio content...' />
          </div>
        ) : (
          <div className="flex flex-col gap-40 pb-32">
            <HomeIntro />
            <Showcase />
            <WhyWorkWithMe />
            <Statistics />
            <FAQ />
            <ReadyForWork />
            
            <BackToTop scrollThreshold={300} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
