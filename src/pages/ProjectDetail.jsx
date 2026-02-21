import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock DB matching Projects array
const allProjects = {
    '1': {
        title: 'Krishna Valley Estates', subtitle: '50-Acre Luxury Villa Community', location: 'Vrindavan, UP',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        plot: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        desc: 'An unparalleled sprawling community set amidst the holy land of Vrindavan. Krishna Valley Estates offers ready-to-move custom villas and massive premium plots. Integrated with world-class landscaping, clubhouses, and serene walking paths designed entirely in accordance with Vastu Shastra.',
        measurements: { area: '50 Acres Total', plotSizes: '200 - 1000 Sq.Yards', parks: '12 Themed Gardens', security: '3-Tier Smart Security' }
    },
    '2': {
        title: 'Radha Kunj Villas', subtitle: 'Exclusive Smart Villas', location: 'Vrindavan, UP',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        plot: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        desc: 'Situated walking distance from Prem Mandir, Radha Kunj Villas represent the ultimate boutique enclave. Featuring completely automated smart-home ecosystems, private plunge pools, and rare Italian marble flooring, this project blends divine tranquility with uncompromised modern opulence.',
        measurements: { area: '3.5 Acres', plotSizes: '400 Sq.Yards', features: 'Private Automation', bedrooms: '4/5 Suites per Villa' }
    },
    '3': {
        title: 'The Girdhar Valley Farms', subtitle: 'Exclusive Farm Retreat', location: 'Vrindavan, UP',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        plot: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        desc: 'Escape to a serene agricultural haven. The Girdhar Valley Farms offer expansive, verdant estates perfect for weekend getaways or permanent retreats. Reconnect with nature in a meticulously maintained environment that celebrates both high-end living and organic, sustainable farm life near the heart of Vrindavan.',
        measurements: { area: '25 Acres', plotSizes: '1000+ Sq.Yards', landscaping: 'Organic Orchards', amenities: 'Farmhouse & Stable' }
    },
    '4': {
        title: 'Govardhan Greens', subtitle: 'Resort-Style Plot Development', location: 'Govardhan, UP',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        plot: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        desc: 'An investment like no other. Nestled peacefully in the holy precinct of Govardhan, this green-tech enabled plot development focuses on holistic living, organic community farming, and lush scenic beauty. Create a weekend getaway farm-villa or a permanent serene residence.',
        measurements: { area: '30 Acres', plotSizes: '1000 - 5000 Sq.Yards', lifestyle: 'Organic Farm Zones', luxury: 'Resort Living' }
    }
};

const ProjectDetail = () => {
    const { id } = useParams();
    const project = allProjects[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) return <div style={{ paddingTop: '200px', textAlign: 'center' }}>Project Not Found</div>;

    return (
        <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', color: 'var(--color-primary)' }}>
            {/* Hero Header */}
            <div style={{ position: 'relative', width: '100vw', height: '80vh', overflow: 'hidden' }}>
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(10,17,40,0.9), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '5%', color: 'var(--color-white)' }}>
                    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
                        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 1, color: 'var(--color-white)' }}>{project.title}</h1>
                        <p style={{ fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '1rem' }}>{project.location}</p>
                    </motion.div>
                </div>
            </div>

            {/* Details Container */}
            <div className="container" style={{ padding: 'var(--spacing-section) 5%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem' }}>

                    {/* Left Column: Stats & Measurements */}
                    <div style={{ gridColumn: 'span 4' }}>
                        <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
                            Project Specifications
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {Object.entries(project.measurements).map(([key, value]) => (
                                <li key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(10,17,40,0.1)' }}>
                                    <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', color: 'var(--color-text)' }}>{key}</span>
                                    <span style={{ fontWeight: 500, fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Column: In Depth Description & Plot */}
                    <div style={{ gridColumn: 'span 8' }}>
                        <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>
                            The Ultimate <br /> {project.subtitle}
                        </h2>
                        <p style={{ fontSize: '1.2rem', lineHeight: 2, color: 'var(--color-text)', marginBottom: '4rem' }}>
                            {project.desc}
                        </p>

                        {/* Plot Map Area */}
                        <div style={{ marginTop: '4rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>Master Plot Array</h3>
                            <div style={{ border: '1px solid var(--color-border)', padding: '1rem', backgroundColor: 'var(--color-bg-alt)' }}>
                                <img
                                    src={project.plot}
                                    alt="Plot Map Blueprint"
                                    style={{ width: '100%', height: 'auto', filter: 'grayscale(100%) contrast(1.2)' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '4rem' }}>
                            <Link to="/projects" style={{
                                display: 'inline-block',
                                padding: '15px 40px',
                                border: '1px solid var(--color-primary)',
                                color: 'var(--color-primary)',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontWeight: 500
                            }}>
                                Return to Portfolio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
