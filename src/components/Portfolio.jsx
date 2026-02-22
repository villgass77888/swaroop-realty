import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const projects = [
    {
        id: 1,
        title: 'Krishna Valley Estates',
        subtitle: '50-Acre Luxury Villa Community',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        type: 'large'
    },
    {
        id: 2,
        title: 'Radha Kunj Villas',
        subtitle: 'Exclusive Smart Villas',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        type: 'tall'
    },
    {
        id: 3,
        title: 'The Girdhar Valley Farms',
        subtitle: 'Exclusive Farm Retreat',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        type: 'wide'
    }
];

const PortfolioItem = ({ project, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    const getGridSpan = (type) => {
        switch (type) {
            case 'large': return { gridColumn: 'span 7', gridRow: 'span 2' };
            case 'tall': return { gridColumn: 'span 5', gridRow: 'span 3' };
            case 'wide': return { gridColumn: 'span 7', gridRow: 'span 1' };
            default: return { gridColumn: 'span 6', gridRow: 'span 1' };
        }
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1.2, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
                ...getGridSpan(project.type),
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                height: '100%',
                minHeight: '400px',
                display: 'block'
            }}
            className="portfolio-item"
        >
            <Link to={`/projects/${project.id}`} style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}>
                <style>{`
                    .portfolio-item .img-wrapper img {
                        transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease;
                        filter: grayscale(30%) brightness(0.8);
                    }
                    .portfolio-item:hover .img-wrapper img {
                        transform: scale(1.08); /* Magnifying effect */
                        filter: grayscale(0%) brightness(1.1);
                    }
                    .portfolio-item::after {
                        content: '';
                        position: absolute;
                        top: 0; left: 0; width: 100%; height: 100%;
                        background: linear-gradient(to top, rgba(10, 17, 40, 0.9) 0%, rgba(10, 17, 40, 0.2) 50%, rgba(10, 17, 40, 0) 100%);
                        opacity: 0.8;
                        transition: opacity 0.8s ease;
                        pointer-events: none;
                        z-index: 1;
                    }
                    .portfolio-item:hover::after {
                        opacity: 0.95;
                    }
                    .portfolio-item .overlay-content {
                        transform: translateY(20px);
                        opacity: 0;
                        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    .portfolio-item:hover .overlay-content {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    .portfolio-item .view-btn {
                        opacity: 0;
                        transform: translateY(10px);
                        transition: all 0.4s ease 0.1s;
                    }
                    .portfolio-item:hover .view-btn {
                        opacity: 1;
                        transform: translateY(0);
                    }
                `}</style>

                {/* Parallax Image Wrapper */}
                <motion.div
                    className="img-wrapper"
                    style={{
                        position: 'absolute',
                        top: '-20%', left: '-10%', right: '-10%', bottom: '-20%',
                        y: imgY
                    }}
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </motion.div>

                {/* Content Overlay */}
                <div
                    className="overlay-content"
                    style={{
                        position: 'absolute',
                        bottom: 0, left: 0, width: '100%',
                        padding: '3rem 2rem 2rem 2rem',
                        color: 'var(--color-white)',
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        height: '100%'
                    }}
                >
                    <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-white)' }}>
                        {project.title}
                    </h3>
                    <p style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
                        {project.subtitle}
                    </p>

                    <div className="view-btn" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.85rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        color: 'var(--color-accent)',
                        borderBottom: '1px solid var(--color-accent)',
                        paddingBottom: '5px',
                        width: 'fit-content'
                    }}>
                        Explore Property <span>&rarr;</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const Portfolio = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "-25% 0px -25% 0px" });

    useEffect(() => {
        if (isInView) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isInView]);

    return (
        <section
            id="portfolio"
            ref={sectionRef}
            style={{
                padding: 'var(--spacing-section) 0',
                backgroundColor: 'var(--color-bg-alt)',
                borderTop: '0.5px solid var(--color-border)',
                transition: 'background-color 0.8s ease'
            }}
            className="portfolio-section"
        >
            <style>{`
        body.dark-mode .portfolio-section {
          background-color: var(--color-primary);
        }
        @media (max-width: 900px) {
          .masonry-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .portfolio-item {
            height: 400px !important;
          }
        }
      `}</style>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1 }}
                    style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--color-primary)',
                        marginBottom: '4rem',
                        textAlign: 'center'
                    }}
                >
                    <span>Featured </span>
                    <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-heading)' }}>Developments</span>
                </motion.h2>

                <div
                    className="masonry-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12, 1fr)',
                        gridAutoRows: '250px',
                        gap: '30px'
                    }}
                >
                    {projects.map((project, index) => (
                        <PortfolioItem key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
