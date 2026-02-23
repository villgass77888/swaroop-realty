import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Prevent scrolling while preloader is active
        document.body.style.overflow = 'hidden';

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        document.body.style.overflow = '';
                        onLoadingComplete();
                    }, 500); // Wait a beat at 100% before triggering complete
                    return 100;
                }
                // Ease out progress calculation
                const increment = Math.max(1, (100 - prev) * 0.15);
                return Math.min(100, prev + increment);
            });
        }, 30);

        return () => {
            clearInterval(timer);
            document.body.style.overflow = '';
        };
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: '#0a1128', // Dark Navy / Primary Color
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                }}
            >
                {/* Logo / Brand Name */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        letterSpacing: '2px',
                        marginBottom: '3rem'
                    }}
                >
                    SWAROOP REALTY
                </motion.div>

                {/* Progress Number */}
                <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    letterSpacing: '4px',
                    marginBottom: '1rem',
                    opacity: 0.7
                }}>
                    {Math.round(progress)}%
                </div>

                {/* Loading Bar */}
                <div style={{
                    width: '200px',
                    height: '2px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: `${progress}%`,
                            backgroundColor: '#ffffff'
                        }}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Preloader;
