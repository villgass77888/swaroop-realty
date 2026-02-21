import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Legacy = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-15%" });

    return (
        <section
            id="about"
            ref={ref}
            style={{
                padding: 'var(--spacing-section) 0',
                backgroundColor: 'var(--color-bg)',
                overflow: 'hidden'
            }}
        >
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '2rem'
            }}>
                <motion.div
                    className="legacy-number"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        gridColumn: 'span 5',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '15rem',
                        lineHeight: 0.8,
                        color: 'rgba(27, 38, 59, 0.05)',
                        textAlign: 'right',
                        paddingRight: '2rem'
                    }}
                >
                    01
                </motion.div>

                <div style={{
                    gridColumn: 'span 7',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontSize: '3rem',
                            marginBottom: '2rem',
                            color: 'var(--color-primary)',
                            maxWidth: '600px',
                            lineHeight: 1.2
                        }}
                    >
                        A vision anchored in precision.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontSize: '1.2rem',
                            lineHeight: 1.8,
                            color: 'var(--color-text)',
                            maxWidth: '500px'
                        }}
                    >
                        We build not just homes, but legacies. Each property is a testament to extraordinary craftsmanship, architectural rigor, and boundless aesthetic ambition. Experience spaces where every detail speaks volumes quietly.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default Legacy;
