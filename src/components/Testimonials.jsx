import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

const testimonialsData = [
    {
        id: 1,
        name: 'Aarav Singhania',
        text: '"Swaroop Realty didn\'t just find me a plot; they curated a sanctuary. The Vastu-compliant layout they recommended in Vrindavan brought an incredible sense of peace to our family. Their end-to-end execution was flawless."',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 2,
        name: 'Priya Mehra',
        text: '"From the very first consultation to handing over the keys of our bespoke villa, the team was extraordinary. The architecture perfectly blends traditional Indian aesthetics with modern resort-style luxury."',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 3,
        name: 'Rohan Desai',
        text: '"Their deep understanding of the Vrindavan real estate landscape is unmatched. They handled all the complex legal vetting and environmental assessments seamlessly, making it a stress-free investment."',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 4,
        name: 'Kavita Verma',
        text: '"As an NRI, I was worried about the turnkey execution, but Swaroop Realty delivered above and beyond. My home was handed over immaculate, fully landscaped, and beautifully furnished."',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
        id: 5,
        name: 'Siddharth Reddy',
        text: '"A truly premium experience. Their focus on exclusive parcels guarantees an appreciation potential that is hard to find anywhere else. I highly recommend their expertise."',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
];

const Testimonials = () => {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const { isMobile } = useIsMobile();

    /* Velocity-driven fade overlays (desktop) */
    const { scrollX } = useScroll({ container: scrollContainerRef });
    const scrollVelocityX = useVelocity(scrollX);
    const smoothVelocity = useSpring(scrollVelocityX, { damping: 50, stiffness: 400 });
    const fadeOpacity = useTransform(smoothVelocity, [-800, 0, 800], [1, 0, 1]);

    /* Inertia RAF scroll (desktop arrow buttons) */
    const targetVelocity = useRef(0);
    const currentVelocity = useRef(0);
    const isHoveringBtn = useRef(false);
    const rafId = useRef(null);

    const checkScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
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
        currentVelocity.current += (isHoveringBtn.current
            ? targetVelocity.current
            : 0 - currentVelocity.current) * 0.05;
        if (!isHoveringBtn.current) currentVelocity.current *= 0.96;
        if (Math.abs(currentVelocity.current) > 0.1) {
            if (scrollContainerRef.current)
                scrollContainerRef.current.scrollLeft += currentVelocity.current;
            rafId.current = requestAnimationFrame(updateScroll);
        } else {
            currentVelocity.current = 0;
            rafId.current = null;
        }
    };

    const startScrolling = (dir) => {
        isHoveringBtn.current = true;
        targetVelocity.current = dir === 'left' ? -18 : 18;
        if (!rafId.current) rafId.current = requestAnimationFrame(updateScroll);
    };
    const stopScrolling = () => { isHoveringBtn.current = false; targetVelocity.current = 0; };

    return (
        <section style={{ padding: 'var(--spacing-section) 0', backgroundColor: 'var(--color-primary)', overflow: 'hidden', position: 'relative' }}>
            <style>{`
                /* ── Header ── */
                .t-title {
                    font-size: clamp(3rem, 5vw, 5rem);
                    font-family: var(--font-heading);
                    color: var(--color-white);
                    text-align: center;
                    margin-bottom: 4rem;
                }

                /* ── Scroll strip ── */
                .testimonials-container {
                    display: flex;
                    gap: 1.5rem;
                    overflow-x: auto;
                    overflow-y: hidden;
                    padding-bottom: 2rem;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    /* iOS momentum scroll */
                    -webkit-overflow-scrolling: touch;
                    /* Contain horizontal overscroll so vertical doesn't bleed left/right */
                    overscroll-behavior-x: contain;
                    /* No touch-action override — let browser detect swipe direction naturally.
                       Horizontal swipe → scrolls this container.
                       Vertical swipe   → propagates to page (Lenis smoothTouch:false = native). */
                }
                .testimonials-container::-webkit-scrollbar { display: none; }

                /* Snap on mobile for card-by-card feel */
                @media (max-width: 768px) {
                    .testimonials-container {
                        scroll-snap-type: x mandatory;
                        gap: 1rem;
                    }
                    .testimonial-card { scroll-snap-align: start; }
                }

                /* ── Cards ── */
                .testimonial-card {
                    min-width: 350px;
                    max-width: 450px;
                    min-height: 380px;
                    background: rgba(255, 255, 255, 0.75);
                    backdrop-filter: blur(20px) saturate(180%);
                    -webkit-backdrop-filter: blur(20px) saturate(180%);
                    border: 1px solid rgba(255,255,255,0.4);
                    border-radius: 24px;
                    padding: 2rem 2.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 1.5rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1);
                    flex-shrink: 0;
                }
                .testimonial-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                }
                .testimonial-text {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: var(--color-primary);
                    opacity: 0.9;
                    font-style: italic;
                    margin: 0;
                }
                .testimonial-author { display: flex; align-items: center; gap: 1rem; }
                .author-img  { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; }
                .author-name { font-weight: 500; color: var(--color-primary); font-size: 1.05rem; margin: 0; }

                /* ── Mobile card sizing ── */
                @media (max-width: 768px) {
                    .testimonial-card { min-width: 90vw; max-width: 90vw; }
                }

                /* ── Fade overlays ── */
                .fade-overlay {
                    position: absolute;
                    top: 0; bottom: 0;
                    width: 25vw;
                    pointer-events: none;
                    z-index: 5;
                }
                .fade-overlay.left-fade  { left: 0;  background: linear-gradient(to right, var(--color-primary), transparent); }
                .fade-overlay.right-fade { right: 0; background: linear-gradient(to left,  var(--color-primary), transparent); }
                @media (max-width: 768px) { .fade-overlay { display: none; } }

                /* ── Arrow buttons ── */
                .control-btn {
                    position: absolute; top: 50%; transform: translateY(-50%);
                    width: 60px; height: 60px; border-radius: 50%;
                    background: rgba(0,0,0,0.4);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: all 0.3s ease;
                    color: var(--color-white); z-index: 10;
                }
                .control-btn.left-btn  { left: 2rem; }
                .control-btn.right-btn { right: 2rem; }
                .control-btn:hover:not(:disabled) {
                    background: rgba(255,255,255,0.6);
                    color: var(--color-primary);
                    border-color: rgba(255,255,255,0.8);
                    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                }
                .control-btn:disabled { opacity: 0; pointer-events: none; }
                @media (max-width: 768px) { .control-btn { display: none; } }
            `}</style>

            {/* Title */}
            <div className="container">
                <motion.h2
                    className="t-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    Client <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>Stories</span>
                </motion.h2>
            </div>

            {/* Wrapper — relative for absolute overlays & buttons */}
            <div style={{ position: 'relative' }}>
                {/* Fade overlays — desktop only, show during fast scroll */}
                {!isMobile && (
                    <>
                        <motion.div className="fade-overlay left-fade" style={{ opacity: fadeOpacity }} />
                        <motion.div className="fade-overlay right-fade" style={{ opacity: fadeOpacity }} />
                    </>
                )}

                {/* Arrow buttons — desktop only */}
                {!isMobile && (
                    <>
                        <button className="control-btn left-btn"
                            onMouseEnter={() => startScrolling('left')}
                            onMouseLeave={stopScrolling} onMouseUp={stopScrolling}
                            disabled={!canScrollLeft} aria-label="Scroll left">
                            <ArrowLeft size={24} />
                        </button>
                        <button className="control-btn right-btn"
                            onMouseEnter={() => startScrolling('right')}
                            onMouseLeave={stopScrolling} onMouseUp={stopScrolling}
                            disabled={!canScrollRight} aria-label="Scroll right">
                            <ArrowRight size={24} />
                        </button>
                    </>
                )}

                {/* Scroll container */}
                <div
                    className="testimonials-container"
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    style={{
                        paddingLeft: isMobile ? '1.25rem' : 'calc((100vw - min(100vw, var(--width-container))) / 2 + var(--spacing-container))',
                        paddingRight: isMobile ? '1.25rem' : 'calc((100vw - min(100vw, var(--width-container))) / 2 + var(--spacing-container))',
                    }}
                >
                    {testimonialsData.map((t, idx) => (
                        <motion.div
                            key={t.id}
                            className="testimonial-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                        >
                            <p className="testimonial-text">{t.text}</p>
                            <div className="testimonial-author">
                                <img src={t.image} alt={t.name} className="author-img" />
                                <h4 className="author-name">{t.name}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
