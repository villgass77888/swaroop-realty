import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LegalPageShell = ({ title, lastUpdated, children }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', color: 'var(--color-primary)' }}
    >
        {/* Full-viewport cinematic Hero */}
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
            {/* Background image */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, zIndex: 0 }}
            >
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) grayscale(15%)' }}
                />
            </motion.div>

            {/* Gradient overlay */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'linear-gradient(to bottom, rgba(10,17,40,0.3) 0%, transparent 40%, rgba(10,17,40,0.95) 100%)'
            }} />

            {/* Ambient glow */}
            <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60vw', height: '60vw',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
                    filter: 'blur(60px)', zIndex: 1, pointerEvents: 'none'
                }}
            />

            {/* Text */}
            <motion.div
                style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'var(--color-white)', padding: '0 5%' }}
                initial="hidden"
                animate="show"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
            >
                <motion.p
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                    style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '6px', opacity: 0.5, marginBottom: '1.5rem' }}
                >
                    Legal
                </motion.p>
                <motion.h1
                    variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } } }}
                    style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '2rem', textShadow: '0 10px 40px rgba(0,0,0,0.5)', color: '#ffffff' }}
                >
                    {title}
                </motion.h1>
            </motion.div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 5%' }}>
            {children}
            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
                <Link to="/" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    color: 'var(--color-primary)', textDecoration: 'none',
                    fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px',
                    borderBottom: '1px solid var(--color-primary)', paddingBottom: '4px'
                }}>
                    ← Back to Home
                </Link>
            </div>
        </div>
    </motion.div>
);

const Section = ({ title, children }) => (
    <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem', color: 'var(--color-primary)' }}>{title}</h2>
        <div style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--color-text)', opacity: 0.85 }}>{children}</div>
    </div>
);

export const PrivacyPolicy = () => (
    <LegalPageShell title="Privacy Policy" lastUpdated="February 2026">
        <Section title="1. Information We Collect">
            We collect information you provide directly to us, such as when you fill out a contact form, request a consultation, or communicate with us via email or phone. This includes your name, email address, phone number, and any other details you voluntarily share.
        </Section>
        <Section title="2. How We Use Your Information">
            The information we collect is used solely to: respond to your inquiries, schedule property visits or consultations, send you relevant property updates (with your consent), and improve our services. We do not sell or rent your personal data to any third party.
        </Section>
        <Section title="3. Data Security">
            We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. All data transmissions on our website are encrypted with industry-standard protocols.
        </Section>
        <Section title="4. Cookies">
            Our website may use cookies to enhance your browsing experience. These are small data files stored on your device that help us remember your preferences. You may disable cookies through your browser settings; however, some features of the site may not function correctly as a result.
        </Section>
        <Section title="5. Third-Party Links">
            Our website may contain links to external websites. Swaroop Realty is not responsible for the privacy practices or content of those sites and encourages you to review their policies independently.
        </Section>
        <Section title="6. Changes to This Policy">
            We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with a revised effective date. Your continued use of the website after any changes constitutes acceptance of the updated policy.
        </Section>
        <Section title="7. Contact">
            For any queries regarding this Privacy Policy, please contact us at <a href="mailto:contact@swarooprealty.com" style={{ color: 'var(--color-primary)' }}>contact@swarooprealty.com</a> or call +91 83839 28784.
        </Section>
    </LegalPageShell>
);

export const TermsOfService = () => (
    <LegalPageShell title="Terms of Service" lastUpdated="February 2026">
        <Section title="1. Acceptance of Terms">
            By accessing or using the Swaroop Realty website, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with any part of these terms, please refrain from using our website.
        </Section>
        <Section title="2. Use of Website">
            This website is intended solely for informational purposes related to Swaroop Realty's properties and services. You agree not to misuse the website, attempt to gain unauthorised access to any portion of it, or use it for any unlawful purpose.
        </Section>
        <Section title="3. Property Information">
            All property details, pricing, floor plans, and renderings displayed on this website are indicative and subject to change without notice. Nothing published here constitutes a binding offer or contract. A formal Agreement to Sell governs all actual transactions.
        </Section>
        <Section title="4. Intellectual Property">
            All content on this website — including logos, images, text, videos, and layouts — is the exclusive property of Swaroop Realty or its licensors and is protected by applicable copyright and trademark laws. Reproduction or use of any content without prior written permission is strictly prohibited.
        </Section>
        <Section title="5. Limitation of Liability">
            Swaroop Realty shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or its content. We make no warranties, express or implied, regarding the accuracy or completeness of the information provided.
        </Section>
        <Section title="6. Governing Law">
            These Terms of Service shall be governed by the laws of India. Any disputes arising in connection with this website shall be subject to the exclusive jurisdiction of courts in Mathura, Uttar Pradesh.
        </Section>
        <Section title="7. Amendments">
            Swaroop Realty reserves the right to modify these terms at any time. Updates will be posted on this page and take effect immediately upon posting.
        </Section>
    </LegalPageShell>
);

export const Disclaimer = () => (
    <LegalPageShell title="Disclaimer" lastUpdated="February 2026">
        <Section title="General Information Only">
            The content on the Swaroop Realty website is provided for general informational purposes only. It does not constitute legal, financial, or investment advice. We strongly recommend consulting with a qualified professional before making any real estate investment decisions.
        </Section>
        <Section title="No Guarantee of Accuracy">
            While we strive to ensure the accuracy and currency of all information on this website, we make no representations or warranties of any kind — express or implied — about the completeness, accuracy, reliability, or suitability of any information. Any reliance you place on such information is at your own risk.
        </Section>
        <Section title="Regulatory Approvals">
            All projects mentioned on this website are subject to applicable regulatory approvals, including RERA (Real Estate Regulation and Development Act). Buyers are advised to independently verify project approvals and RERA registrations before entering into any commitment.
        </Section>
        <Section title="Pricing & Availability">
            Prices, availability, and specifications of properties listed on this website are subject to change without prior notice. The information displayed does not constitute an offer or invitation to purchase and is purely indicative.
        </Section>
        <Section title="Renders & Visuals">
            Artistic impressions, rendered images, and project videos on this website are for illustrative purposes only and may not accurately represent the final completed product, surrounding landscape, or nearby infrastructure.
        </Section>
        <Section title="Contact Us">
            If you have any questions about this Disclaimer, please contact us at <a href="mailto:contact@swarooprealty.com" style={{ color: 'var(--color-primary)' }}>contact@swarooprealty.com</a>.
        </Section>
    </LegalPageShell>
);
