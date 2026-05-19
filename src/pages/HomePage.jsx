import { 
  HomeIntro, 
  Showcase, 
  BackToTop, 
  Hero, 
  Navbar,  
  Statistics, 
  ReadyForWork, 
  WhyWorkWithMe, 
  FAQ,
  Footer
} from "../components";
import { usePortfolio } from "../context/PortfolioContext";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingState from "../components/common/LoadingState";

const HomePage = () => {
  const { isLoading, error } = usePortfolio();

  return (
    <div className='relative z-0 bg-transparent w-full min-h-screen overflow-x-hidden'>
      <Navbar />

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
            <FAQ className='mt-0'/>
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
