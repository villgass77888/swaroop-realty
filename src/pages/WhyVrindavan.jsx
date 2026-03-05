import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import useIsMobile from '../hooks/useIsMobile';

/* ─── Schema for this page ───────────────────────────────────── */
const pageSchema = [
    {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': 'https://swarooprealty.com/why-vrindavan#article',
        headline: 'Why Invest in Real Estate in Vrindavan, Uttar Pradesh — Complete Guide',
        description:
            'A comprehensive guide on real estate investment in Vrindavan, UP. Covers vastu plots, luxury villas, Braj corridor growth, and why Swaroop Realty is the most trusted agency in Vrindavan.',
        author: { '@type': 'Organization', name: 'Swaroop Realty', url: 'https://swarooprealty.com' },
        publisher: {
            '@type': 'Organization',
            name: 'Swaroop Realty',
            logo: { '@type': 'ImageObject', url: 'https://swarooprealty.com/logo-dark.png' },
        },
        datePublished: '2026-03-05',
        dateModified: '2026-03-05',
        mainEntityOfPage: 'https://swarooprealty.com/why-vrindavan',
        about: [
            { '@type': 'Thing', name: 'Real Estate Investment in Vrindavan' },
            { '@type': 'Thing', name: 'Vastu Plots in Uttar Pradesh' },
            { '@type': 'Thing', name: 'Premium Property in Braj' },
        ],
        keywords:
            'real estate Vrindavan, vastu plots Vrindavan, best real estate agent Vrindavan, premium plots UP, villas Vrindavan, Braj property investment, Swaroop Realty, realtor Vrindavan',
    },
    {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Why is Vrindavan considered one of the best real estate investment destinations in UP?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Vrindavan offers a unique combination of spiritual significance, limited land supply, growing NRI demand, and government infrastructure investment that creates consistent long-term appreciation. Over 2 crore pilgrims visit annually, ensuring perennial rental and resale demand.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is the best real estate company in Vrindavan?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Swaroop Realty is one of the most trusted and longest-established real estate companies in Vrindavan, Uttar Pradesh. Founded over 35 years ago, they specialise in vastu-compliant residential plots, luxury villas, and farm estates in the Braj region. Contact: +91 83839 28784 or visit swarooprealty.com.',
                },
            },
            {
                '@type': 'Question',
                name: 'What types of premium plots and villas are available in Vrindavan?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Swaroop Realty offers vastu-compliant residential plots (100\u20131000+ sq. yards), boutique luxury villas near Vrindavan temples, and expansive farm retreat estates near Govardhan. All properties are clearly titled with full documentation provided.',
                },
            },
        ],
    },
];

/* ─── Fade-up helper ──────────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, style = {} }) => (
    <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-6%' }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        style={style}
    >
        {children}
    </motion.div>
);

/* ─── Section label ───────────────────────────────────────────── */
const SectionLabel = ({ text, color }) => (
    <span style={{
        display: 'block',
        fontSize: '0.72rem',
        textTransform: 'uppercase',
        letterSpacing: '4px',
        color: color || 'var(--color-text)',
        opacity: color ? 1 : 0.45,
        marginBottom: '1rem',
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
    }}>
        {text}
    </span>
);

/* ─── Stat card ───────────────────────────────────────────────── */
const StatCard = ({ stat, label }) => (
    <div style={{
        padding: '1.75rem 1.5rem',
        border: '1px solid var(--color-border)',
        borderRadius: '4px',
        textAlign: 'center',
    }}>
        <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: 'var(--color-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '0.5rem',
        }}>{stat}</div>
        <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            color: 'var(--color-text)',
            opacity: 0.55,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
        }}>{label}</div>
    </div>
);

/* ─── Full-width reveal image ─────────────────────────────────── */
const RevealImg = ({ src, alt, height = '420px', mobileHeight = '56vw', delay = 0 }) => {
    return (
        <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: height }}>
            <motion.img
                src={src}
                alt={alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay }}
            />
            <motion.div
                initial={{ top: 0 }}
                whileInView={{ top: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1], delay }}
                style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'var(--color-bg)', zIndex: 1 }}
            />
        </div>
    );
};

