import { useEffect } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { seoConfig } from "../../constants/seoConfig";

const DynamicSEO = () => {
  const { data } = usePortfolio();
  
  useEffect(() => {
    if (!data) return;

    const settings = data.settings || {};
    const hero = settings.hero || {};
    const about = settings.about || {};

    const siteTitle = settings.siteName || seoConfig.siteName;
    const title = hero.headline ? `${hero.headline} | ${siteTitle}` : seoConfig.title;
    const description = about.summary || seoConfig.description;

    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update OG tags
    const updateMeta = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    updateMeta("og:title", title);
    updateMeta("og:description", description);
    updateMeta("og:url", window.location.href);
    updateMeta("og:site_name", siteTitle);

    return () => {
      // Optional: reset to defaults on unmount if needed
    };
  }, [data]);

  return null;
};

DynamicSEO.propTypes = {
  // No props needed
};

export default DynamicSEO;
