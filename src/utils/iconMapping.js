import React, { useState, useEffect } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import PropTypes from "prop-types";

// Normalized prefix mapping for lazy-loading react-icons chunks
const PACK_MAP = {
  fa: () => import("react-icons/fa"),
  md: () => import("react-icons/md"),
  hi: () => import("react-icons/hi"),
  si: () => import("react-icons/si"),
  tb: () => import("react-icons/tb"),
  fi: () => import("react-icons/fi"),
  lu: () => import("react-icons/lu"),
};

const DynamicIcon = ({ iconName, ...props }) => {
  const [IconComp, setIconComp] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!iconName) return;

    let isMounted = true;
    setFailed(false);

    // Extract prefix (e.g. "Fa" from "FaLinkedin") and base slug (e.g. "linkedin")
    const match = iconName.match(/^([a-zA-Z][a-z0-9])/);
    const prefix = match ? match[1].toLowerCase() : "fa";
    const slug = iconName.replace(/^(si|fa|hi|md|tb|fi|go|bs|ri|io|bi|cg|di|gr|im|ti|wi|fc|lu)/i, "").toLowerCase();

    const loader = PACK_MAP[prefix] || PACK_MAP.fa;

    loader()
      .then((mod) => {
        let icon = mod[iconName];
        if (!icon) {
          const key = Object.keys(mod).find(
            (k) => k.toLowerCase() === iconName.toLowerCase() || k.toLowerCase().endsWith(slug)
          );
          if (key) icon = mod[key];
        }

        if (isMounted) {
          if (icon) {
            setIconComp(() => icon);
          } else {
            setFailed(true);
          }
        }
      })
      .catch(() => {
        if (isMounted) setFailed(true);
      });

    return () => { isMounted = false; };
  }, [iconName]);

  if (IconComp) {
    return React.createElement(IconComp, props);
  }

  if (failed) {
    return React.createElement(HiOutlineExclamationCircle, {
      ...props,
      className: "text-red-500 inline-block align-middle shrink-0",
      title: `Icon "${iconName}" not found`,
      style: { ...props.style, color: "#ef4444" }
    });
  }

  return React.createElement("span", {
    className: "inline-block w-[1em] h-[1em] animate-pulse bg-white/10 rounded-full align-middle",
    style: props.style
  });
};

DynamicIcon.displayName = "DynamicIcon";
DynamicIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export const getIcon = (iconName) => {
  if (!iconName) return null;
  const Wrapper = (props) => React.createElement(DynamicIcon, { iconName, ...props });
  Wrapper.displayName = `Icon(${iconName})`;
  return Wrapper;
};

export const getIconColor = () => "";
