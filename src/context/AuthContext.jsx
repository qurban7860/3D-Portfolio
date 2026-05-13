/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import * as authApi from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("portfolio_token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem("portfolio_token");
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authApi.getCurrentUser(token);
        setUser(response.user);
      } catch (err) {
        console.error("Token verification failed", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, logout]);

  const login = useCallback(async ({ email, password }) => {
    setError(null);
    const trimmedEmail = String(email).trim().toLowerCase();
    const response = await authApi.login({ email: trimmedEmail, password });
    localStorage.setItem("portfolio_token", response.token);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  }, []);

  const register = useCallback(async ({ email, password, username }) => {
    setError(null);
    const trimmedEmail = String(email).trim().toLowerCase();
    const response = await authApi.register({ email: trimmedEmail, password, username });
    localStorage.setItem("portfolio_token", response.token);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      error,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      setError,
    }),
    [token, user, loading, error, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
