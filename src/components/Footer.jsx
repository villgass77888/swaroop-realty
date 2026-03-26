import React from 'react';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

const Footer = () => {
    const { isMobile } = useIsMobile();
    return (
        <footer id="contact" style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-bg-alt)',
            padding: isMobile ? '3rem 0 2rem 0' : '4rem 0 2rem 0',
            borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: isMobile ? '2.5rem' : '3rem',
                marginBottom: isMobile ? '2.5rem' : '4rem',
                alignItems: 'start'
            }}>
                {/* Brand */}
                <div>
                    <img src="/logo-white.png" alt="Swaroop Realty Logo" style={{ height: isMobile ? '80px' : '120px', width: 'auto', marginBottom: '1.2rem', objectFit: 'contain' }} />
                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: '300px', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                        Defining luxury across skylines with unmatched architectural rigor and prestigious estates.
                    </p>
                </div>

                {/* Contact */}
                <div style={{ paddingTop: isMobile ? '0' : '35px' }}>
                    <h5 style={{ color: 'var(--color-white)', marginBottom: '1.2rem', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Contact Us</h5>
                    <ul style={{ listStyle: 'none', color: 'rgba(255,255,255,0.7)', lineHeight: 2.4, fontSize: isMobile ? '0.9rem' : '1rem' }}>
                        <li><a href="mailto:contact@swarooprealty.com" style={{ color: 'inherit', textDecoration: 'none' }}>contact@swarooprealty.com</a></li>
                        <li>+91 83839 28784</li>
                        <li>Near Jait Police Station, Vrindavan - 281003</li>
                    </ul>
                </div>

                {/* Legal */}
                <div style={{ paddingTop: isMobile ? '0' : '35px' }}>
                    <h5 style={{ color: 'var(--color-white)', marginBottom: '1.2rem', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Legal</h5>
                    <ul style={{ listStyle: 'none', color: 'rgba(255,255,255,0.7)', lineHeight: 2.4, fontSize: isMobile ? '0.9rem' : '1rem' }}>
                        <li><Link to="/privacy-policy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link></li>
                        <li><Link to="/terms-of-service" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link></li>
                        <li><Link to="/disclaimer" style={{ color: 'inherit', textDecoration: 'none' }}>Disclaimer</Link></li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="container" style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: isMobile ? '1rem' : '0',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.5)',
                textAlign: isMobile ? 'center' : 'left'
            }}>
                <p>&copy; {new Date().getFullYear()} Swaroop Realty Group. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a href="https://instagram.com/swarooprealty" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
                    <a href="https://linkedin.com/company/swarooprealty" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
