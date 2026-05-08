import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; 
import { useEffect } from "react";
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

import { Toaster } from "react-hot-toast";

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300); // Wait for page transition
      }
    }
  }, [hash]);

  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <PortfolioProvider>
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
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  );
};

export default App;