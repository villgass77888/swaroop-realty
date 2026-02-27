import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'var(--color-primary)',
                transformOrigin: '0%',
                scaleX,
                zIndex: 9999,
                pointerEvents: 'none',
                willChange: 'transform',
            }}
        />
    );
};

export default ScrollProgressBar;
