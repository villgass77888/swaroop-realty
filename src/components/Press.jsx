import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Ticker items repeated for seamless loop
const TICKER_TEXT = 'Swaroop Realty — Vrindavan — Vastu-Compliant — Sacred Development — 35+ Years — Premium Plots — ';
const TICKER_ITEMS = Array(6).fill(TICKER_TEXT).join('');

const Press = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-20%' });

    const beforeItalic = '"Swaroop Realty is redefining luxury living in Vrindavan. Their premium plot developments and bespoke villas are true';
    const italicPart = 'sanctuaries of peace and aesthetics';
    const afterItalic = '."';
    const allWords = beforeItalic.trim().split(' ');

    return (
        <section ref={ref} style={{ padding: 'var(--spacing-section) 0', backgroundColor: 'var(--color-bg)', position: 'relative', overflow: 'hidden', transition: 'background-color 0.8s ease' }}>
            <style>{`
                @keyframes pressTickerScroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                .press-ticker-track {
                    display: inline-flex;
                    white-space: nowrap;
                    animation: pressTickerScroll 30s linear infinite;
                    will-change: transform;
                }
                .press-ticker-track:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Minimal ambient background */}
            <div style={{
                position: 'absolute', top: '50%', left: '-5%',
                transform: 'translateY(-50%)',
                width: '600px', height: '600px',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath fill=\'none\' stroke=\'%230A1128\' stroke-width=\'0.3\' d=\'M10 90h80M20 90V50l30-20 30 20v40M30 90V65h15v25M65 70h10v10H65zM50 30v-10M45 20h10\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
                opacity: 0.04, zIndex: 0, pointerEvents: 'none',
            }} />

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                {/* Label */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-primary)', display: 'block', marginBottom: '3rem' }}
                >
                    In The Press
                </motion.span>

                {/* Word-by-word staggered quote */}
                <h2 style={{
                    fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-primary)',
                    maxWidth: '1000px',
                    margin: '0 auto 4rem auto',
                    lineHeight: 1.3,
                }}>
                    {allWords.map((word, i) => (
                        <React.Fragment key={i}>
                            <motion.span
                                initial={{ opacity: 0.08, y: 12 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                                style={{ display: 'inline-block', willChange: 'transform, opacity' }}
                            >
                                {word}
                            </motion.span>
                            {' '}
                        </React.Fragment>
                    ))}
                    <motion.span
                        initial={{ opacity: 0.08, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 + allWords.length * 0.055, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontStyle: 'italic', display: 'inline-block', willChange: 'transform, opacity' }}
                    >
                        {italicPart}
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0.08 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 + (allWords.length + 1) * 0.055 }}
                        style={{ display: 'inline-block' }}
                    >
                        {afterItalic}
                    </motion.span>
                </h2>

                {/* Attribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.1 + allWords.length * 0.055 + 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: '5rem' }}
                >
                    <div style={{ width: '60px', height: '1px', backgroundColor: 'var(--color-primary)', margin: '0 auto 1.5rem auto', opacity: 0.4 }} />
                    <span style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-text)', display: 'block', opacity: 0.6 }}>
                        Architectural Digest
                    </span>
                </motion.div>
            </div>

            {/* ── Infinite text ticker ───────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.8 }}
                style={{
                    borderTop: '1px solid var(--color-border)',
                    borderBottom: '1px solid var(--color-border)',
                    padding: '1rem 0',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <div className="press-ticker-track">
                    {/* Duplicate for seamless loop */}
                    {[0, 1].map((key) => (
                        <span key={key} style={{
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            color: 'var(--color-primary)',
                            opacity: 0.35,
                            paddingRight: '0',
                            fontFamily: 'var(--font-body)',
                        }}>
                            {TICKER_TEXT}
                        </span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Press;
