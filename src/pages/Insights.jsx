import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import useIsMobile from '../hooks/useIsMobile';
import FAQ from '../components/FAQ';

const insightsSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Swaroop Realty Insights & Market Updates',
    description: 'Expert knowledge, Vastu tips, and real estate investment guides for Vrindavan and the Braj Mandal.',
    publisher: {
        '@type': 'Organization',
        name: 'Swaroop Realty',
        logo: {
            '@type': 'ImageObject',
            url: 'https://swarooprealty.com/logo-dark.png'
        }
    }
};

const articles = [
    {
        id: 1,
        title: "Is Vrindavan a good place to invest in real estate?",
        category: "Market Trends",
        date: "October 2023",
        excerpt: "Vrindavan is one of India's fastest-growing spiritual destinations. With increasing pilgrim footfall and limited developable land, Vrindavan real estate offers strong long-term appreciation potential.",
        image: "/vrindavan-sunrise.png",
        readTime: "4 min read"
    },
    {
        id: 2,
        title: "Cost breakdown of a 100 gaj plot in Braj",
        category: "Investment Guide",
        date: "September 2023",
        excerpt: "A 100 gaj plot in Vrindavan offers an excellent entry point. Prices vary based on proximity to key temples, but they yield high appreciation due to limited land availability and growing demand.",
        image: "/vrindavan-landscape.png",
        readTime: "5 min read"
    },
    {
        id: 3,
        title: "Vastu tips for buying property in Govardhan",
        category: "Vastu Shastra",
        date: "August 2023",
        excerpt: "Vastu-compliant real estate aligns the orientation and design of a property with traditional ancient Indian science. Learn the 5 cardinal rules before buying land in the Braj Mandal.",
        image: "/vastu-diagram.png", // Assuming this exists or falls back cleanly
        readTime: "3 min read"
    }
];

const Insights = () => {
    const { isMobile } = useIsMobile();

    const stagger = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <div style={{ backgroundColor: 'var(--color-primary)', minHeight: '100vh', paddingTop: '100px' }}>
            <SEOHead
                title="Real Estate Insights & Vastu Guides"
                description="Expert knowledge on investing in Vrindavan real estate, cost breakdowns of plots, and Vastu-compliant property tips in the Braj region."
                keywords="Vrindavan real estate blog, 100 gaj plot price Vrindavan, Vastu property Braj, Swaroop Realty insights, invest in Vrindavan"
                canonical="/insights"
                schema={insightsSchema}
            />

            {/* Header */}
            <section style={{ padding: 'var(--spacing-section) 0 4rem 0', color: 'var(--color-white)', position: 'relative' }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div initial="hidden" animate="show" variants={stagger} style={{ maxWidth: '800px' }}>
                        <motion.h4 variants={fadeUp} style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '5px', opacity: 0.7, marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}>
                            Market Knowledge & Guides
                        </motion.h4>
                        <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>
                            <span style={{ display: 'block' }}>Swaroop</span>
                            <span style={{ display: 'block', fontStyle: 'italic', opacity: 0.9 }}>Insights.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.8, maxWidth: '600px', fontFamily: 'var(--font-body)' }}>
                            Navigating real estate inside the sacred Braj Mandal requires localized expertise and adherence to Vastu principles. Delve into our curated guides.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Articles Grid */}
            <section style={{ padding: '0 0 var(--spacing-section) 0', backgroundColor: 'var(--color-primary)' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: '2.5rem'
                    }}>
                        {articles.map((article, i) => (
                            <motion.article
                                key={article.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-5%' }}
                                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    color: 'var(--color-white)',
                                    textDecoration: 'none'
                                }}
                            >
                                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) grayscale(30%)', transition: 'filter 0.5s ease, transform 0.8s ease' }}
                                        onMouseOver={e => { e.currentTarget.style.filter = 'brightness(1) grayscale(0%)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                                        onMouseOut={e => { e.currentTarget.style.filter = 'brightness(0.7) grayscale(30%)'; e.currentTarget.style.transform = 'scale(1)'; }}
                                    />
                                    <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: 'rgba(10, 17, 40, 0.8)', padding: '6px 14px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', backdropFilter: 'blur(5px)', borderRadius: '4px' }}>
                                        {article.category}
                                    </div>
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', lineHeight: 1.3, marginBottom: '1rem', height: '60px' }}>
                                        {article.title}
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.7, marginBottom: '1.5rem', flexGrow: 1 }}>
                                        {article.excerpt}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', opacity: 0.5, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                        <span>{article.date}</span>
                                        <span>{article.readTime}</span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <div style={{ backgroundColor: 'var(--color-bg-alt)' }}>
                <FAQ />
            </div>
        </div>
    );
};

export default Insights;
