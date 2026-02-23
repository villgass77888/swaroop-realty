import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const Contact = () => {
    const { isMobile } = useIsMobile();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const inputStyle = {
        width: '100%',
        padding: isMobile ? '1.1rem 1rem' : '1.5rem',
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        color: 'var(--color-white)',
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        outline: 'none',
        minHeight: '48px',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)'
    };

    return (
        <div style={{
            backgroundColor: 'var(--color-primary)',
            minHeight: '100vh',
            color: 'var(--color-white)',
            paddingTop: isMobile ? '110px' : '160px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decor — hidden on mobile to avoid overflow */}
            {!isMobile && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: 'absolute', top: '20%', right: '-10%', width: '50vw', height: '50vw', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '50%', pointerEvents: 'none' }}
                />
            )}

            <div id="contact-form" className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)',
                    gap: isMobile ? '2.5rem' : '4rem',
                    paddingBottom: 'var(--spacing-section)'
                }}>
                    {/* Info side */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ gridColumn: isMobile ? undefined : 'span 5' }}
                    >
                        <h1 style={{
                            fontSize: isMobile ? 'clamp(2.4rem, 9vw, 3.5rem)' : 'clamp(3rem,5vw,4.5rem)',
                            lineHeight: 1.1, marginBottom: '2.5rem', color: 'var(--color-white)'
                        }}>
                            Initiate <br /> a dialogue.
                        </h1>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div>
                                <h5 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', marginBottom: '0.8rem' }}>Global Headquarters</h5>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>Near Jait Police Station,<br />Vrindavan - 281003</p>
                            </div>
                            <div>
                                <h5 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', marginBottom: '0.8rem' }}>Private Consultation</h5>
                                <a href="mailto:contact@swarooprealty.com" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '4px', display: 'inline-block' }}>
                                    contact@swarooprealty.com
                                </a>
                                <br /><br />
                                <a href="tel:+918383928784" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>+91 83839 28784</a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form side */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            gridColumn: isMobile ? undefined : 'span 7',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                            padding: isMobile ? '2rem 1.5rem' : '4rem',
                        }}
                    >
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <style>{`
                                input:focus, textarea:focus { border-color:rgba(255,255,255,0.5)!important; background-color:rgba(255,255,255,0.08)!important; box-shadow:0 4px 20px rgba(255,255,255,0.05); }
                                input:hover, textarea:hover { background-color:rgba(255,255,255,0.08); }
                                input::placeholder, textarea::placeholder { color:rgba(255,255,255,0.4); text-transform:uppercase; font-size:0.8rem; letter-spacing:2px; }
                            `}</style>
                            <div style={{ display: 'flex', gap: '1rem', flexDirection: isMobile ? 'column' : 'row' }}>
                                <input type="text" placeholder="First Name" style={inputStyle} />
                                <input type="text" placeholder="Last Name" style={inputStyle} />
                            </div>
                            <input type="email" placeholder="Email Address" style={inputStyle} />
                            <input type="text" placeholder="Subject of Inquiry" style={inputStyle} />
                            <textarea placeholder="How may we assist you?" rows="4" style={{ ...inputStyle, resize: 'none' }} />
                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    marginTop: '1rem',
                                    padding: isMobile ? '1.3rem 0' : '1.5rem 4rem',
                                    width: isMobile ? '100%' : 'auto',
                                    alignSelf: isMobile ? 'stretch' : 'flex-start',
                                    backgroundColor: 'rgba(59,130,246,0.2)',
                                    backdropFilter: 'blur(10px)',
                                    color: '#ffffff',
                                    border: '1px solid rgba(59,130,246,0.5)',
                                    borderRadius: '30px',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 600,
                                    minHeight: '52px',
                                }}
                            >
                                Submit Inquiry
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
