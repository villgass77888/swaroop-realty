import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import SEOHead from '../components/SEOHead';

const contactSchema = [
    {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        url: 'https://swarooprealty.com/contact',
        name: 'Contact Swaroop Realty — Real Estate Enquiries in Vrindavan',
        description: 'Contact Swaroop Realty for real estate enquiries in Vrindavan, Mathura, Govardhan and Braj. Call +91 83839 28784.',
    },
    {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Swaroop Realty',
        url: 'https://swarooprealty.com',
        telephone: '+918383928784',
        email: 'contact@swarooprealty.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Near Jait Police Station',
            addressLocality: 'Vrindavan',
            addressRegion: 'Uttar Pradesh',
            postalCode: '281003',
            addressCountry: 'IN',
        },
        geo: { '@type': 'GeoCoordinates', latitude: '27.5744', longitude: '77.6987' },
        openingHours: 'Mo-Sa 09:00-18:00',
        priceRange: '₹₹₹',
    },
];

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
            <SEOHead
                title="Contact — Real Estate Enquiries in Vrindavan, Braj"
                description="Contact Swaroop Realty for real estate enquiries in Vrindavan. Call +91 83839 28784 or visit Near Jait Police Station, Vrindavan 281003. Enquire about vastu plots, villas, and farmland in Braj."
                keywords="contact real estate Vrindavan, real estate agent Vrindavan, property enquiry Vrindavan, buy plot Vrindavan contact, Swaroop Realty contact, real estate office Vrindavan 281003, Braj property enquiry"
                canonical="/contact"
                schema={contactSchema}
            />
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
                    {/* Mobile-only: Title rendered first (order 0) */}
                    {isMobile && (
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                order: 0,
                                fontSize: 'clamp(2.4rem, 9vw, 3.5rem)',
                                lineHeight: 1.1, marginBottom: '0.5rem', color: 'var(--color-white)'
                            }}
                        >
                            Initiate <br /><em>a dialogue.</em>
                        </motion.h1>
                    )}

                    {/* Form side — order 1 on mobile */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            gridColumn: isMobile ? undefined : 'span 7',
                            order: isMobile ? 1 : 0,
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
                                whileTap={{ scale: 0.93, opacity: 0.85 }}
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

                    {/* Info side — order 2 on mobile (after form), desktop: left column */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ gridColumn: isMobile ? undefined : 'span 5', order: isMobile ? 2 : 0 }}
                    >
                        {/* Desktop: show title here; mobile: title already rendered above */}
                        {!isMobile && (
                            <h1 style={{
                                fontSize: 'clamp(3rem,5vw,4.5rem)',
                                lineHeight: 1.1, marginBottom: '2.5rem', color: 'var(--color-white)'
                            }}>
                                Initiate <br /><em>a dialogue.</em>
                            </h1>
                        )}
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
                </div>
            </div>

            {/* ── MAP SECTION ── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    paddingTop: isMobile ? '2rem' : '3rem',
                }}
            >
                <div className="container" style={{ marginBottom: isMobile ? '2rem' : '3rem' }}>
                    <span style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        color: 'rgba(255,255,255,0.4)',
                        marginBottom: '0.75rem',
                        fontFamily: 'var(--font-body)',
                    }}>Our Office</span>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: isMobile ? 'clamp(2.4rem, 9vw, 3.5rem)' : 'clamp(3rem, 5vw, 4.5rem)',
                        color: '#fff',
                        letterSpacing: '-0.025em',
                        lineHeight: 1.1,
                        margin: 0,
                    }}>
                        Visit Us <em>in Vrindavan</em>
                    </h2>
                </div>

                <div style={{
                    margin: isMobile ? '0 1rem' : '0 2rem',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}>
                    <div style={{
                        width: '100%',
                        height: isMobile ? '280px' : '480px',
                        overflow: 'hidden',
                        filter: 'grayscale(20%) contrast(1.05)',
                    }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.6004701954507!2d77.61076229999999!3d27.574907399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736d2a818cb2ed%3A0xf47725e86c39aa16!2sBrij%20Garden%20Vrindavan!5e0!3m2!1sen!2sin!4v1772697758489!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, display: 'block' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Brij Garden Vrindavan — Swaroop Realty"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
