import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const ServiceRow = ({ svc, idx }) => {
    const rowRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const row = rowRef.current;
        if (!row) return;

        const handleMouseMove = (e) => {
            const rect = row.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        if (isHovered) {
            row.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            row.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isHovered]);

    return (
        <motion.div
            ref={rowRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="service-row"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative'
            }}
        >
            <span className="svc-num">
                [ {svc.num} ]
            </span>
            <div style={{ position: 'relative' }}>
                <h4 className="svc-title" style={{ opacity: isHovered ? 0.3 : 1, transition: 'opacity 0.5s ease' }}>
                    {svc.title}
                </h4>
                {/* Glow Overlay */}
                <h4
                    className="svc-title glow-overlay"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: isHovered ? 1 : 0,
                        color: '#bae6fd', /* Light blue glow */
                        filter: 'blur(2px) drop-shadow(0 0 10px rgba(186, 230, 253, 0.4))',
                        transition: 'opacity 0.4s ease',
                        WebkitMaskImage: isHovered ? `radial-gradient(circle 60px at ${mousePos.x - 80}px ${mousePos.y}px, black 0%, transparent 100%)` : 'none',
                        maskImage: isHovered ? `radial-gradient(circle 60px at ${mousePos.x - 80}px ${mousePos.y}px, black 0%, transparent 100%)` : 'none',
                        pointerEvents: 'none',
                        zIndex: 2
                    }}
                >
                    {svc.title}
                </h4>
            </div>
            <p className="svc-desc">
                {svc.desc}
            </p>
        </motion.div>
    );
};

const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end end"]
    });

    // Smoothly transition background from dark blue (Portfolio's dark mode state) or pure white to faint ice
    const bgColor = useTransform(
        scrollYProgress,
        [0, 0.3],
        ['var(--color-bg)', 'var(--color-bg-alt)']
    );

    const services = [
        {
            num: '01',
            title: 'Premium Plots',
            desc: 'Curated parcels of prime land in Vrindavan, offering maximum appreciation and the perfect canvas for your dream home.'
        },
        {
            num: '02',
            title: 'Bespoke Villas',
            desc: 'Custom-built luxury villas blending traditional aesthetics with ultra-modern amenities and absolute privacy.'
        },
        {
            num: '03',
            title: 'Vastu Architecture',
            desc: 'Every plot layout and villa design is strictly governed by ancient Vastu Shastra for peace, health, and prosperity.'
        },
        {
            num: '04',
            title: 'Turnkey Execution',
            desc: 'From land acquisition to handing over the keys to your fully furnished spiritual sanctuary, we handle everything.'
        }
    ];

    return (
        <motion.section
            ref={ref}
            style={{
                padding: 'var(--spacing-section) 0',
                backgroundColor: bgColor,
                transition: 'background-color 0.8s ease'
            }}
        >
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        marginBottom: '4rem',
                        textAlign: 'center',
                        color: 'var(--color-primary)'
                    }}
                >
                    Our Expertise
                </motion.h2>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    gap: '1rem'
                }}>
                    <style>{`
                        .service-row {
                            display: grid;
                            grid-template-columns: 80px 1fr 2fr;
                            align-items: center;
                            gap: 2rem;
                            padding: 3rem 0;
                            border-bottom: 1px solid var(--color-border);
                            cursor: pointer;
                            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                        }
                        .service-row .svc-num {
                            font-size: 1.2rem;
                            font-family: var(--font-heading);
                            opacity: 0.3;
                            transition: opacity 0.5s ease;
                            color: var(--color-text);
                        }
                        /* Cinematic Glow Base */
                        .service-row .svc-title {
                            font-size: clamp(2rem, 3.5vw, 4rem);
                            font-family: var(--font-heading);
                            color: var(--color-primary);
                            white-space: nowrap;
                            position: relative;
                        }
                        
                        .service-row .svc-desc {
                            font-size: 1.1rem;
                            line-height: 1.6;
                            color: var(--color-text);
                            opacity: 0.6;
                            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                            max-width: 500px;
                            justify-self: end;
                        }

                        /* Hover States */
                        .service-row:hover .svc-num {
                            opacity: 1;
                        }
                        .service-row:hover .svc-desc {
                            opacity: 1;
                        }

                        @media (max-width: 1000px) {
                            .service-row {
                                grid-template-columns: 1fr;
                                gap: 1rem;
                                padding: 2rem 0;
                            }
                            .service-row .svc-desc {
                                justify-self: start;
                                max-width: 100%;
                            }
                        }
                    `}</style>
                    {services.map((svc, idx) => (
                        <ServiceRow key={svc.num} svc={svc} idx={idx} />
                    ))}
                </div>
            </div >
        </motion.section >
    );
};

export default Services;
