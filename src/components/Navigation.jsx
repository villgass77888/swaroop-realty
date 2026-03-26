import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import useIsMobile from '../hooks/useIsMobile';

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { isLoading } = useLoading();
    const { isMobile } = useIsMobile();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Close mobile menu on route change
    useEffect(() => { setMenuOpen(false); }, [location.pathname]);

    // Lock body scroll when menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' },
        { label: 'Projects', path: '/projects' },
        { label: 'Insights', path: '/insights' },
        { label: 'Contact Us', path: '/contact' }
    ];

    const legalPages = ['/privacy-policy', '/terms-of-service', '/disclaimer'];
    const isDarkHeroPage = location.pathname === '/' || location.pathname === '/about' || location.pathname === '/contact' || location.pathname === '/why-vrindavan' || location.pathname === '/insights' || legalPages.includes(location.pathname);
    const isNotFound = !['/', '/about', '/projects', '/contact', '/insights', '/why-vrindavan', ...legalPages].some(p => location.pathname === p || location.pathname.startsWith('/projects/'));
    const isDarkThemePage = isDarkHeroPage;
    const textColor = (isScrolled || (isDarkThemePage && !isScrolled)) ? 'var(--color-white)' : 'var(--color-primary)';
    const borderColor = textColor === 'var(--color-white)' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(10, 17, 40, 0.3)';

    // On mobile, hamburger icon color: always white when menu open, else match textColor
    const burgerColor = menuOpen ? '#ffffff' : textColor;

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={isLoading ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100vw',
                    padding: isMobile ? '1rem 5%' : (isScrolled ? '1rem 5%' : '2rem 5%'),
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: (isScrolled || menuOpen) ? 'rgba(10, 17, 40, 0.95)' : 'transparent',
                    backdropFilter: (isScrolled || menuOpen) ? 'blur(20px)' : 'none',
                    WebkitBackdropFilter: (isScrolled || menuOpen) ? 'blur(20px)' : 'none',
                    borderBottom: (isScrolled && !menuOpen) ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                    zIndex: 1000,
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            >
                {/* Logo */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-45%)',
                        left: '5%',
                        display: 'flex',
                        alignItems: 'center',
                        height: isMobile ? '60px' : '100px',
                        zIndex: 1001,
                        transition: 'height 0.4s ease'
                    }}>
                        <img
                            src={(menuOpen || textColor === 'var(--color-white)') ? '/logo-white.png' : '/logo-dark.png'}
                            alt="Swaroop Realty Logo"
                            style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                        />
                    </div>
                </Link>

                {/* Desktop nav links */}
                {!isMobile && (
                    <nav style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                        {menuItems.map((item, index) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    onMouseEnter={() => setIsHovered(index)}
                                    onMouseLeave={() => setIsHovered(null)}
                                    style={{
                                        position: 'relative',
                                        color: textColor,
                                        textDecoration: 'none',
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase',
                                        padding: '10px 0',
                                        fontFamily: 'var(--font-body)',
                                        opacity: isActive ? 1 : 0.7,
                                        transition: 'opacity 0.3s ease, color 0.4s ease'
                                    }}
                                >
                                    {item.label}
                                    <AnimatePresence>
                                        {(isHovered === index || isActive) && (
                                            <motion.div
                                                layoutId="nav-underline"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', backgroundColor: textColor }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </Link>
                            );
                        })}
                    </nav>
                )}

                {/* Desktop CTA */}
                {!isMobile && (
                    <Link to="/contact" style={{
                        padding: '12px 24px',
                        border: `1px solid ${borderColor}`,
                        color: textColor,
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        transition: 'all 0.4s ease',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500
                    }}
                        onMouseOver={(e) => { e.target.style.backgroundColor = textColor; e.target.style.color = textColor === 'var(--color-white)' ? 'var(--color-primary)' : 'var(--color-white)'; }}
                        onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = textColor; }}
                    >
                        Inquire Now
                    </Link>
                )}

                {/* Mobile hamburger button */}
                {isMobile && (
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        style={{
                            background: 'none', border: 'none',
                            padding: '8px', marginLeft: 'auto',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center',
                            gap: '5px', cursor: 'pointer', zIndex: 1001,
                            width: '40px', height: '40px',
                            justifyContent: 'center',
                        }}
                    >
                        {[0, 1, 2].map(i => (
                            <motion.span
                                key={i}
                                animate={
                                    menuOpen
                                        ? i === 0 ? { rotate: 45, y: 7, width: 24 }
                                            : i === 1 ? { opacity: 0, scaleX: 0 }
                                                : { rotate: -45, y: -7, width: 24 }
                                        : { rotate: 0, y: 0, opacity: 1, width: i === 1 ? 16 : 24 }
                                }
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    display: 'block', height: '2px',
                                    backgroundColor: burgerColor,
                                    borderRadius: '2px',
                                    width: i === 1 ? 16 : 24,
                                    transformOrigin: 'center',
                                    transition: 'background-color 0.3s ease'
                                }}
                            />
                        ))}
                    </button>
                )}
            </motion.header>

            {/* ── Full-screen mobile menu overlay ────────────────────────── */}
            <AnimatePresence>
                {menuOpen && isMobile && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'fixed', inset: 0,
                            backgroundColor: 'rgba(10, 17, 40, 0.98)',
                            backdropFilter: 'blur(24px)',
                            zIndex: 999,
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            gap: '2.5rem',
                        }}
                    >
                        {menuItems.filter(item => item.label !== 'Contact Us').map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link
                                    to={item.path}
                                    style={{
                                        color: location.pathname === item.path ? '#ffffff' : 'rgba(255,255,255,0.55)',
                                        textDecoration: 'none',
                                        fontSize: 'clamp(2rem, 8vw, 3rem)',
                                        fontFamily: 'var(--font-heading)',
                                        fontWeight: 500,
                                        letterSpacing: '-0.01em',
                                        display: 'block',
                                        textAlign: 'center',
                                        transition: 'color 0.2s ease',
                                    }}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            style={{ marginTop: '1rem' }}
                        >
                            <Link
                                to="/contact"
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    display: 'inline-block',
                                    padding: '14px 40px',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    color: '#ffffff',
                                    textDecoration: 'none',
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px',
                                    fontFamily: 'var(--font-body)',
                                }}
                            >
                                Inquire Now
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
