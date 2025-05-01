import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import PropTypes from "prop-types"; 
import { styles } from "../styles";
import { services } from "../Home";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";


const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        // eslint-disable-next-line react/no-unknown-property
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

const About = () => {
  return (
    <>
     <div className='absolute xs:top-[8px] top-0 w-full flex justify-center items-center hidden md:flex'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>

      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Summary</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] w-full leading-[30px]'
      >
        Passionate and skilled MERN stack developer with a Bachelor’s degree in Software Engineering from Punjab University PUCIT. Over
        one year of hands-on experience in designing and developing scalable, high-performance web and mobile applications. Specialized in
        full-stack development with expertise in Mern, Next and React Native. Proficient in modern development tools and problem
        solving techniques. Committed to delivering innovative solutions and contributing to team success
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 justify-evenly'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

    </>
  );
};

export default SectionWrapper(About, "about");
