import { About, BackToTop, Hero, Navbar, StarsCanvas, Statistics, ReadyForWork, WhyWorkWithMe } from "../components";
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
          <About isSummary={true} />
          <WhyWorkWithMe />
          <Statistics />
          <ReadyForWork />
          
          <BackToTop scrollThreshold={300} />
        </>
      )}
    </div>
  );
};

export default HomePage;


