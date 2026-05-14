import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import useIsMobile from '../hooks/useIsMobile';
import { articles, faqs, CATEGORIES, categoryColors } from '../data/insightsData';

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a }
    }))
};

const insightsSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Swaroop Realty Insights — Best Plots in Vrindavan 2026 Guides',
    description: 'Expert knowledge on the best plots in Vrindavan, premium plot prices in 2026, 100 gaj rates, NRI buying guide, Vastu tips, Jewar Airport impact, and investment analysis by Swaroop Realty.',
    url: 'https://swarooprealty.com/insights',
    publisher: {
        '@type': 'Organization',
        name: 'Swaroop Realty',
        logo: { '@type': 'ImageObject', url: 'https://swarooprealty.com/logo-dark.png' }
    }
};

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } };

const Insights = () => {
    const { isMobile } = useIsMobile();
    const [activeCategory, setActiveCategory] = useState('All');
    const [expandedFaq, setExpandedFaq] = useState(null);

    const featured = articles.find(a => a.featured);
    const regular = articles.filter(a => !a.featured);
    const filtered = activeCategory === 'All' ? regular : regular.filter(a => a.category === activeCategory);

    return (
        <div style={{ backgroundColor: 'var(--color-primary)', minHeight: '100vh', color: 'var(--color-white)' }}>
            <SEOHead
                title="Best Plots in Vrindavan 2026 — Investment Guides, Market Reports & FAQs"
                description="Your complete guide to buying the best plots in Vrindavan in 2026. Premium plot prices, 100 gaj rates, NRI buying rules, Jewar Airport impact, Chhatikara Road vs VIP Road comparison, RERA checklist & 20 FAQs by Swaroop Realty — 35 years in Braj."
                keywords="best plots in vrindavan, best premium plots in vrindavan, vrindavan plots 2026, buy plots in vrindavan, 100 gaj plot vrindavan price 2026, premium plots for sale in vrindavan, NRI plots vrindavan, jewar airport vrindavan real estate, chhatikara road plots vrindavan, VIP road vrindavan plots, yamuna expressway vrindavan, plots near yamuna expressway, vrindavan real estate market 2026, godrej plots vrindavan alternative, trusted developer vrindavan, RERA registered plots vrindavan, swaroop realty vrindavan, mathura vrindavan plots investment"
                canonical="/insights"
                schema={[insightsSchema, faqSchema]}
            />

            {/* ── Hero Header ─────────────────────────────────────── */}
            <section style={{ paddingTop: isMobile ? '120px' : '160px', paddingBottom: isMobile ? '3rem' : '5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="container">
                    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
                        <motion.p variants={fadeUp} style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '5px', color: 'rgba(255,255,255,0.45)', marginBottom: '1.2rem', fontFamily: 'var(--font-body)' }}>
                            Market Knowledge & Guides
                        </motion.p>
                        <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(2.8rem,12vw,4rem)' : 'clamp(3.5rem,7vw,6rem)', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '1.5rem', color: 'var(--color-white)' }}>
                            Swaroop<br /><span style={{ fontStyle: 'italic', opacity: 0.7, color: 'var(--color-white)' }}>Insights.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} style={{ maxWidth: '560px', fontSize: isMobile ? '1rem' : '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>
                            35 years of distilled expertise on the best plots in Vrindavan — from 100 gaj plot pricing and micro-market comparisons to NRI buying guides, Vastu principles, and legal title checks. Practical knowledge, zero filler.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Stats Strip ─────────────────────────────────────── */}
            <section style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
                        {[
                            { label: 'Years of Expertise', val: '35+' },
                            { label: 'Projects Delivered', val: '8' },
                            { label: 'Families Settled', val: '500+' },
                            { label: 'Market Coverage', val: 'Braj Mandal' }
                        ].map((s, i) => (
                            <div key={i} style={{ padding: isMobile ? '1.5rem 1rem' : '2rem 2.5rem', borderRight: '1px solid rgba(255,255,255,0.07)', borderBottom: isMobile && i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                                <p style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '2rem' : '2.5rem', lineHeight: 1, marginBottom: '0.4rem' }}>{s.val}</p>
                                <p style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.45)' }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Article ─────────────────────────────────── */}
            {featured && (
                <section style={{ padding: isMobile ? '3rem 0' : '5rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="container">
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>Featured Guide</p>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '5rem', alignItems: 'center' }}
                        >
                            <Link to={`/insights/${featured.slug}`} style={{ display: 'block', position: 'relative', borderRadius: '4px', overflow: 'hidden', aspectRatio: '4/3', textDecoration: 'none' }}>
                                <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)', transition: 'transform 0.8s ease' }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(10,17,40,0.5) 0%, transparent 60%)' }} />
                                <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '10px' }}>
                                    <span style={{ background: categoryColors[featured.category] || '#7B6CF6', padding: '5px 14px', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderRadius: '3px', fontWeight: 600 }}>{featured.category}</span>
                                    <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '5px 14px', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderRadius: '3px' }}>Featured</span>
                                </div>
                            </Link>

                            <div>
                                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                                    <span>{featured.date}</span>
                                    <span>·</span>
                                    <span>{featured.readTime}</span>
                                    {featured.project && <><span>·</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>{featured.project}</span></>}
                                </div>
                                <Link to={`/insights/${featured.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.8rem' : '2.4rem', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1.2rem', transition: 'opacity 0.2s', color: 'var(--color-white)' }}
                                        onMouseOver={e => e.currentTarget.style.opacity = '0.8'}
                                        onMouseOut={e => e.currentTarget.style.opacity = '1'}
                                    >
                                        {featured.title}
                                    </h2>
                                </Link>
                                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: '1rem' }}>{featured.excerpt}</p>

                                {featured.stats && (
                                    <div style={{ display: 'flex', gap: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                        {featured.stats.map((s, i) => (
                                            <div key={i}>
                                                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.2rem' }}>{s.value}</p>
                                                <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <Link to={`/insights/${featured.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 32px', border: '1px solid rgba(255,255,255,0.3)', color: 'var(--color-white)', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', transition: 'all 0.4s ease' }}
                                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                                    onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
                                >
                                    Read Full Guide <span style={{ fontSize: '1rem' }}>→</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ── Category Filter ───────────────────────────────────── */}
            <section style={{ paddingTop: isMobile ? '2.5rem' : '4rem', paddingBottom: '1.5rem' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {CATEGORIES.map(cat => (
                            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                                padding: '8px 18px',
                                border: `1px solid ${activeCategory === cat ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.12)'}`,
                                background: activeCategory === cat ? 'rgba(255,255,255,0.1)' : 'transparent',
                                color: activeCategory === cat ? 'var(--color-white)' : 'rgba(255,255,255,0.45)',
                                borderRadius: '2px',
                                fontSize: '0.78rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1.5px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontFamily: 'var(--font-body)'
                            }}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Articles Grid ─────────────────────────────────────── */}
            <section style={{ padding: isMobile ? '2rem 0 4rem 0' : '2rem 0 6rem 0' }}>
                <div className="container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                                gap: isMobile ? '1.5rem' : '2rem'
                            }}
                        >
                            {filtered.map((article, i) => {
                                const color = categoryColors[article.category] || '#7B6CF6';
                                return (
                                    <motion.article
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                        style={{
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            borderTop: `3px solid ${color}`,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {/* Card Image */}
                                        <Link to={`/insights/${article.slug}`} style={{ display: 'block', height: '200px', overflow: 'hidden', position: 'relative', textDecoration: 'none' }}>
                                            <motion.img
                                                src={article.image}
                                                alt={article.title}
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.8 }}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) grayscale(20%)' }}
                                            />
                                            <div style={{ position: 'absolute', top: '14px', left: '14px', background: color, padding: '4px 12px', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderRadius: '2px', fontWeight: 600 }}>
                                                {article.category}
                                            </div>
                                            {article.project && (
                                                <div style={{ position: 'absolute', bottom: '14px', right: '14px', background: 'rgba(10,17,40,0.85)', backdropFilter: 'blur(6px)', padding: '4px 12px', fontSize: '0.68rem', letterSpacing: '1px', color: '#fff' }}>
                                                    {article.project}
                                                </div>
                                            )}
                                        </Link>

                                        {/* Card Content */}
                                        <div style={{ padding: isMobile ? '1.5rem' : '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.9rem', fontSize: '0.73rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                <span>{article.date}</span>
                                                <span>{article.readTime}</span>
                                            </div>

                                            <Link to={`/insights/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.2rem' : '1.3rem', lineHeight: 1.25, letterSpacing: '-0.01em', marginBottom: '0.9rem', transition: 'opacity 0.2s', color: 'var(--color-white)' }}
                                                    onMouseOver={e => e.currentTarget.style.opacity = '0.75'}
                                                    onMouseOut={e => e.currentTarget.style.opacity = '1'}
                                                >
                                                    {article.title}
                                                </h3>
                                            </Link>

                                            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', marginBottom: '1.2rem' }}>
                                                {article.excerpt.substring(0, 140)}...
                                            </p>

                                            <Link
                                                to={`/insights/${article.slug}`}
                                                style={{ alignSelf: 'flex-start', color: color, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: 'auto', transition: 'opacity 0.2s ease' }}
                                                onMouseOver={e => e.currentTarget.style.opacity = '0.7'}
                                                onMouseOut={e => e.currentTarget.style.opacity = '1'}
                                            >
                                                Read Full Guide →
                                            </Link>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* ── FAQ Section ──────────────────────────────────────── */}
            <section style={{ padding: isMobile ? '4rem 0' : '6rem 0', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.015)' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ marginBottom: isMobile ? '2.5rem' : '4rem' }}
                    >
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Buyer FAQs</p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '2rem' : '3rem', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: '1rem' }}>
                            Frequently Asked Questions<br /><span style={{ fontStyle: 'italic', opacity: 0.6 }}>— Plots in Vrindavan</span>
                        </h2>
                        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '520px', lineHeight: 1.8 }}>
                            Everything buyers, NRIs, and first-time investors ask before purchasing plots in Vrindavan. Straight answers, no sales language.
                        </p>
                    </motion.div>

                    <div style={{ maxWidth: '860px' }}>
                        {faqs.map((faq, i) => {
                            const isOpen = expandedFaq === i;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                                >
                                    <button
                                        onClick={() => setExpandedFaq(isOpen ? null : i)}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            gap: '1.5rem',
                                            padding: isMobile ? '1.3rem 0' : '1.6rem 0',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            color: 'var(--color-white)',
                                        }}
                                    >
                                        <span style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '0.95rem' : '1.05rem', lineHeight: 1.5, fontWeight: 500, color: isOpen ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.8)', transition: 'color 0.2s ease', flex: 1 }}>
                                            {faq.q}
                                        </span>
                                        <span style={{
                                            flexShrink: 0,
                                            width: '28px',
                                            height: '28px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1rem',
                                            color: 'rgba(255,255,255,0.6)',
                                            transition: 'all 0.25s ease',
                                            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                                            marginTop: '2px',
                                        }}>+</span>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <p style={{
                                                    fontSize: isMobile ? '0.9rem' : '0.95rem',
                                                    lineHeight: 1.85,
                                                    color: 'rgba(255,255,255,0.55)',
                                                    paddingBottom: '1.6rem',
                                                    paddingRight: isMobile ? '0' : '3rem',
                                                }}>
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Bottom CTA ───────────────────────────────────────── */}
            <section style={{ padding: isMobile ? '3rem 0' : '5rem 0', background: 'rgba(255,255,255,0.02)' }}>
                <div className="container" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '2rem' }}>
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.8rem' : '2.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '0.8rem' }}>
                            Ready to explore<br /><span style={{ fontStyle: 'italic', opacity: 0.7 }}>your plot in Vrindavan?</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '420px', lineHeight: 1.7 }}>
                            Our specialists are available for personalized consultations — site visits, documentation, and Vastu guidance included.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/contact" style={{ padding: '15px 36px', background: 'var(--color-white)', color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, whiteSpace: 'nowrap', transition: 'opacity 0.3s ease' }}
                            onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
                            onMouseOut={e => e.currentTarget.style.opacity = '1'}
                        >
                            Book a Consultation
                        </Link>
                        <Link to="/projects" style={{ padding: '15px 36px', border: '1px solid rgba(255,255,255,0.25)', color: 'var(--color-white)', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', whiteSpace: 'nowrap', transition: 'all 0.3s ease' }}
                            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                            View Projects
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Insights;
