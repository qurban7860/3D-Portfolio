import { Link, useParams } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { styles } from "../styles";
import { getIcon } from "../utils/iconMapping";
import logo from "/logo.svg";

const Footer = () => {
  const { data } = usePortfolio();
  const { username } = useParams();
  const basePath = username ? `/${username}` : "";
  
  const currentYear = new Date().getFullYear();

  const hero = data?.settings?.hero ?? {};
  const headline = hero.headline || `Hi, I'm ${username || 'Developer'}`;
  const nameMatch = headline.match(/Hi, I'm (.*)/i) || [null, username || 'Developer'];
  const displayName = nameMatch[1].trim().toUpperCase();
  const copyrightName = nameMatch[1].trim();

  const footerLinks = [
    { title: "Navigation", links: [
      { name: "About Me", path: `${basePath}/about` },
      { name: "Projects", path: `${basePath}/portfolio` },
      { name: "Experience", path: `${basePath}/experience` },
      { name: "Contact", path: `${basePath}/contact` }
    ]},
    { title: "Services", links: [
      { name: "Web Development", path: `${basePath}/services` },
      { name: "System Architecture", path: `${basePath}/services` },
      { name: "UI/UX Design", path: `${basePath}/services` },
      { name: "Performance Opt.", path: `${basePath}/services` }
    ]},
  ];

  const socialLinks = (data?.socials ?? [])
    .filter(s => s.visible)
    .map(s => ({
      icon: getIcon(s.icon),
      title: s.title,
      url: s.url,
      color: s.icon?.toLowerCase().includes('github') ? "hover:text-white" :
             s.icon?.toLowerCase().includes('linkedin') ? "hover:text-[#0077B5]" :
             s.icon?.toLowerCase().includes('whatsapp') ? "hover:text-[#25D366]" :
             "hover:text-[#915EFF]"
    }));

  return (
    <footer className="relative w-full pt-20 pb-10 overflow-hidden">
      {/* ── Background Elements ── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-dot-pattern opacity-[0.05] pointer-events-none" />
      
      <div className={`${styles.paddingX} max-w-7xl mx-auto relative z-10`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1.5 flex flex-col gap-6">
            <Link to={basePath || "/"} className="flex items-center gap-3 w-fit group">
              <div className="w-10 h-10 rounded-xl glass-badge-hero flex items-center justify-center border-white/10 group-hover:border-[#915EFF]/50 transition-all duration-500">
                <img src={logo} alt="logo" className="w-5 h-5 object-contain" />
              </div>
              <span className="text-white font-black text-[20px] tracking-tight group-hover:text-gradient transition-all uppercase">{displayName}</span>
            </Link>
            <p className="text-secondary text-[14px] leading-relaxed max-w-xs opacity-70">
              Crafting high-performance digital experiences with technical precision and architectural excellence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/10`}
                >
                  {social.icon ? (
                    <social.icon size={18} />
                  ) : (
                    <span className="text-xs font-black">{social.title?.charAt(0).toUpperCase()}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          {footerLinks.map((section, i) => (
            <div key={i} className="flex flex-col gap-6">
              <h4 className="text-white font-black text-[14px] uppercase tracking-[0.2em]">{section.title}</h4>
              <ul className="flex flex-col gap-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      to={link.path} 
                      className="text-secondary text-[14px] hover:text-[#915EFF] transition-colors flex items-center gap-2 group"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#915EFF] transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter/Status */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-black text-[14px] uppercase tracking-[0.2em]">Current Status</h4>
            <div className="premium-glass p-5 rounded-2xl border-white/5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-green-400 text-[11px] font-black uppercase tracking-widest">Available for projects</p>
              </div>
              <p className="text-white/40 text-[12px] leading-relaxed italic">
                Currently open for collaborations and high-impact full-time roles.
              </p>
              <Link to={`${basePath}/contact`} className="text-white font-bold text-[12px] flex items-center gap-2 hover:text-[#915EFF] transition-colors mt-2 group">
                Let&apos;s talk <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-[12px] font-medium">
            &copy; {currentYear} {copyrightName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-white/20 text-[11px] font-bold uppercase tracking-widest">
              Built with <span className="text-white/40">React</span> &bull; <span className="text-white/40">Three.js</span> &bull; <span className="text-white/40">Framer</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
