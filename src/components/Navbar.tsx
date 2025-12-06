"use client";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Achievements', path: '/#achievements' },
  { name: 'Contact', path: '/contact' },
];

const projectsList = [
  { name: 'The Lost Souls', path: '/projects?open=The Lost Souls' },
  { name: 'Flask Web App', path: '/projects?open=Flask Web App' },
  { name: 'Chat Bot', path: '/projects?open=Chat Bot' },
];

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleProjectsMouseEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
    }
    setHovered('Projects');
    setProjectsOpen(true);
  };

  const handleProjectsMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setHovered(null);
      setProjectsOpen(false);
    }, 300);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileProjects = () => {
    setMobileProjectsOpen(!isMobileProjectsOpen);
  };

  return (
    <>
      <nav className="nav-glass" style={{
        position: 'fixed', top: '30px', left: '50%', transform: 'translateX(-50%)',
        width: '90%', maxWidth: '1000px', height: '70px', borderRadius: '50px',
        padding: '0 2.5rem', zIndex: 9999, justifyContent: 'space-between'
      }}>
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div className="prism" style={{
              width: '24px', height: '24px', background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }}></div>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Owen Morey</span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ alignItems: 'center', gap: '2.5rem', height: '100%' }}>
          <ul style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', listStyle: 'none', height: '100%' }}>
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                    onMouseEnter={() => setHovered(item.name)}
                    onMouseLeave={() => setHovered(null)}>
                  <Link href={item.path} style={{
                    position: 'relative', zIndex: 2, padding: '8px 16px',
                    fontSize: '0.95rem', fontWeight: 500
                  }}>
                    {item.name}
                  </Link>
                  {(hovered === item.name || isActive) && (
                    <motion.div layoutId="nav-bubble" style={{
                      position: 'absolute', inset: 0, background: 'var(--glass-highlight)',
                      borderRadius: '20px', zIndex: 1
                    }} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                  )}
                </li>
              );
            })}
            <li style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div onMouseEnter={handleProjectsMouseEnter} onMouseLeave={handleProjectsMouseLeave}>
                <button style={{
                  background: 'none', border: 'none', color: 'inherit', fontFamily: 'inherit',
                  fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer', padding: '8px 16px', position: 'relative', zIndex: 2
                }}>
                  Projects
                </button>
                <AnimatePresence>
                  {projectsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '10px' }}
                    >
                      <ul style={{
                        padding: '10px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px',
                        background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '15px',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
                      }}>
                        {projectsList.map((p) => (
                          <li key={p.name}>
                            <Link href={p.path} style={{ display: 'block', fontSize: '0.9rem', padding: '8px 12px', borderRadius: '10px', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
                             onMouseEnter={(e) => e.currentTarget.style.background = 'var(--glass-highlight)'}
                             onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                              {p.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="mobile-nav-toggle"
          aria-label="Toggle mobile menu"
          onClick={toggleMobileMenu}
        >
          <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`} />
          <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`} />
          <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3 }}
            className="mobile-nav"
          >
            <div style={{ position: 'absolute', top: '120px', left: '40px' }}>
              <ThemeToggle />
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', fontSize: '1.5rem' }}>
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
              <li style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <div onClick={toggleMobileProjects} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <span>Projects</span>
                  <motion.span
                    animate={{ rotate: isMobileProjectsOpen ? 45 : -45 }}
                    transition={{ duration: 0.2 }}
                    className="arrow"
                  />
                </div>
                <AnimatePresence>
                  {isMobileProjectsOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', overflow: 'hidden' }}
                    >
                      {projectsList.map((p) => (
                        <li key={p.name}>
                          <Link href={p.path}>{p.name}</Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}