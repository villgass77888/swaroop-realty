import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

const faqs = [
    {
        q: 'Is Vrindavan a good place to invest in real estate right now?',
        a: 'Absolutely. Vrindavan is one of India\'s fastest-appreciating spiritual destinations. With over 2 crore pilgrims visiting annually, government-backed infrastructure upgrades (Braj Chaurasi Kos Parikrama, Yamuna Expressway extension), and drastically limited developable land within the city, property values have consistently risen. Demand from NRIs, devotees, and retirement buyers has created a resilient market with strong long-term upside.',
    },
    {
        q: 'What types of properties does Swaroop Realty offer?',
        a: 'We offer three core categories: (1) Residential land plots — vastu-aligned, clearly titled, and in strategically selected zones across Vrindavan and Braj; (2) Boutique vastu villas — independently designed residences for families seeking permanence near the sacred city; and (3) Farm retreats and resort-style plots — expansive countryside estates in Vrindavan and Govardhan suited for getaways, organic living, or long-term appreciation.',
    },
    {
        q: 'What does "vastu-compliant" mean and why does it matter for a property?',
        a: 'Vastu Shastra is the ancient Indian science of spatial alignment — governing the orientation of entrances, placement of rooms, land slopes, and flow of energy through a space. A vastu-compliant property is deliberately oriented to maximise natural light, airflow, and spiritual harmony. At Swaroop Realty, vastu principles are integrated at the master-planning stage — not retrofitted — meaning every plot, road, and entrance is calibrated from conception.',
    },
    {
        q: 'Are the land titles clear? How do I verify ownership?',
        a: 'Every property under Swaroop Realty undergoes rigorous title due diligence before it is offered for sale. This includes mutation records, registry documents, circle rate verification, and encumbrance certificates. We provide you with full documentation at every stage — and our team walks you through it in person. There are no shortcuts in paperwork and no ambiguous ownership chains in our portfolio.',
    },
    {
        q: 'Can NRIs and people from other states buy property in Vrindavan?',
        a: 'Yes. All Indian citizens, including Non-Resident Indians (NRIs), can legally purchase residential and agricultural land (subject to applicable rules) in Uttar Pradesh, including Vrindavan and Mathura. Swaroop Realty assists buyers from across India and abroad with documentation, legal guidance, and remote purchase facilitation so distance is never a barrier.',
    },
    {
        q: 'What is the average plot size and pricing for projects in Vrindavan?',
        a: 'Plot sizes vary by project — ranging from compact 100 sq. yard plots ideal for personal residences, to larger 1,000+ sq. yard farmland holdings. Pricing depends on location, project phase, and infrastructure maturity. For accurate, current pricing specific to each project, we invite you to call us directly at +91 83839 28784 or schedule a site visit — we do not publish fixed prices online as rates are stage-dependent.',
    },
    {
        q: 'Do your projects have RERA registration?',
        a: 'Projects that fall within RERA\'s ambit under the Real Estate (Regulation and Development) Act, 2016 are registered accordingly. For individual plot developments and agricultural land, specific regulatory requirements differ. We are fully transparent about the applicable regulatory framework for each project during our consultation — and we ensure all requisite approvals are in place before any buyer commitment is made.',
    },
    {
        q: 'How close are your projects to major temples and Mathura?',
        a: 'Most of our Vrindavan projects are located within 5–10 km of the city\'s primary temple precinct, including Banke Bihari Temple, ISKCON, and Prem Mandir. Our flagship Brij Garden project is in Jait, a rapidly developing zone on Vrindavan\'s outskirts with excellent road connectivity. Govardhan Greens is situated near the sacred Govardhan Hill, approximately 22 km from Mathura city centre.',
    },
    {
        q: 'What happens after I express interest — what is the buying process?',
        a: 'Our process is straightforward and transparent: (1) Initial consultation — you call or visit us and we understand your requirements; (2) Site visit — we arrange a guided tour of the relevant site; (3) Documentation review — we share title papers, layout plans, and approvals; (4) Booking and agreement — a token amount secures your plot and a formal sale agreement is executed; (5) Registration — the sale deed is registered with the Sub-Registrar\'s office in your presence. We guide you at every step.',
    },
];

