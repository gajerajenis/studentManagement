import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiBookOpen, FiLogOut, FiUser, FiChevronDown, FiGrid } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Header.scss';

const Header = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef                    = useRef(null);
  const location                      = useLocation();
  const navigate                      = useNavigate();
  const { user, isLoggedIn, logout }  = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { label: 'Home',    path: '/' },
    { label: 'About',   path: '/#about' },
    { label: 'Gallery', path: '/#gallery' },
    { label: 'Contact', path: '/#contact' },
  ];

  const avatarInitials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : '';

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">

        {/* ── Logo ─────────────────────────────────────────────────── */}
        <Link to="/" className="header__logo">
          <div className="header__logo-icon"><FiBookOpen /></div>
          <span className="header__logo-text">Edu<span>Manage</span></span>
        </Link>

        {/* ── Nav ──────────────────────────────────────────────────── */}
        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  className={`header__nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {/* Mobile-only links */}
            {isLoggedIn && (
              <li className="header__nav-mobile-only">
                <Link to="/students" className="header__nav-link" onClick={() => setMenuOpen(false)}>
                  Admin Portal
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* ── Right Actions ────────────────────────────────────────── */}
        <div className="header__actions">

          {isLoggedIn ? (
            <>
              {/* Admin Portal button */}
              <Link to="/students" className="header__cta-btn header__cta-btn--portal">
                <FiGrid />
                <span>Admin Portal</span>
                <div className="header__cta-btn-glow" />
              </Link>

              {/* Profile dropdown */}
              <div className="header__profile" ref={profileRef}>
                <button
                  className={`header__profile-trigger ${profileOpen ? 'header__profile-trigger--open' : ''}`}
                  onClick={() => setProfileOpen(v => !v)}
                  aria-label="Profile menu"
                >
                  <div className="header__profile-avatar">{avatarInitials}</div>
                  <div className="header__profile-info">
                    <span className="header__profile-name">{user.firstName} {user.lastName}</span>
                    <span className="header__profile-email">{user.email}</span>
                  </div>
                  <FiChevronDown className={`header__profile-chevron ${profileOpen ? 'header__profile-chevron--up' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="header__profile-dropdown">
                    {/* User info header */}
                    <div className="header__profile-dropdown-head">
                      <div className="header__profile-dropdown-avatar">{avatarInitials}</div>
                      <div>
                        <strong>{user.firstName} {user.lastName}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>

                    <div className="header__profile-dropdown-divider" />

                    <Link
                      to="/students"
                      className="header__profile-dropdown-item"
                      onClick={() => setProfileOpen(false)}
                    >
                      <FiGrid /> Student Portal
                    </Link>

                    <Link
                      to="/profile"
                      className="header__profile-dropdown-item"
                      onClick={() => setProfileOpen(false)}
                    >
                      <FiUser /> My Profile
                    </Link>

                    <div className="header__profile-dropdown-divider" />

                    <button
                      className="header__profile-dropdown-item header__profile-dropdown-item--danger"
                      onClick={handleLogout}
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Not logged in: show Login + Sign Up */}
              <Link to="/login" className="header__cta-btn header__cta-btn--ghost">
                <span>Login</span>
              </Link>
              <Link to="/signup" className="header__cta-btn">
                <span>Sign Up</span>
                <div className="header__cta-btn-glow" />
              </Link>
            </>
          )}

          <button
            className="header__menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;