import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLoading } from '../context/LoadingContext';
import useIsMobile from '../hooks/useIsMobile';

const Hero = () => {
    const containerRef = useRef(null);
    const vidRef = useRef(null);
    const { isLoading } = useLoading();
    const { isMobile } = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    useEffect(() => {
        if (isLoading) return;
        const timer = setTimeout(() => {
            if (vidRef.current) {
                vidRef.current.playbackRate = 2.0;
                vidRef.current.play().catch(e => console.log('Autoplay blocked', e));
            }
        }, 600);
        return () => clearTimeout(timer);
    }, [isLoading]);

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "30%" : "80%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const containerVars = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
    };
    const itemVars = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div
            ref={containerRef}
            id="home"
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                minHeight: isMobile ? '100svh' : '800px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                padding: isMobile ? '0 5%' : '0 10%',
                backgroundColor: 'var(--color-primary)'
            }}
        >
            {/* Background video */}
            <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, y: backgroundY, scale, zIndex: 0, willChange: 'transform' }}>
                <video
                    autoPlay loop muted playsInline preload="auto"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55) contrast(1.1) grayscale(20%)', willChange: 'filter' }}
                >
                    <source src="https://cdn.pixabay.com/video/2021/08/04/83896-584742469_large.mp4" type="video/mp4" />
                    <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Architecture" />
                </video>
            </motion.div>

            {/* Gradient overlay */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to bottom, rgba(10,17,40,0.4) 0%, transparent 40%, rgba(10,17,40,0.9) 100%)',
                zIndex: 2
            }} />

            {/* Right panel video — desktop only */}
            {!isMobile && (
                <motion.div
                    style={{
                        position: 'absolute', top: 0, right: 0,
                        width: '45vw', height: '100vh', zIndex: 2,
                        opacity: useTransform(scrollYProgress, [0, 0.8], [1, 0])
                    }}
                    initial={{ opacity: 0, x: 300, scale: 0.9 }}
                    animate={isLoading ? { opacity: 0, x: 300, scale: 0.9 } : { opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <video
                        ref={vidRef} muted playsInline
                        style={{
                            width: '100%', height: '100%', objectFit: 'cover',
                            filter: 'brightness(1.05) grayscale(10%)', opacity: 0.9,
                            transform: 'scale(1.15)',
                            maskImage: 'linear-gradient(to left, black 85%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to left, black 85%, transparent 100%)'
                        }}
                        src="/hero.mp4"
                    />
                </motion.div>
            )}

            {/* Mobile-only: hero bg image — bottom-to-top fade */}
            {isMobile && (
                <motion.div
                    style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundImage: 'url("/hero bg.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.45,
                        maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
                        zIndex: 1, pointerEvents: 'none'
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isLoading ? { opacity: 0, y: 40 } : { opacity: 0.45, y: 0 }}
                    transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
            )}

            {/* Left bg overlay — desktop only */}
            {!isMobile && (
                <motion.div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '60vw', height: '100%',
                    backgroundImage: 'url("/hero bg.png")',
                    backgroundSize: 'cover', backgroundPosition: 'left center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.6,
                    maskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
                    zIndex: 2, pointerEvents: 'none'
                }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--color-primary)', mixBlendMode: 'multiply', opacity: 0.5 }} />
                </motion.div>
            )}

            {/* Hero text */}
            <motion.div
                style={{
                    position: 'relative', zIndex: 3, y: textY, opacity,
                    width: '100%', display: 'flex',
                    justifyContent: isMobile ? 'center' : 'flex-start',
                    willChange: 'transform, opacity',
                }}
                variants={containerVars}
                initial="hidden"
                animate={isLoading ? 'hidden' : 'show'}
            >
                <div style={{
                    position: 'relative', zIndex: 1,
                    left: isMobile ? 0 : '-3vw',
                    textAlign: isMobile ? 'center' : 'left',
                    maxWidth: isMobile ? '100%' : 'none'
                }}>
                    <h1 style={{
                        color: 'var(--color-white)',
                        fontSize: isMobile ? 'clamp(2.6rem, 10vw, 3.5rem)' : 'clamp(3.5rem, 6vw, 6.5rem)',
                        lineHeight: 1.1, marginBottom: '1.5rem',
                        letterSpacing: '-0.02em',
                        textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}>
                        <motion.span variants={itemVars} style={{ display: 'block' }}>Where</motion.span>
                        <motion.span variants={itemVars} style={{ display: 'block', fontStyle: 'italic', fontFamily: 'var(--font-heading)' }}>Spirituality</motion.span>
                        <motion.span variants={itemVars} style={{ display: 'block' }}>Meets Luxury.</motion.span>
                    </h1>

                    <motion.div variants={itemVars} style={{
                        display: 'flex', gap: '20px', marginTop: '2.5rem',
                        justifyContent: isMobile ? 'center' : 'flex-start',
                        flexWrap: 'wrap'
                    }}>
                        <a href="#portfolio" style={{
                            display: 'inline-block',
                            padding: isMobile ? '16px 36px' : '15px 40px',
                            border: '1px solid rgba(255,255,255,0.35)',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'var(--color-white)',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            transition: 'all 0.4s ease',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 500,
                            minHeight: '48px',
                        }}
                            onMouseOver={e => { e.currentTarget.style.backgroundColor = 'var(--color-white)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                            onMouseOut={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--color-white)'; }}
                        >
                            Explore Projects
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
