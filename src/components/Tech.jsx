import { motion } from "framer-motion";
import { BallCanvas } from "./canvas";
import { usePortfolio } from "../context/PortfolioContext";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../Animation/motion";
import { resolveAssetUrl } from "../utils/assetResolver";

const Tech = () => {
  const { data } = usePortfolio();

  return (
    <>
      <motion.div variants={textVariant()} className="flex flex-col items-start gap-4">
        <span className="section-badge">Technology Stack</span>
        <h2 className="section-title-underline text-white font-extrabold text-3xl sm:text-4xl leading-tight max-w-3xl">
          Tools &amp; Technologies I Work With
        </h2>
        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          Modern tools and frameworks I use to build scalable and production-ready applications.
        </p>
      </motion.div>

      {/* Tech Grid */}
      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.75)}
        className="mt-14 flex flex-wrap justify-center gap-10"
      >
        {(data?.technologies ?? []).map((technology, i) => (
          <motion.div
            key={technology.name}
            variants={fadeIn("up", "spring", i * 0.05, 0.5)}
            title={technology.name}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 transition-all duration-300
                          group-hover:drop-shadow-[0_0_16px_rgba(145,94,255,0.5)]"
            >
              <BallCanvas icon={resolveAssetUrl(technology.iconUrl || technology.icon)} />
            </div>
            <span
              className="text-[11px] font-semibold uppercase tracking-widest opacity-0
                         group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: "#c4a7ff" }}
            >
              {technology.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

const TechSection = SectionWrapper(Tech, "tech");

export { Tech };
export default TechSection;
