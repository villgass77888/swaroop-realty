import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <div
            ref={containerRef}
            id="home"
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                minHeight: '800px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10%',
                backgroundColor: 'var(--color-primary)'
            }}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    y: backgroundY,
                    scale: scale,
                    zIndex: 0
                }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'brightness(0.55) contrast(1.1) grayscale(20%)'
                    }}
                >
                    <source src="https://cdn.pixabay.com/video/2021/08/04/83896-584742469_large.mp4" type="video/mp4" />
                    {/* Fallback image */}
                    <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Architecture" />
                </video>
            </motion.div>

            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to bottom, rgba(10, 17, 40, 0.4) 0%, transparent 40%, rgba(10, 17, 40, 0.9) 100%)',
                zIndex: 2
            }} />

            {/* Masked Right Layout Image */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '15vh',
                    right: '5vw',
                    width: '35vw',
                    height: '70vh',
                    zIndex: 2,
                    opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
                    y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]),
                    clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)', // Elegant angle mask
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Vrindavan Luxury Elevation"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.1) grayscale(10%)' }}
                />
            </motion.div>

            <motion.div
                style={{ position: 'relative', zIndex: 3, y: textY, opacity }}
                variants={containerVars}
                initial="hidden"
                animate="show"
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    marginBottom: '2rem'
                }}>
                    <motion.div
                        variants={itemVars}
                        style={{
                            height: '1px',
                            width: '40px',
                            backgroundColor: 'var(--color-accent)'
                        }}
                    />
                    <motion.span
                        variants={itemVars}
                        style={{
                            textTransform: 'uppercase',
                            letterSpacing: '4px',
                            fontSize: '0.9rem',
                            color: 'var(--color-accent)',
                            fontFamily: 'var(--font-body)'
                        }}
                    >
                        Swaroop Realty
                    </motion.span>
                </div>

                <h1 style={{ color: 'var(--color-white)', fontSize: 'clamp(4rem, 8vw, 8rem)', lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.02em', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                    <motion.span variants={itemVars} style={{ display: 'block' }}>Where</motion.span>
                    <motion.span variants={itemVars} style={{ display: 'block', fontStyle: 'italic', fontFamily: 'var(--font-heading)' }}>Spirituality</motion.span>
                    <motion.span variants={itemVars} style={{ display: 'block' }}>Meets Luxury.</motion.span>
                </h1>

                <motion.div variants={itemVars} style={{ display: 'flex', gap: '30px', marginTop: '3.5rem', alignItems: 'center' }}>
                    <a href="#projects" style={{
                        padding: '15px 40px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        backgroundColor: 'transparent',
                        color: 'var(--color-white)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        transition: 'all 0.4s ease',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        backdropFilter: 'blur(10px)'
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-white)';
                            e.currentTarget.style.color = 'var(--color-primary)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--color-white)';
                        }}>
                        Enter Portfolio
                    </a>
                </motion.div>

                {/* Magnetic Scroll Indicator */}
                <motion.a
                    href="#ethos"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    style={{
                        position: 'absolute',
                        bottom: '-15vh',
                        left: '0',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'var(--color-white)',
                        textDecoration: 'none',
                        gap: '10px'
                    }}
                >
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 500 }}>Scroll</span>
                    <motion.div
                        animate={{ height: ['0px', '40px', '0px'], y: [0, 20, 40] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        style={{ width: '1px', backgroundColor: 'var(--color-white)' }}
                    />
                </motion.a>
            </motion.div>
        </div>
    );
};

export default Hero;
