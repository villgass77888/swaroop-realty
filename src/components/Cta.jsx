import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const Cta = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-20%' });

    const heading = ['Ready to begin', 'your', 'journey?'];

    return (
        <section ref={ref} style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            padding: '140px 0',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Animated concentric arc lines */}
            <style>{`
                @keyframes ctaArcSpin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to   { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes ctaBtnPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.12); }
                    50%      { box-shadow: 0 0 0 16px rgba(255,255,255,0); }
                }
                .cta-btn-dark {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 18px 48px;
                    border: 1px solid rgba(255,255,255,0.35);
                    background: rgba(255,255,255,0.07);
                    color: var(--color-white);
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    border-radius: 2px;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    animation: ctaBtnPulse 3s ease-in-out infinite;
                    font-family: var(--font-body);
                }
                .cta-btn-dark:hover {
                    background: rgba(255,255,255,0.15);
                    border-color: rgba(255,255,255,0.65);
                    gap: 18px;
                    letter-spacing: 4px;
                }
            `}</style>

            {/* Slow-rotating arc background */}
            {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: `${30 + i * 18}vw`,
                    height: `${30 + i * 18}vw`,
                    border: `1px solid rgba(255,255,255,${0.025 - i * 0.003})`,
                    borderRadius: '50%',
                    animation: `ctaArcSpin ${18 + i * 6}s linear infinite ${i % 2 === 0 ? 'reverse' : ''}`,
                    pointerEvents: 'none',
                    zIndex: 0,
                }} />
            ))}

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Word-by-word heading */}
                <h2 style={{
                    fontSize: 'clamp(3rem, 5vw, 5rem)',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '-0.02em',
                    color: 'var(--color-white)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.1,
                }}>
                    {['Ready to', 'begin your'].map((line, lineIdx) => (
                        <span key={lineIdx} style={{ display: 'block' }}>
                            {line.split(' ').map((word, wi) => {
                                const overallIdx = lineIdx === 0 ? wi : 2 + wi;
                                return (
                                    <motion.span
                                        key={wi}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 1, delay: overallIdx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ display: 'inline-block', marginRight: '0.3em', willChange: 'transform, opacity' }}
                                    >
                                        {word}
                                    </motion.span>
                                );
                            })}
                        </span>
                    ))}
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 4 * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: 'block', fontStyle: 'italic', fontWeight: 'normal', willChange: 'transform, opacity' }}
                    >
                        journey?
                    </motion.span>
                </h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 0.65, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-white)',
                        maxWidth: '700px',
                        margin: '0 auto 4rem auto',
                        lineHeight: 1.5,
                    }}
                >
                    Connect with our private advisory team to discuss bespoke acquisitions and off-market opportunities.
                </motion.p>

                {/* Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link to="/contact" className="cta-btn-dark">
                        Schedule a Consultation
                        <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Cta;
