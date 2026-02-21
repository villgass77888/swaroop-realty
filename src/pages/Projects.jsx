import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const allProjects = [
    {
        id: 1,
        title: 'Krishna Valley Estates',
        subtitle: '50-Acre Luxury Villa Community',
        location: 'Vrindavan, UP',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        year: '2024'
    },
    {
        id: 2,
        title: 'Radha Kunj Villas',
        subtitle: 'Exclusive Smart Villas',
        location: 'Vrindavan, UP',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        year: '2023'
    },
    {
        id: 3,
        title: 'The Girdhar Valley Farms',
        subtitle: 'Exclusive Farm Retreat',
        location: 'Vrindavan, UP',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        year: '2025'
    },
    {
        id: 4,
        title: 'Govardhan Greens',
        subtitle: 'Resort-Style Plot Development',
        location: 'Govardhan, UP',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        year: '2025'
    }
];

const ProjectPanel = ({ project, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const imgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);

    return (
        <div
            ref={ref}
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    y: imgY,
                    height: '140%' // Extra height for parallax travel
                }}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }}
                />
            </motion.div>

            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)'
            }} />

            <motion.div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    y: textY,
                    color: 'var(--color-white)',
                    textAlign: 'center',
                    textShadow: '0 10px 30px rgba(0,0,0,0.6)'
                }}
            >
                <div style={{ fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'var(--font-body)' }}>
                    {project.location} &mdash; {project.year}
                </div>
                <h2 style={{
                    fontSize: 'clamp(4rem, 8vw, 8rem)',
                    margin: 0,
                    lineHeight: 1,
                    color: '#ffffff',
                    mixBlendMode: 'overlay',
                    opacity: 0.9
                }}>
                    {project.title}
                </h2>
                <div style={{ fontSize: '1.2rem', marginTop: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {project.subtitle}
                </div>

                <Link
                    to={`/projects/${project.id}`}
                    style={{
                        display: 'inline-block',
                        marginTop: '3rem',
                        padding: '15px 40px',
                        border: '1px solid var(--color-white)',
                        color: 'var(--color-white)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        transition: 'all 0.4s ease',
                        fontFamily: 'var(--font-body)',
                        backdropFilter: 'blur(5px)'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'var(--color-white)';
                        e.target.style.color = 'var(--color-primary)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--color-white)';
                    }}
                >
                    View Details
                </Link>
            </motion.div>
        </div>
    );
};

const Projects = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ backgroundColor: 'var(--color-primary)' }}>
            {/* Intro Section */}
            <div style={{
                position: 'relative',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-primary)',
                flexDirection: 'column'
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', marginBottom: '1rem', textAlign: 'center' }}
                >
                    Signature Works
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '4px' }}
                >
                    A curated portfolio
                </motion.p>

                {/* Scroll Indicator / Redirect */}
                <motion.a
                    href="#projects-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: 'var(--color-primary)',
                        textDecoration: 'none',
                        gap: '10px'
                    }}
                >
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 500 }}>Discover</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        style={{ height: '40px', width: '1px', backgroundColor: 'var(--color-primary)' }}
                    />
                </motion.a>
            </div>

            <div id="projects-list">
                {allProjects.map((project, index) => (
                    <ProjectPanel key={project.id} project={project} index={index} />
                ))}
            </div>

            {/* Upcoming Projects Section - Ultra Premium & Mysterious */}
            <div style={{
                position: 'relative',
                width: '100vw',
                minHeight: '100vh',
                backgroundColor: '#050a15', // Very dark navy
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                padding: '10rem 5%'
            }}>
                {/* Background ambient glow */}
                <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '70vw',
                        height: '70vw',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 60%)',
                        filter: 'blur(80px)',
                        pointerEvents: 'none',
                        zIndex: 0
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '8rem' }}
                >
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '8px', display: 'block', marginBottom: '1.5rem' }}>The Future</span>
                    <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--color-white)', fontFamily: 'var(--font-heading)', margin: 0, textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>Concealed Masterpieces</h2>
                </motion.div>

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', maxWidth: '1000px' }}>

                    {/* Project 1 */}
                    <div className="upcoming-project" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                            <div className="upcoming-content">
                                <h3 style={{ fontSize: '2.5rem', color: 'var(--color-white)', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>Project [REDACTED]</h3>
                                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>Vrindavan &mdash; 100+ Acre Mega-Township</p>
                            </div>
                            <span className="upcoming-badge" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '4px', padding: '10px 20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', backdropFilter: 'blur(5px)' }}>Revealing Q4 2026</span>
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className="upcoming-project" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                            <div className="upcoming-content">
                                <h3 style={{ fontSize: '2.5rem', color: 'var(--color-white)', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>The Elysian Expanse</h3>
                                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>Govardhan &mdash; Ultra-Private Estates</p>
                            </div>
                            <span className="upcoming-badge" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '4px', padding: '10px 20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', backdropFilter: 'blur(5px)' }}>By Invitation Only</span>
                        </div>
                    </div>
                </div>

                <style>{`
                    .upcoming-project {
                        opacity: 0.6;
                        transform: scale(0.98);
                        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                        filter: grayscale(100%) blur(2px);
                        cursor: pointer;
                    }
                    .upcoming-project:hover {
                        opacity: 1;
                        transform: scale(1) translateX(20px);
                        filter: grayscale(0%) blur(0px);
                    }
                    .upcoming-project:hover .upcoming-badge {
                        color: var(--color-white) !important;
                        border-color: rgba(255,255,255,0.5) !important;
                        box-shadow: 0 0 20px rgba(255,255,255,0.1);
                    }
                    .upcoming-content h3 {
                        transition: text-shadow 0.6s ease;
                    }
                    .upcoming-project:hover .upcoming-content h3 {
                        text-shadow: 0 0 30px rgba(255,255,255,0.3);
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Projects;
