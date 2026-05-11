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
      className="relative" 
      onMouseEnter={() => !isMobile && setShowOptions(true)} 
      onMouseLeave={() => !isMobile && setShowOptions(false)}
    >
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => isMobile ? setShowOptions(!showOptions) : window.open(resumePdf, "_blank")}
        className={`flex items-center gap-2 px-5 py-2 glass-badge-hero border border-white/10 text-white font-bold rounded-full hover:border-[#915EFF]/50 hover:shadow-[0_0_20px_rgba(145,94,255,0.2)] transition-all duration-300 text-[12px] uppercase tracking-wider ${isMobile ? 'w-full justify-center' : ''}`}
      >
        <span>Resume</span>
        <span className={`text-[10px] opacity-40 transition-transform duration-300 ${showOptions ? 'rotate-180' : ''}`}>▼</span>
      </motion.button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`${isMobile ? 'relative mt-2 w-full' : 'absolute top-full right-0 mt-3 w-40'} glass-dark rounded-2xl overflow-hidden shadow-2xl z-[60] border border-white/10 p-1`}
          >
            <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2.5 text-white hover:bg-white/5 rounded-xl transition-colors text-[13px]">
              👁️ View PDF
            </a>
            <a href={resumePdf} download="Resume_Mern.pdf" className="flex items-center px-4 py-2.5 text-white hover:bg-white/5 rounded-xl transition-colors text-[13px]">
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
      to={nav.path || `#${nav.id}`} 
      onClick={() => onLinkClick(nav.title)}
      className={`${active === nav.title ? "text-white" : "text-secondary"} font-bold text-[13px] uppercase tracking-[0.1em] hover:text-white transition-colors duration-300`}
    >
      {nav.title}
    </Link>
    <div className={`absolute -bottom-1 left-0 h-[2px] bg-[#915EFF] transition-all duration-500 ${active === nav.title ? "w-full" : "w-0 group-hover:w-1/2"}`} />
  </li>
);

/* ── Mobile Navigation Menu ───────────────────────────────── */
const MobileMenu = ({ toggle, setToggle, active, navLinks, onNavClick, socialLinks }) => (
  <AnimatePresence>
    {toggle && (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="fixed inset-0 z-50 lg:hidden"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setToggle(false)} />
        <div className="absolute top-0 right-0 w-[280px] h-full glass-dark border-l border-white/10 flex flex-col p-8 pt-20">
           <button onClick={() => setToggle(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-transform duration-300">
             <HiX size={28} />
           </button>
           
           <ul className="flex flex-col gap-8">
              {navLinks.map((nav) => (
                <li key={nav.title} className="text-xl font-black">
                  <Link 
                    to={nav.path} 
                    onClick={() => onNavClick(nav.title)}
                    className={active === nav.title ? "text-[#915EFF]" : "text-white"}
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-white/5">
                <ResumeButton isMobile={true} />
              </li>
           </ul>

           <div className="mt-auto flex flex-col gap-6">
              <div className="flex gap-4">
                 {socialLinks.map((link) => (
                   <SocialIcon key={link.title} {...link} />
                 ))}
              </div>
              <Link to="/admin" onClick={() => setToggle(false)} className="text-[11px] uppercase tracking-widest text-white/30 hover:text-[#915EFF] transition-colors">
                🔐 System Access
              </Link>
           </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = () => {
  const { data } = usePortfolio();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  const navLinks = [
    { id: "about", title: "About", path: "/about" },
    { id: "portfolio", title: "Work", path: "/portfolio" },
    { id: "experience", title: "Experience", path: "/experience" },
    { id: "services", title: "Skills", path: "/services" },
    { id: "contact", title: "Contact", path: "/contact" },
  ];

  const contactInfo = data?.settings?.contact ?? {};
  const SOCIAL_LINKS = useMemo(() => [
    { title: "GitHub", icon: FaGithub, url: contactInfo.github || "https://github.com/qurban7860" },
    { title: "LinkedIn", icon: FaLinkedinIn, url: contactInfo.linkedin || "https://www.linkedin.com/in/qurban015" },
  ], [contactInfo]);

  useEffect(() => {
    const activeNav = navLinks.find(nav => nav.path === location.pathname);
    if (activeNav) setActive(activeNav.title);
  }, [location.pathname]);

  return (
    <nav className="w-full h-16 fixed top-0 z-[100] transition-all duration-500 nav-glass">
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className={`${styles.paddingX} h-full max-w-7xl mx-auto flex justify-between items-center`}>
        
        {/* ── Branding ── */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group"
          onClick={() => { window.scrollTo(0, 0); setActive(""); }}
        >
          <div className="w-10 h-10 rounded-xl glass-badge-hero flex items-center justify-center border-white/10 group-hover:border-[#915EFF]/50 transition-all duration-500">
            <img src={logo} alt="logo" className="w-6 h-6 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-[15px] tracking-tight leading-none">QURBAN</span>
            <span className="text-secondary text-[10px] font-bold tracking-[0.2em] uppercase mt-1">Engineer</span>
          </div>
        </Link>

        {/* ── Desktop Navigation ── */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex items-center gap-8">
            {navLinks.map((nav) => (
              <NavLinkItem key={nav.title} nav={nav} active={active} onLinkClick={(t) => setActive(t)} />
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

        {/* ── Mobile Trigger ── */}
        <div className="lg:hidden flex items-center">
          <button 
            onClick={() => setToggle(true)}
            className="w-10 h-10 rounded-xl glass-badge-hero flex items-center justify-center border-white/10 text-white/70 hover:text-white transition-colors"
          >
            <HiMenuAlt3 size={24} />
          </button>
        </div>

        <MobileMenu
          toggle={toggle}
          setToggle={setToggle}
          active={active}
          navLinks={navLinks}
          onNavClick={(t) => { setActive(t); setToggle(false); }}
          socialLinks={SOCIAL_LINKS}
        />
      </div>
    </nav>
  );
};

export default Navbar;