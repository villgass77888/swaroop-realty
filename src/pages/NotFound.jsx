import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const NotFound = () => {
    const { isMobile } = useIsMobile();
    const canvasRef = useRef(null);

    /* ── Subtle particle field ── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let rafId;
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);

        const dots = Array.from({ length: 55 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.4 + 0.4,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            o: Math.random() * 0.35 + 0.08,
        }));

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dots.forEach(d => {
                d.x += d.vx; d.y += d.vy;
                if (d.x < 0) d.x = canvas.width;
                if (d.x > canvas.width) d.x = 0;
                if (d.y < 0) d.y = canvas.height;
                if (d.y > canvas.height) d.y = 0;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(10,17,40,${d.o})`;
                ctx.fill();
            });
            rafId = requestAnimationFrame(tick);
        };
        tick();
        return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); };
    }, []);

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            backgroundColor: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: isMobile ? '7rem 2rem 2rem' : '120px 2rem 2rem',
        }}>
            {/* Particle canvas */}
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

            {/* Decorative large 404 text in background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 0,
                pointerEvents: 'none',
                userSelect: 'none',
            }}>
                <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: isMobile ? '55vw' : '32vw',
                    fontWeight: 700,
                    letterSpacing: '-0.05em',
                    color: 'var(--color-primary)',
                    opacity: 0.04,
                    lineHeight: 1,
                }}>404</span>
            </div>

            {/* Main content */}
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '520px' }}>
                {/* Eyebrow */}
                <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        display: 'block',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '5px',
                        color: 'var(--color-text)',
                        opacity: 0.4,
                        marginBottom: '1.8rem',
                        fontFamily: 'var(--font-body)',
                    }}
                >
                    Error 404 &nbsp;·&nbsp; Page not found
                </motion.span>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: isMobile ? 'clamp(2.4rem, 9vw, 3.5rem)' : 'clamp(3rem, 5vw, 4.5rem)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.1,
                        color: 'var(--color-primary)',
                        marginBottom: '1.4rem',
                    }}
                >
                    This land is <em>uncharted</em>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: isMobile ? '0.95rem' : '1.05rem',
                        lineHeight: 1.8,
                        color: 'var(--color-text)',
                        opacity: 0.6,
                        marginBottom: '3rem',
                    }}
                >
                    The page you are looking for doesn't exist or has been moved.
                    Let us guide you back to Vrindavan.
                </motion.p>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        height: '1px',
                        backgroundColor: 'var(--color-border)',
                        marginBottom: '3rem',
                        transformOrigin: 'left',
                    }}
                />

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <Link
                        to="/"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            padding: '0.95rem 2.2rem',
                            backgroundColor: 'var(--color-primary)', color: '#fff',
                            fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600,
                            textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none',
                            transition: 'opacity 0.3s ease',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                        Return Home →
                    </Link>
                    <Link
                        to="/projects"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            padding: '0.95rem 2.2rem',
                            backgroundColor: 'transparent', color: 'var(--color-primary)',
                            border: '1px solid var(--color-border)',
                            fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 500,
                            textTransform: 'uppercase', letterSpacing: '2px', textDecoration: 'none',
                            transition: 'opacity 0.3s ease',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                        View Projects
                    </Link>
                </motion.div>

                {/* Quick links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.52 }}
                    style={{ marginTop: '3.5rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    {[
                        { label: 'About Us', to: '/about' },
                        { label: 'Contact', to: '/contact' },
                        { label: 'Why Vrindavan', to: '/why-vrindavan' },
                    ].map(({ label, to }) => (
                        <Link key={label} to={to} style={{
                            fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                            textTransform: 'uppercase', letterSpacing: '2px',
                            color: 'var(--color-text)', opacity: 0.45, textDecoration: 'none',
                            transition: 'opacity 0.3s ease',
                            paddingBottom: '2px', borderBottom: '1px solid transparent',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.borderBottomColor = 'var(--color-text)'; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '0.45'; e.currentTarget.style.borderBottomColor = 'transparent'; }}
                        >
                            {label}
                        </Link>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
