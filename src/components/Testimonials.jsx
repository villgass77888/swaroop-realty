import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

const testimonialsData = [
    {
        id: 1,
        name: 'Naveen Raj Ghiraw',
        text: '"I was searching for a reliable property in Vrindavan for a long time, and Swaroop Realty truly exceeded my expectations. The team guided me at every step with complete transparency. From site visits to documentation, everything was smooth and professionally handled. I genuinely felt they cared about my investment. Highly recommended for anyone looking for trusted real estate services in Vrindavan."',
        image: '/client-naveen.png'
    },
    {
        id: 2,
        name: 'Akhilesh Kumar Chaturvedi',
        text: '"Swaroop Realty made my land purchase experience completely stress-free. Their knowledge of the Vrindavan market and clear communication gave me full confidence in my decision. They explained every detail patiently and ensured all legal formalities were properly managed. It\'s rare to find such honest and dedicated service."',
        image: '/client-akhilesh.png'
    },
    {
        id: 3,
        name: 'Rajesh Garg',
        text: '"I appreciate the professionalism and commitment shown by the Swaroop Realty team. They helped me choose the right plot according to my budget and future goals. What impressed me most was their transparency and timely updates throughout the process. I would definitely work with them again."',
        image: '/client-rajesh.png'
    },
    {
        id: 4,
        name: 'Anshima Sharma',
        text: '"Buying property can be overwhelming, but Swaroop Realty made it simple and comfortable for me. The team was approachable, supportive, and very responsive to all my queries. Their guidance helped me make a confident investment in Vrindavan. Truly a trustworthy real estate partner."',
        image: '/client-anshima.png?cb=2'
    },
    {
        id: 5,
        name: 'Aishwary Vashishta',
        text: '"My experience with Swaroop Realty has been excellent from start to finish. They understand client requirements deeply and suggest options that genuinely match your needs. The entire process was smooth, organized, and transparent. I\'m extremely satisfied with my purchase."',
        image: '/client-aishwarya.png?cb=2'
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
                    backdrop-filter: blur(8px) saturate(180%);
                    -webkit-backdrop-filter: blur(8px) saturate(180%);
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
                    will-change: transform, opacity;
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
