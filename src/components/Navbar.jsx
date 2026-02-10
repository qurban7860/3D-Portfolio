import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; 
import { styles } from "../styles";
import { navLinks } from "../Home";
import { menu, close, github, phone, linkedin } from "../assets";
import logo from "/logo.svg";

const ContactCard = ({ title, icon, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    title={title}
    className="group"
  >
    <div className="w-10 h-10 bg-tertiary rounded-full flex justify-center items-center hover:bg-opacity-80 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer">
      <img 
        src={icon} 
        alt={title} 
        className="w-6 h-6 object-contain rounded-full group-hover:opacity-100 opacity-90"
      />
    </div>
  </a>
);

ContactCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const NavLink = ({ nav, active, onLinkClick }) => (
  <li
    className={`${
      active === nav.title 
        ? "text-white border-b-2 border-[#915EFF] pb-1" 
        : "text-secondary"
    } hover:text-white text-[18px] font-medium cursor-pointer transition-all duration-300`}
    onClick={() => onLinkClick(nav.title)}
  >
    <a href={`#${nav.id}`}>{nav.title}</a>
  </li>
);

NavLink.propTypes = {
  nav: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func.isRequired,
};

const MobileMenu = ({ toggle, active, navLinks: links, onNavClick, contactLinks }) => (
  <div
    className={`${
      !toggle ? "hidden" : "flex"
    } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl flex-col gap-4`}
  >
    <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4 mb-3">
      {links.map((nav) => (
        <li
          key={nav.id}
          className={`font-medium cursor-pointer text-[16px] transition-colors duration-300 ${
            active === nav.title ? "text-[#915EFF]" : "text-secondary"
          }`}
          onClick={() => onNavClick(nav.title)}
        >
          <a href={`#${nav.id}`}>{nav.title}</a>
        </li>
      ))}
    </ul>
    <div className="flex gap-3 justify-end pt-3 border-t border-tertiary">
      {contactLinks.map((link) => (
        <ContactCard
          key={link.title}
          title={link.title}
          icon={link.icon}
          link={link.url}
        />
      ))}
    </div>
  </div>
);

MobileMenu.propTypes = {
  toggle: PropTypes.bool.isRequired,
  active: PropTypes.string.isRequired,
  navLinks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onNavClick: PropTypes.func.isRequired,
  contactLinks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
};

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  // const [scrolled, setScrolled] = useState(false);

  const CONTACT_LINKS = [
    { title: "GitHub", icon: github, url: "https://github.com/qurban7860" },
    { title: "Phone", icon: phone, url: "tel:+923085651015" },
    { title: "LinkedIn", icon: linkedin, url: "https://www.linkedin.com/in/qurban015" },
  ];

  // const SCROLL_THRESHOLD = 100;
  const SECTION_OFFSET = 200;

  useEffect(() => {
    const handleScroll = () => {
      // setScrolled(window.scrollY > SCROLL_THRESHOLD);

      // Detect which section is in view
      navLinks.forEach((nav) => {
        const section = document.getElementById(nav.id);
        if (section) {
          const sectionTop = section.offsetTop - SECTION_OFFSET;
          const sectionBottom = sectionTop + section.offsetHeight;
          const scrollPosition = window.scrollY;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActive(nav.title);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (title) => {
    setActive(title);
    setToggle(false);
  };

  const handleLogoClick = () => {
    setActive("");
    setToggle(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-50 bg-primary shadow-md`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <div className="hidden sm:flex gap-2 items-center">
          {CONTACT_LINKS.map((link) => (
            <ContactCard
              key={link.title}
              title={link.title}
              icon={link.icon}
              link={link.url}
            />
          ))}
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer group"
          onClick={handleLogoClick}
        >
          <img 
            src={logo} 
            alt="Qurban Logo" 
            className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <p className="text-white text-[18px] font-bold hidden sm:flex items-center">
            Qurban <span className="hidden sm:inline"> &nbsp;| Dev</span>
          </p>
        </Link>

        {/* Desktop Menu */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <NavLink
              key={nav.id}
              nav={nav}
              active={active}
              onLinkClick={handleNavClick}
            />
          ))}
        </ul>

        <div className="sm:hidden flex items-center">
          <img
            src={toggle ? close : menu}
            alt="Menu toggle"
            className="w-[28px] h-[28px] object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setToggle(!toggle)}
          />
        </div>

        <MobileMenu
          toggle={toggle}
          active={active}
          navLinks={navLinks}
          onNavClick={handleNavClick}
          contactLinks={CONTACT_LINKS}
        />
      </div>
    </nav>
  );
};

export default Navbar;

