import {
  FaGithub, FaWhatsapp, FaLinkedin, FaTwitter, FaYoutube, FaInstagram, FaGlobe, FaEnvelope, FaPhone, 
  FaBriefcase, FaGraduationCap, FaCertificate, FaAward, FaCode, FaCloud, FaServer, FaMobileAlt, 
  FaDatabase, FaTerminal, FaExternalLinkAlt, FaBook, FaRocket, FaHeart, FaStar, FaMapMarkerAlt, 
  FaUser, FaTools, FaWrench, FaPaintBrush, FaAws
} from "react-icons/fa";

import {
  SiMeta, SiReact, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiDocker, 
  SiGit, SiTailwindcss, SiThreedotjs, SiHtml5, SiCss, SiPython, SiFigma, SiGooglecloud, 
  SiVercel, SiNetlify, SiFirebase, SiTypescript, SiJavascript, SiHeroku, SiVite, SiSupabase, 
  SiPrisma, SiMysql, SiSqlite, SiRedis, SiGraphql, SiDjango, SiNextdotjs
} from "react-icons/si";

import {
  HiOutlineCog, HiOutlineUserGroup, HiOutlineLogout, HiOutlineMenuAlt2, HiOutlineChevronLeft, 
  HiOutlineChevronRight, HiOutlineExternalLink, HiOutlineDuplicate, HiOutlineColorSwatch, 
  HiOutlineX, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineOfficeBuilding, 
  HiOutlineAcademicCap, HiOutlineBadgeCheck
} from "react-icons/hi";

import {
  MdEmail, MdPhone, MdLocationOn, MdWork, MdSchool, MdBuild, MdCode, MdWeb, MdComputer, 
  MdDevices, MdStorage
} from "react-icons/md";

const iconMap = {
  // Fa
  FaGithub, FaWhatsapp, FaLinkedin, FaTwitter, FaYoutube, FaInstagram, FaGlobe, FaEnvelope, FaPhone, 
  FaBriefcase, FaGraduationCap, FaCertificate, FaAward, FaCode, FaCloud, FaServer, FaMobileAlt, 
  FaDatabase, FaTerminal, FaExternalLinkAlt, FaBook, FaRocket, FaHeart, FaStar, FaMapMarkerAlt, 
  FaUser, FaTools, FaWrench, FaPaintBrush, FaAws,
  // Si
  SiMeta, SiReact, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiDocker, 
  SiGit, SiTailwindcss, SiThreedotjs, SiHtml5, SiCss, SiPython, SiFigma, SiGooglecloud, 
  SiVercel, SiNetlify, SiFirebase, SiTypescript, SiJavascript, SiHeroku, SiVite, SiSupabase, 
  SiPrisma, SiMysql, SiSqlite, SiRedis, SiGraphql, SiDjango, SiNextdotjs,
  // Hi
  HiOutlineCog, HiOutlineUserGroup, HiOutlineLogout, HiOutlineMenuAlt2, HiOutlineChevronLeft, 
  HiOutlineChevronRight, HiOutlineExternalLink, HiOutlineDuplicate, HiOutlineColorSwatch, 
  HiOutlineX, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineOfficeBuilding, 
  HiOutlineAcademicCap, HiOutlineBadgeCheck,
  // Md
  MdEmail, MdPhone, MdLocationOn, MdWork, MdSchool, MdBuild, MdCode, MdWeb, MdComputer, 
  MdDevices, MdStorage,
  
  // Common Shorthand Mappings
  github: FaGithub,
  whatsapp: FaWhatsapp,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  youtube: FaYoutube,
  instagram: FaInstagram,
  email: FaEnvelope,
  globe: FaGlobe,
  phone: FaPhone,
  aws: FaAws,
  amazonaws: FaAws,
  css3: SiCss,
  css: SiCss,
};

export const getIcon = (iconName) => {
  if (!iconName) return null;
  
  // Direct match
  if (iconMap[iconName]) return iconMap[iconName];
  
  // Case-insensitive match
  const found = Object.keys(iconMap).find(
    (key) => key.toLowerCase() === iconName.toLowerCase()
  );
  if (found) return iconMap[found];

  // Try matching with prefixes
  const faFound = Object.keys(iconMap).find(
    (key) => key.toLowerCase() === `fa${iconName.toLowerCase()}`
  );
  if (faFound) return iconMap[faFound];

  const siFound = Object.keys(iconMap).find(
    (key) => key.toLowerCase() === `si${iconName.toLowerCase()}`
  );
  if (siFound) return iconMap[siFound];

  const hiFound = Object.keys(iconMap).find(
    (key) => key.toLowerCase() === `hi${iconName.toLowerCase()}`
  );
  if (hiFound) return iconMap[hiFound];

  const mdFound = Object.keys(iconMap).find(
    (key) => key.toLowerCase() === `md${iconName.toLowerCase()}`
  );
  if (mdFound) return iconMap[mdFound];

  return null;
};
