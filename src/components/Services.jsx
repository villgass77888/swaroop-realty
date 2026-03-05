import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

// Mobile accordion card
const ServiceCard = ({ svc, idx }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.08 }}
            style={{ borderBottom: '1px solid var(--color-border)' }}
        >
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1.4rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', opacity: 0.35, color: 'var(--color-text)' }}>[{svc.num}]</span>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', fontWeight: 500 }}>{svc.title}</h4>
                </div>
                <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: '1.4rem', color: 'var(--color-primary)', flexShrink: 0, marginLeft: '1rem' }}
                >+</motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <img src={svc.img} alt={svc.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
                        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text)', paddingBottom: '1.5rem' }}>{svc.desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Desktop service row
const ServiceRow = ({ svc, idx, setIsListHovered }) => {
    const rowRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

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
        >
            <span className="svc-num">[ {svc.num} ]</span>
            <div className="title-wrapper" style={{ position: 'relative' }}>
                <h4 className="svc-title" onMouseEnter={() => setIsListHovered(true)} onMouseLeave={() => setIsListHovered(false)}>{svc.title}</h4>
                <div className="svc-content-wrapper" style={{
                    ...(idx === 0 ? { top: '2rem', transform: 'translateY(5%)' }
                        : idx === 1 ? { top: '25%', transform: 'translateY(-25%)' }
                            : idx === 2 ? { top: '75%', transform: 'translateY(-75%)' }
                                : { top: 'auto', bottom: '2rem', transform: 'translateY(-10%)' })
                }}>
                    <img src={svc.img} alt={svc.title} className="svc-img" />
                    <p className="svc-desc">{svc.title}— {svc.desc}</p>
                </div>
            </div>
        </motion.div>
    );
};

const services = [
    { num: '01', title: 'Premium Plots', desc: 'We secure and curate the most exclusive parcels of prime real estate in Vrindavan, guaranteeing maximum appreciation potential. Every plot undergoes rigorous legal vetting and environmental assessment.', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    { num: '02', title: 'Bespoke Villas', desc: 'Our flagship architectural offering focuses on custom-built luxury villas that seamlessly blend traditional Indian aesthetics with ultra-modern smart-home amenities, prioritizing absolute privacy.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    { num: '03', title: 'Vastu Architecture', desc: 'Every plot layout, villa blueprint, and interior spatial design is strictly governed by ancient Vastu Shastra principles, ensuring your sanctuary invites peace, vibrant health, and prosperity.', img: '/vastu-diagram.png' },
    { num: '04', title: 'Turnkey Execution', desc: 'Our end-to-end execution service handles every detail from land acquisition and legal registration to architectural planning, construction, and final landscaping.', img: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
];

const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const [isListHovered, setIsListHovered] = useState(false);
    const { isMobile, isTablet } = useIsMobile();

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end end"] });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const handleMouseMove = (e) => {
        if (!ref.current || isMobile) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1);
        mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1);
    };
    const springConfig = { damping: 30, stiffness: 200, mass: 1 };
    const springRotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), springConfig);
    const springRotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), springConfig);
    const bgColor = useTransform(scrollYProgress, [0, 0.3], ['var(--color-bg)', 'var(--color-bg-alt)']);

    return (
        <motion.section
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            style={{ padding: 'var(--spacing-section) 0', backgroundColor: bgColor, position: 'relative', overflow: 'hidden' }}
        >
            {/* Blueprint bg — desktop only */}
            {!isMobile && (
                <motion.div
                    initial={{ opacity: 0, x: 200, scale: 0.95 }}
                    animate={{ opacity: isInView ? (isListHovered ? 0.2 : 0.4) : 0, x: isInView ? 0 : 200, scale: isInView ? 1 : 0.95 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        transformPerspective: 1200, rotateX: springRotateX, rotateY: springRotateY,
                        position: 'absolute', top: '15rem', right: 0, width: '50vw', height: 'calc(100% - 15rem)',
                        backgroundImage: 'url(/blueprint-bg.png)', backgroundSize: 'cover', backgroundPosition: 'left center',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                        pointerEvents: 'none', zIndex: 0,
                        willChange: 'transform, opacity',
                        filter: isListHovered ? 'blur(10px)' : 'blur(0px)',
                        transition: 'filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                />
            )}

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', marginBottom: isMobile ? '2rem' : '4rem', textAlign: 'center', color: 'var(--color-primary)' }}
                >
                    <span>Our </span><span style={{ fontStyle: 'italic', fontFamily: 'var(--font-heading)' }}>Expertise</span>
                </motion.h2>

                {/* Mobile: accordion; Desktop: hover rows */}
                {isMobile ? (
                    <div style={{ borderTop: '1px solid var(--color-border)' }}>
                        {services.map((svc, idx) => <ServiceCard key={svc.num} svc={svc} idx={idx} />)}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1200px', margin: '0 auto', gap: '1rem', position: 'relative' }}>
                        <style>{`
                            .service-row{display:grid;grid-template-columns:80px 1fr;align-items:center;gap:1rem;padding:2rem 0;border:none;cursor:pointer;transition:all 0.5s cubic-bezier(0.16,1,0.3,1);}
                            .service-row .svc-num{font-size:1.2rem;font-family:var(--font-heading);opacity:.3;transition:opacity .5s ease;color:var(--color-text);}
                            .service-row .svc-title{font-size:clamp(1.5rem,2.5vw,3rem);font-family:var(--font-heading);color:var(--color-primary);white-space:nowrap;position:relative;transform-origin:left center;transition:transform .5s cubic-bezier(0.16,1,0.3,1);}
                            .service-row .svc-content-wrapper{position:absolute;right:0;top:50%;transform:translateY(-50%);display:flex;align-items:stretch;gap:2rem;width:45vw;max-width:600px;pointer-events:none;z-index:10;}
                            .service-row .svc-img{width:45%;object-fit:cover;border-radius:4px;opacity:0;transform:translateX(-50px) scale(.95);transition:all .8s cubic-bezier(0.16,1,0.3,1);box-shadow:0 20px 40px rgba(0,0,0,.1);}
                            .service-row .svc-desc{font-size:1.05rem;line-height:1.6;color:var(--color-text);opacity:0;transform:translateX(-100px) scale(.95);transition:all .8s cubic-bezier(0.16,1,0.3,1);flex:1;}
                            .service-row:hover .svc-num{opacity:1;}
                            .svc-title{display:inline-block;width:max-content;}
                            .svc-title:hover{transform:translateX(-15px) scale(1.05);}
                            .svc-title:hover~.svc-content-wrapper .svc-img{opacity:1;transform:translateX(0px) scale(1);}
                            .svc-title:hover~.svc-content-wrapper .svc-desc{opacity:1;transform:translateX(0px) scale(1);}
                        `}</style>
                        {services.map((svc, idx) => <ServiceRow key={svc.num} svc={svc} idx={idx} setIsListHovered={setIsListHovered} />)}
                    </div>
                )}
            </div>
        </motion.section>
    );
};

export default Services;
