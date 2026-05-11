/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { styles } from "../styles";
import { usePortfolio } from "../context/PortfolioContext";
import resumePdf from "../assets/resume/Resume_Mern.pdf";
import logo from "/logo.svg";

/* ── Contact Link (Socials) ─────────────────────────────────── */
const SocialIcon = ({ title, url, icon: Icon }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    title={title}
    className="relative group p-2 rounded-xl hover:bg-white/5 transition-all duration-300"
  >
    <Icon className="w-5 h-5 text-white/50 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#915EFF] group-hover:w-1/2 transition-all duration-300" />
  </a>
);

/* ── Resume Action Button ───────────────────────────────────── */
const ResumeButton = ({ isMobile = false }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      className="relative w-full lg:w-auto"
      onMouseEnter={() => !isMobile && setShowOptions(true)}
      onMouseLeave={() => !isMobile && setShowOptions(false)}
    >
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() =>
          isMobile
            ? setShowOptions(!showOptions)
            : window.open(resumePdf, "_blank")
        }
        className={`flex items-center gap-2 px-5 py-2 glass-badge-hero border border-white/10 text-white font-bold rounded-full hover:border-[#915EFF]/50 hover:shadow-[0_0_20px_rgba(145,94,255,0.2)] transition-all duration-300 text-[12px] uppercase tracking-wider ${isMobile ? "w-full justify-center" : ""}`}
      >
        <span>Resume</span>
        <span
          className={`text-[10px] opacity-40 transition-transform duration-300 ${showOptions ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </motion.button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`${isMobile ? "relative mt-2 w-full" : "absolute top-full right-0 mt-3 w-40"} bg-[#100d25] rounded-2xl overflow-hidden shadow-2xl z-[60] border border-white/10 p-1`}
          >
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2.5 text-white hover:bg-white/5 rounded-xl transition-colors text-[13px]"
            >
              👁️ View PDF
            </a>
            <a
              href={resumePdf}
              download="Resume_Mern.pdf"
              className="flex items-center px-4 py-2.5 text-white hover:bg-white/5 rounded-xl transition-colors text-[13px]"
            >
              ⬇️ Download
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Individual Nav Link ───────────────────────────────────── */
const NavLinkItem = ({ nav, active, onLinkClick }) => (
  <li className="relative group">
    <Link
      to={nav.path}
      onClick={() => onLinkClick(nav.title)}
      className={`${active === nav.title ? "text-white" : "text-secondary"} font-bold text-[13px] uppercase tracking-[0.1em] hover:text-white transition-colors duration-300`}
    >
      {nav.title}
    </Link>
    <div
      className={`absolute -bottom-1 left-0 h-[2px] bg-[#915EFF] transition-all duration-500 ${active === nav.title ? "w-full" : "w-0 group-hover:w-1/2"}`}
    />
  </li>
);

/* ── Mobile Navigation Menu ───────────────────────────────── */
const MobileMenu = ({
  toggle,
  setToggle,
  active,
  navLinks,
  onNavClick,
  socialLinks,
}) => {
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [toggle]);

  return (
    <AnimatePresence>
      {toggle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000000] lg:hidden"
        >
          {/* Opaque Black Backdrop - Absolutely solid to hide page content */}
          <div
            className="absolute inset-0 bg-[#050816] z-0"
            style={{ opacity: 0.98 }}
            onClick={() => setToggle(false)}
          />

          {/* SOLID Sidebar Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-[80%] max-w-[320px] h-full flex flex-col p-10 border-l border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] pt-28 z-10 overflow-hidden"
            style={{ backgroundColor: "rgba(5, 8, 22, 0.95)", backdropFilter: "blur(40px)" }}
          >
            {/* Ambient glow in sidebar */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#915EFF]/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#56ccf2]/10 rounded-full blur-[80px]" />

            <button
              onClick={() => setToggle(false)}
              className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all shadow-xl"
            >
              <HiX size={26} />
            </button>

            <ul className="flex flex-col gap-8 relative z-10">
              {navLinks.map((nav, index) => (
                <motion.li
                  key={nav.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.08, type: "spring" }}
                >
                  <Link
                    to={nav.path}
                    onClick={() => onNavClick(nav.title)}
                    className={`${active === nav.title ? "text-gradient" : "text-white/60"} text-[20px] font-black uppercase tracking-[0.2em] hover:text-white transition-all flex items-center gap-4 group`}
                  >
                    <span className={`w-2 h-2 rounded-full bg-[#915EFF] transition-all duration-300 ${active === nav.title ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-50"}`} />
                    {nav.title}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-10 border-t border-white/10"
              >
                <ResumeButton isMobile={true} />
              </motion.li>
            </ul>

            <div className="mt-auto flex flex-col gap-10 pb-8 relative z-10">
              <div className="flex gap-5 justify-center sm:justify-start">
                {socialLinks.map((link) => (
                  <SocialIcon key={link.title} {...link} />
                ))}
              </div>
              <Link
                to="/admin"
                onClick={() => setToggle(false)}
                className="text-[10px] uppercase tracking-[0.4em] text-white/20 hover:text-[#915EFF] transition-all font-black text-center sm:text-left"
              >
                🔐 CORE SYSTEM ACCESS
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const { data } = usePortfolio();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { id: "about", title: "About", path: "/about" },
    { id: "portfolio", title: "Work", path: "/portfolio" },
    { id: "experience", title: "Experience", path: "/experience" },
    { id: "services", title: "Skills", path: "/services" },
    { id: "contact", title: "Contact", path: "/contact" },
  ];

  const contactInfo = data?.settings?.contact ?? {};
  const SOCIAL_LINKS = useMemo(
    () => [
      {
        title: "GitHub",
        icon: FaGithub,
        url: contactInfo.github || "https://github.com/qurban7860",
      },
      {
        title: "LinkedIn",
        icon: FaLinkedinIn,
        url: contactInfo.linkedin || "https://www.linkedin.com/in/qurban015",
      },
    ],
    [contactInfo],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeNav = navLinks.find((nav) => nav.path === location.pathname);
    if (activeNav) {
      setActive(activeNav.title);
    } else if (location.pathname === "/") {
      setActive("");
    }
  }, [location.pathname]);

  return (
    <>
      <nav 
        className={`w-full h-20 fixed top-0 z-[1000] transition-all duration-500 flex items-center
                    ${isScrolled ? "nav-glass py-2" : "bg-transparent py-4"}`}
      >
        <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`} />

        <div
          className={`${styles.paddingX} h-full max-w-7xl mx-auto flex justify-between items-center w-full`}
        >
          <Link
            to="/"
            className="flex items-center gap-4 group"
            onClick={() => {
              window.scrollTo(0, 0);
              setActive("");
            }}
          >
            <div className="w-11 h-11 rounded-2xl glass-badge-hero flex items-center justify-center border-white/10 group-hover:border-[#915EFF]/50 group-hover:rotate-[10deg] transition-all duration-500 shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src={logo} alt="logo" className="w-6 h-6 object-contain relative z-10 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-[16px] tracking-tight leading-none group-hover:text-gradient transition-all duration-300">
                QURBAN
              </span>
              <span className="text-secondary text-[10px] font-bold tracking-[0.3em] uppercase mt-1.5 opacity-60">
                Engineer
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            <ul className="flex items-center gap-8">
              {navLinks.map((nav) => (
                <NavLinkItem
                  key={nav.title}
                  nav={nav}
                  active={active}
                  onLinkClick={(t) => setActive(t)}
                />
              ))}
            </ul>
            <div className="flex items-center gap-6 border-l border-white/10 pl-8 h-8">
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <SocialIcon key={link.title} {...link} />
                ))}
              </div>
              <ResumeButton />
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setToggle(true)}
              className="w-10 h-10 rounded-xl glass-badge-hero flex items-center justify-center border-white/10 text-white/70 hover:text-white transition-colors"
              aria-label="Open Menu"
            >
              <HiMenuAlt3 size={24} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        toggle={toggle}
        setToggle={setToggle}
        active={active}
        navLinks={navLinks}
        onNavClick={(t) => {
          setActive(t);
          setToggle(false);
        }}
        socialLinks={SOCIAL_LINKS}
      />
    </>
  );
};

export default Navbar;
