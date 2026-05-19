import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { usePortfolio } from './PortfolioContext';

const ThemeContext = createContext();

// Helper to convert hex to RGB numbers for Tailwind opacity support
const hexToRgb = (hex) => {
  if (!hex) return "255 255 255";
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : "255 255 255";
};

export const DEFAULT_THEME_CONFIG = {
  colors: {
    primary:       "#050816",
    secondary:     "#aaa6c3",
    tertiary:      "#151030",
    background:    "#050816",
    accent:        "#915EFF",
    glass:         "rgba(255, 255, 255, 0.03)",
    glassBorder:   "rgba(255, 255, 255, 0.1)",
    textPrimary:   "#ffffff",
    textSecondary: "#aaa6c3",
    cardBg:        "#151030",
  },
  glass: {
    blur:          "24px",
    opacity:       "0.03",
    borderOpacity: "0.1",
  },
  effects: {
    glowColor:     "rgba(0, 0, 0, 0)",
    glowIntensity: "0",
    shimmer:       false,
  },
};

// ── CSS Variable Injection Helper ─────────────────────────────────────────────
function applyCssVars(config) {
  if (!config) return;
  const { colors, glass, effects } = config;
  const root = document.documentElement;

  // Colors (Standard)
  root.style.setProperty('--primary',       colors.primary);
  root.style.setProperty('--secondary',     colors.secondary);
  root.style.setProperty('--tertiary',      colors.tertiary);
  root.style.setProperty('--background',    colors.background);
  root.style.setProperty('--accent',        colors.accent);
  root.style.setProperty('--glass-bg',      colors.glass);
  root.style.setProperty('--glass-border',  colors.glassBorder);
  root.style.setProperty('--text-primary',  colors.textPrimary);
  root.style.setProperty('--text-secondary',colors.textSecondary);
  root.style.setProperty('--card-bg',       colors.cardBg);
  
  // Colors (RGB for Tailwind Opacity Support)
  root.style.setProperty('--primary-rgb',       hexToRgb(colors.primary));
  root.style.setProperty('--secondary-rgb',     hexToRgb(colors.secondary));
  root.style.setProperty('--tertiary-rgb',      hexToRgb(colors.tertiary));
  root.style.setProperty('--accent-rgb',        hexToRgb(colors.accent));
  root.style.setProperty('--text-primary-rgb',  hexToRgb(colors.textPrimary));
  root.style.setProperty('--text-secondary-rgb',hexToRgb(colors.textSecondary));
  
  // Glass & Effects
  root.style.setProperty('--glass-blur',    glass.blur);
  root.style.setProperty('--glow-color',    effects.glowColor);
  root.style.setProperty('--glow-intensity',effects.glowIntensity);

  // Apply to body for global consistency
  document.body.style.backgroundColor = colors.background;
}

// Immediate application to avoid FOUC
let initialTheme = {
  id: 'default',
  name: "Midnight Violet",
  config: DEFAULT_THEME_CONFIG
};

try {
  const stored = localStorage.getItem('selected_theme');
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed && parsed.config) {
      initialTheme = parsed;
    }
  }
} catch (e) {
  console.error("FOUC theme restoration failed:", e);
}

applyCssVars(initialTheme.config);

export const ThemeProvider = ({ children }) => {
  const { data } = usePortfolio();
  const [activeTheme, setActiveThemeState] = useState(() => initialTheme);
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstMount = useRef(true);

  const setActiveTheme = useCallback((theme, forceOverride = true) => {
    if (!theme) return;
    
    setActiveThemeState(prev => {
      let next;
      if (theme.colors && theme.glass) {
        next = { ...prev, config: theme };
      } else {
        next = {
          ...prev,
          ...theme,
          config: theme.config || prev.config || DEFAULT_THEME_CONFIG
        };
      }
      applyCssVars(next.config); 
      try {
        localStorage.setItem('selected_theme', JSON.stringify(next));
        if (forceOverride) {
          localStorage.setItem('selected_theme_override', 'true');
        } else {
          localStorage.removeItem('selected_theme_override');
        }
      } catch (err) {
        console.error("Failed to write theme to localStorage:", err);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (data?.theme?.config) {
      const hasOverride = localStorage.getItem('selected_theme_override') === 'true';
      if (hasOverride) {
        isFirstMount.current = false;
        return;
      }

      if (!isFirstMount.current) setIsTransitioning(true);
      
      setActiveThemeState(data.theme);
      applyCssVars(data.theme.config);
      try {
        localStorage.setItem('selected_theme', JSON.stringify(data.theme));
      } catch (err) {
        console.error("Failed to write synced theme to localStorage:", err);
      }
      
      if (!isFirstMount.current) {
        setTimeout(() => setIsTransitioning(false), 800);
      }
      isFirstMount.current = false;
    }
  }, [data?.theme]);

  const themeAccent = activeTheme?.config?.colors?.accent || "#915EFF";
  const themeSecondary = activeTheme?.config?.colors?.secondary || "#aaa6c3";
  const themePrimary = activeTheme?.config?.colors?.primary || "#050816";

  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" fill="none">
    <defs>
      <linearGradient id="logoBrandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${themeAccent}" />
        <stop offset="100%" stop-color="${themeSecondary}" />
      </linearGradient>
    </defs>
    <circle cx="96" cy="96" r="92" fill="url(#logoBrandGradient)" opacity="0.1"/>
    <g transform="translate(96, 96)">
      <circle cx="0" cy="0" r="50" fill="none" stroke="url(#logoBrandGradient)" stroke-width="3"/>
      <g fill="url(#logoBrandGradient)">
        <path d="M -15 -25 Q -30 -25 -30 -5 Q -30 15 -15 25 Q 0 35 15 25 Q 30 15 30 -5 Q 30 -25 15 -25 Q 0 -35 -15 -25 M -18 -20 Q -25 -20 -25 -5 Q -25 12 -10 20 Q 5 28 20 20 Q 25 12 25 -5 Q 25 -20 18 -20 Q 3 -28 -18 -20" fill-rule="evenodd"/>
        <path d="M 8 15 Q 15 20 25 35 L 20 38 Q 10 24 5 18 Z"/>
      </g>
    </g>
  </svg>`;
  const faviconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(faviconSvg)}`;

  const value = useMemo(() => ({
    activeTheme,
    setActiveTheme,
    isTransitioning,
    defaultThemeConfig: DEFAULT_THEME_CONFIG
  }), [activeTheme, setActiveTheme, isTransitioning]);

  return (
    <ThemeContext.Provider value={value}>
      <Helmet>
        <meta name="theme-color" content={themePrimary} />
        <link rel="icon" type="image/svg+xml" href={faviconUrl} />
      </Helmet>
      <div className={`theme-provider-container transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-40 blur-sm' : 'opacity-100'}`} style={{ filter: isTransitioning ? undefined : 'none' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
