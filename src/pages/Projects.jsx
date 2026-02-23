import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

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
        image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Greenery luxury villa
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
    const { isMobile } = useIsMobile();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);

    return (
        <div
            ref={ref}
            style={{
                position: 'relative',
                width: '100vw',
                height: isMobile ? '70vh' : '100vh',
                minHeight: isMobile ? '400px' : 'auto',
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
                    fontSize: isMobile ? 'clamp(2rem, 7vw, 3.5rem)' : 'clamp(4rem, 8vw, 8rem)',
                    margin: 0, lineHeight: 1, color: '#ffffff', mixBlendMode: 'overlay', opacity: 0.9
                }}>
                    {project.title}
                </h2>
                <div style={{ fontSize: '1.2rem', marginTop: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {project.subtitle}
                </div>

                <Link
                    to={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
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
    const { isMobile } = useIsMobile();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div style={{ backgroundColor: 'var(--color-primary)' }}>
            {/* Intro */}
            <div style={{
                position: 'relative',
                height: isMobile ? 'auto' : '100vh',
                minHeight: isMobile ? '60vh' : 'auto',
                width: '100vw',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'var(--color-bg)', color: 'var(--color-primary)',
                flexDirection: 'column', padding: isMobile ? '130px 5% 80px' : '0'
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontSize: isMobile ? 'clamp(2.8rem, 11vw, 5rem)' : 'clamp(4rem, 8vw, 8rem)', marginBottom: '1rem', textAlign: 'center' }}
                >
                    Signature Works
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontSize: isMobile ? '0.8rem' : '1.2rem', textTransform: 'uppercase', letterSpacing: '4px', textAlign: 'center' }}
                >
                    A curated portfolio
                </motion.p>

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

                <div className="projects-wrapper" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1200px' }}>
                    {[
                        { title: "Project [REDACTED]", subtitle: "Vrindavan \u2014 100+ Acre Mega-Township", badge: "Revealing Q4 2026", animBase: 3 },
                        { title: "The Elysian Expanse", subtitle: "Govardhan \u2014 Ultra-Private Estates", badge: "By Invitation Only", animBase: 4 }
                    ].map((proj, idx) => (
                        <div key={idx} className="upcoming-project">
                            <div className="upcoming-bg-glow"></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
                                <div className="upcoming-content">
                                    <h3 style={{ fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.5rem)' : 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-white)', margin: '0 0 1rem 0', fontFamily: 'var(--font-heading)' }}>
                                        <span className="gloom-wrap">
                                            {proj.title.split('').map((char, i) => (
                                                <span key={i} className="gloom-char" style={{ animationDelay: `${(i * 0.15) % 2}s`, animationDuration: `${proj.animBase + (i * 0.2) % 2}s` }}>
                                                    {char === ' ' ? '\u00A0' : char}
                                                </span>
                                            ))}
                                        </span>
                                    </h3>
                                    <p className="upcoming-subtitle" style={{ fontSize: isMobile ? '0.8rem' : '1.1rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '4px', textTransform: 'uppercase', margin: 0 }}>{proj.subtitle}</p>
                                </div>
                                <span className="upcoming-badge">{proj.badge}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <style>{`
                    .projects-wrapper {
                        /* Container to detect overall hover hierarchy */
                    }
                    .upcoming-project {
                        position: relative;
                        padding: 4rem 2rem;
                        border-bottom: 1px solid rgba(255,255,255,0.05);
                        opacity: 0.4;
                        transform: scale(0.98);
                        /* Apple-esque buttery spring */
                        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                        filter: blur(6px) grayscale(100%);
                        cursor: pointer;
                        border-radius: 16px;
                    }
                    
                    /* The peer dimming effect (Dim all others when container is hovered) */
                    .projects-wrapper:hover .upcoming-project {
                        opacity: 0.1;
                        filter: blur(12px) grayscale(100%);
                        transform: scale(0.95);
                    }
                    
                    /* The focus effect (Restore and elevate the exact hovered item) */
                    .projects-wrapper .upcoming-project:hover {
                        opacity: 1;
                        filter: blur(0px) grayscale(0%);
                        transform: scale(1) translateX(2rem);
                        background: radial-gradient(circle at left, rgba(255,255,255,0.03) 0%, transparent 60%);
                        border-bottom-color: rgba(255,255,255,0.2);
                        z-index: 10;
                    }

                    .upcoming-bg-glow {
                        position: absolute;
                        top: 0; left: 0; right: 0; bottom: 0;
                        background: linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 100%);
                        opacity: 0;
                        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                        pointer-events: none;
                        z-index: 1;
                        border-radius: 16px;
                    }
                    
                    .upcoming-project:hover .upcoming-bg-glow {
                        opacity: 1;
                    }

                    .upcoming-badge {
                        font-size: 0.85rem;
                        color: rgba(255,255,255,0.3);
                        text-transform: uppercase;
                        letter-spacing: 4px;
                        padding: 12px 24px;
                        border: 1px solid rgba(255,255,255,0.1);
                        border-radius: 30px;
                        backdrop-filter: blur(5px);
                        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                        font-weight: 500;
                    }

                    .upcoming-project:hover .upcoming-badge {
                        color: var(--color-primary);
                        background-color: var(--color-white);
                        border-color: var(--color-white);
                        box-shadow: 0 10px 30px rgba(255,255,255,0.2);
                        transform: translateY(-2px);
                    }

                    .upcoming-subtitle {
                        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    .upcoming-project:hover .upcoming-subtitle {
                        color: rgba(255,255,255,0.9) !important;
                        letter-spacing: 6px !important;
                    }

                    @keyframes gloomyChar {
                        0% { opacity: 0.1; transform: translateY(0px) scale(0.95); filter: blur(8px); }
                        50% { opacity: 0.5; transform: translateY(-3px) scale(1.05); filter: blur(3px); }
                        100% { opacity: 0.1; transform: translateY(3px) scale(0.95); filter: blur(8px); }
                    }
                    
                    .gloom-wrap {
                        display: inline-flex;
                    }
                    
                    .gloom-char {
                        display: inline-block;
                        transform: translateZ(0); /* Hardware accel */
                        will-change: transform, opacity, filter;
                        animation: gloomyChar 4s infinite alternate ease-in-out;
                        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                        letter-spacing: 4px;
                    }
                    
                    .upcoming-project:hover .gloom-char {
                        /* Force default styles aggressively on hover */
                        animation: none !important;
                        opacity: 1 !important;
                        filter: blur(0px) !important;
                        transform: translateY(0) scale(1) !important;
                        letter-spacing: 1px !important;
                        color: var(--color-white) !important;
                        text-shadow: 0 0 25px rgba(255,255,255,0.4);
                    }
                    @media (max-width: 768px) {
                        .upcoming-project { padding:2.5rem 1rem; opacity:1; filter:none; transform:none; }
                        .projects-wrapper:hover .upcoming-project { opacity:1; filter:none; transform:none; }
                        .projects-wrapper .upcoming-project:hover { transform:none; }
                        .upcoming-badge { font-size:0.75rem; letter-spacing:2px; padding:10px 16px; }
                        .gloom-char { animation:none; opacity:0.7; filter:blur(4px); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Projects;
