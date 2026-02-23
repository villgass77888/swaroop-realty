import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const inputStyle = {
        width: '100%',
        padding: '1.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        color: 'var(--color-white)',
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    };

    return (
        <div style={{
            backgroundColor: 'var(--color-primary)',
            minHeight: '100vh',
            color: 'var(--color-white)',
            paddingTop: '160px',
            position: 'relative',
            overflow: 'hidden'
        }} >
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
                            <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                                <h5 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', marginBottom: '1rem' }}>Global Headquarters</h5>
                                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
                                    Near Jait Police Station,<br />
                                    Vrindavan - 281003
                                </p>
                            </motion.div>

                            <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                                <h5 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', marginBottom: '1rem' }}>Private Consultation</h5>
                                <a href="mailto:contact@swarooprealty.com" style={{
                                    fontSize: '1.2rem',
                                    color: 'rgba(255,255,255,0.8)',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid rgba(255,255,255,0.3)',
                                    paddingBottom: '5px',
                                    transition: 'all 0.3s ease'
                                }}
                                    onMouseOver={(e) => { e.target.style.color = 'var(--color-white)'; e.target.style.borderColor = 'var(--color-white)'; }}
                                    onMouseOut={(e) => { e.target.style.color = 'rgba(255,255,255,0.8)'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                                >
                                    contact@swarooprealty.com
                                </a>
                                <br /><br />
                                <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)' }}>
                                    +91 83839 28784
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contact Form Side (White Card) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            gridColumn: 'span 7',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)', // Frosted glass
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                            padding: '4rem',
                            position: 'relative'
                        }}
                    >
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <style>{`
                input:focus, textarea:focus { 
                    border-color: rgba(255,255,255,0.5) !important; 
                    background-color: rgba(255,255,255,0.08) !important;
                    box-shadow: 0 4px 20px rgba(255,255,255,0.05);
                    transform: translateY(-2px);
                }
                input:hover, textarea:hover {
                    background-color: rgba(255,255,255,0.08);
                }
                input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.4); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 2px; }
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

                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)', backgroundColor: 'rgba(59, 130, 246, 0.4)' }}
                                whileTap={{ scale: 0.95, boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.8)', transition: { duration: 0.01 } }}
                                style={{
                                    marginTop: '2rem',
                                    alignSelf: 'flex-start',
                                    padding: '1.5rem 4rem',
                                    backgroundColor: 'rgba(59, 130, 246, 0.2)', // Frosted blue
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    color: '#ffffff',
                                    border: '1px solid rgba(59, 130, 246, 0.5)',
                                    borderRadius: '30px',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Submit Inquiry
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div >
    );
};

export default Contact;
