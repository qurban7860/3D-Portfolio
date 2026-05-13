import { BrowserRouter, Routes, Route, useLocation, useParams } from "react-router-dom"; 
import { useEffect } from "react";
import PropTypes from "prop-types";
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

const TenantResolver = ({ children }) => {
  const { username } = useParams();
  return <PortfolioProvider username={username}>{children}</PortfolioProvider>;
};

TenantResolver.propTypes = {
  children: PropTypes.node.isRequired,
};

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="portfolio" element={<PortfolioPage />} />
    <Route path="experience" element={<ExperiencePage />} />
    <Route path="services" element={<ServicesPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="*" element={<HomePage />} />
  </Routes>
);

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
            },
            success: {
              iconTheme: {
                primary: "#915EFF",
                secondary: "#fff",
              },
            },
          }}
        />
        <Routes>
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/register" element={<RegisterPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <PortfolioProvider>
                  <DashboardPage />
                </PortfolioProvider>
              </ProtectedRoute>
            }
          />

          <Route path="/about" element={<TenantResolver><AboutPage /></TenantResolver>} />
          <Route path="/portfolio" element={<TenantResolver><PortfolioPage /></TenantResolver>} />
          <Route path="/experience" element={<TenantResolver><ExperiencePage /></TenantResolver>} />
          <Route path="/services" element={<TenantResolver><ServicesPage /></TenantResolver>} />
          <Route path="/contact" element={<TenantResolver><ContactPage /></TenantResolver>} />

          <Route
            path="/:username/*"
            element={
              <TenantResolver>
                <MainRoutes />
              </TenantResolver>
            }
          />

          <Route
            path="/"
            element={
              <TenantResolver>
                <HomePage />
              </TenantResolver>
            }
          />
          <Route
            path="/*"
            element={
              <TenantResolver>
                <MainRoutes />
              </TenantResolver>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;