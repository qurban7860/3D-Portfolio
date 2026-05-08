import { About, BackToTop, Hero, Navbar, StarsCanvas, Statistics, ReadyForWork } from "../components";
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
      
      <div className='bg-transparent w-full relative'>
        <Hero />
      </div>

      {error && (
        <div className='mx-auto mt-10 max-w-7xl px-6'>
          <ErrorMessage message={error} />
        </div>
      )}

      {isLoading ? (
        <div className='mx-auto mt-10 max-w-7xl px-6'>
          <LoadingState message='Fetching portfolio content...' />
        </div>
      ) : (
        <>
          <About />
          <Statistics />
          <ReadyForWork />
          
          <div className='relative z-0'>
            <StarsCanvas />
          </div>
          <BackToTop scrollThreshold={300} />
        </>
      )}
    </div>
  );
};

export default HomePage;


