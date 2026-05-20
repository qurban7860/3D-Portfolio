import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; 
import { useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";
import { HelmetProvider } from "react-helmet-async";
import ProtectedRoute from "./components/common/ProtectedRoute";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import ExperiencePage from "./pages/ExperiencePage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/Admin/Login";
import DashboardPage from "./pages/Admin/Dashboard";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/Admin/Register";
import NotFound from "./pages/NotFound";
import GlobalBackground from "./components/common/GlobalBackground";
import { ThemeProvider } from "./context/ThemeContext";

import { Toaster } from "react-hot-toast";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const GlobalTenantResolver = ({ children }) => {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  
  let username = undefined;
  if (pathParts[1] && !['about', 'portfolio', 'experience', 'services', 'contact', 'admin'].includes(pathParts[1])) {
    username = pathParts[1];
  }

  return <PortfolioProvider username={username}>{children}</PortfolioProvider>;
};

GlobalTenantResolver.propTypes = {
  children: PropTypes.node.isRequired,
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="/admin/register" element={<PageWrapper><RegisterPage /></PageWrapper>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <PageWrapper><DashboardPage /></PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Dynamic Tenant Routes */}
        <Route path="/:username" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/:username/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/:username/portfolio" element={<PageWrapper><PortfolioPage /></PageWrapper>} />
        <Route path="/:username/experience" element={<PageWrapper><ExperiencePage /></PageWrapper>} />
        <Route path="/:username/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
        <Route path="/:username/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />

        {/* Global/Root Routes */}
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/portfolio" element={<PageWrapper><PortfolioPage /></PageWrapper>} />
        <Route path="/experience" element={<PageWrapper><ExperiencePage /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />

        {/* 404 Fallback */}
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster 
            position="top-right" 
            toastOptions={{
              duration: 4000,
              style: {
                background: "#161130",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1rem",
                fontSize: "14px",
                fontWeight: "500",
                padding: "12px 20px",
                backdropFilter: "blur(12px)",
                zIndex: 99999,
              },
              success: {
                iconTheme: {
                  primary: "var(--accent)",
                  secondary: "#fff",
                },
              },
            }}
          />
          <GlobalTenantResolver>
            <ThemeProvider>
              <GlobalBackground />
              <AnimatedRoutes />
            </ThemeProvider>
          </GlobalTenantResolver>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
