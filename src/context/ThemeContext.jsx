import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
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
applyCssVars(DEFAULT_THEME_CONFIG);

export const ThemeProvider = ({ children }) => {
  const { data } = usePortfolio();
  const [activeTheme, setActiveThemeState] = useState({
    id: 'default',
    name: "Midnight Violet",
    config: DEFAULT_THEME_CONFIG
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstMount = useRef(true);

  const setActiveTheme = useCallback((theme) => {
    if (!theme) return;
    
    setActiveThemeState(prev => {
      if (theme.colors && theme.glass) {
        const next = { ...prev, config: theme };
        applyCssVars(next.config); 
        return next;
      }
      
      const next = {
        ...prev,
        ...theme,
        config: theme.config || prev.config || DEFAULT_THEME_CONFIG
      };
      applyCssVars(next.config); 
      return next;
    });
  }, []);
  useEffect(() => {
    if (data?.theme?.config) {
      if (!isFirstMount.current) setIsTransitioning(true);
      
      setActiveThemeState(data.theme);
      applyCssVars(data.theme.config);
      
      if (!isFirstMount.current) {
        setTimeout(() => setIsTransitioning(false), 800);
      }
      isFirstMount.current = false;
    }
  }, [data?.theme]);

  const value = useMemo(() => ({
    activeTheme,
    setActiveTheme,
    isTransitioning,
    defaultThemeConfig: DEFAULT_THEME_CONFIG
  }), [activeTheme, setActiveTheme, isTransitioning]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-provider-container transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-40 blur-sm' : 'opacity-100 blur-0'}`}>
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
