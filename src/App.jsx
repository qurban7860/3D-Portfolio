import { BrowserRouter, Routes, Route, useLocation, useParams } from "react-router-dom"; 
import { useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";
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

import { Toaster } from "react-hot-toast";

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [hash]);

  return null;
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const TenantResolver = ({ children }) => {
  const { username } = useParams();
  return <PortfolioProvider username={username}>{children}</PortfolioProvider>;
};

TenantResolver.propTypes = {
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
              <PortfolioProvider>
                <PageWrapper><DashboardPage /></PageWrapper>
              </PortfolioProvider>
            </ProtectedRoute>
          }
        />

        {/* Dynamic Tenant Routes */}
        <Route
          path="/:username"
          element={<TenantResolver><PageWrapper><HomePage /></PageWrapper></TenantResolver>}
        />
        <Route
          path="/:username/about"
          element={<TenantResolver><PageWrapper><AboutPage /></PageWrapper></TenantResolver>}
        />
        <Route
          path="/:username/portfolio"
          element={<TenantResolver><PageWrapper><PortfolioPage /></PageWrapper></TenantResolver>}
        />
        <Route
          path="/:username/experience"
          element={<TenantResolver><PageWrapper><ExperiencePage /></PageWrapper></TenantResolver>}
        />
        <Route
          path="/:username/services"
          element={<TenantResolver><PageWrapper><ServicesPage /></PageWrapper></TenantResolver>}
        />
        <Route
          path="/:username/contact"
          element={<TenantResolver><PageWrapper><ContactPage /></PageWrapper></TenantResolver>}
        />

        {/* Global/Root Routes */}
        <Route path="/" element={<TenantResolver><PageWrapper><HomePage /></PageWrapper></TenantResolver>} />
        <Route path="/about" element={<TenantResolver><PageWrapper><AboutPage /></PageWrapper></TenantResolver>} />
        <Route path="/portfolio" element={<TenantResolver><PageWrapper><PortfolioPage /></PageWrapper></TenantResolver>} />
        <Route path="/experience" element={<TenantResolver><PageWrapper><ExperiencePage /></PageWrapper></TenantResolver>} />
        <Route path="/services" element={<TenantResolver><PageWrapper><ServicesPage /></PageWrapper></TenantResolver>} />
        <Route path="/contact" element={<TenantResolver><PageWrapper><ContactPage /></PageWrapper></TenantResolver>} />

        {/* 404 Fallback */}
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToHash />
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
                primary: "#915EFF",
                secondary: "#fff",
              },
            },
          }}
        />
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;