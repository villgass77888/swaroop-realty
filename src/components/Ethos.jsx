import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

// Clip-from-below reveal — used for heading lines
const ClipLine = ({ children, delay = 0, style = {} }) => (
    <div style={{ overflow: 'hidden', ...style }}>
        <motion.div
            initial={{ y: 72 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 1.0, delay, ease: [0.77, 0, 0.175, 1] }}
            style={{ willChange: 'transform' }}
        >
            {children}
        </motion.div>
    </div>
);

const Ethos = () => {
    const { isMobile } = useIsMobile();

    const headingStyle = {
        display: 'block',
        fontFamily: 'var(--font-heading)',
        fontSize: isMobile ? 'clamp(3rem, 8vw, 5rem)' : 'clamp(3rem, 5vw, 5rem)',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
    };

    return (
        <section id="ethos" style={{ padding: 'var(--spacing-section) 0', position: 'relative', overflow: 'hidden' }}>

            {/* ── Giant kinetic watermark number ─────────────────── */}
            {!isMobile && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    style={{
                        position: 'absolute', top: '50%', right: '-2%',
                        fontSize: 'clamp(18rem, 28vw, 36rem)',
                        fontFamily: 'var(--font-heading)', lineHeight: 0.8,
                        color: 'rgba(0,0,0,0.03)', zIndex: 0,
                        pointerEvents: 'none', userSelect: 'none',
                        transform: 'translateY(-50%)',
                    }}
                >
                    35
                </motion.div>
            )}

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {isMobile ? (
                    /* ── Mobile: stagger ─────────────────────────── */
                    <motion.div
                        initial="hidden" whileInView="show"
                        viewport={{ once: true, margin: '-10%' }}
                        variants={stagger}
                        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                    >
                        <div>
                            <motion.h4 variants={fadeUp} style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '5px', color: 'inherit', opacity: 0.55, marginBottom: '1.2rem' }}>
                                Founded on Discipline
                            </motion.h4>
                            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1 }}>
                                Built on Discipline.<br />
                                <span style={{ fontStyle: 'italic' }}>Rooted in Trust.</span>
                            </motion.h2>
                        </div>

                        <motion.div variants={fadeUp} style={{ width: '100%', height: '55vw', maxHeight: '380px', overflow: 'hidden' }}>
                            <img src="/vrindavan-sunrise.png" alt="Vrindavan temple skyline at sunrise"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                        </motion.div>

                        <motion.p variants={fadeUp} style={{ fontSize: '1rem', lineHeight: 1.8, color: 'inherit' }}>
                            Rooted in 35 years of ground experience and a foundation of public service ethics, Swaroop Realty
                            develops vastu-aligned communities on the sacred land of Vrindavan — with discipline, transparency,
                            and long-term purpose.
                        </motion.p>

                        <motion.div variants={fadeUp}>
                            <style>{`.ethos-btn{display:inline-flex;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid var(--color-primary);color:var(--color-primary);text-decoration:none;text-transform:uppercase;letter-spacing:2px;font-size:0.85rem;font-weight:500;transition:all 0.3s ease;} body.dark-mode .ethos-btn{border-bottom-color:var(--color-white);color:var(--color-white);} .ethos-btn:hover{gap:15px;opacity:0.7;}`}</style>
                            <Link to="/about" className="ethos-btn">Our Story <span style={{ fontSize: '1.2rem' }}>&rarr;</span></Link>
                        </motion.div>
                    </motion.div>
                ) : (
                    /* ── Desktop: two-column with clip-reveal heading ─ */
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem', alignItems: 'center' }}>

                        {/* Left: text */}
                        <div style={{ gridColumn: 'span 5', position: 'relative', zIndex: 2 }}>
                            <style>{`.ethos-btn{display:inline-flex;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid var(--color-primary);color:var(--color-primary);text-decoration:none;text-transform:uppercase;letter-spacing:2px;font-size:0.85rem;font-weight:500;transition:all 0.3s ease;} body.dark-mode .ethos-btn{border-bottom-color:var(--color-white);color:var(--color-white);} .ethos-btn:hover{gap:15px;opacity:0.7;}`}</style>

                            {/* Label */}
                            <motion.h4
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10%' }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '5px', color: 'inherit', opacity: 0.55, marginBottom: '1.8rem', willChange: 'transform, opacity' }}
                            >
                                Founded on Discipline
                            </motion.h4>

                            {/* Heading — each line clips up from below */}
                            <ClipLine delay={0.1} style={{ marginBottom: '0.1rem' }}>
                                <span style={headingStyle}>Built on Discipline.</span>
                            </ClipLine>
                            <ClipLine delay={0.22} style={{ marginBottom: '2.5rem' }}>
                                <span style={{ ...headingStyle, fontStyle: 'italic' }}>Rooted in Trust.</span>
                            </ClipLine>

                            {/* Paragraphs */}
                            <motion.p
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10%' }}
                                transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'inherit', marginBottom: '1.5rem' }}
                            >
                                Rooted in 35 years of ground experience and a foundation of public service ethics,
                                Swaroop Realty is built on the principles of structure, integrity, and patient long-term vision.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10%' }}
                                transition={{ duration: 1.1, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
                                style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'inherit', marginBottom: '3rem' }}
                            >
                                We develop vastu-aligned communities on the sacred land of Vrindavan.
                                Not for short-term yield — for generational value.
                            </motion.p>

                            {/* Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10%' }}
                                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link to="/about" className="ethos-btn">
                                    Our Story <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right: image with gentle scale-in */}
                        <div style={{ gridColumn: 'span 7', position: 'relative', height: '900px' }}>
                            {/* Decorative large number behind image */}
                            <div style={{
                                position: 'absolute', top: '-50px', right: '-100px',
                                fontSize: '40rem', fontFamily: 'var(--font-heading)', lineHeight: 0.8,
                                color: 'rgba(0,0,0,0.02)', zIndex: 0, pointerEvents: 'none', userSelect: 'none',
                            }}>01</div>

                            <motion.div
                                initial={{ scale: 1.08, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, margin: '-10%' }}
                                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                                style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', overflow: 'hidden', willChange: 'transform' }}
                            >
                                <img
                                    src="/vrindavan-sunrise.png"
                                    alt="Vrindavan temple skyline at sunrise"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                                />
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Ethos;
