import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

// Mock DB matching Projects array
const allProjects = {
    '1': {
        title: 'Brij Garden Vrindavan', subtitle: '10-Acre Land Plot Project', location: 'Jait, Vrindavan',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        plot: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        desc: 'Brij Garden Vrindavan is a thoughtfully planned 10-acre land plot development situated in Jait, on the outskirts of sacred Vrindavan. Conceived with Vastu-aligned master planning, the layout offers residentially zoned plots within a community shaped by discipline, green corridors, and the spiritual character of the Braj land. Each plot has been carefully demarcated to allow homeowners to build with intention — honouring both the sanctity of the soil and the practical needs of long-term living. With clear titles, direct approach roads, and phased infrastructure development, Brij Garden is designed for families who value land with roots.',
        measurements: { area: '10 Acres Total', plotSizes: 'On Request', location: 'Jait, Vrindavan', status: 'Active Development' }
    },
    '2': {
        title: 'Radha Kunj Villas', subtitle: 'Vastu Villas — VIP Road, Vrindavan', location: 'VIP Road, Vrindavan',
        image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        plot: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        desc: 'Set on VIP Road — one of Vrindavan\'s most sought-after addresses — Radha Kunj Villas is a 4.5-acre boutique villa community built around vastu-compliant design and refined Indian craftsmanship. Each villa has been oriented and planned to maximise light, airflow, and spiritual alignment with the sacred geography of Braj. The development is structured for families who seek both permanence and proximity to the divine — walking distance from the major temples and the Yamuna ghats, yet discreetly set within a gated, landscaped enclave. An enduring residence designed not merely to impress, but to belong.',
        measurements: { area: '4.5 Acres', location: 'VIP Road, Vrindavan', planning: 'Vastu-Aligned', status: 'Active Development' }
    },
    '3': {
        title: 'The Girdhar Valley Farms', subtitle: 'Exclusive Farm Retreat', location: 'Vrindavan, UP',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        plot: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        desc: 'Escape to a serene agricultural haven. The Girdhar Valley Farms offer expansive, verdant estates perfect for weekend getaways or permanent retreats. Reconnect with nature in a meticulously maintained environment that celebrates both high-end living and organic, sustainable farm life near the heart of Vrindavan.',
        measurements: { area: '25 Acres', plotSizes: '1000+ Sq.Yards', landscaping: 'Organic Orchards', amenities: 'Farmhouse & Stable' }
    },
    '4': {
        title: 'Govardhan Greens', subtitle: 'Resort-Style Plot Development', location: 'Govardhan, UP',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        plot: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        desc: 'An investment like no other. Nestled peacefully in the holy precinct of Govardhan, this green-tech enabled plot development focuses on holistic living, organic community farming, and lush scenic beauty. Create a weekend getaway farm-villa or a permanent serene residence.',
        measurements: { area: '30 Acres', plotSizes: '1000 - 5000 Sq.Yards', lifestyle: 'Organic Farm Zones', luxury: 'Resort Living' }
    }
};

const ProjectDetail = () => {
    const { slug } = useParams();
    const { isMobile } = useIsMobile();

    const project = Object.values(allProjects).find(
        p => p.title.toLowerCase().replace(/\s+/g, '-') === slug
    );

    useEffect(() => { window.scrollTo(0, 0); }, [slug]);

    if (!project) return <div style={{ paddingTop: '200px', textAlign: 'center' }}>Project Not Found</div>;

    return (
        <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', color: 'var(--color-primary)' }}>
            {/* Hero Header */}
            <div style={{ position: 'relative', width: '100vw', height: isMobile ? '55vh' : '80vh', overflow: 'hidden' }}>
                <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: "easeOut" }} style={{ width: '100%', height: '100%' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(10,17,40,0.9), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '5%', color: 'var(--color-white)', maxWidth: isMobile ? '90%' : 'none' }}>
                    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
                        <h1 style={{ fontSize: isMobile ? 'clamp(1.8rem,8vw,3rem)' : 'clamp(3rem,6vw,6rem)', lineHeight: 1, color: 'var(--color-white)' }}>{project.title}</h1>
                        <p style={{ fontSize: isMobile ? '0.8rem' : '1.2rem', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '1rem' }}>{project.location}</p>
                    </motion.div>
                </div>
            </div>

            {/* Details Container */}
            <div className="container" style={{ padding: 'var(--spacing-section) 5%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: isMobile ? '2rem' : '4rem' }}>
                    {/* Specs */}
                    <div style={{ gridColumn: isMobile ? undefined : 'span 4' }}>
                        <h3 style={{ fontSize: isMobile ? '1.3rem' : '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Project Specifications</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {Object.entries(project.measurements).map(([key, value]) => (
                                <li key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(10,17,40,0.1)' }}>
                                    <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--color-text)' }}>{key}</span>
                                    <span style={{ fontWeight: 500, fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Description */}
                    <div style={{ gridColumn: isMobile ? undefined : 'span 8' }}>
                        <h2 style={{ fontSize: isMobile ? 'clamp(1.8rem,7vw,2.5rem)' : '3rem', fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>The Ultimate <br />{project.subtitle}</h2>
                        <p style={{ fontSize: isMobile ? '1rem' : '1.2rem', lineHeight: 2, color: 'var(--color-text)', marginBottom: '4rem' }}>{project.desc}</p>
                    </div>
                </div>

                {/* Master Plot Area */}
                <div style={{ marginTop: isMobile ? '4rem' : '8rem', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: isMobile ? '2rem' : '4rem', alignItems: 'center' }}>
                    <div style={{ gridColumn: isMobile ? undefined : 'span 4' }}>
                        <h3 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: 'var(--color-primary)', lineHeight: 1.1 }}>Master <br /><span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>Plot Array</span></h3>
                        <p style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', lineHeight: 1.8, color: 'var(--color-text)', marginBottom: '2.5rem' }}>A meticulously mapped sanctuary designed with precision and Vastu principles. Discover the intricate spatial flow connecting private estates with expansive community organic reserves.</p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {['Strategic Zoning', 'Holistic Landscaping', 'Seamless Connectivity', 'Private & Secure'].map(feature => (
                                <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.2rem', color: 'var(--color-primary)', fontWeight: 500, fontSize: '1rem' }}>
                                    <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', opacity: 0.5, flexShrink: 0 }}></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ gridColumn: isMobile ? undefined : 'span 8' }}>
                        <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-alt)', border: '1px solid rgba(10,17,40,0.05)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                            <motion.img
                                initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
                                src={project.plot} alt="Plot Map Blueprint"
                                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px', filter: 'sepia(0.1) contrast(1.15) brightness(0.95)', mixBlendMode: 'multiply' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Return Container */}
                <div style={{ marginTop: '8rem', textAlign: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '4rem' }}>
                    <Link to="/projects" style={{
                        display: 'inline-block',
                        padding: '15px 40px',
                        border: '1px solid var(--color-primary)',
                        color: 'var(--color-primary)',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontWeight: 500,
                        transition: 'all 0.3s ease'
                    }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'var(--color-primary)';
                            e.target.style.color = 'var(--color-white)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = 'var(--color-primary)';
                        }}
                    >
                        Return to Portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
