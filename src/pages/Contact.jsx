import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import useIsMobile from '../hooks/useIsMobile';
import SEOHead from '../components/SEOHead';

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// Replace these values with your EmailJS credentials:
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const ADMIN_TEMPLATE_ID = 'YOUR_ADMIN_TEMPLATE_ID';     // Sends to contact@swarooprealty.com
const USER_TEMPLATE_ID = 'YOUR_USER_TEMPLATE_ID';       // Sends to user (info@swarooprealty.com as sender)
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
// ─────────────────────────────────────────────────────────────────────────────

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
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, subject, message } = formData;
        if (!firstName || !email || !message) return; // basic guard

        setStatus('loading');
        try {
            // 1. Send Inquiry Notification to Admin (contact@swarooprealty.com)
            const adminPromise = emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                ADMIN_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );

            // 2. Send Confirmation Receipt to User (from info@swarooprealty.com)
            const userPromise = emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                USER_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );

            // Wait for both to complete
            await Promise.all([adminPromise, userPromise]);

            setStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.error('EmailJS error:', err);
            setStatus('error');
        }
    };

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
                        <form ref={formRef} onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <style>{`
                                input:focus, textarea:focus { border-color:rgba(255,255,255,0.5)!important; background-color:rgba(255,255,255,0.08)!important; box-shadow:0 4px 20px rgba(255,255,255,0.05); }
                                input:hover, textarea:hover { background-color:rgba(255,255,255,0.08); }
                                input::placeholder, textarea::placeholder { color:rgba(255,255,255,0.4); text-transform:uppercase; font-size:0.8rem; letter-spacing:2px; }
                            `}</style>
                            <div style={{ display: 'flex', gap: '1rem', flexDirection: isMobile ? 'column' : 'row' }}>
                                <input
                                    type="text" name="firstName" placeholder="First Name" required
                                    value={formData.firstName} onChange={handleChange} style={inputStyle}
                                />
                                <input
                                    type="text" name="lastName" placeholder="Last Name"
                                    value={formData.lastName} onChange={handleChange} style={inputStyle}
                                />
                            </div>
                            <input
                                type="email" name="email" placeholder="Email Address" required
                                value={formData.email} onChange={handleChange} style={inputStyle}
                            />
                            <input
                                type="text" name="subject" placeholder="Subject of Inquiry"
                                value={formData.subject} onChange={handleChange} style={inputStyle}
                            />
                            <textarea
                                name="message" placeholder="How may we assist you?" rows="4" required
                                value={formData.message} onChange={handleChange}
                                style={{ ...inputStyle, resize: 'none' }}
                            />

                            {/* Status feedback banner */}
                            <AnimatePresence mode="wait">
                                {status === 'success' && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            padding: '1rem 1.25rem',
                                            borderRadius: '10px',
                                            backgroundColor: 'rgba(34,197,94,0.12)',
                                            border: '1px solid rgba(34,197,94,0.4)',
                                            color: '#4ade80',
                                            fontSize: '0.9rem',
                                            letterSpacing: '0.5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.6rem'
                                        }}
                                    >
                                        <span style={{ fontSize: '1.1rem' }}>✓</span>
                                        Your inquiry has been sent. We'll be in touch shortly.
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        key="error"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            padding: '1rem 1.25rem',
                                            borderRadius: '10px',
                                            backgroundColor: 'rgba(239,68,68,0.12)',
                                            border: '1px solid rgba(239,68,68,0.4)',
                                            color: '#f87171',
                                            fontSize: '0.9rem',
                                            letterSpacing: '0.5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.6rem'
                                        }}
                                    >
                                        <span style={{ fontSize: '1.1rem' }}>✕</span>
                                        Something went wrong. Please try again or call us directly.
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                type="submit"
                                disabled={status === 'loading'}
                                whileTap={status !== 'loading' ? { scale: 0.93, opacity: 0.85 } : {}}
                                style={{
                                    marginTop: '1rem',
                                    padding: isMobile ? '1.3rem 0' : '1.5rem 4rem',
                                    width: isMobile ? '100%' : 'auto',
                                    alignSelf: isMobile ? 'stretch' : 'flex-start',
                                    backgroundColor: status === 'loading' ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.2)',
                                    backdropFilter: 'blur(10px)',
                                    color: '#ffffff',
                                    border: '1px solid rgba(59,130,246,0.5)',
                                    borderRadius: '30px',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 600,
                                    minHeight: '52px',
                                    opacity: status === 'loading' ? 0.7 : 1,
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.6rem',
                                }}
                            >
                                {status === 'loading' && (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                        style={{ animation: 'spin 0.8s linear infinite' }}>
                                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                                    </svg>
                                )}
                                {status === 'loading' ? 'Sending…' : 'Submit Inquiry'}
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
