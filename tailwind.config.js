/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        accent: "#915EFF",
        "accent-light": "#6C5CE7",
        "accent-cyan": "#56ccf2",
        "accent-teal": "#00cea8",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        elevated: "0 20px 25px -5px rgba(145, 94, 255, 0.1)",
        "glow-purple": "0 0 24px rgba(145, 94, 255, 0.4), 0 8px 32px rgba(145, 94, 255, 0.2)",
        "glow-cyan": "0 0 24px rgba(86, 204, 242, 0.4), 0 8px 32px rgba(86, 204, 242, 0.2)",
        "glass": "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/herobg.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-purple-cyan": "linear-gradient(135deg, #915EFF, #56ccf2)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-in-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};


