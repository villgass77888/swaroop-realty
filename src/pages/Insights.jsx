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
        title: "Explore the Best Plots in Vrindavan",
        category: "Location Spotlight",
        date: "October 2023",
        excerpt: "If you want to explore the best plots in Vrindavan, Brij Garden offers a thoughtful 15-acre sanctuary. Finding land with clear titles and Vastu alignment is key for generational investing.",
        image: "/brij-garden.jpg",
        readTime: "4 min read"
    },
    {
        id: 2,
        title: "Premium Plots for Sale in Vrindavan: A Guide",
        category: "Investment Guide",
        date: "September 2023",
        excerpt: "Searching for premium plots for sale in Vrindavan? Radha Kunj Villas and our other bespoke communities provide unmatched luxury, spiritual proximity, and world-class landscaping.",
        image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        readTime: "5 min read"
    },
    {
        id: 3,
        title: "100 Gaj Plot in Vrindavan: Price and Investment Benefits",
        category: "Market Trends",
        date: "September 2023",
        excerpt: "A 100 Gaj plot in Vrindavan offers an excellent entry point. Prices vary based on proximity to key temples, but they yield high appreciation due to limited land availability.",
        image: "/vrindavan-landscape.png",
        readTime: "4 min read"
    },
    {
        id: 4,
        title: "Discover Your Dream Property in Vrindavan",
        category: "Property Showcase",
        date: "August 2023",
        excerpt: "Discover your dream property in Vrindavan by exploring The Giridhar Valley Farms. Expansive estates designed for weekend retreats and sustainable organic living in the Braj region.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        readTime: "6 min read"
    },
    {
        id: 5,
        title: "Real Estate in Vrindavan | Buy & Invest in Premium Plots",
        category: "Market Trends",
        date: "August 2023",
        excerpt: "Understanding real estate in Vrindavan requires local expertise. Buy & invest in premium plots developed by builders who prioritize Vastu Shastra and transparent documentation.",
        image: "/vrindavan-sunrise.png",
        readTime: "5 min read"
    },
    {
        id: 6,
        title: "Connect with Swaroop Realty for Plots in Vrindavan",
        category: "Buyer's Guide",
        date: "July 2023",
        excerpt: "Connect with us for plots in Vrindavan. With 35 years of disciplined development, our team guides you seamlessly through site visits, clear titles, and the final purchase.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        readTime: "3 min read"
    },
    {
        id: 7,
        title: "Trusted Real Estate Property Projects in Vrindavan",
        category: "Company Ethics",
        date: "July 2023",
        excerpt: "Finding trusted real estate property projects in Vrindavan is crucial. Learn how our 35-year legacy ensures your investment is legally secure and spiritually aligned.",
        image: "/vastu-diagram.png",
        readTime: "4 min read"
    },
    {
        id: 8,
        title: "Vastu Tips for Buying Sacred Farmland in Govardhan",
        category: "Vastu Shastra",
        date: "June 2023",
        excerpt: "Before purchasing farmland, understand Vastu alignments. Projects like Govardhan Greens integrate these ancient cardinal rules naturally into organic, resort-style living.",
        image: "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
        readTime: "5 min read"
    },
    {
        id: 9,
        title: "Rising Demand for Luxury Villas on VIP Road",
        category: "Location Spotlight",
        date: "June 2023",
        excerpt: "VIP Road has become the premier destination for high-end living. Discover how Radha Kunj Villas combines this prime location with bespoke Indian architectural aesthetics.",
        image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        readTime: "4 min read"
    },
    {
        id: 10,
        title: "Resort-Style Plot Developments: The Future of Braj Living",
        category: "Lifestyle",
        date: "May 2023",
        excerpt: "Traditional plots are evolving. Discover how Govardhan Greens pioneer resort-style community living with eco-friendly infrastructure and organic farming zones.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        readTime: "6 min read"
    },
    {
        id: 11,
        title: "Understanding Clear Titles in Braj Real Estate",
        category: "Legal Guide",
        date: "May 2023",
        excerpt: "A guide to navigating property documentation in UP. Ensure your investments are secure by working with developers who guarantee 100% clear titles and transparent transactions.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        readTime: "5 min read"
    },
    {
        id: 12,
        title: "Long-Term Asset Appreciation in Mathura-Vrindavan",
        category: "Investment Guide",
        date: "April 2023",
        excerpt: "As infrastructure rapidly expands to support spiritual tourism, the Mathura-Vrindavan belt is seeing unprecedented ROI. Learn why early adoption is key.",
        image: "/vrindavan-landscape.png",
        readTime: "7 min read"
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
