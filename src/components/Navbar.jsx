import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; 
import { styles } from "../styles";
import { navLinks } from "../Home";
import { logo1, menu, close, github, phone, linkedin } from "../assets"; 

const ContactCard = ({ title, icon, link }) => (
  <a href={link} target='_blank' rel='noopener noreferrer'>
    <div className='w-10 h-10 bg-tertiary rounded-full flex justify-center items-center hover:bg-opacity-80 transition duration-300 ease-in-out transform hover:scale-110'>
      <img src={icon} alt={title} className='w-6 h-6 object-contain rounded-full' />
    </div>
  </a>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <div className='hidden sm:flex gap-2 items-center'>
          <ContactCard title='GitHub' icon={github} link='https://github.com/qurban7860' />
          <ContactCard title='Phone' icon={phone} link='tel:+923085651015' />
          <ContactCard title='LinkedIn' icon={linkedin} link='https://www.linkedin.com/in/qurban015' />
        </div>

        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo1} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Qurban &nbsp;
            <span className='sm:block hidden'> | 3D-Portfolio </span>
          </p>
        </Link>

        {/* Desktop Menu */}
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl flex-col gap-4`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4  mb-3'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
            {/* Contact Icons for Mobile */}
            <div className='flex gap-3 justify-end'>
              <ContactCard title='GitHub' icon={github} link='https://github.com/qurban7860' />
              <ContactCard title='Phone' icon={phone} link='tel:+923085651015' />
              <ContactCard title='LinkedIn' icon={linkedin} link='https://www.linkedin.com/in/qurban015' />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

ContactCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Navbar;
