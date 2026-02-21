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
        title: 'The Lotus Plots',
        subtitle: 'Premium Gated Community',
        location: 'Vrindavan, UP',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
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
                <h2 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', margin: 0, lineHeight: 1 }}>{project.title}</h2>
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
        </div>
    );
};

export default Projects;
