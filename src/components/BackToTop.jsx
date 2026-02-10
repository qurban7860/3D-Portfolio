import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const BackToTop = ({ scrollThreshold = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > scrollThreshold;
      setIsVisible(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${isVisible ? "show" : ""}`}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M12 5L5 12M12 5L19 12" />
      </svg>
    </button>
  );
};

BackToTop.propTypes = {
  scrollThreshold: PropTypes.number,
};

export default BackToTop;
