import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { github, phone, linkedin } from "../assets";

const ContactCard = ({ title, icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <div className='w-12 h-12 bg-tertiary rounded-full flex justify-center items-center hover:bg-opacity-80 transition duration-300 ease-in-out transform hover:scale-110'>
      <img src={icon} alt={title} className='w-8 h-8 object-contain rounded-full' />
    </div>
  </a>
);

const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`absolute inset-0 top-[100px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>

        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Qurban</span>
            <span className={`${styles.subText} text-[20px] text-white-100 max-md:text-sm`}> (Software Engineer)</span>
          </h1>
          <p className={`${styles.heroSubText} mt-0 text-white-100`}>
            <br className='sm:block hidden' />
          </p>
        </div>
      </div>

      <div className='flex justify-end items-center mt-20 mr-8 space-x-4'>
        <ContactCard title="GitHub" icon={github} link="https://github.com/qurban7860" />
        <ContactCard title="Phone" icon={phone} link="tel:+923085651015" />
        <ContactCard title="LinkedIn" icon={linkedin} link="https://www.linkedin.com/in/qurban015" />
      </div>
      
      <ComputersCanvas />
    </section>
  );
};

export default Hero;
