import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Press = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <section ref={ref} style={{ padding: 'var(--spacing-section) 0', backgroundColor: 'var(--color-bg)', borderTop: '0px solid var(--color-border)', position: 'relative', overflow: 'hidden', transition: 'background-color 0.8s ease' }}>
            {/* Elegant Minimal Villa Line Art Background on Left */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '-5%',
                transform: 'translateY(-50%)',
                width: '600px',
                height: '600px',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath fill=\'none\' stroke=\'%230A1128\' stroke-width=\'0.3\' d=\'M10 90h80M20 90V50l30-20 30 20v40M30 90V65h15v25M65 70h10v10H65zM50 30v-10M45 20h10\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                opacity: 0.04,
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-primary)', display: 'block', marginBottom: '3rem' }}>
                        In The Press
                    </span>

                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 4rem)',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-primary)',
                        maxWidth: '1000px',
                        margin: '0 auto 4rem auto',
                        lineHeight: 1.2
                    }}>
                        "Swaroop Realty is redefining luxury living in Vrindavan. Their premium plot developments and bespoke villas are true <span style={{ fontStyle: 'italic' }}>sanctuaries of peace and aesthetics</span>."
                    </h2>

                    <div style={{ width: '60px', height: '1px', backgroundColor: 'var(--color-primary)', margin: '0 auto 1.5rem auto' }} />

                    <span style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-text)', display: 'block' }}>
                        Architectural Digest
                    </span>
                </motion.div>
            </div>
        </section>
    );
};

export default Press;
