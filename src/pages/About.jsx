import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Counter = ({ value, label, suffix = "" }) => {
    const [isInView, setIsInView] = useState(false);
    const spring = useSpring(0, { bounce: 0, duration: 2500 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, value, spring]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            onViewportEnter={() => setIsInView(true)}
            transition={{ duration: 1 }}
        >
            <div style={{ display: 'flex', alignItems: 'baseline', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                <motion.span style={{ fontSize: '4rem', display: 'block' }}>
                    {display}
                </motion.span>
                <span style={{ fontSize: '3rem' }}>{suffix}</span>
            </div>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-text)', fontWeight: 500 }}>
                {label}
            </span>
        </motion.div>
    );
};

const About = () => {
    const textVars = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
                backgroundColor: 'var(--color-bg)',
                minHeight: '100vh',
                color: 'var(--color-primary)'
            }}
        >
            {/* Dedicated Hero Section for About Us */}
            <div style={{
                position: 'relative',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: 'var(--color-primary)'
            }}>
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Lush Vrindavan Infrastructure"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6) grayscale(10%)' }}
                    />
                </motion.div>

                <motion.div
                    style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'var(--color-white)' }}
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
                    }}
                >
                    <motion.h1
                        variants={textVars}
                        style={{
                            fontSize: 'clamp(4rem, 8vw, 8rem)',
                            lineHeight: 1.05,
                            marginBottom: '1rem',
                            letterSpacing: '-0.02em',
                            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            color: '#FFFFFF'
                        }}
                    >
                        Our Legacy
                    </motion.h1>
                    <motion.p
                        variants={textVars}
                        style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '4px' }}
                    >
                        Curating Vrindavan's finest sanctuaries.
                    </motion.p>
                </motion.div>

            </div>

            <div id="philosophy" className="container" style={{ padding: 'var(--spacing-section) 5%', paddingTop: '160px' }}>

                {/* Section 1: The Philosophy (Vibrant Image) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem', marginBottom: '8rem', alignItems: 'end' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={textVars}
                        style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '4rem' }}
                    >
                        <div>
                            <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                                The Philosophy of Perfection
                            </h3>
                            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--color-text)' }}>
                                We do not merely sell land; we curate vast sanctuaries in Vrindavan that elevate the human spirit.
                                Our approach marries timeless Vastu principles with cutting-edge, ultra-luxury residential development.
                            </p>
                        </div>

                        {/* Secondary Landscape Image for Collage Effect with Swipe Down Reveal */}
                        <div style={{ width: '100%', height: '350px', position: 'relative', overflow: 'hidden' }}>
                            <motion.img
                                src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                alt="Serene Vrindavan Landscape"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                initial={{ scale: 1.2 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            />
                            {/* Swipe Overlay */}
                            <motion.div
                                initial={{ top: 0 }}
                                whileInView={{ top: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'var(--color-bg)',
                                    zIndex: 1
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Primary Large Image with Swipe Down Reveal */}
                    <div style={{ gridColumn: 'span 7', height: '600px', position: 'relative', overflow: 'hidden' }}>
                        <motion.img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                            alt="Vibrant Architectural Detail"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            initial={{ scale: 1.15 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        />
                        {/* Swipe Overlay */}
                        <motion.div
                            initial={{ top: 0 }}
                            whileInView={{ top: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'var(--color-bg)',
                                zIndex: 1
                            }}
                        />
                    </div>
                </div>

                {/* Statistics with Counters */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '2rem',
                    padding: '4rem 0',
                    borderTop: '1px solid var(--color-border)',
                    borderBottom: '1px solid var(--color-border)',
                    marginBottom: '8rem'
                }}>
                    <Counter value={25} suffix="+" label="Years of Excellence" />
                    <Counter value={150} suffix="+" label="Signature Properties" />
                    <Counter value={40} suffix="" label="Global Awards" />
                </div>

                {/* New Section: Mission and Vision */}
                <div style={{ padding: '8rem 0', borderBottom: '1px solid var(--color-border)', marginBottom: '8rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            style={{ gridColumn: 'span 6', paddingRight: '2rem' }}
                        >
                            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-text)', display: 'block', marginBottom: '2rem' }}>
                                The Vision
                            </span>
                            <h4 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                                Redefining Spiritual Luxury
                            </h4>
                            <p data-cursor-magnify style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text)', opacity: 0.8 }}>
                                To create a paradigm shift in how luxury real estate is perceived in holy cities. We envision Vrindavan not just as a pilgrimage destination, but as a premier global sanctuary where the world's most discerning individuals retreat to find ultimate peace, without ever compromising on world-class living standards.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{ gridColumn: 'span 6', borderLeft: '1px solid var(--color-border)', paddingLeft: '4rem' }}
                        >
                            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-text)', display: 'block', marginBottom: '2rem' }}>
                                The Mission
                            </span>
                            <h4 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                                Uncompromising Excellence
                            </h4>
                            <p data-cursor-magnify style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text)', opacity: 0.8 }}>
                                To meticulously acquire, design, and construct exclusive estates that seamlessly blend ancient architectural wisdom with modern bespoke amenities. Every Swaroop Realty project is an uncompromising commitment to quality, Vastu adherence, and delivering a breathtaking living experience.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Section 2: Craftsmanship (Image left, text right) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ gridColumn: 'span 6', height: '700px', overflow: 'hidden' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Luxury Interior Design"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={textVars}
                        style={{ gridColumn: 'span 6', paddingLeft: '2rem' }}
                    >
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: 'black' }}>
                            Obsessive Craftsmanship
                        </h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
                            Every plot selected, every angle considered, and every villa designed is meticulously crafted to create spaces of profound elegance and enduring value. We partner with elite architects to build sprawling estates that respect the holy environment of Govardhan and Vrindavan.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
                            We source only the absolute highest caliber of raw materials—from rare imported marbles that naturally maintain cool temperatures, to sustainably harvested premium woods that echo the traditional aesthetic of North Indian palaces. Our construction phase is closely monitored by master artisans who pour generations of generational knowledge into every bespoke fitting.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text)', marginBottom: '3rem' }}>
                            Crucially, the entire blueprint is strictly aligned with the cosmic geometry of Vastu Shastra. From the orientation of the grand entrance to the exact placement of the central courtyard, every centimeter is calibrated to invite prosperity, health, and a profound sense of serenity into the home.
                        </p>

                        <style>{`
                            .process-btn-link {
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
                            body.dark-mode .process-btn-link {
                                border-bottom-color: var(--color-white);
                                color: var(--color-white);
                            }
                            .process-btn-link:hover {
                                gap: 15px;
                                opacity: 0.7;
                            }
                        `}</style>
                        <Link to="/projects" className="process-btn-link">
                            View the Process
                            <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
