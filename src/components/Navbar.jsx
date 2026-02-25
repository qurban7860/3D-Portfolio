/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { navLinks } from "../Home";
import { menu, close, github, phone, linkedin } from "../assets";
import resumePdf from "../assets/resume/Resume_Mern.pdf";
import logo from "/logo.svg";

const ContactCard = ({ title, icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" title={title} className="group">
    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-tertiary rounded-full flex justify-center items-center hover:bg-opacity-80 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer hover:shadow-lg hover:shadow-[#915EFF]/50">
      <img src={icon} alt={title} className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-full" />
    </div>
  </a>
);

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
        className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#915EFF] to-[#56ccf2] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#915EFF]/50 transition-all duration-300 text-[13px] ${isMobile ? 'w-full justify-center' : ''}`}
      >
        <span>📄</span>
        <span>Resume</span>
        <span className={`text-[10px] transition-transform ${showOptions ? 'rotate-180' : ''}`}>▼</span>
      </motion.button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`${isMobile ? 'relative mt-2 w-full' : 'absolute top-full right-0 mt-2 w-40'} bg-tertiary border border-white/10 rounded-lg overflow-hidden shadow-xl z-[60]`}
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

const NavLinkItem = ({ nav, active, onLinkClick }) => (
  <li
    className={`${
      active === nav.title ? "text-white border-b-2 border-[#915EFF] pb-1" : "text-secondary"
    } hover:text-white font-medium cursor-pointer transition-all duration-300`}
    style={{ fontSize: "clamp(13px, 1.1vw, 18px)" }}
    onClick={() => onLinkClick(nav.title)}
  >
    <a href={`#${nav.id}`}>{nav.title}</a>
  </li>
);

const MobileMenu = ({ toggle, setToggle, active, navLinks: links, onNavClick, contactLinks }) => (
  <div
    className={`${!toggle ? "hidden" : "flex"} p-6 black-gradient absolute top-0 right-0 w-[260px] h-screen z-50 flex-col shadow-2xl transition-all duration-300 border-l border-white/10`}
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
          key={nav.id}
          className={`font-poppins font-medium cursor-pointer text-[18px] ${
            active === nav.title ? "text-[#915EFF]" : "text-secondary"
          }`}
          onClick={() => onNavClick(nav.title)}
        >
          <a href={`#${nav.id}`}>{nav.title}</a>
        </li>
      ))}
      <li className="pt-4 border-t border-tertiary">
        <ResumeButton isMobile={true} />
      </li>
    </ul>

    <div className="mt-auto flex gap-4 border-t border-tertiary pt-6 pb-4">
      {contactLinks.map((link) => (
        <ContactCard key={link.title} {...link} />
      ))}
    </div>
  </div>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const SECTION_OFFSET = 200;

  const CONTACT_LINKS = [
    { title: "GitHub", icon: github, url: "https://github.com/qurban7860" },
    { title: "Phone", icon: phone, url: "tel:+923085651015" },
    { title: "LinkedIn", icon: linkedin, url: "https://www.linkedin.com/in/qurban015" },
  ];

  useEffect(() => {
    const handleScroll = () => {
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
  }, []);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-50 bg-primary shadow-md border-b border-white/5 backdrop-blur-sm bg-opacity-95`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        
        <div className="hidden lg:flex gap-3 items-center">
          {CONTACT_LINKS.map((link) => (
            <ContactCard key={link.title} {...link} />
          ))}
        </div>

        <Link to="/" className="flex items-center gap-2 outline-none hover:opacity-80 transition-opacity" onClick={() => { window.scrollTo(0, 0); setActive(""); }}>
          <img src={logo} alt="logo" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          <p className="text-white font-bold flex items-center" style={{ fontSize: "clamp(14px, 1.6vw, 20px)" }}>
            Software Engineer
          </p>
        </Link>

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