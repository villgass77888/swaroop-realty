import React, { useRef } from 'react';
import { motion, useInView, useTransform, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';

const Ethos = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const textReveal = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section id="ethos" ref={containerRef} style={{ padding: 'var(--spacing-section) 0', position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem', alignItems: 'center' }}>

                    {/* Left Side: Dramatic Offset Typography */}
                    <div style={{ gridColumn: 'span 5', position: 'relative', zIndex: 2 }}>
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={{
                                hidden: { opacity: 0 },
                                show: { opacity: 1, transition: { staggerChildren: 0.2 } }
                            }}
                        >
                            <motion.h4 variants={textReveal} style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'inherit', transition: 'color 0.8s ease', marginBottom: '2rem' }}>
                                The Ethos
                            </motion.h4>
                            <motion.h2 variants={textReveal} style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1.1, marginBottom: '2rem', transition: 'color 0.8s ease' }}>
                                A Legacy in <br />
                                <span style={{ fontStyle: 'italic', color: 'inherit' }}>Vrindavan.</span>
                            </motion.h2>
                            <motion.p variants={textReveal} style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'inherit', transition: 'color 0.8s ease', marginBottom: '3rem' }}>
                                For over two decades, we’ve curated exclusive luxury plots and bespoke villas in the spiritual heart of India. We don’t just sell land, we create timeless sanctuaries, seamlessly blending the wisdom of Vastu with the elegance of modern luxury.
                            </motion.p>

                            <motion.div variants={textReveal}>
                                <style>{`
                                    .ethos-btn {
                                        display: inline-flex;
                                        align-items: center;
                                        gap: 10px;
                                        padding-bottom: 10px;
                                        border-bottom: 1px solid var(--color-primary);
                                        color: var(--color-primary);
                                        text-decoration: none;
                                        text-transform: uppercase;
                                        letter-spacing: 2px;
                                        font-size: 0.85rem;
                                        font-weight: 500;
                                        transition: all 0.3s ease;
                                    }
                                    body.dark-mode .ethos-btn {
                                        border-bottom-color: var(--color-white);
                                        color: var(--color-white);
                                    }
                                    .ethos-btn:hover {
                                        gap: 15px;
                                        opacity: 0.7;
                                    }
                                `}</style>
                                <Link to="/about" className="ethos-btn">
                                    Discover Our Story
                                    <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Side: Massive Faint Number & Parallax Image */}
                    <div style={{ gridColumn: 'span 7', position: 'relative', height: '900px' }}>
                        {/* Huge background ghost number */}
                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            right: '-100px',
                            fontSize: '40rem',
                            fontFamily: 'var(--font-heading)',
                            lineHeight: 0.8,
                            color: 'rgba(0,0,0,0.02)',
                            zIndex: 0,
                            pointerEvents: 'none',
                            userSelect: 'none'
                        }}>
                            01
                        </div>

                        <motion.div
                            style={{
                                position: 'relative',
                                zIndex: 1,
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                y: y
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                alt="Ethos Architecture"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ethos;
