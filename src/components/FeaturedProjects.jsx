import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../Animation/motion";
import { styles } from "../styles";
import { ProjectCard } from "./Works";

const FeaturedProjects = () => {
  const { data } = usePortfolio();
  const featured = (data?.projects ?? []).slice(0, 3);

  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-4">
        <span className="section-badge">Selected Work</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Featured Projects
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4">
          <p className="text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
            A glimpse into some of my most impactful projects. From complex web applications to
            innovative digital experiences.
          </p>
          <Link
            to="/portfolio"
            className={`${styles.glassButtonPremium} px-6 py-2.5 text-[14px] whitespace-nowrap`}
            onClick={() => window.scrollTo(0, 0)}
          >
            View All Projects →
          </Link>
        </div>
      </motion.div>

      <div className="mt-12 flex flex-wrap gap-7 justify-center lg:justify-start">
        {featured.map((project, index) => (
          <ProjectCard key={`featured-${project.id ?? index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(FeaturedProjects, "portfolio");
