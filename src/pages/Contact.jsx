import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const inputStyle = {
        width: '100%',
        padding: '1.5rem',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        color: 'var(--color-white)',
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.4s ease'
    };

    return (
        <div style={{
            backgroundColor: 'var(--color-primary)',
            minHeight: '100vh',
            color: 'var(--color-white)',
            paddingTop: '160px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decor */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-10%',
                    width: '50vw',
                    height: '50vw',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}
            />

            {/* Scroll Indicator / Redirect Removed */}

            <div id="contact-form" className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '4rem',
                    paddingBottom: 'var(--spacing-section)'
                }}>
                    {/* Contact Information Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ gridColumn: 'span 5' }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                            lineHeight: 1.1,
                            marginBottom: '3rem',
                            color: 'var(--color-white)'
                        }}>
                            Initiate <br /> a dialogue.
                        </h1>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div>
                                <h5 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', marginBottom: '1rem' }}>Global Headquarters</h5>
                                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
                                    Near Jait Police Station,<br />
                                    Vrindavan - 281003
                                </p>
                            </div>

                            <div>
                                <h5 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', marginBottom: '1rem' }}>Private Consultation</h5>
                                <a href="mailto:contact@swarooprealty.com" style={{
                                    fontSize: '1.2rem',
                                    color: 'rgba(255,255,255,0.8)',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid rgba(255,255,255,0.3)',
                                    paddingBottom: '5px'
                                }}>
                                    contact@swarooprealty.com
                                </a>
                                <br /><br />
                                <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)' }}>
                                    +91 83839 28784
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            gridColumn: 'span 7',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            padding: '4rem',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <style>{`
                input:focus, textarea:focus { border-color: var(--color-white) !important; }
                input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 2px; }
              `}</style>

                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <input type="text" placeholder="First Name" style={inputStyle} />
                                <input type="text" placeholder="Last Name" style={inputStyle} />
                            </div>

                            <input type="email" placeholder="Email Address" style={inputStyle} />
                            <input type="text" placeholder="Subject of Inquiry" style={inputStyle} />

                            <textarea
                                placeholder="How may we assist you?"
                                rows="4"
                                style={{ ...inputStyle, resize: 'none' }}
                            ></textarea>

                            <button
                                type="button"
                                style={{
                                    marginTop: '2rem',
                                    alignSelf: 'flex-start',
                                    padding: '1.5rem 4rem',
                                    backgroundColor: 'var(--color-white)',
                                    color: 'var(--color-primary)',
                                    border: 'none',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 500,
                                    transition: 'all 0.4s ease'
                                }}
                                onMouseOver={(e) => { e.target.style.opacity = '0.8'; }}
                                onMouseOut={(e) => { e.target.style.opacity = '1'; }}
                            >
                                Submit Inquiry
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
