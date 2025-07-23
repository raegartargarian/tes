// src/shared/components/Footer.tsx
import { Button } from "@/components/ui/button";
import {
  Crown,
  ExternalLink,
  Facebook,
  Instagram,
  Shield,
  Twitter,
} from "lucide-react";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    // Newsletter subscription logic would go here
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail("");
      alert("Thank you for subscribing to The Godfather 4 updates!");
    }, 2000);
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  const footerLinks = [
    {
      title: "The Film",
      links: [
        { name: "About", href: "#about" },
        { name: "Cast & Crew", href: "#cast" },
        { name: "Production", href: "#production" },
        { name: "Awards", href: "#awards" },
      ],
    },
    {
      title: "Investment",
      links: [
        { name: "How It Works", href: "#how-it-works" },
        { name: "Purchase Shares", href: "#purchase" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Returns", href: "#returns" },
      ],
    },
    {
      title: "Blockchain",
      links: [
        { name: "Verify Ownership", href: "#verify" },
        { name: "Smart Contract", href: "#contract" },
        { name: "Transparency", href: "#transparency" },
        { name: "Security", href: "#security" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "#terms" },
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Investment Risks", href: "#risks" },
        { name: "Contact", href: "#contact" },
      ],
    },
  ];

  return (
    <footer className="godfather-footer">
      {/* Newsletter Section */}
      <section className="footer-newsletter-section">
        <div className="container mx-auto px-4">
          <div className="newsletter-content">
            <div className="newsletter-header">
              <Crown className="w-8 h-8 text-godfather-gold mb-4" />
              <h3 className="newsletter-title">STAY INFORMED</h3>
              <p className="newsletter-description">
                Receive exclusive updates about The Godfather 4 investment
                opportunities, behind-the-scenes content, and blockchain
                verification news.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="form-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="newsletter-input"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="newsletter-submit-btn"
                >
                  {isSubscribing ? "SUBSCRIBING..." : "SUBSCRIBE"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="footer-main-content">
        <div className="container mx-auto px-4">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand-section">
              <div className="footer-logo">
                <Crown className="w-10 h-10 text-godfather-gold mb-4" />
                <div className="brand-text">
                  <h2 className="brand-title">THE GODFATHER</h2>
                  <span className="brand-chapter">IV</span>
                </div>
              </div>

              <p className="brand-description">
                The epic conclusion to cinema's most legendary saga. Own a piece
                of film history through blockchain-verified ownership.
              </p>

              <div className="social-links">
                <span className="social-label">Follow the Legacy</span>
                <div className="social-icons">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="social-icon"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="footer-nav-sections">
              {footerLinks.map((section, index) => (
                <div key={index} className="footer-nav-section">
                  <h4 className="nav-section-title">{section.title}</h4>
                  <ul className="nav-section-links">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.href} className="nav-link">
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain Verification */}
          <div className="footer-verification">
            <div className="verification-content">
              <Shield className="w-6 h-6 text-godfather-gold" />
              <div className="verification-text">
                <h4>Blockchain Secured</h4>
                <p>
                  All transactions are verified and secured on the blockchain
                </p>
              </div>
              <Button className="verification-btn">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Explorer
              </Button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <div className="bottom-content">
              <div className="copyright">
                <p>
                  &copy; 2025 The Godfather 4 Investment Platform. All rights
                  reserved.
                </p>
                <p className="disclaimer">
                  This platform is for investment purposes. Please read all
                  terms and conditions.
                </p>
              </div>

              <div className="bottom-links">
                <a href="#terms" className="bottom-link">
                  Terms
                </a>
                <span className="separator">•</span>
                <a href="#privacy" className="bottom-link">
                  Privacy
                </a>
                <span className="separator">•</span>
                <a href="#cookies" className="bottom-link">
                  Cookies
                </a>
                <span className="separator">•</span>
                <a href="#contact" className="bottom-link">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
