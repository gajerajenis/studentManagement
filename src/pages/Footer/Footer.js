import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiBookOpen, FiMail, FiPhone, FiMapPin,
  FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube
} from 'react-icons/fi';
import './Footer.scss';

const socialLinks = [
  { icon: <FiFacebook />, href: '/', label: 'Facebook', color: '#1877f2' },
  { icon: <FiTwitter />, href: '/', label: 'Twitter', color: '#1da1f2' },
  { icon: <FiInstagram />, href: '/', label: 'Instagram', color: '#e1306c' },
  { icon: <FiLinkedin />, href: '/', label: 'LinkedIn', color: '#0a66c2' },
  { icon: <FiYoutube />, href: '/', label: 'YouTube', color: '#ff0000' },
];

const quickLinks = [
  { label: 'About Us', href: '/#about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Student Portal', href: '/students' },
  { label: 'Admissions', href: '/' },
  { label: 'Academics', href: '/' },
  { label: 'Careers', href: '/' },
];

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      {/* Top wave */}
      <div className="footer__wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
            fill="#0a0f1a"
          />
        </svg>
      </div>

      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">

            {/* Brand Col */}
            <div className="footer__brand-col">
              <Link to="/" className="footer__logo">
                <div className="footer__logo-icon">
                  <FiBookOpen />
                </div>
                <span>Edu<span>Manage</span></span>
              </Link>

              <p className="footer__brand-desc">
                Empowering institutions with next-generation student management tools. Simplify your campus operations and unlock student potential.
              </p>

              {/* Social Links */}
              <div className="footer__socials">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="footer__social-link"
                    aria-label={social.label}
                    style={{ '--social-color': social.color }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__links-col">
              <h4 className="footer__col-title">Quick Links</h4>
              <ul className="footer__links-list">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="footer__link">
                      <span className="footer__link-arrow">→</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer__contact-col">
              <h4 className="footer__col-title">Contact Us</h4>
              <ul className="footer__contact-list">
                <li>
                  <div className="footer__contact-item">
                    <div className="footer__contact-icon">
                      <FiMapPin />
                    </div>
                    <div>
                      <span className="footer__contact-label">Address</span>
                      <span className="footer__contact-value">
                        123, Education Hub, Ahmedabad, Gujarat - 380001
                      </span>
                    </div>
                  </div>
                </li>

                <li>
                  <a href="tel:+919876543210" className="footer__contact-item footer__contact-item--link">
                    <div className="footer__contact-icon">
                      <FiPhone />
                    </div>
                    <div>
                      <span className="footer__contact-label">Phone</span>
                      <span className="footer__contact-value">+91 98765 43210</span>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="mailto:gajerajenis66@gmail.com" className="footer__contact-item footer__contact-item--link">
                    <div className="footer__contact-icon">
                      <FiMail />
                    </div>
                    <div>
                      <span className="footer__contact-label">Email</span>
                      <span className="footer__contact-value">gajerajenis66@gmail.com</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer__newsletter-col">
              <h4 className="footer__col-title">Stay Updated</h4>
              <p className="footer__newsletter-desc">
                Subscribe to get the latest news, updates, and announcements.
              </p>
              <div className="footer__newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="footer__newsletter-input"
                />
                <button type="button" className="footer__newsletter-btn">
                  Subscribe
                </button>
              </div>
              <p className="footer__newsletter-note">No spam, unsubscribe at any time.</p>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            © {new Date().getFullYear()} <span>EduManage</span>. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;