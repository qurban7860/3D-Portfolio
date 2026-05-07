import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Admin/Login";
import DashboardPage from "./pages/Admin/Dashboard";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
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