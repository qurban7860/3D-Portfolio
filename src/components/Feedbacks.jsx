import { motion } from "framer-motion";
import PropTypes from "prop-types"; 
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { testimonials } from "../Home";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  // designation,
  // company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full'
  >
    <p className='text-white font-black text-[48px]'>&quot;</p>

    <div className='mt-1'>
      <p className='text-white tracking-wider text-[18px]'>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-white font-medium text-[16px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>
          {/* <p className='mt-1 text-secondary text-[12px]'>
            {designation} of {company}
          </p> */}
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover'
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className="bg-black-100 rounded-3xl overflow-hidden">
      
      <div className={`bg-tertiary ${styles.padding} py-16`}>
        <motion.div
          variants={textVariant()}
          className="flex flex-col items-start gap-4"
        >
          <span className="section-badge">
            Testimonials
          </span>

          <h2 className="text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-2xl">
            What others say
          </h2>

          <p className="text-secondary text-base sm:text-lg leading-relaxed">
            Real feedback from collaborators and clients who’ve experienced
            my work and dedication firsthand.
          </p>
        </motion.div>
      </div>

      <div
        className={`mt-5 pb-5 ${styles.paddingX} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={testimonial.name}
            index={index}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  );
};

FeedbackCard.propTypes = {
  index: PropTypes.number.isRequired,
  testimonial: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  // designation: PropTypes.string,
  // company: PropTypes.string,
};

const FeedbacksSection = SectionWrapper(Feedbacks, "feedbacks");

export default FeedbacksSection;