/* ─── Single Accordion Item ─────────────────────────────────── */
const FAQItem = ({ item, index, isOpen, onToggle, isMobile }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.8, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{
                borderBottom: '1px solid var(--color-border)',
            }}
        >
            {/* Question row */}
            <button
                onClick={() => onToggle(index)}
                aria-expanded={isOpen}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    padding: isMobile ? '1.5rem 0' : '2rem 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-body)',
                }}
            >
                {/* Number + question */}
                <div style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', alignItems: 'flex-start', flex: 1 }}>
                    <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: isMobile ? '0.75rem' : '0.85rem',
                        color: 'var(--color-primary)',
                        opacity: 0.25,
                        flexShrink: 0,
                        paddingTop: '0.2rem',
                        letterSpacing: '1px',
                        minWidth: isMobile ? '24px' : '32px',
                    }}>
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        color: 'var(--color-primary)',
                        lineHeight: 1.45,
                        fontWeight: 500,
                        letterSpacing: '-0.01em',
                        transition: 'opacity 0.3s ease',
                        opacity: isOpen ? 1 : 0.82,
                    }}>
                        {item.q}
                    </span>
                </div>

                {/* Toggle icon */}
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        flexShrink: 0,
                        width: isMobile ? '28px' : '36px',
                        height: isMobile ? '28px' : '36px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        fontWeight: 300,
                        background: isOpen ? 'var(--color-primary)' : 'transparent',
                        color: isOpen ? '#fff' : 'var(--color-primary)',
                        transition: 'background 0.35s ease, color 0.35s ease, border-color 0.35s ease',
                        borderColor: isOpen ? 'var(--color-primary)' : 'var(--color-border)',
                        marginTop: '0.1rem',
                    }}
                >
                    +
                </motion.div>
            </button>

            {/* Answer — animated expand */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{
                            paddingLeft: isMobile ? 'calc(1rem + 24px)' : 'calc(1.5rem + 32px)',
                            paddingBottom: isMobile ? '1.5rem' : '2rem',
                            paddingRight: isMobile ? '0' : '4rem',
                        }}>
                            <p style={{
                                fontSize: isMobile ? '0.95rem' : '1.05rem',
                                lineHeight: 1.85,
                                color: 'var(--color-text)',
                                opacity: 0.72,
                                fontFamily: 'var(--font-body)',
                            }}>
                                {item.a}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ─── FAQ Section ────────────────────────────────────────────── */
const FAQ = () => {
    const { isMobile } = useIsMobile();
    const [openIndex, setOpenIndex] = useState(0); // first item open by default

    const handleToggle = (index) => {
        setOpenIndex(prev => prev === index ? null : index);
    };

    return (
        <section
            id="faq"
            aria-label="Frequently Asked Questions about Vrindavan Real Estate"
            style={{
                backgroundColor: 'var(--color-bg)',
                padding: isMobile ? '5rem 0 4rem 0' : '8rem 0',
                borderTop: '1px solid var(--color-border)',
            }}
        >
            <div className="container">

                {/* ── Header row ──────────────────────────────── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '4fr 8fr',
                    gap: isMobile ? '2.5rem' : '6rem',
                    alignItems: 'start',
                    marginBottom: isMobile ? '3rem' : '5rem',
                }}>
                    {/* Left: label + heading */}
                    <div style={{ position: isMobile ? 'static' : 'sticky', top: '8rem' }}>
                        <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{
                                display: 'block',
                                fontSize: '0.72rem',
                                textTransform: 'uppercase',
                                letterSpacing: '4px',
                                color: 'var(--color-text)',
                                opacity: 0.45,
                                marginBottom: '1.25rem',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 500,
                            }}
                        >
                            Common Questions
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.2rem, 3.5vw, 3.2rem)',
                                lineHeight: 1.12,
                                letterSpacing: '-0.025em',
                                color: 'var(--color-primary)',
                                marginBottom: '1.5rem',
                            }}
                        >
                            Everything you need <em>to know.</em>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.2 }}
                            style={{
                                fontSize: isMobile ? '0.92rem' : '1rem',
                                lineHeight: 1.75,
                                color: 'var(--color-text)',
                                opacity: 0.65,
                                marginBottom: '2rem',
                            }}
                        >
                            Still have questions? We're always available for a private consultation.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.3 }}
                        >
                            <style>{`
                                .faq-contact-link {
                                    display: inline-flex;
                                    align-items: center;
                                    gap: 10px;
                                    padding-bottom: 10px;
                                    border-bottom: 1px solid var(--color-primary);
                                    color: var(--color-primary);
                                    text-decoration: none;
                                    text-transform: uppercase;
                                    letter-spacing: 2px;
                                    font-size: 0.8rem;
                                    font-weight: 500;
                                    transition: all 0.3s ease;
                                    font-family: var(--font-body);
                                }
                                .faq-contact-link:hover { gap: 16px; opacity: 0.65; }
                            `}</style>
                            <Link to="/contact" className="faq-contact-link">
                                Ask Us Directly <span style={{ fontSize: '1.1rem' }}>→</span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: accordion list */}
                    <div>
                        {/* First item has top border */}
                        <div style={{ borderTop: '1px solid var(--color-border)' }}>
                            {faqs.map((item, index) => (
                                <FAQItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    isOpen={openIndex === index}
                                    onToggle={handleToggle}
                                    isMobile={isMobile}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FAQ;
