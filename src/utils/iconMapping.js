import React, { useState, useEffect } from "react";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import PropTypes from "prop-types";

import { FaEnvelope, FaGlobe, FaPhone } from "react-icons/fa";
const STATIC_MAP = {
  email: FaEnvelope,
  globe: FaGlobe,
  phone: FaPhone,
};

const getNormalizedSlug = (name) => {
  if (!name) return "";
  let clean = name.replace(/^(si|fa|hi|md|tb|fi|go|bs|ri|io|bi|cg|di|gr|im|ti|wi|fc|lu)/i, "");
  const lower = clean.toLowerCase();
  
  const aliases = {
    node: "nodedotjs",
    express: "express",
    postgres: "postgresql",
    tailwind: "tailwindcss",
    three: "threedotjs",
    gcp: "googlecloud",
    css: "css3",
    html: "html5",
    js: "javascript",
    ts: "typescript",
    next: "nextdotjs",
    aws: "amazonwebservices",
  };
  return aliases[lower] || lower;
};

// Lazy load dynamic react-icons packs
const loadPack = (prefix) => {
  const p = prefix.toLowerCase();
  switch (p) {
    case "fa": return import("react-icons/fa");
    case "md": return import("react-icons/md");
    case "hi": return import("react-icons/hi");
    case "si": return import("react-icons/si");
    case "tb": return import("react-icons/tb");
    case "fi": return import("react-icons/fi");
    case "lu": return import("react-icons/lu");
    default:
      return Promise.reject(new Error(`Pack not supported: ${prefix}`));
  }
};

const DefaultFallback = (props) => React.createElement(HiOutlineBadgeCheck, props);

const DynamicIcon = ({ iconName, ...props }) => {
  const [IconComp, setIconComp] = useState(null);
  const [cdnFailed, setCdnFailed] = useState(false);
  const [failed, setFailed] = useState(false);

  const match = iconName.match(/^([A-Z][a-z0-9])/i);
  const prefix = match ? match[1].toLowerCase() : "fa";
  const slug = getNormalizedSlug(iconName);

  useEffect(() => {
    if (STATIC_MAP[slug]) return;

    let isMounted = true;
    setFailed(false);

    loadPack(prefix)
      .then((mod) => {
        let icon = mod[iconName];
        if (!icon) {
          const key = Object.keys(mod).find(
            (k) => k.toLowerCase() === iconName.toLowerCase() || k.toLowerCase().endsWith(slug)
          );
          if (key) icon = mod[key];
        }
        if (isMounted) {
          if (icon) setIconComp(() => icon);
          else setFailed(true);
        }
      })
      .catch(() => {
        if (isMounted) setFailed(true);
      });

    return () => { isMounted = false; };
  }, [iconName, prefix, cdnFailed]);

  if (STATIC_MAP[slug]) {
    return React.createElement(STATIC_MAP[slug], props);
  }

  const isBrand = iconName.toLowerCase().startsWith("si") || ["react", "node", "express", "mongodb", "postgres", "docker", "git", "tailwind", "three", "html", "css", "python", "figma", "vercel", "netlify", "firebase", "typescript", "javascript", "heroku", "vite", "supabase", "prisma", "mysql", "sqlite", "redis", "graphql", "django", "next", "github", "linkedin", "youtube", "twitter", "whatsapp", "instagram", "facebook", "aws"].includes(slug);

  if (isBrand && !cdnFailed) {
    return React.createElement("img", {
      src: `https://cdn.simpleicons.org/${slug}`,
      alt: iconName,
      className: "w-[1em] h-[1em] object-contain inline-block align-middle shrink-0",
      style: props.style,
      onError: () => setCdnFailed(true),
    });
  }

  if (IconComp) return React.createElement(IconComp, props);
  if (failed) return React.createElement(DefaultFallback, props);

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
