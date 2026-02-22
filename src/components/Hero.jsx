import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);
    const vidRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (vidRef.current) {
                // Ensure the video plays forward initially after 0.3s
                vidRef.current.play().catch(e => console.log('Autoplay blocked', e));
            }
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const video = vidRef.current;
        if (!video || Number.isNaN(video.duration)) return;

        // Pause automated playback as soon as user scrolls down
        if (latest > 0.01 && !video.paused) {
            video.pause();
        }

        // Scrub video backward (deconstruct) as user scrolls down
        if (latest > 0.01) {
            const reverseTime = video.duration * (1 - latest);
            video.currentTime = Math.max(0, Math.min(reverseTime, video.duration));
        }
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
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <video
                    ref={vidRef}
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.05) grayscale(10%)' }}
                    src="/hero.mp4"
                />
            </motion.div>

            <motion.div
                style={{ position: 'relative', zIndex: 3, y: textY, opacity }}
                variants={containerVars}
                initial="hidden"
                animate="show"
            >
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
            </motion.div>
        </div>
    );
};

export default Hero;
