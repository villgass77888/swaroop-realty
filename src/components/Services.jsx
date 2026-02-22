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
        >
            <span className="svc-num">
                [ {svc.num} ]
            </span>
            <div
                className="title-wrapper"
                style={{ position: 'relative' }}
            // onMouseEnter and onMouseLeave are removed as they were only for the liquid glass overlay.
            >
                <h4 className="svc-title">
                    {svc.title}
                </h4>

                <div
                    className="svc-content-wrapper"
                    style={{
                        ...(idx === 0 ? { top: '2rem', transform: 'translateY(5%)' } :
                            idx === 1 ? { top: '25%', transform: 'translateY(-25%)' } :
                                idx === 2 ? { top: '75%', transform: 'translateY(-75%)' } :
                                    idx === 3 ? { top: 'auto', bottom: '2rem', transform: 'translateY(-10%)' } : {})
                    }}
                >
                    <img src={svc.img} alt={svc.title} className="svc-img" />
                    <p className="svc-desc">
                        {svc.title}— {svc.desc}
                    </p>
                </div>
            </div>
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
            desc: 'We secure and curate the most exclusive parcels of prime real estate in Vrindavan, guaranteeing maximum appreciation potential. Every plot undergoes rigorous legal vetting and environmental assessment to ensure it serves as the perfect uncompromised canvas for your dream home or investment portfolio. Our properties offer unparalleled access to local thoroughfares while maintaining an ambiance of absolute peace and serenity away from the bustle of the city center.',
            img: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        },
        {
            num: '02',
            title: 'Bespoke Villas',
            desc: 'Our flagship architectural offering focuses on custom-built luxury villas that seamlessly blend traditional Indian aesthetics with ultra-modern smart-home amenities. We prioritize absolute privacy, integrating high walls, lush foliage, and private courtyards into every design. From sprawling living spaces optimized for natural light to climate-controlled master suites and personalized infinity pools, our bespoke villas define the pinnacle of opulent personalized living.',
            img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        },
        {
            num: '03',
            title: 'Vastu Architecture',
            desc: 'We believe a truly luxurious home must be deeply aligned with cosmic principles. Every single plot layout, villa blueprint, and interior spatial design is strictly governed by ancient Vastu Shastra principles. By optimizing the flow of elemental energies, our master architects ensure that your sanctuary invites unparalleled peace, vibrant health, and unbroken prosperity into your daily life and family lineage.',
            img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        },
        {
            num: '04',
            title: 'Turnkey Execution',
            desc: 'Our end-to-end execution service is designed to completely insulate our clients from the stress of real estate development. From initial land acquisition and legal registration to architectural planning, construction, premium outfitting, and final landscaping—we handle every single detail. We simply hand over the keys to a fully furnished, immaculate spiritual sanctuary that is ready for you to step into.',
            img: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        }
    ];

    return (
        <motion.section
            ref={ref}
            style={{
                padding: 'var(--spacing-section) 0',
                backgroundColor: bgColor,
                transition: 'background-color 0.8s ease',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Blueprint Background Wrapper */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50vw',
                height: '100%',
                backgroundImage: 'url(/blueprint-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'left center',
                opacity: 1.0,
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
                    <span>Our </span>
                    <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-heading)' }}>Expertise</span>
                </motion.h2>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    gap: '1rem',
                    position: 'relative' /* Anchor position for absolute children */
                }}>
                    <style>{`
                        .service-row {
                            display: grid;
                            grid-template-columns: 80px 1fr;
                            align-items: center;
                            gap: 1rem;
                            padding: 2rem 0;
                            border: none;
                            cursor: pointer;
                            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                            /* Removed relative positioning to allow children to escape */
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
                            font-size: clamp(1.5rem, 2.5vw, 3rem); /* Reduced from 4rem */
                            font-family: var(--font-heading);
                            color: var(--color-primary);
                            white-space: nowrap;
                            position: relative;
                            transform-origin: left center;
                            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                        }
                        
                        .service-row .svc-content-wrapper {
                            position: absolute;
                            right: 0;
                            top: 50%; /* Center vertically within the list */
                            transform: translateY(-50%); 
                            display: flex;
                            align-items: stretch; /* Stretch image to match text height */
                            gap: 2rem;
                            width: 45vw; /* Roughly half the screen */
                            max-width: 600px;
                            pointer-events: none;
                            z-index: 10;
                        }

                        .service-row .svc-img {
                            width: 45%; /* Slightly less than half */
                            object-fit: cover;
                            border-radius: 4px;
                            opacity: 0;
                            transform: translateX(-50px) scale(0.95); /* Adjusted slide */
                            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                        }

                        .service-row .svc-desc {
                            font-size: 1.05rem; /* Slightly smaller to fit with image */
                            line-height: 1.6;
                            color: var(--color-text);
                            opacity: 0;
                            transform: translateX(-100px) scale(0.95); /* Adjusted slide */
                            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                            flex: 1;
                        }

                        /* Hover States */
                        .service-row:hover .svc-num {
                            opacity: 1;
                        }
                        .title-wrapper:hover .svc-title {
                            transform: translateX(-15px) scale(1.05); /* Zoom and shift left */
                        }
                        .title-wrapper:hover .svc-img {
                            opacity: 1;
                            transform: translateX(0px) scale(1);
                        }
                        .title-wrapper:hover .svc-desc {
                            opacity: 1;
                            transform: translateX(0px) scale(1);
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
