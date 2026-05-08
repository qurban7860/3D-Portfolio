import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../Animation/motion";

const PageSection = (Component) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        animate="show"
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <Component />
      </motion.section>
    );
  };

export default PageSection;
