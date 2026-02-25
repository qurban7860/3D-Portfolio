import { BrowserRouter } from "react-router-dom";

import { About, BackToTop, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, Statistics, Certifications, Services, ReadyForWork, FAQ } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary w-full overflow-x-hidden'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center w-full'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Statistics />
        <Experience />
        <Tech />
        <Services />
        <Certifications />
        <Works />
        <Feedbacks />
        <FAQ />
        <ReadyForWork />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
        <BackToTop scrollThreshold={300} />
      </div>
    </BrowserRouter>
  );
}

export default App;
