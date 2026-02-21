import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const Cta = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <section ref={ref} style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            padding: '120px 0',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Low Opacity Plot Map Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url("https://images.unsplash.com/photo-1626241908709-34b22306fe36?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")', // Architectural/Map style image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.05,
                zIndex: 0,
                mixBlendMode: 'overlay'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
                        Ready to elevate <br /> your living?
                    </h2>
                    <p style={{
                        fontSize: 'clamp(2rem, 3vw, 3rem)',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-white)',
                        marginBottom: '4rem',
                        maxWidth: '900px',
                        margin: '0 auto 4rem auto',
                        lineHeight: 1.4
                    }}>
                        Connect with our private advisory team to discuss bespoke acquisitions and off-market opportunities.
                    </p>

                    <style>{`
                        .cta-btn-link {
                            display: inline-flex;
                            align-items: center;
                            gap: 10px;
                            padding-bottom: 10px;
                            border-bottom: 1px solid var(--color-white);
                            color: var(--color-white);
                            text-decoration: none;
                            text-transform: uppercase;
                            letter-spacing: 2px;
                            font-size: 0.85rem;
                            font-weight: 500;
                            transition: all 0.3s ease;
                        }
                        .cta-btn-link:hover {
                            gap: 15px;
                            opacity: 0.7;
                        }
                    `}</style>
                    <Link to="/contact" className="cta-btn-link">
                        Schedule an Exclusive Consultation
                        <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Cta;
