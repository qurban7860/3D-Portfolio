/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { usePortfolio } from "../context/PortfolioContext";
import { menu, close, github, phone, linkedin } from "../assets";
import resumePdf from "../assets/resume/Resume_Mern.pdf";
import logo from "/logo.svg";

const ContactCard = ({ title, icon, link, url }) => {
  const href = link ?? url;
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" title={title} className="group">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex justify-center items-center transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:bg-[#915EFF]/10 group-hover:border-[#915EFF]/40 group-hover:shadow-[0_0_20px_rgba(145,94,255,0.3)]">
        <img src={icon} alt={title} className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-full opacity-70 group-hover:opacity-100 transition-opacity" />
      </div>
    </a>
  ) : null;
};

const ResumeButton = ({ isMobile = false }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div 
      className="relative" 
      onMouseEnter={() => !isMobile && setShowOptions(true)} 
      onMouseLeave={() => !isMobile && setShowOptions(false)}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => isMobile ? setShowOptions(!showOptions) : window.open(resumePdf, "_blank")}
        className={`flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-[#915EFF]/15 border border-[#915EFF]/40 text-white font-semibold rounded-lg hover:bg-[#915EFF]/25 hover:border-[#915EFF]/80 hover:shadow-[0_0_20px_rgba(145,94,255,0.3)] transition-all duration-300 text-[13px] ${isMobile ? 'w-full justify-center' : ''}`}
      >
        <span className="text-[14px]">📄</span>
        <span>Resume</span>
        <span className={`text-[10px] opacity-60 transition-transform duration-300 ${showOptions ? 'rotate-180' : ''}`}>▼</span>
      </motion.button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`${isMobile ? 'relative mt-2 w-full' : 'absolute top-full right-0 mt-2 w-40'} glass-dark rounded-xl overflow-hidden shadow-2xl z-[60] border border-white/10`}
          >
            <a 
              href={resumePdf} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#915EFF]/20 transition-colors text-[13px]"
            >
              👁️ View PDF
            </a>
            <a 
              href={resumePdf} 
              download="Resume_Mern.pdf"
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#915EFF]/20 transition-colors text-[13px] border-t border-white/5"
            >
              ⬇️ Download
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavLinkItem = ({ nav, active, onLinkClick }) => {
  
  return (
    <li
      className={`${
        active === nav.title ? "text-white border-b-2 border-[#915EFF] pb-1" : "text-secondary"
      } hover:text-white font-medium cursor-pointer transition-all duration-300`}
      style={{ fontSize: "clamp(13px, 1.1vw, 18px)" }}
    >
      {nav.path ? (
        <Link 
          to={nav.path} 
          onClick={() => {
            onLinkClick(nav.title);
            window.scrollTo(0, 0);
          }}
        >
          {nav.title}
        </Link>
      ) : (
        <a href={`#${nav.id}`} onClick={() => onLinkClick(nav.title)}>{nav.title}</a>
      )}
    </li>
  );
};

