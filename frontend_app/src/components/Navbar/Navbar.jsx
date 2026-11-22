import React, { useEffect, useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';

import './Navbar.scss';

const LINKS = ['home', 'about', 'work', 'skills', 'contact'];

const Navbar = ({ theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  // Highlight the link of the section currently in view.
  useEffect(() => {
    const sections = LINKS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <header className="app__navbar-wrap">
      <nav className="app__navbar glass" aria-label="Main">
        <a href="#home" className="app__navbar-logo">
          <span>N</span>
          Naveen
        </a>

        <ul className="app__navbar-links">
          {LINKS.map((item) => (
            <li key={item}>
              <a href={`#${item}`} className={active === item ? 'is-active' : ''}>
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="app__navbar-actions">
          <button
            type="button"
            className="app__navbar-theme"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
          <a href="#contact" className="btn btn--primary btn--sm app__navbar-cta">
            Let&apos;s talk
          </a>
          <button
            type="button"
            className="app__navbar-menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <HiX /> : <HiMenuAlt4 />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="app__navbar-drawer glass">
          <ul>
            {LINKS.map((item) => (
              <li key={item}>
                <a href={`#${item}`} onClick={() => setOpen(false)}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
