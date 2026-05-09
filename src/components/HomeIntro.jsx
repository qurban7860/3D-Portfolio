import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Animation/motion";
import { styles } from "../styles";

const HomeIntro = () => {
  const { data } = usePortfolio();
  const about = data?.settings?.about ?? {};
  const overview =
    about.overview ||
    "I'm a passionate Software Engineer specializing in building high-performance web applications.";

  return (
    <>
      <motion.div
        variants={textVariant()}
        className="flex flex-col items-start gap-4"
      >
        <span className="section-badge">Welcome</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Crafting Digital Excellence
        </h2>
      </motion.div>

      <div className="mt-6 flex flex-col md:flex-row gap-8 items-center justify-between">
        <motion.div
          variants={fadeIn("right", "spring", 0.2, 1)}
          className="flex-1"
        >
          <p className="text-secondary text-base sm:text-lg leading-relaxed max-w-4xl">
            {overview.replace(/^I'm a passionate/i, "Skilled")}
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/about"
              className={`${styles.glassButtonPremium} px-8 py-3 text-[14px]`}
              onClick={() => window.scrollTo(0, 0)}
            >
              The Full Story →
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", "spring", 0.4, 1)}
          className="flex-1 flex justify-center md:justify-end"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#915EFF] to-[#56ccf2] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-black-100 ring-1 ring-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#915EFF]/20 flex items-center justify-center text-xl">
                    💡
                  </div>
                  <div>
                    <p className="text-white font-bold">Solution Architect</p>
                    <p className="text-secondary text-xs">
                      Designing scalable systems
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#56ccf2]/20 flex items-center justify-center text-xl">
                    🚀
                  </div>
                  <div>
                    <p className="text-white font-bold">Performance Expert</p>
                    <p className="text-secondary text-xs">
                      Optimizing for speed & SEO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(HomeIntro, "about");
