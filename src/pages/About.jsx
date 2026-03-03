import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import SEOHead from '../components/SEOHead';

/* ─── Animated Counter ────────────────────────────────────────────── */
const Counter = ({ value, label, suffix = "" }) => {
    const [isInView, setIsInView] = useState(false);
    const spring = useSpring(0, { bounce: 0, duration: 2500 });
    const display = useTransform(spring, (v) => Math.round(v));
    const { isMobile } = useIsMobile();

    useEffect(() => {
        if (isInView) spring.set(value);
    }, [isInView, value, spring]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            onViewportEnter={() => setIsInView(true)}
            transition={{ duration: 1 }}
        >
            <div style={{ display: 'flex', alignItems: 'baseline', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                <motion.span style={{ fontSize: isMobile ? '2.5rem' : '4rem', display: 'block' }}>
                    {display}
                </motion.span>
                <span style={{ fontSize: isMobile ? '2rem' : '3rem' }}>{suffix}</span>
            </div>
            <span style={{
                fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: isMobile ? '1px' : '2px',
                color: 'var(--color-text)', fontWeight: 500, display: 'block', lineHeight: 1.4, opacity: 0.7
            }}>
                {label}
            </span>
        </motion.div>
    );
};

/* ─── Differentiator Card ─────────────────────────────────────────── */
const DiffCard = ({ title, body, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '2rem',
            paddingBottom: '0.5rem',
        }}
    >
        <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '0.75rem', fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</h4>
        <p style={{ fontSize: '0.92rem', lineHeight: 1.75, color: 'var(--color-text)', opacity: 0.72 }}>{body}</p>
    </motion.div>
);

/* ─── Swipe Reveal Image ──────────────────────────────────────────── */
const RevealImage = ({ src, alt, style = {}, delay = 0 }) => (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
        <motion.img
            src={src} alt={alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', willChange: 'transform' }}
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay }}
        />
        <motion.div
            initial={{ top: 0 }}
            whileInView={{ top: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1], delay }}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'var(--color-bg)', zIndex: 1, willChange: 'top' }}
        />
    </div>
);

/* ─── Thin Divider ────────────────────────────────────────────────── */
const Divider = ({ my = '6rem' }) => (
    <div style={{ borderTop: '1px solid var(--color-border)', margin: `${my} 0` }} />
);

