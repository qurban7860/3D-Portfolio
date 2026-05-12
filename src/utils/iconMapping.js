import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as SiIcons from "react-icons/si";
import * as HiIcons from "react-icons/hi";

const iconMap = {
  ...FaIcons,
  ...MdIcons,
  ...SiIcons,
  ...HiIcons,
};

export const getIcon = (iconName) => {
  if (!iconName) return null;
  
  if (iconMap[iconName]) return iconMap[iconName];
  
  const found = Object.keys(iconMap).find(
    (key) => key.toLowerCase() === iconName.toLowerCase()
  );
  
  return found ? iconMap[found] : null;
};
