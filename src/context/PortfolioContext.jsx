/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
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

  const seoProps = useMemo(() => {
    const hero = data?.settings?.hero || {};
    const about = data?.settings?.about || {};
    
    const headline = hero.headline || "";
    const nameMatch = headline.match(/I['’]m\s+(.*)/i) || headline.match(/(.*)/i);
    let name = "Developer";
    if (nameMatch && nameMatch[1] && !nameMatch[1].toLowerCase().includes("developer")) {
       name = nameMatch[1].replace(/<[^>]*>?/gm, '').trim();
    } else if (username) {
       name = username.charAt(0).toUpperCase() + username.slice(1);
    } else {
       name = "Qurban Hanif";
    }

    const role = username ? "Professional Portfolio" : "AI Engineer & Full Stack Developer";
    const title = `${name} | ${role}`;
    
    let description = about.summary || about.overview || hero.subtitle || `${name}'s professional portfolio and resume.`;
    description = description.replace(/\s+/g, ' ').trim();
    if (description.length > 155) {
      description = description.substring(0, 152) + "...";
    }

    return {
      title,
      description,
    };
  }, [data, username]);

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

  return (
    <PortfolioContext.Provider value={value}>
      <Helmet prioritizeSeoTags>
        <title>{seoProps.title}</title>
        <meta name="description" content={seoProps.description} />
        <meta property="og:title" content={seoProps.title} />
        <meta property="og:description" content={seoProps.description} />
        <meta property="og:type" content="website" />
      </Helmet>
      {children}
    </PortfolioContext.Provider>
  );
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
