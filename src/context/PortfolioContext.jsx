/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { fetchPortfolio, fetchPublicPortfolio } from "../api/content";

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children, username }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshPortfolio = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = username ? await fetchPublicPortfolio(username) : await fetchPortfolio();
      setData(response);
    } catch (err) {
      console.error("Portfolio fetch error", err);
      setError(err.message || "Unable to load portfolio content.");
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    setData(null);
    setIsLoading(true);
  }, [username]);

  useEffect(() => {
    refreshPortfolio();
  }, [refreshPortfolio]);

  const value = useMemo(
    () => ({
      data,
      isLoading,
      error,
      refreshPortfolio,
      hasContent: Boolean(data),
    }),
    [data, isLoading, error, refreshPortfolio]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

PortfolioProvider.propTypes = {
  children: PropTypes.node.isRequired,
  username: PropTypes.string,
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
};