/* ─── About Page ──────────────────────────────────────────────────── */
const About = () => {
    const { isMobile, isTouch } = useIsMobile();

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
    };

    const sectionLabel = {
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '4px',
        color: 'var(--color-text)',
        opacity: 0.55,
        display: 'block',
        marginBottom: '1.5rem',
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
    };

    const bodyText = {
        fontSize: isMobile ? '1rem' : '1.08rem',
        lineHeight: 1.9,
        color: 'var(--color-text)',
        opacity: 0.8,
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', color: 'var(--color-primary)' }}
        >
            <SEOHead
                title="About Us — Trusted Real Estate Developer in Vrindavan Since 1990"
                description="Swaroop Realty was founded in 1990 by Maniram Sharma with 35+ years of real estate expertise in Vrindavan. Vastu-compliant development, transparent documentation, and ethical investment in Braj's sacred land."
                keywords="about Swaroop Realty, trusted real estate Vrindavan, real estate developer Vrindavan, Maniram Sharma Vrindavan, vastu compliant developer Braj, ethical real estate Vrindavan, real estate since 1990 Vrindavan, sacred land developer"
                canonical="/about"
            />
            {/* ── HERO ─────────────────────────────────────────────────── */}
            <div style={{
                position: 'relative',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: isMobile ? 'center' : 'flex-end',
                justifyContent: isMobile ? 'center' : 'flex-start',
                overflow: 'hidden', backgroundColor: 'var(--color-primary)',
                paddingBottom: isMobile ? 0 : '6rem',
                paddingLeft: isMobile ? 0 : '7%',
                paddingRight: isMobile ? 0 : 0,
            }}>
                <motion.div
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.2, ease: 'easeOut' }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
                >
                    <img
                        src="/vrindavan-sunrise.png"
                        alt="Vrindavan temple skyline at sunrise"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) saturate(1.1)' }}
                    />
                </motion.div>

                {/* Gradient vignette */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,17,40,0.88) 25%, rgba(10,17,40,0.25) 70%, transparent 100%)', zIndex: 1 }} />

                {/* Hero text */}
                <motion.div
                    style={{ position: 'relative', zIndex: 2, textAlign: isMobile ? 'center' : 'left', maxWidth: isMobile ? '90%' : '700px' }}
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.4 } } }}
                >
                    <motion.span
                        variants={fadeUp}
                        style={{ ...sectionLabel, color: 'rgba(255,255,255,0.55)', marginBottom: '1.25rem' }}
                    >
                        Swaroop Realty — Est. 1990
                    </motion.span>
                    <motion.h1
                        variants={fadeUp}
                        style={{
                            fontSize: isMobile ? 'clamp(2.6rem, 9vw, 3.8rem)' : 'clamp(4rem, 7vw, 7rem)',
                            lineHeight: 1.06, marginBottom: '1.5rem',
                            letterSpacing: '-0.025em', color: '#FFFFFF',
                            fontFamily: 'var(--font-heading)', fontWeight: 500,
                        }}
                    >
                        Our Legacy <em>of Trust</em>
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        style={{ fontSize: isMobile ? '1rem' : '1.15rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, maxWidth: '520px' }}
                    >
                        Three decades of disciplined development in sacred Vrindavan — guided by ethics, anchored in Vastu, built for generations.
                    </motion.p>
                </motion.div>


            </div>

            {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
            <div className="container" style={{ paddingTop: isMobile ? '5rem' : '10rem', paddingBottom: isMobile ? '5rem' : '10rem' }}>

                {/* ── INTRO / LEGACY ─────────────────────── */}
                <motion.div
                    initial="hidden" whileInView="show" viewport={{ once: true }}
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '5fr 7fr',
                        gap: isMobile ? '2.5rem' : '6rem',
                        alignItems: 'start',
                        marginBottom: isMobile ? '4rem' : '8rem',
                    }}
                >
                    <motion.div variants={fadeUp}>
                        <span style={sectionLabel}>Our Story</span>
                        <h2 style={{ fontSize: isMobile ? '1.85rem' : '2.8rem', fontFamily: 'var(--font-heading)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 0 }}>
                            Founded on Discipline.<br /><em>Built on Trust.</em>
                        </h2>
                    </motion.div>
                    <motion.div variants={fadeUp} style={{ paddingTop: isMobile ? 0 : '1rem' }}>
                        <p style={{ ...bodyText, marginBottom: '1.5rem' }}>
                            With over three decades of real estate expertise and public service leadership, Swaroop Realty represents disciplined, ethically guided development in one of India's most sacred destinations.
                        </p>
                        <p style={{ ...bodyText, marginBottom: '1.5rem' }}>
                            Founded by Maniram Sharma — a Government Headmaster and real estate veteran with 35 years of ground experience — the company is built on a foundation of structure, transparency, and long-term commitment. Not speculative ventures. Carefully envisioned sanctuaries designed for enduring value.
                        </p>
                        <p style={{ ...bodyText }}>
                            At Swaroop Realty, every decision is made with the same deliberateness with which a teacher shapes a student's future — with patience, precision, and a deep sense of responsibility.
                        </p>
                    </motion.div>
                </motion.div>

                {/* ── HERO IMAGE PAIRING ─────────────────── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '7fr 5fr',
                    gap: isMobile ? '1rem' : '1.5rem',
                    marginBottom: isMobile ? '4rem' : '9rem',
                    height: isMobile ? 'auto' : '580px',
                }}>
                    <RevealImage
                        src="/vrindavan-sunrise.png"
                        alt="Vrindavan temple skyline at sunrise"
                        style={{ height: isMobile ? '55vw' : '100%' }}
                        delay={0}
                    />
                    <RevealImage
                        src="/aerial-land.png"
                        alt="Vastu-aligned aerial plot layout"
                        style={{ height: isMobile ? '55vw' : '100%' }}
                        delay={0.1}
                    />
                </div>

                {/* ── STATISTICS ─────────────────────────── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: isMobile ? '2rem 1.5rem' : '2rem',
                    padding: isMobile ? '2.5rem 0' : '4rem 0',
                    borderTop: '1px solid var(--color-border)',
                    borderBottom: '1px solid var(--color-border)',
                    marginBottom: isMobile ? '4rem' : '9rem',
                }}>
                    <Counter value={35} suffix="+" label="Years of Experience" />
                    <Counter value={500} suffix="+" label="Families Served" />
                    <Counter value={12} suffix="+" label="Projects Delivered" />
                    <Counter value={100} suffix="%" label="Vastu-Compliant" />
                </div>

                {/* ── WHO WE ARE ─────────────────────────── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '5fr 7fr',
                    gap: isMobile ? '2.5rem' : '6rem',
                    alignItems: 'start',
                    marginBottom: isMobile ? '4rem' : '9rem',
                }}>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                        <span style={sectionLabel}>Who We Are</span>
                        <h2 style={{ fontSize: isMobile ? '1.85rem' : '2.8rem', fontFamily: 'var(--font-heading)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                            A Company <em>Shaped by</em> Purpose
                        </h2>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} style={{ paddingTop: isMobile ? 0 : '1rem' }}>
                        <p style={{ ...bodyText, marginBottom: '1.75rem' }}>
                            Swaroop Realty is a premium land and residential estate development company specialising in vastu-compliant communities in Vrindavan and the surrounding sacred regions of Braj.
                        </p>
                        <p style={{ ...bodyText, marginBottom: '2rem' }}>
                            We do not operate for short-term margins. We develop for generational value.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                'Traditional Vastu wisdom integrated at the master-planning stage',
                                'Thoughtful architectural planning aligned with sacred geometry',
                                'Strategic location selection within Braj Mandal',
                                'Clear titles and structured, transparent documentation',
                                'Long-term appreciation focus — land held as inheritance',
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -12 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}
                                >
                                    <span style={{ color: 'var(--color-primary)', opacity: 0.4, fontSize: '0.75rem', marginTop: '0.35rem', flexShrink: 0 }}>—</span>
                                    <span style={{ fontSize: '0.97rem', lineHeight: 1.7, color: 'var(--color-text)', opacity: 0.8 }}>{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── PHILOSOPHY ─────────────────────────── */}
                <div style={{
                    background: 'var(--color-primary)',
                    padding: isMobile ? '4rem 7%' : '7rem 8%',
                    marginBottom: isMobile ? '4rem' : '9rem',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Watermark monogram */}
                    <div style={{
                        position: 'absolute', right: isMobile ? '-2rem' : '-3rem', bottom: '-3rem',
                        fontSize: isMobile ? '12rem' : '20rem', lineHeight: 1,
                        fontFamily: 'var(--font-heading)', color: 'rgba(255,255,255,0.04)',
                        userSelect: 'none', pointerEvents: 'none', fontWeight: 700,
                    }}>
                        SR
                    </div>

                    <motion.span
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        style={{ ...sectionLabel, color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}
                    >
                        Our Philosophy
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontSize: isMobile ? '1.65rem' : 'clamp(2rem, 3.5vw, 3.2rem)',
                            fontFamily: 'var(--font-heading)', color: '#FFFFFF',
                            lineHeight: 1.2, maxWidth: '760px',
                            letterSpacing: '-0.02em', marginBottom: '2.5rem',
                        }}
                    >
                        Sacred cities demand <em>sacred development.</em>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontSize: isMobile ? '1rem' : '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)', maxWidth: '680px', marginBottom: '1.5rem' }}
                    >
                        Vrindavan is evolving — and evolution must be guided with responsibility and respect for its spiritual identity. We believe the growth of a sacred city must not dilute its essence, but deepen it.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontSize: isMobile ? '1rem' : '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)', maxWidth: '680px', marginBottom: '2.5rem' }}
                    >
                        We believe true luxury is alignment — between land, structure, and spirit. Each project is carefully selected for spiritual and infrastructural relevance, designed with vastu-aligned master planning, structured with disciplined execution, and developed for sustainable living across generations.
                    </motion.p>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? '1rem' : '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem' }}>
                        {[
                            { label: 'Spiritual Relevance', desc: 'Sites selected for sacred geography and lived meaning' },
                            { label: 'Vastu Master Planning', desc: 'Cosmic geometry applied from conception' },
                            { label: 'Disciplined Execution', desc: 'Structured delivery without shortcuts' },
                            { label: 'Generational Living', desc: 'Designed to endure — not just to impress' },
                        ].map((p, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}>
                                <div style={{ width: '24px', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }} />
                                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '0.5rem', letterSpacing: '0.01em' }}>{p.label}</p>
                                <p style={{ fontSize: '0.8rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.5)' }}>{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── VISION & MISSION ───────────────────── */}
                <div style={{ marginBottom: isMobile ? '4rem' : '9rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '3rem' : '6rem' }}>
                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span style={sectionLabel}>The Vision</span>
                            <h3 style={{
                                fontSize: isMobile ? '1.6rem' : '2.2rem', fontFamily: 'var(--font-heading)',
                                color: 'var(--color-primary)', marginBottom: '1.5rem', lineHeight: 1.15, letterSpacing: '-0.02em'
                            }}>
                                Redefining Sacred <em>Residential Living</em>
                            </h3>
                            <p style={{ ...bodyText, marginBottom: '1.2rem' }}>
                                To position Vrindavan as a globally respected destination for spiritually aligned, refined residential living — where families choose to settle not merely for convenience, but for a deeper sense of belonging to something enduring.
                            </p>
                            <p style={{ ...bodyText, marginBottom: '1.2rem' }}>
                                We envision communities where vastu principles are not an afterthought but the foundation — where the orientation of every street and the placement of every entrance has been considered with the same care as the architecture itself.
                            </p>
                            <p style={{ ...bodyText }}>
                                Our vision is not of expansion for its own sake. It is of thoughtful growth — measured, responsible, and always in harmony with the sacred character of the land.
                            </p>
                        </motion.div>

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            style={{ paddingTop: isMobile ? 0 : '0.5rem', borderLeft: isMobile ? 'none' : '1px solid var(--color-border)', paddingLeft: isMobile ? 0 : '5rem' }}
                        >
                            <span style={sectionLabel}>The Mission</span>
                            <h3 style={{
                                fontSize: isMobile ? '1.6rem' : '2.2rem', fontFamily: 'var(--font-heading)',
                                color: 'var(--color-primary)', marginBottom: '1.5rem', lineHeight: 1.15, letterSpacing: '-0.02em'
                            }}>
                                Meticulous Acquisition. <em>Conscious Design.</em>
                            </h3>
                            <p style={{ ...bodyText, marginBottom: '1.2rem' }}>
                                To meticulously acquire, design, and develop vastu-compliant estates that preserve the sacred geography of Braj while delivering exceptional quality and lasting value to every family that chooses to invest their trust in us.
                            </p>
                            <p style={{ ...bodyText, marginBottom: '1.2rem' }}>
                                We are committed to absolute transparency in land titles, clear documentation at every stage, and a structured delivery process that respects both the investor's confidence and the sanctity of the land itself.
                            </p>
                            <p style={{ ...bodyText }}>
                                Our mission is driven not by quarterly targets, but by the question every founder must ask — what kind of legacy does this development leave behind? At Swaroop Realty, the answer must always be: one of integrity, value, and spiritual alignment.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* ── WHAT SETS US APART ─────────────────── */}
                <div style={{ marginBottom: isMobile ? '4rem' : '9rem' }}>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: isMobile ? '2.5rem' : '4rem' }}>
                        <span style={sectionLabel}>Differentiators</span>
                        <h2 style={{ fontSize: isMobile ? '1.85rem' : '2.8rem', fontFamily: 'var(--font-heading)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                            What Sets <em>Us Apart</em>
                        </h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(5, 1fr)', gap: isMobile ? '1.5rem' : '2rem' }}>
                        <DiffCard delay={0} title="35+ Years of Ground Experience" body="Deep understanding of land valuation, legal compliance, and long-cycle growth specific to the Braj region." />
                        <DiffCard delay={0.07} title="Educational Leadership Foundation" body="Ethics, discipline, and structured execution are not aspirational values here — they are operational defaults, inherited from a career in public education." />
                        <DiffCard delay={0.14} title="Vastu-Aligned Master Planning" body="Layouts calibrated with traditional cosmic geometry from the earliest planning stage — not retrofitted as an afterthought." />
                        <DiffCard delay={0.21} title="Complete Transparency" body="Clear titles. Structured documentation. Verified approvals. No shortcuts in paperwork, ever." />
                        <DiffCard delay={0.28} title="Community-Centred Development" body="We build neighbourhoods with shared identity — not isolated inventory. Long-term liveability shapes every plan." />
                    </div>
                </div>

                {/* ── FOUNDER MESSAGE ─────────────────────── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '4fr 8fr',
                    gap: isMobile ? '2rem' : '7rem',
                    alignItems: 'start',
                    marginBottom: isMobile ? '4rem' : '9rem',
                    paddingTop: isMobile ? '3rem' : '4rem',
                    borderTop: '1px solid var(--color-border)',
                }}>
                    {/* Portrait column */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: isMobile ? 'relative' : 'sticky', top: isMobile ? 'auto' : '7rem' }}
                    >
                        <div style={{ position: 'relative', width: isMobile ? '100%' : '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
                            <img
                                src="/founder-portrait.jpg"
                                alt="Maniram Sharma, Founder — Swaroop Realty"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'grayscale(15%)' }}
                            />
                            {/* Name plate */}
                            <div style={{
                                position: 'absolute', bottom: 0, left: 0, right: 0,
                                background: 'linear-gradient(to top, rgba(10,17,40,0.9) 60%, transparent 100%)',
                                padding: '2.5rem 1.5rem 1.5rem',
                            }}>
                                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 500, marginBottom: '0.2rem' }}>Maniram Sharma</p>
                                <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.55)' }}>Founder, Swaroop Realty</p>
                            </div>
                        </div>

                        {!isMobile && (
                            <div style={{ marginTop: '1.5rem' }}>
                                <p style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-text)', opacity: 0.45, marginBottom: '0.5rem' }}>Background</p>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-text)', opacity: 0.7 }}>Former Government Headmaster, Haryana</p>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-text)', opacity: 0.7 }}>35+ Years in Real Estate</p>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-text)', opacity: 0.7 }}>Vrindavan Development Expert</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Message column */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ paddingTop: isMobile ? 0 : '0.5rem' }}
                    >
                        <span style={sectionLabel}>A Message from the Founder</span>
                        <h2 style={{ fontSize: isMobile ? '1.65rem' : '2.6rem', fontFamily: 'var(--font-heading)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>
                            Built on Education. <em>Guided by Experience.</em>
                        </h2>

                        {[
                            'For over 35 years, my journey has been shaped by two defining commitments — education and real estate.',
                            'As a Headmaster in the Haryana Government, I dedicated my life to discipline, character-building, and guiding future generations with integrity. Alongside this, my decades of experience in real estate taught me that land is never just a transaction — it is a responsibility.',
                            'Swaroop Realty was not built merely as a business venture. It was established with a deeper purpose — to develop sacred land with respect, structure, and long-term vision.',
                            'Vrindavan is not just a location. It is an emotion, a spiritual vibration, and a legacy that must be nurtured thoughtfully.',
                            'At Swaroop Realty, we do not sell plots. We curate sanctuaries — vastu-aligned, ethically developed, and built to endure across generations.',
                            'My foundation in education instilled ethics. My experience in real estate refined vision. Swaroop Realty stands at the intersection of both.',
                        ].map((para, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ duration: 0.9, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                style={{ ...bodyText, marginBottom: '1.4rem' }}
                            >
                                {para}
                            </motion.p>
                        ))}

                        {/* Core commitments */}
                        <div style={{
                            borderLeft: '2px solid var(--color-primary)', paddingLeft: '1.5rem', margin: '2.5rem 0',
                        }}>
                            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-text)', opacity: 0.5, marginBottom: '1rem' }}>Our Commitment</p>
                            {['Build with integrity.', 'Develop with purpose.', 'Preserve sanctity.', 'Create lasting value.'].map((c, i) => (
                                <motion.p key={i}
                                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                                    style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', lineHeight: 1.5, fontStyle: 'italic' }}
                                >
                                    {c}
                                </motion.p>
                            ))}
                        </div>

                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', opacity: 0.55, fontStyle: 'italic' }}>— Maniram Sharma</p>
                    </motion.div>
                </div>

                {/* ── COMMITMENT BAND ─────────────────────── */}
                <div style={{
                    padding: isMobile ? '3.5rem 7%' : '5rem 8%',
                    background: 'var(--color-bg-alt)',
                    marginBottom: isMobile ? '4rem' : '6rem',
                    borderTop: '1px solid var(--color-border)',
                    borderBottom: '1px solid var(--color-border)',
                }}>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '2.5rem' }}>
                        <span style={sectionLabel}>Our Commitment</span>
                        <h2 style={{ fontSize: isMobile ? '1.9rem' : '2.5rem', fontFamily: 'var(--font-heading)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                            Every project reflects what we stand for.
                        </h2>
                    </motion.div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? '1.5rem' : '3rem' }}>
                        {[
                            { label: 'Respect for Sacred Land', desc: 'We treat Vrindavan\'s geography as a living heritage, not a commodity.' },
                            { label: 'Commitment to Integrity', desc: 'Every representation we make — in documentation and design — is honoured.' },
                            { label: 'Architectural Discipline', desc: 'Structured layouts grounded in vastu and sound planning principles.' },
                            { label: 'Long-Term Confidence', desc: 'We invest in relationships that last well beyond the point of sale.' },
                        ].map((c, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div style={{ width: '2rem', height: '2px', background: 'var(--color-primary)', marginBottom: '1.25rem', opacity: 0.4 }} />
                                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.6rem', fontFamily: 'var(--font-heading)' }}>{c.label}</p>
                                <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--color-text)', opacity: 0.65 }}>{c.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── CLOSING STATEMENT ──────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto', paddingBottom: isMobile ? '2rem' : '3rem' }}
                >
                    <h2 style={{
                        fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 4vw, 4rem)',
                        fontFamily: 'var(--font-heading)', lineHeight: 1.1,
                        letterSpacing: '-0.025em', marginBottom: '2rem',
                        color: 'var(--color-primary)',
                    }}>
                        At Swaroop Realty,<br />luxury is not loud.
                    </h2>
                    <p style={{ fontSize: isMobile ? '1rem' : '1.15rem', lineHeight: 1.8, color: 'var(--color-text)', opacity: 0.65, marginBottom: '3rem' }}>
                        It is intentional. It is aligned. It is enduring.
                    </p>

                    <style>{`
                        .about-cta-link {
                            display: inline-flex; align-items: center; gap: 10px;
                            padding-bottom: 10px; border-bottom: 1px solid var(--color-primary);
                            color: var(--color-primary); text-decoration: none;
                            text-transform: uppercase; letter-spacing: 2px;
                            font-size: 0.82rem; font-weight: 500; transition: all 0.3s ease;
                        }
                        body.dark-mode .about-cta-link {
                            border-bottom-color: var(--color-white); color: var(--color-white);
                        }
                        .about-cta-link:hover { gap: 16px; opacity: 0.65; }
                    `}</style>
                    <Link to="/projects" className="about-cta-link">
                        View Our Projects <span style={{ fontSize: '1.1rem' }}>&rarr;</span>
                    </Link>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default About;
