import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../Animation/motion";

const StarWrapper = (Component, idName, options = {}) =>
  function HOC(props) {
    const { noTopPadding = false, noBottomPadding = false } = options;
    
    let paddingClass = styles.padding;
    if (noTopPadding && noBottomPadding) {
      paddingClass = "sm:px-16 px-6";
    } else if (noTopPadding) {
      paddingClass = "sm:px-16 px-6 sm:pb-12 pb-8";
    } else if (noBottomPadding) {
      paddingClass = "sm:px-16 px-6 sm:pt-12 pt-8";
    }

    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0 }}
        className={`${paddingClass} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component {...props} />
      </motion.section>
    );
  };

export default StarWrapper;