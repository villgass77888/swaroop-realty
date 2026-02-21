import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Check initial scroll position
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' },
        { label: 'Projects', path: '/projects' },
        { label: 'Contact Us', path: '/contact' }
    ];

    const isDarkHeroPage = location.pathname === '/' || location.pathname === '/about' || location.pathname === '/contact';
    // If we are on Home/About/Contact page and not scrolled, text is White (over dark hero)
    // Otherwise, if scrolled, header is dark blue, so text is White.
    // If we are on a white page (Projects, Contact) and NOT scrolled, text is Dark Blue.
    const textColor = (isScrolled || (isDarkHeroPage && !isScrolled)) ? 'var(--color-white)' : 'var(--color-primary)';
    const borderColor = textColor === 'var(--color-white)' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(10, 17, 40, 0.3)';

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                padding: isScrolled ? '1rem 5%' : '2rem 5%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: isScrolled ? 'rgba(10, 17, 40, 0.85)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                zIndex: 100,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
        >
            {/* Logo Area */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div style={{
                    fontFamily: 'var(--font-heading)',
                    color: textColor,
                    fontSize: '1.5rem',
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    transition: 'color 0.4s ease'
                }}>
                    <div style={{
                        width: '30px',
                        height: '30px',
                        border: `1px solid ${textColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'rotate(45deg)',
                        transition: 'border-color 0.4s ease'
                    }}>
                        <div style={{ width: '10px', height: '10px', backgroundColor: textColor, transition: 'background-color 0.4s ease' }} />
                    </div>
                    Swaroop.
                </div>
            </Link>

            {/* Main Navigation Links */}
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
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: '1px',
                                            backgroundColor: textColor
                                        }}
                                    />
                                )}
                            </AnimatePresence>
                        </Link>
                    );
                })}
            </nav>

            {/* CTA Button */}
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
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = textColor;
                    e.target.style.color = textColor === 'var(--color-white)' ? 'var(--color-primary)' : 'var(--color-white)';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = textColor;
                }}
            >
                Inquire Now
            </Link>
        </motion.header>
    );
};

export default Navigation;
