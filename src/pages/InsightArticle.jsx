import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import useIsMobile from '../hooks/useIsMobile';
import { articles, categoryColors } from '../data/insightsData';

const BASE_URL = 'https://swarooprealty.com';

const InsightArticle = () => {
    const { slug } = useParams();
    const { isMobile } = useIsMobile();

    const article = articles.find(a => a.slug === slug);
    if (!article) return <Navigate to="/insights" replace />;

    const color = categoryColors[article.category] || '#7B6CF6';
    const related = articles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);
    const fallbackRelated = related.length < 3
        ? [...related, ...articles.filter(a => a.id !== article.id && !related.includes(a)).slice(0, 3 - related.length)]
        : related;

    const absoluteImage = article.image.startsWith('http')
        ? article.image
        : `${BASE_URL}${article.image}`;

    const blogPostingSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.metaDescription || article.excerpt,
        image: absoluteImage,
        datePublished: article.date,
        dateModified: article.date,
        author: { '@type': 'Organization', name: 'Swaroop Realty', url: BASE_URL },
        publisher: {
            '@type': 'Organization',
            name: 'Swaroop Realty',
            logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo-dark.png` }
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/insights/${article.slug}` },
        keywords: article.metaKeywords || '',
        articleSection: article.category,
        wordCount: article.body.split(' ').length,
        about: { '@type': 'Place', name: 'Vrindavan', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' }
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'Insights', item: `${BASE_URL}/insights` },
            { '@type': 'ListItem', position: 3, name: article.title, item: `${BASE_URL}/insights/${article.slug}` }
        ]
    };

    const bodyParagraphs = article.body.split('\n\n').filter(Boolean);

    return (
        <div style={{ backgroundColor: 'var(--color-primary)', minHeight: '100vh', color: 'var(--color-white)' }}>
            <SEOHead
                title={article.metaTitle || article.title}
                description={article.metaDescription || article.excerpt}
                keywords={article.metaKeywords || ''}
                canonical={`/insights/${article.slug}`}
                image={absoluteImage}
                schema={[blogPostingSchema, breadcrumbSchema]}
            />

            {/* ── Hero: full-screen image with header overlaid ───────── */}
            <div style={{
                position: 'relative',
                minHeight: isMobile ? '72vh' : '82vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                overflow: 'hidden'
            }}>
                {/* Background image */}
                <motion.img
                    src={article.image}
                    alt={article.title}
                    initial={{ scale: 1.06, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(0.38)'
                    }}
                />

                {/* Gradient: dark at top (nav area), transparent mid, fades back to bg at bottom */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(10,17,40,0.65) 0%, rgba(10,17,40,0.05) 35%, rgba(10,17,40,0.55) 68%, var(--color-primary) 100%)'
                }} />

                {/* Breadcrumb — anchored near top */}
                <div style={{
                    position: 'absolute',
                    top: isMobile ? '90px' : '130px',
                    left: 0, right: 0, zIndex: 2
                }}>
                    <div className="container">
                        <nav aria-label="breadcrumb" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', display: 'flex', gap: '0.55rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <Link to="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                                onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                            >Home</Link>
                            <span>/</span>
                            <Link to="/insights" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                                onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                            >Insights</Link>
                            <span>/</span>
                            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{article.category}</span>
                        </nav>
                    </div>
                </div>

                {/* Article header — pinned to bottom of hero */}
                <div style={{ position: 'relative', zIndex: 2, paddingBottom: isMobile ? '2.5rem' : '4rem' }}>
                    <div className="container" style={{ maxWidth: '900px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                <span style={{
                                    background: color,
                                    padding: '5px 14px',
                                    fontSize: '0.72rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.5px',
                                    borderRadius: '3px',
                                    fontWeight: 600
                                }}>
                                    {article.category}
                                </span>
                                {article.tag && (
                                    <span style={{
                                        background: 'rgba(255,255,255,0.12)',
                                        backdropFilter: 'blur(8px)',
                                        padding: '5px 14px',
                                        fontSize: '0.72rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1.5px',
                                        borderRadius: '3px'
                                    }}>
                                        {article.tag}
                                    </span>
                                )}
                            </div>

                            <h1 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: isMobile ? 'clamp(1.9rem, 7.5vw, 2.6rem)' : 'clamp(2.6rem, 4.5vw, 3.6rem)',
                                lineHeight: 1.08,
                                letterSpacing: '-0.025em',
                                marginBottom: '1.4rem',
                                textShadow: '0 2px 30px rgba(0,0,0,0.5)',
                                color: 'var(--color-white)'
                            }}>
                                {article.title}
                            </h1>

                            <div style={{
                                display: 'flex',
                                gap: '1.2rem',
                                fontSize: '0.8rem',
                                color: 'rgba(255,255,255,0.5)',
                                flexWrap: 'wrap',
                                alignItems: 'center'
                            }}>
                                <span>By <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Swaroop Realty</strong></span>
                                <span>·</span>
                                <span>{article.date}</span>
                                <span>·</span>
                                <span>{article.readTime}</span>
                                {article.project && (
                                    <><span>·</span><span style={{ color }}>{article.project}</span></>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── Article Body ───────────────────────────────────────── */}
            <article style={{ padding: isMobile ? '3rem 0' : '4.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="container" style={{ maxWidth: '820px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Lead paragraph */}
                        <p style={{
                            fontSize: isMobile ? '1.05rem' : '1.2rem',
                            lineHeight: 1.85,
                            color: 'rgba(255,255,255,0.8)',
                            marginBottom: '2rem',
                            borderLeft: `3px solid ${color}`,
                            paddingLeft: '1.5rem',
                            fontStyle: 'italic'
                        }}>
                            {article.excerpt}
                        </p>

                        {/* Body paragraphs */}
                        {bodyParagraphs.map((para, i) => (
                            <p key={i} style={{
                                fontSize: isMobile ? '0.97rem' : '1.05rem',
                                lineHeight: 1.9,
                                color: 'rgba(255,255,255,0.65)',
                                marginBottom: '1.6rem'
                            }}>
                                {para}
                            </p>
                        ))}

                        {/* Stats Block */}
                        {article.stats && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
                                gap: '1rem',
                                margin: '2.5rem 0',
                                padding: '2rem',
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                border: `1px solid ${color}22`,
                                borderTop: `3px solid ${color}`
                            }}>
                                {article.stats.map((s, i) => (
                                    <div key={i} style={{ textAlign: 'center', padding: '0.5rem' }}>
                                        <p style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.5rem' : '1.8rem', lineHeight: 1, marginBottom: '0.4rem', color }}>
                                            {s.value}
                                        </p>
                                        <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>
                                            {s.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Key Points */}
                        {article.keyPoints && (
                            <div style={{ margin: '2.5rem 0' }}>
                                <h2 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: isMobile ? '1.3rem' : '1.6rem',
                                    letterSpacing: '-0.02em',
                                    marginBottom: '1.2rem',
                                    lineHeight: 1.2,
                                    color: 'var(--color-white)'
                                }}>
                                    Key Takeaways
                                </h2>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {article.keyPoints.map((point, i) => (
                                        <li key={i} style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            alignItems: 'flex-start',
                                            padding: '0.9rem 0',
                                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                                            fontSize: '0.95rem',
                                            lineHeight: 1.6,
                                            color: 'rgba(255,255,255,0.7)'
                                        }}>
                                            <span style={{ color, flexShrink: 0, marginTop: '3px', fontSize: '1rem' }}>→</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Inline CTA */}
                        <div style={{
                            margin: '3rem 0',
                            padding: isMobile ? '2rem' : '2.5rem',
                            backgroundColor: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderLeft: `4px solid ${color}`
                        }}>
                            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', marginBottom: '0.8rem' }}>
                                Swaroop Realty — 35 Years in Braj
                            </p>
                            <p style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', fontFamily: 'var(--font-heading)', lineHeight: 1.3, marginBottom: '1.5rem', letterSpacing: '-0.01em', color: 'var(--color-white)' }}>
                                Have questions about this guide or a specific plot in Vrindavan?
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <Link
                                    to="/contact"
                                    style={{ padding: '12px 28px', background: 'var(--color-white)', color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, transition: 'opacity 0.3s ease' }}
                                    onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
                                    onMouseOut={e => e.currentTarget.style.opacity = '1'}
                                >
                                    Book a Consultation
                                </Link>
                                <Link
                                    to="/projects"
                                    style={{ padding: '12px 28px', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--color-white)', textDecoration: 'none', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '2px', transition: 'all 0.3s ease' }}
                                    onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    View All Projects
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </article>

            {/* ── Related Articles ───────────────────────────────────── */}
            {fallbackRelated.length > 0 && (
                <section style={{ padding: isMobile ? '3rem 0' : '5rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="container">
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>
                            Continue Reading
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.6rem' : '2rem', letterSpacing: '-0.02em', marginBottom: '2.5rem', color: 'var(--color-white)' }}>
                            Related Guides
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '1.5rem' }}>
                            {fallbackRelated.map((rel, i) => {
                                const relColor = categoryColors[rel.category] || '#7B6CF6';
                                return (
                                    <motion.div
                                        key={rel.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.08 }}
                                        style={{
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.07)',
                                            borderTop: `3px solid ${relColor}`,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <div style={{ height: '160px', overflow: 'hidden' }}>
                                            <img
                                                src={rel.image}
                                                alt={rel.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) grayscale(20%)' }}
                                            />
                                        </div>
                                        <div style={{ padding: '1.5rem' }}>
                                            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: relColor, fontWeight: 600 }}>
                                                {rel.category}
                                            </span>
                                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', lineHeight: 1.3, letterSpacing: '-0.01em', margin: '0.7rem 0 0.8rem', color: 'var(--color-white)' }}>
                                                {rel.title}
                                            </h3>
                                            <p style={{ fontSize: '0.82rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.5)', marginBottom: '1.2rem' }}>
                                                {rel.excerpt.substring(0, 120)}...
                                            </p>
                                            <Link
                                                to={`/insights/${rel.slug}`}
                                                style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: relColor, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                                onMouseOver={e => e.currentTarget.style.opacity = '0.7'}
                                                onMouseOut={e => e.currentTarget.style.opacity = '1'}
                                            >
                                                Read Guide →
                                            </Link>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Back to Insights ───────────────────────────────────── */}
            <section style={{ padding: isMobile ? '2rem 0 3rem' : '3rem 0 4rem' }}>
                <div className="container">
                    <Link
                        to="/insights"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                        onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
                        onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                    >
                        ← Back to All Insights
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default InsightArticle;