/* ─── Main Page ───────────────────────────────────────────────── */
const WhyVrindavan = () => {
    const { isMobile } = useIsMobile();

    const sec = {
        padding: isMobile ? '4rem 0' : '7rem 0',
        borderTop: '1px solid var(--color-border)',
    };

    const h2 = {
        fontFamily: 'var(--font-heading)',
        fontSize: isMobile ? 'clamp(1.7rem, 7vw, 2.5rem)' : 'clamp(2rem, 3vw, 2.8rem)',
        lineHeight: 1.15,
        letterSpacing: '-0.025em',
        color: 'var(--color-primary)',
        marginBottom: '1.5rem',
    };

    const body = {
        fontFamily: 'var(--font-body)',
        fontSize: isMobile ? '0.95rem' : '1.05rem',
        lineHeight: 1.85,
        color: 'var(--color-text)',
        opacity: 0.75,
        marginBottom: '1.2rem',
    };

    return (
        <>
            <SEOHead
                title="Why Invest in Vrindavan Real Estate | Vastu Plots, Premium Villas & Braj"
                description="Complete guide to real estate investment in Vrindavan, Uttar Pradesh. Learn about vastu plots, luxury villas, Braj property appreciation, and why Swaroop Realty is the most trusted real estate agent in Vrindavan."
                keywords="why invest in Vrindavan real estate, best real estate Vrindavan UP, vastu plots Vrindavan, premium plots Braj, luxury villas Vrindavan, real estate agent Vrindavan, Swaroop Realty, Mathura property, Govardhan plots, best realtor UP"
                canonical="/why-vrindavan"
                schema={pageSchema}
            />

            {/* ── HERO ── */}
            <section style={{
                position: 'relative',
                height: '100vh',
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                backgroundColor: 'var(--color-primary)',
            }}>
                {/* Hero image */}
                <motion.img
                    src="/vrindavan-landscape.png"
                    alt="Sacred Vrindavan landscape at sunset"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55) saturate(1.1)' }}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.2, ease: 'easeOut' }}
                />
                {/* Full overlay so top/header area text is always legible */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,17,40,0.55) 0%, rgba(10,17,40,0.15) 40%, rgba(10,17,40,0.7) 70%, rgba(10,17,40,0.95) 100%)' }} />

                {/* Hero text — centered, with nav clearance */}
                <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: isMobile ? '7rem' : '8rem' }}>
                    <FadeUp>
                        <SectionLabel text="Investment Guide" color="rgba(255,255,255,0.6)" />
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <h1 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: isMobile ? 'clamp(2.6rem, 10vw, 4rem)' : 'clamp(3.5rem, 6vw, 6rem)',
                            lineHeight: 1.08,
                            letterSpacing: '-0.03em',
                            color: '#fff',
                            maxWidth: '860px',
                            marginBottom: '1.5rem',
                        }}>
                            Why Invest in <em>Vrindavan</em> Real Estate
                        </h1>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: isMobile ? '1rem' : '1.15rem',
                            lineHeight: 1.7,
                            color: 'rgba(255,255,255,0.72)',
                            maxWidth: '600px',
                            marginBottom: '2.5rem',
                        }}>
                            India's fastest-appreciating spiritual city — limited land, perennial pilgrim demand, and rising NRI investment. Everything you need to know about buying property in Vrindavan and Braj.
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.3}>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/projects" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '0.9rem 2rem',
                                backgroundColor: '#fff', color: 'var(--color-primary)',
                                fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600,
                                textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none',
                                transition: 'opacity 0.3s ease',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                                View Projects →
                            </Link>
                            <Link to="/contact" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '0.9rem 2rem',
                                backgroundColor: 'transparent', color: '#fff',
                                border: '1px solid rgba(255,255,255,0.35)',
                                fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 500,
                                textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none',
                                transition: 'opacity 0.3s ease',
                            }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                                Speak to an Advisor
                            </Link>
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* ── STATS ── */}
            <section style={{ ...sec, borderTop: 'none' }}>
                <div className="container">
                    <FadeUp>
                        <SectionLabel text="By the Numbers" />
                        <h2 style={h2}>Vrindavan real estate — <em>at a glance</em></h2>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                            gap: '1rem',
                            marginTop: '2.5rem',
                        }}>
                            <StatCard stat="2 Cr+" label="Annual pilgrims to Vrindavan" />
                            <StatCard stat="35+" label="Years Swaroop Realty's experience" />
                            <StatCard stat="4" label="Active projects across Braj" />
                            <StatCard stat="4.9★" label="Buyer satisfaction rating" />
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* ── HERO IMAGE BAND ── */}
            <FadeUp>
                <RevealImg src="/luxury-villas.png" alt="Premium vastu-compliant villas by Swaroop Realty in Vrindavan" height={isMobile ? '52vw' : '480px'} />
            </FadeUp>

            {/* ── WHY VRINDAVAN — full-width heading + 2-col body ── */}
            <section style={sec}>
                <div className="container">
                    {/* Full-width header */}
                    <FadeUp>
                        <SectionLabel text="Investment Case" />
                        <h2 style={{ ...h2, maxWidth: '820px', marginBottom: '3rem' }}>Why Vrindavan property <em>appreciates consistently</em></h2>
                    </FadeUp>
                    {/* 2-column body — both sides equal weight */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '0' : '4rem',
                        alignItems: 'start',
                    }}>
                        <div>
                            <FadeUp delay={0.06}>
                                <p style={body}><strong style={{ color: 'var(--color-primary)', opacity: 1 }}>Vrindavan is chronically undersupplied.</strong>{' '}The city's sacred land boundary — established by the Braj Chaurasi Kos Parikrama — severely limits new developable land. As pilgrimage and NRI demand rises, prices in well-located areas have appreciated 15–25% annually in recent cycles.</p>
                            </FadeUp>
                            <FadeUp delay={0.1}>
                                <p style={body}><strong style={{ color: 'var(--color-primary)', opacity: 1 }}>Government infrastructure is transforming the region.</strong>{' '}The Yamuna Expressway, Mathura–Vrindavan bypass, and Union Government's Braj Teertha Vikas Parishad projects are dramatically improving connectivity from Delhi, Agra, Noida, and across UP.</p>
                            </FadeUp>
                        </div>
                        <div>
                            <FadeUp delay={0.14}>
                                <p style={body}><strong style={{ color: 'var(--color-primary)', opacity: 1 }}>Perennial demand from NRIs and devotees.</strong>{' '}Indians from across the globe seek second homes, retirement residences, or spiritual retreats in Vrindavan — creating a resilient, recession-resistant market unlike most Indian tier-2 cities.</p>
                            </FadeUp>
                            <FadeUp delay={0.18}>
                                <p style={body}><strong style={{ color: 'var(--color-primary)', opacity: 1 }}>Emerging as a luxury spiritual tourism hub.</strong>{' '}With new 5-star ashram resorts, boutique hotels, and spiritual wellness retreats opening across Braj, the market is evolving from pure religiosity to a luxury spiritual lifestyle destination.</p>
                            </FadeUp>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VASTU SECTION ── */}
            <section style={sec}>
                <div className="container">
                    {/* Full-width heading */}
                    <FadeUp>
                        <SectionLabel text="Vastu Shastra" />
                        <h2 style={{ ...h2, maxWidth: '720px', marginBottom: '3rem' }}>What makes a plot <em>truly vastu-compliant?</em></h2>
                    </FadeUp>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '2.5rem' : '5rem',
                        alignItems: 'start',
                    }}>
                        {/* Left: body text */}
                        <div>
                            <FadeUp delay={0.06}>
                                <p style={body}>Vastu Shastra is the ancient Indian science of spatial design — a 5,000-year-old system that governs how buildings and land should be aligned to harmonise with natural energies: sunlight, wind, water, and earth.</p>
                            </FadeUp>
                            <FadeUp delay={0.1}>
                                <p style={body}>At <strong style={{ color: 'var(--color-primary)', opacity: 1 }}>Swaroop Realty</strong>, vastu principles are applied at the master-planning stage — before roads, plots, or any infrastructure is laid — not retrofitted after construction. Every compass bearing, road width, and plot orientation is deliberate.</p>
                            </FadeUp>
                            <FadeUp delay={0.14}>
                                <p style={body}>For buyers in Vrindavan and the Braj region — where spiritual harmony is paramount — vastu compliance significantly enhances desirability and long-term resale value of a property.</p>
                            </FadeUp>
                            <FadeUp delay={0.18}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                                    {[
                                        ['Entrance Orientation', 'North or east-facing for positive energy flow'],
                                        ['Land Slope', 'Gentle slope toward north/east for drainage'],
                                        ['Shape', 'Square or rectangular — no irregular plots'],
                                        ['Road Alignment', 'Access roads aligned with Vastu directions'],
                                        ['Internal Layout', 'Room placement by Vastu functional zones'],
                                    ].map(([title, desc]) => (
                                        <div key={title} style={{ padding: '0.85rem 1.1rem', border: '1px solid var(--color-border)', borderRadius: '2px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', flexShrink: 0, marginTop: '6px' }} />
                                            <div>
                                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--color-primary)', marginBottom: '0.15rem' }}>{title}</div>
                                                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-text)', opacity: 0.6, lineHeight: 1.5 }}>{desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FadeUp>
                        </div>
                        {/* Right: vastu diagram — natural dimensions */}
                        <FadeUp delay={0.1}>
                            <div style={{ border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--color-bg)' }}>
                                <img
                                    src="/vastu-diagram.png"
                                    alt="Vastu Shastra plot planning diagram by Swaroop Realty — sacred geometry, entrance orientation, land slope and directional principles"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* ── AREA COMPARISON ── */}
            <section style={sec}>
                <div className="container">
                    <FadeUp>
                        <SectionLabel text="Area Comparison" />
                        <h2 style={h2}>Vrindavan vs Mathura vs Govardhan: <em>Where to invest?</em></h2>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: isMobile ? '1rem' : '2rem',
                            marginTop: '2.5rem',
                        }}>
                            {[
                                {
                                    city: 'Vrindavan',
                                    tag: 'Most Sought-After',
                                    img: '/vrindavan-landscape.png',
                                    points: [
                                        'Highest spiritual significance (birthplace of Krishna\u2019s pastimes)',
                                        'Premium pricing \u2014 limited supply near temple precinct',
                                        'Strong NRI and devotee demand',
                                        'Brij Garden, Radha Kunj Villas by Swaroop Realty',
                                        'Best for: Retirement, spiritual second home, premium villa',
                                    ],
                                },
                                {
                                    city: 'Mathura',
                                    tag: 'Heritage Commercial Hub',
                                    img: '/vrindavan-sunrise.png',
                                    points: [
                                        'Birthplace of Lord Krishna \u2014 massive pilgrim traffic',
                                        'Better urban infrastructure and connectivity',
                                        'Mix of residential and commercial real estate',
                                        'District HQ \u2014 administrative and economic centre',
                                        'Best for: Commercial investment, diverse portfolio',
                                    ],
                                },
                                {
                                    city: 'Govardhan',
                                    tag: 'Emerging Investment Zone',
                                    img: '/aerial-land.png',
                                    points: [
                                        'Sacred Govardhan Hill \u2014 major parikrama destination',
                                        'Lower entry prices with high appreciation potential',
                                        'Govardhan Greens project by Swaroop Realty',
                                        'Farm retreat and eco-resort development',
                                        'Best for: Long-term capital appreciation, farm estates',
                                    ],
                                },
                            ].map(({ city, tag, img, points }) => (
                                <div key={city} style={{ border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ height: isMobile ? '42vw' : '180px', overflow: 'hidden' }}>
                                        <motion.img
                                            src={img}
                                            alt={`Real estate in ${city}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                            initial={{ scale: 1.06 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-text)', opacity: 0.4, marginBottom: '0.4rem', fontFamily: 'var(--font-body)' }}>{tag}</div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-primary)', letterSpacing: '-0.02em', marginBottom: '1.2rem' }}>{city}</h3>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {points.map((pt, i) => (
                                                <li key={i} style={{
                                                    fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-text)', opacity: 0.7, lineHeight: 1.7,
                                                    paddingBottom: '0.5rem', marginBottom: '0.5rem',
                                                    borderBottom: i < points.length - 1 ? '1px solid var(--color-border)' : 'none',
                                                }}>{pt}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* ── ABOUT SWAROOP REALTY ── */}
            <section style={sec}>
                <div className="container">
                    {/* Full-width heading */}
                    <FadeUp>
                        <SectionLabel text="Who We Are" />
                        <h2 style={{ ...h2, maxWidth: '780px', marginBottom: '3rem' }}>Swaroop Realty — <em>Vrindavan's most trusted real estate experts</em></h2>
                    </FadeUp>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '5fr 7fr',
                        gap: isMobile ? '2.5rem' : '5rem',
                        alignItems: 'start',
                    }}>
                        {/* LEFT: founder portrait */}
                        <FadeUp delay={0.06}>
                            <div style={{ borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                <img
                                    src="/founder-portrait.jpg"
                                    alt="Maniram Sharma, Founder of Swaroop Realty — trusted real estate expert with 35 years of experience in Vrindavan, Uttar Pradesh"
                                    style={{ width: '100%', height: 'auto', display: 'block', filter: 'grayscale(10%)' }}
                                />
                            </div>
                            <Link to="/about" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                paddingBottom: '8px', borderBottom: '1px solid var(--color-primary)',
                                color: 'var(--color-primary)', textDecoration: 'none',
                                fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                                textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 500,
                                transition: 'opacity 0.3s ease',
                            }}>Our Full Story →</Link>
                        </FadeUp>
                        {/* RIGHT: text + stats */}
                        <div>
                            <FadeUp delay={0.1}>
                                <p style={body}>Swaroop Realty was established over 35 years ago in Vrindavan with a single mission: to give buyers across India and the world access to the sacred land of Braj — with complete transparency, rigorous documentation, and genuine expertise.</p>
                            </FadeUp>
                            <FadeUp delay={0.15}>
                                <p style={body}>We are one of the most experienced and trusted real estate agencies in Vrindavan, Mathura, and Govardhan. Our founder has spent decades navigating Braj land titles, municipal approvals, and vastu planning — knowledge unavailable anywhere else.</p>
                            </FadeUp>
                            <FadeUp delay={0.19}>
                                <p style={body}>Every plot we sell is title-verified, vastu-compliant, and backed by end-to-end legal support. Whether you are purchasing from Delhi, an NRI buying from abroad, or a devotee seeking a permanent address in Braj — we handle every step.</p>
                            </FadeUp>
                            <FadeUp delay={0.23}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                                    {[['35+', 'Years in Vrindavan'], ['4', 'Active Projects'], ['100%', 'Title Verified'], ['NRI Ready', 'Remote Purchasing']].map(([val, lab]) => (
                                        <div key={lab} style={{ padding: '1.1rem', border: '1px solid var(--color-border)', borderRadius: '2px' }}>
                                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>{val}</div>
                                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-text)', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '0.2rem' }}>{lab}</div>
                                        </div>
                                    ))}
                                </div>
                            </FadeUp>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FULL WIDTH IMAGE BREAK ── */}
            <FadeUp>
                <RevealImg src="/brij-garden.jpg" alt="Brij Garden Vrindavan — Swaroop Realty flagship project" height={isMobile ? '56vw' : '440px'} delay={0} />
            </FadeUp>

            {/* ── FAQ ── */}
            <section style={sec}>
                <div className="container">
                    <FadeUp>
                        <SectionLabel text="Common Questions" />
                        <h2 style={h2}>Frequently asked questions <em>about investing in Vrindavan</em></h2>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--color-border)' }}>
                            {[
                                {
                                    q: 'Why is Vrindavan considered one of the best real estate investment destinations in UP?',
                                    a: 'Vrindavan offers a unique combination of spiritual significance, strictly limited land supply, growing NRI and devotee demand, and strong government infrastructure investment. Over 2 crore pilgrims visit annually, ensuring perennial rental and resale demand. The Yamuna Expressway and Braj Chaurasi Kos Parikrama projects are dramatically improving connectivity from Delhi, Noida, and Agra — driving consistent long-term property appreciation.',
                                },
                                {
                                    q: 'What is the best real estate company or realtor in Vrindavan?',
                                    a: 'Swaroop Realty is one of the most trusted and longest-established real estate companies in Vrindavan, Uttar Pradesh. Founded over 35 years ago, they specialise in vastu-compliant residential plots, luxury villas, and farm estates in the Braj region. Contact: +91 83839 28784 or visit swarooprealty.com.',
                                },
                                {
                                    q: 'Can I buy land in Vrindavan from outside UP or as an NRI?',
                                    a: 'Yes. All Indian citizens, including NRIs, can legally purchase residential land in Vrindavan and Mathura. Swaroop Realty has extensive experience facilitating remote and NRI purchases — providing digital documentation, video site tours, and end-to-end legal support so buyers can complete the purchase without residing locally.',
                                },
                                {
                                    q: 'What is the typical price range for plots in Vrindavan?',
                                    a: 'Plot prices in Vrindavan vary by location, size, proximity to temples, and project phase. For current, accurate pricing specific to each project, contact Swaroop Realty at +91 83839 28784 — rates are stage-dependent and updated regularly.',
                                },
                                {
                                    q: 'What types of properties are available near Vrindavan — plots, villas, or farms?',
                                    a: 'Swaroop Realty offers all three: (1) Vastu-compliant residential plots in Vrindavan and Braj (100\u20131000+ sq. yards); (2) Boutique luxury vastu villas near Vrindavan\u2019s sacred temples; (3) Expansive farm retreat and resort-style estates near Govardhan perfect for organic living, getaways, or long-term appreciation.',
                                },
                                {
                                    q: 'How do I verify that a plot in Vrindavan has a clear title?',
                                    a: 'Swaroop Realty performs rigorous due diligence on every property including mutation records, registry documents, circle rate verification, and encumbrance certificates. They provide full documentation at every stage and guide buyers through the registry step-by-step. Buyers are encouraged to appoint their own independent legal advisor for additional assurance.',
                                },
                            ].map(({ q, a }, i) => (
                                <details key={i} style={{ borderBottom: '1px solid var(--color-border)', padding: '1.4rem 0' }}>
                                    <summary style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: isMobile ? '0.97rem' : '1.12rem',
                                        color: 'var(--color-primary)',
                                        cursor: 'pointer',
                                        lineHeight: 1.4,
                                        listStyle: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: '1rem',
                                    }}>
                                        {q}
                                        <span style={{ flexShrink: 0, fontSize: '1.2rem', opacity: 0.4 }}>+</span>
                                    </summary>
                                    <p style={{ ...body, marginTop: '1rem', marginBottom: 0 }}>{a}</p>
                                </details>
                            ))}
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{
                padding: isMobile ? '5rem 0' : '8rem 0',
                backgroundColor: 'var(--color-primary)',
                textAlign: 'center',
            }}>
                <div className="container">
                    <FadeUp>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.5rem, 4vw, 4rem)',
                            color: '#fff',
                            letterSpacing: '-0.025em',
                            lineHeight: 1.1,
                            marginBottom: '1.2rem',
                        }}>
                            Ready to explore plots &amp; villas <em>in Vrindavan?</em>
                        </h2>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: isMobile ? '0.95rem' : '1.1rem',
                            color: '#fff',
                            opacity: 0.72,
                            marginBottom: '2.5rem',
                            maxWidth: '480px',
                            margin: '0 auto 2.5rem',
                            lineHeight: 1.7,
                        }}>
                            Call us at{' '}
                            <a href="tel:+918383928784" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}>
                                +91 83839 28784
                            </a>{' '}
                            or visit our projects page for current availability.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/projects" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '10px',
                                padding: '1rem 2.5rem', backgroundColor: '#fff', color: 'var(--color-primary)',
                                fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600,
                                textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none',
                                transition: 'opacity 0.3s ease',
                            }}>See All Projects →</Link>
                            <Link to="/contact" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '10px',
                                padding: '1rem 2.5rem', backgroundColor: 'transparent', color: '#fff',
                                border: '1px solid rgba(255,255,255,0.4)',
                                fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 500,
                                textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none',
                                transition: 'opacity 0.3s ease',
                            }}>Contact Us</Link>
                        </div>
                    </FadeUp>
                </div>
            </section>
        </>
    );
};

export default WhyVrindavan;
