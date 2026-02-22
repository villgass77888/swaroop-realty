import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonialsData = [
    {
        id: 1,
        name: 'Aarav Singhania',
        text: "“Swaroop Realty didn't just find me a plot; they curated a sanctuary. The Vastu-compliant layout they recommended in Vrindavan brought an incredible sense of peace to our family. Their end-to-end execution was flawless.”",
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 2,
        name: 'Priya Mehra',
        text: "“From the very first consultation to handing over the keys of our bespoke villa, the team was extraordinary. The architecture perfectly blends traditional Indian aesthetics with modern resort-style luxury.”",
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 3,
        name: 'Rohan Desai',
        text: "“Their deep understanding of the Vrindavan real estate landscape is unmatched. They handled all the complex legal vetting and environmental assessments seamlessly, making it a stress-free investment.”",
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 4,
        name: 'Kavita Verma',
        text: "“As an NRI, I was worried about the turnkey execution, but Swaroop Realty delivered above and beyond. My home was handed over immaculate, fully landscaped, and beautifully furnished.”",
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 5,
        name: 'Siddharth Reddy',
        text: "“A truly premium experience. Their focus on exclusive parcels guarantees an appreciation potential that is hard to find anywhere else. I highly recommend their expertise.”",
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
];

const Testimonials = () => {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const { scrollX } = useScroll({ container: scrollContainerRef });
    const scrollVelocityX = useVelocity(scrollX);
    const smoothVelocity = useSpring(scrollVelocityX, {
        damping: 50,
        stiffness: 400
    });
    // Map high velocities to 1 opacity, 0 velocity to 0 opacity
    const fadeOpacity = useTransform(smoothVelocity, [-800, 0, 800], [1, 0, 1]);

    const targetVelocity = useRef(0);
    const currentVelocity = useRef(0);
    const isHoveringBtn = useRef(false);
    const rafId = useRef(null);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => {
            window.removeEventListener('resize', checkScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);

    const updateScroll = () => {
        if (isHoveringBtn.current) {
            currentVelocity.current += (targetVelocity.current - currentVelocity.current) * 0.05; // Buttery Acceleration
        } else {
            currentVelocity.current *= 0.96; // Extended Momentum Glide
        }

        if (Math.abs(currentVelocity.current) > 0.1) {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft += currentVelocity.current;
            }
            rafId.current = requestAnimationFrame(updateScroll);
        } else {
            currentVelocity.current = 0;
            rafId.current = null;
        }
    };

    const startScrolling = (direction) => {
        isHoveringBtn.current = true;
        targetVelocity.current = direction === 'left' ? -18 : 18; // Sweeping Top Speed
        if (!rafId.current) {
            rafId.current = requestAnimationFrame(updateScroll);
        }
    };

    const stopScrolling = () => {
        isHoveringBtn.current = false;
        targetVelocity.current = 0;
    };

    return (
        <section className="testimonials-section">
            <style>{`
                .testimonials-section {
                    padding: var(--spacing-section) 0;
                    background-color: var(--color-primary); /* Dark Background */
                    overflow: hidden;
                    position: relative;
                }
                .testimonials-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }
                .testimonials-title {
                    font-size: clamp(2.5rem, 4vw, 4rem);
                    font-family: var(--font-heading);
                    color: var(--color-white); /* Light Text */
                    margin: 0 auto;
                }
                
                /* Container and Hide Scrollbar */
                .testimonials-wrapper {
                    position: relative;
                }
                .fade-overlay {
                    position: absolute;
                    top: -20px;
                    bottom: -20px;
                    width: 25vw;
                    pointer-events: none;
                    z-index: 5;
                    /* Subtle frosty backdrop blur atop gradient */
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }
                .fade-overlay.left-fade {
                    left: 0;
                    background: linear-gradient(to right, var(--color-primary) 5%, transparent 100%);
                    mask-image: linear-gradient(to right, black 20%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to right, black 20%, transparent 100%);
                }
                .fade-overlay.right-fade {
                    right: 0;
                    background: linear-gradient(to left, var(--color-primary) 5%, transparent 100%);
                    mask-image: linear-gradient(to left, black 20%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to left, black 20%, transparent 100%);
                }
                .testimonials-container {
                    display: flex;
                    gap: 1.5rem;
                    overflow-x: auto;
                    padding-bottom: 2rem; /* space for shadow */
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .testimonials-container::-webkit-scrollbar {
                    display: none; /* Chrome, Safari and Opera */
                }
                
                /* Rectangular Card Styling */
                .testimonial-card {
                    min-width: 450px; /* Wider to form a rectangular layout */
                    max-width: 550px;
                    min-height: auto;
                    background: rgba(255, 255, 255, 0.75); /* Frosted white */
                    backdrop-filter: blur(20px) saturate(180%);
                    -webkit-backdrop-filter: blur(20px) saturate(180%);
                    border: 1px solid rgba(255, 255, 255, 0.5); /* bright white border */
                    border-radius: 24px; /* Squarcle rounded corners */
                    padding: 2rem 2.5rem; /* Tighter vertical padding */
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 1.5rem;
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }

                .testimonial-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                }

                .testimonial-text {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: var(--color-primary); /* Dark text */
                    opacity: 0.9;
                    font-style: italic;
                    margin: 0;
                }

                .testimonial-author {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .author-img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .author-name {
                    font-weight: 500;
                    color: var(--color-primary); /* Dark text */
                    font-size: 1.05rem;
                    margin: 0;
                }

                .control-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.4); /* Dark idle btn */
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    color: var(--color-white); /* White arrow */
                    z-index: 10;
                }

                :root[data-theme='dark'] .control-btn {
                    background: rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .control-btn.left-btn { left: 2rem; }
                .control-btn.right-btn { right: 2rem; }

                .control-btn:hover:not(:disabled) {
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(20px) saturate(200%);
                    -webkit-backdrop-filter: blur(20px) saturate(200%);
                    color: var(--color-primary); /* Dark arrow */
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(0, 0, 0, 0.05);
                }
                .control-btn:disabled {
                    opacity: 0;
                    pointer-events: none;
                }
                
                @media (max-width: 768px) {
                    .testimonial-card {
                        min-width: 85vw;
                    }
                    .control-btn.left-btn { left: 0.5rem; }
                    .control-btn.right-btn { right: 0.5rem; }
                }
            `}</style>

            <div className="testimonials-header container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="testimonials-title"
                >
                    Client <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>Stories</span>
                </motion.h2>
            </div>

            <div className="testimonials-wrapper">
                <motion.div className="fade-overlay left-fade" style={{ opacity: fadeOpacity }} />
                <motion.div className="fade-overlay right-fade" style={{ opacity: fadeOpacity }} />
                <button
                    className="control-btn left-btn"
                    onMouseEnter={() => startScrolling('left')}
                    onMouseLeave={stopScrolling}
                    onMouseUp={stopScrolling}
                    onTouchStart={() => startScrolling('left')}
                    onTouchEnd={stopScrolling}
                    disabled={!canScrollLeft}
                    aria-label="Scroll left"
                >
                    <ArrowLeft size={24} />
                </button>

                <div
                    className="testimonials-container"
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    style={{ paddingLeft: 'calc((100vw - min(100vw, var(--width-container))) / 2 + var(--spacing-container))', paddingRight: 'calc((100vw - min(100vw, var(--width-container))) / 2 + var(--spacing-container))' }}
                >
                    {testimonialsData.map((testimonial, idx) => (
                        <motion.div
                            key={testimonial.id}
                            className="testimonial-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                        >
                            <p className="testimonial-text">{testimonial.text}</p>
                            <div className="testimonial-author">
                                <img src={testimonial.image} alt={testimonial.name} className="author-img" />
                                <h4 className="author-name">{testimonial.name}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <button
                    className="control-btn right-btn"
                    onMouseEnter={() => startScrolling('right')}
                    onMouseLeave={stopScrolling}
                    onMouseUp={stopScrolling}
                    onTouchStart={() => startScrolling('right')}
                    onTouchEnd={stopScrolling}
                    disabled={!canScrollRight}
                    aria-label="Scroll right"
                >
                    <ArrowRight size={24} />
                </button>
            </div>
        </section>
    );
};

export default Testimonials;