const MobileMenu = ({ toggle, setToggle, active, navLinks: links, onNavClick, contactLinks }) => {
  return (
  <div
    className={`${!toggle ? "hidden" : "flex"} p-6 black-gradient absolute top-0 right-0 w-[260px] min-h-screen max-h-screen overflow-y-auto z-50 flex-col shadow-2xl transition-all duration-300 border-l border-white/10`}
  >
    <div className="flex justify-end w-full">
      <img
        src={close}
        alt="close"
        className="w-5 h-5 object-contain cursor-pointer hover:scale-110 transition-transform"
        onClick={() => setToggle(false)}
      />
    </div>

    <ul className="list-none flex flex-col gap-6 mt-8">
      {links.map((nav) => (
        <li
          key={nav.id || nav.title}
          className={`font-poppins font-medium cursor-pointer text-[18px] ${
            active === nav.title ? "text-[#915EFF]" : "text-secondary"
          }`}
        >
          {nav.path ? (
            <Link 
              to={nav.path} 
              onClick={() => {
                onNavClick(nav.title);
                window.scrollTo(0, 0);
              }}
            >
              {nav.title}
            </Link>
          ) : (
            <a href={`#${nav.id}`} onClick={() => onNavClick(nav.title)}>{nav.title}</a>
          )}
        </li>
      ))}
      <li className="pt-4 border-t border-tertiary">
        <ResumeButton isMobile={true} />
      </li>
    </ul>

    <div className="mt-auto flex flex-col gap-4 border-t border-tertiary pt-6 pb-4">
      <div className="flex gap-4">
        {contactLinks.map((link) => (
          <ContactCard key={link.title} {...link} />
        ))}
      </div>
      <Link 
        to="/admin" 
        onClick={() => setToggle(false)}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[11px] text-secondary hover:text-white hover:bg-white/10 hover:border-[#915EFF]/40 transition-all duration-300 uppercase tracking-[0.2em] font-bold mt-4"
      >
        🔐 Admin Access
      </Link>
    </div>
  </div>
  );
};

const Navbar = () => {
  const { data } = usePortfolio();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const SECTION_OFFSET = 200;

  const navLinks = [
    { id: "about", title: "About", path: "/about" },
    { id: "portfolio", title: "Work", path: "/portfolio" },
    { id: "experience", title: "Experience", path: "/experience" },
    { id: "services", title: "Skills", path: "/services" },
    { id: "contact", title: "Contact", path: "/contact" },
  ];

  const contactInfo = data?.settings?.contact ?? {};
  const CONTACT_LINKS = useMemo(
    () => [
      {
        title: "GitHub",
        icon: github,
        url: contactInfo.github || "https://github.com/qurban7860",
      },
      {
        title: "Phone",
        icon: phone,
        url: contactInfo.phone ? `tel:${contactInfo.phone}` : "tel:+923085651015",
      },
      {
        title: "LinkedIn",
        icon: linkedin,
        url: contactInfo.linkedin || "https://www.linkedin.com/in/qurban015",
      },
    ],
    [contactInfo.github, contactInfo.phone, contactInfo.linkedin]
  );

  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeNav = navLinks.find(nav => nav.path === currentPath);
    if (activeNav) {
      setActive(activeNav.title);
    }
  }, [navLinks, location]);

  useEffect(() => {
    const handleScroll = () => {
      // Only handle scroll if we are on the home page
      if (location.pathname !== "/") return;

      navLinks.forEach((nav) => {
        const section = document.getElementById(nav.id);
        if (section) {
          const sectionTop = section.offsetTop - SECTION_OFFSET;
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.offsetHeight) {
            setActive(nav.title);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks, location]);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-50 nav-glass`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        
        <div className="hidden lg:flex gap-3 items-center">
          {CONTACT_LINKS.map((link) => (
            <ContactCard key={link.title} {...link} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 outline-none hover:opacity-80 transition-opacity" onClick={() => { window.scrollTo(0, 0); setActive(""); }}>
            <img src={logo} alt="logo" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
            <p className="text-white font-bold flex items-center" style={{ fontSize: "clamp(14px, 1.6vw, 20px)" }}>
              Software Engineer
            </p>
          </Link>
          <Link 
            to="/admin" 
            className="flex items-center gap-1 opacity-20 hover:opacity-100 transition-all duration-300 p-1 ml-2 border border-white/10 rounded px-2 hover:bg-[#915EFF]/10" 
            title="Admin Dashboard"
          >
            <span className="text-[10px]">🔐 Admin</span>
          </Link>
        </div>

        <ul 
          className="list-none hidden md:flex flex-row items-center" 
          style={{ gap: "clamp(10px, 2.5vw, 40px)" }}
        >
          {navLinks.map((nav) => (
            <NavLinkItem 
                key={nav.id} 
                nav={nav} 
                active={active} 
                onLinkClick={(t) => { setActive(t); setToggle(false); }} 
            />
          ))}
          <li className="ml-2">
            <ResumeButton />
          </li>
        </ul>

        <div className="md:hidden flex items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-6 h-6 object-contain cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setToggle(!toggle)}
          />
        </div>

        <MobileMenu
          toggle={toggle}
          setToggle={setToggle}
          active={active}
          navLinks={navLinks}
          onNavClick={(t) => { setActive(t); setToggle(false); }}
          contactLinks={CONTACT_LINKS}
        />
      </div>
    </nav>
  );
};

export default Navbar;