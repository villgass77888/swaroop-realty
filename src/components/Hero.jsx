import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLoading } from '../context/LoadingContext';

const Hero = () => {
    const containerRef = useRef(null);
    const vidRef = useRef(null);
    const { isLoading } = useLoading();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    useEffect(() => {
        if (isLoading) return; // Don't play until preloader is done
        const timer = setTimeout(() => {
            if (vidRef.current) {
                vidRef.current.playbackRate = 2.0;
                vidRef.current.play().catch(e => console.log('Autoplay blocked', e));
            }
        }, 600); // Small delay after reveal
        return () => clearTimeout(timer);
    }, [isLoading]);



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

            {/* Right Cropped Video Element */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '45vw',
                    height: '100vh',
                    zIndex: 2,
                    opacity: useTransform(scrollYProgress, [0, 0.8], [1, 0])
                }}
                initial={{ opacity: 0, x: 300, scale: 0.9 }}
                animate={isLoading ? { opacity: 0, x: 300, scale: 0.9 } : { opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
                <video
                    ref={vidRef}
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(1.05) grayscale(10%)',
                        opacity: 0.9,
                        transform: 'scale(1.15)', // Added zoom effect
                        maskImage: 'linear-gradient(to left, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to left, black 85%, transparent 100%)'
                    }}
                    src="/hero.mp4"
                />
            </motion.div>

            {/* 60% Left Side Background Image overlayed with blue tint and fade to right */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '60vw',
                    height: '100%',
                    backgroundImage: 'url("/hero bg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.6,
                    maskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
                    zIndex: 2,
                    pointerEvents: 'none'
                }}
            >
                {/* Blue Tint Overlay inside the masked background */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'var(--color-primary)',
                    mixBlendMode: 'multiply',
                    opacity: 0.5
                }} />
            </motion.div>

            <motion.div
                style={{ position: 'relative', zIndex: 3, y: textY, opacity, width: '100%', display: 'flex' }}
                variants={containerVars}
                initial="hidden"
                animate={isLoading ? 'hidden' : 'show'}
            >
                <div style={{ position: 'relative', zIndex: 1, left: '-3vw' }}>
                    <h1 style={{ color: 'var(--color-white)', fontSize: 'clamp(3.5rem, 6vw, 6.5rem)', lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.02em', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        <motion.span variants={itemVars} style={{ display: 'block' }}>Where</motion.span>
                        <motion.span variants={itemVars} style={{ display: 'block', fontStyle: 'italic', fontFamily: 'var(--font-heading)' }}>Spirituality</motion.span>
                        <motion.span variants={itemVars} style={{ display: 'block' }}>Meets Luxury.</motion.span>
                    </h1>

                    <motion.div variants={itemVars} style={{ display: 'flex', gap: '30px', marginTop: '3.5rem', alignItems: 'center' }}>
                        <a href="#projects" style={{
                            padding: '15px 40px',
                            border: '1px solid rgba(255, 255, 255, 0.35)',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'var(--color-white)',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            transition: 'all 0.4s ease',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 500
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-white)';
                                e.currentTarget.style.color = 'var(--color-primary)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.color = 'var(--color-white)';
                            }}>
                            Explore Projects
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
