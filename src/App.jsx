import { BrowserRouter } from "react-router-dom";

import { About, BackToTop, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary w-full overflow-x-hidden'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center w-full'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
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
