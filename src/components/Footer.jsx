import React from 'react';

const Footer = () => {
    return (
        <footer id="contact" style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-bg-alt)',
            padding: '4rem 0 2rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '3rem',
                marginBottom: '4rem'
            }}>
                <div>
                    <h4 style={{ color: 'var(--color-white)', fontSize: '1.5rem', marginBottom: '1.5rem', letterSpacing: '1px' }}>SWAROOP</h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.8, maxWidth: '300px' }}>
                        Defining luxury across skylines with unmatched architectural rigor and prestigious estates.
                    </p>
                </div>

                <div>
                    <h5 style={{ color: 'var(--color-white)', marginBottom: '1.5rem', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Contact Us</h5>
                    <ul style={{ listStyle: 'none', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 2.2 }}>
                        <li><a href="mailto:contact@swarooprealty.com" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}>contact@swarooprealty.com</a></li>
                        <li>+91 83839 28784</li>
                        <li>Near Jait Police Station, Vrindavan - 281003</li>
                    </ul>
                </div>

                <div>
                    <h5 style={{ color: 'var(--color-white)', marginBottom: '1.5rem', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Legal</h5>
                    <ul style={{ listStyle: 'none', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 2.2 }}>
                        <li><a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}>Privacy Policy</a></li>
                        <li><a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}>Terms of Service</a></li>
                        <li><a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}>Disclaimer</a></li>
                    </ul>
                </div>
            </div>

            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.5)'
            }}>
                <p>&copy; {new Date().getFullYear()} Swaroop Realty Group. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
