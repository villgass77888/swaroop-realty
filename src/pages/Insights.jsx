import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import useIsMobile from '../hooks/useIsMobile';

const insightsSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Swaroop Realty Insights — Vrindavan Real Estate Guides',
    description: 'Expert knowledge on premium plots for sale in Vrindavan, 100 gaj plot prices, Vastu tips, and investment guides for the Braj Mandal by Swaroop Realty.',
    url: 'https://swarooprealty.com/insights',
    publisher: {
        '@type': 'Organization',
        name: 'Swaroop Realty',
        logo: { '@type': 'ImageObject', url: 'https://swarooprealty.com/logo-dark.png' }
    }
};

const articles = [
    {
        id: 1,
        featured: true,
        title: "Explore the Best Plots in Vrindavan — A Buyer's Complete Guide 2024",
        category: "Location Spotlight",
        tag: "Featured",
        date: "15 October 2023",
        readTime: "8 min read",
        image: "/brij-garden.jpg",
        project: "Brij Garden Vrindavan",
        excerpt: "Vrindavan, the eternal land of Krishna, is witnessing one of India's most compelling real estate stories. Limited developable land, rising spiritual tourism (8.5 million pilgrims annually), and targeted UP government infrastructure investment make this market exceptionally rare.",
        body: "When evaluating the best plots in Vrindavan, three factors dominate: proximity to the Parikrama Marg, Vastu orientation, and legal title clarity. Our flagship project — Brij Garden Vrindavan — was conceived with each of these in mind. Situated in Jait, a locality now 12 minutes from the proposed Mathura-Vrindavan metro, every plot here sits on land with clear chain-of-title documentation. Unlike many developments in the Braj belt, Brij Garden underwent full land-use conversion prior to sale, meaning buyers are fully protected under RERA guidelines. For the discerning investor, exploring plots in Vrindavan is not merely a transaction — it is entry into a market where supply is structurally constrained and spiritual demand is permanent.",
        stats: [{ label: "Annual Pilgrims", value: "8.5M+" }, { label: "Land Appreciation (5yr)", value: "62%" }, { label: "RERA Registered", value: "Yes" }]
    },
    {
        id: 2,
        title: "Premium Plots for Sale in Vrindavan: What Separates Luxury from Average",
        category: "Investment Guide",
        date: "28 September 2023",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        project: "Radha Kunj Villas",
        excerpt: "Not all plots are equal. What defines a truly premium plot for sale in Vrindavan is a convergence of legal title clarity, Vastu-compliant orientation, infrastructure readiness, and proximity to the divine geography.",
        body: "Radha Kunj Villas on VIP Road exemplifies this. Every villa is cardinal north-facing, set within manicured greens and guarded by a single‑point gated access. The road bordering this property is now a 4‑lane corridor under the Mathura‑Vrindavan Development Authority master plan. Buyers of premium plots for sale in Vrindavan must scrutinize three documents: the Khasra record, a registered Sale Deed, and Encumbrance Certificate. Swaroop Realty provides all three transparently before any token amount is accepted.",
        stats: [{ label: "VIP Road Corridor", value: "4-Lane" }, { label: "Vastu Compliance", value: "100%" }, { label: "Title Clarity", value: "Guaranteed" }]
    },
    {
        id: 3,
        title: "100 Gaj Plot in Vrindavan: Price, ROI & Investment Benefits Explained",
        category: "Market Trends",
        date: "20 September 2023",
        readTime: "5 min read",
        image: "/vrindavan-landscape.png",
        excerpt: "The 100 gaj plot (approximately 900 sq. ft.) is the most actively traded land unit in the Vrindavan market. Understanding its price band and ROI trajectory is essential for first-time investors.",
        body: "As of late 2023, a 100 gaj plot in Vrindavan ranges from ₹18 lakhs (peripheral zones) to ₹55 lakhs (VIP Road, near temple zones), depending heavily on road frontage and proximity to the Parikrama Path. The 5-year CAGR on 100 gaj plots has averaged 14.2% across verified transactions in Jait, Raman Reti, and Chaitanya Vihar micro-markets. Compare this to Noida's 8% or Gurugram's 11% over the same period. The critical advantage: Vrindavan's land supply is permanently finite. No new agricultural land conversion in the inner 3-km radius is likely after 2025. Investors entering now are buying into a structurally supply-constrained market.",
        stats: [{ label: "Price Range", value: "₹18L–₹55L" }, { label: "5-Yr CAGR", value: "14.2%" }, { label: "Vs. Noida CAGR", value: "+6.2%" }]
    },
    {
        id: 4,
        title: "Discover Your Dream Property in Vrindavan: Farmland & Retreat Estates",
        category: "Property Showcase",
        date: "5 August 2023",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        project: "The Giridhar Valley Farms",
        excerpt: "Beyond urban plots lies a profoundly different investment opportunity — sacred farmland within the Braj Mandal. The Giridhar Valley Farms redefine what it means to own property in a spiritually significant landscape.",
        body: "The Giridhar Valley Farms span 25 acres of certified organic land. Buyers may choose from 1000+ sq.yard farm estates or larger orchard units. The project operates an on-site farmhouse program where non-resident owners earn rental income during pilgrimage seasons. Organic produce from the estate (tulsi, marigold, seasonal vegetables) is sold through a cooperative model, generating consistent ancillary income. For those seeking to discover their dream property in Vrindavan outside the dense urban core, Giridhar Valley is the answer — serene, productive, and spiritually rooted.",
        stats: [{ label: "Total Area", value: "25 Acres" }, { label: "Plot Sizes", value: "1000+ Sq.Yd" }, { label: "Rental Yield", value: "Est. 6-8%" }]
    },
    {
        id: 5,
        title: "Real Estate in Vrindavan: Buy & Invest in Premium Plots — Market Outlook 2024",
        category: "Market Trends",
        date: "22 July 2023",
        readTime: "7 min read",
        image: "/vrindavan-sunrise.png",
        excerpt: "The Vrindavan real estate market has entered its strongest phase of institutional confidence since 2015. State-backed infrastructure, RERA compliance, and religious tourism are compounding simultaneously.",
        body: "Three macro forces are driving Vrindavan's real estate boom: First, the UP government's ₹2,800 crore Mathura-Vrindavan Tourism Circuit investment, which includes new expressways, a heritage zone, and an international airport at Agra. Second, RERA compliance now covers 87% of active projects in Mathura district — ending the era of fly-by-night developers. Third, the religious tourism economy (pilgrims + diaspora NRIs acquiring ancestral spiritual land) is growing at 18% year-on-year. When you buy & invest in premium plots in Vrindavan today, you're entering ahead of a significant infrastructure-led value pop expected between 2025–2027.",
        stats: [{ label: "Gov. Investment", value: "₹2,800Cr" }, { label: "RERA Coverage", value: "87%" }, { label: "NRI Demand Growth", value: "18%/yr" }]
    },
    {
        id: 6,
        title: "How to Connect with Swaroop Realty for Plots in Vrindavan — Process Explained",
        category: "Buyer's Guide",
        date: "10 July 2023",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Navigating real estate in a sacred city requires a trusted guide. Swaroop Realty's six-step buyer journey is designed to eliminate uncertainty from your first enquiry to registration.",
        body: "Step 1: Initial consultation — either over a call (+91 83839 28784) or at our Vrindavan office near Jait Police Station. Step 2: Identifying your requirements — land size, location preference, budget, intended use (residential, farmland, investment). Step 3: Curated shortlist and site visits at your convenience. Step 4: Due diligence package — Khasra, Encumbrance Certificate, and Building Permission status provided to your legal advisor. Step 5: Token booking with a fully transparent Sale Agreement. Step 6: Stamp duty registration and mutation in your name. Our team handles everything — you don't need a third-party agent.",
        stats: [{ label: "Experience", value: "35+ Years" }, { label: "Projects", value: "8 Active" }, { label: "Families Settled", value: "500+" }]
    },
    {
        id: 7,
        title: "Trusted Real Estate Property Projects in Vrindavan — How to Identify Them",
        category: "Legal Guide",
        date: "28 June 2023",
        readTime: "5 min read",
        image: "/vastu-diagram.png",
        excerpt: "The Vrindavan property market has seen both celebrated successes and cautionary failures. Knowing what signals to look for separates a secure investment from a legal headache.",
        body: "The four hallmarks of a trusted real estate property project in Vrindavan: (1) RERA Registration — verifiable on rera.up.gov.in with project timeline disclosures. (2) Clear Land Title — no agricultural encumbrance, fully converted to residential or commercial use. (3) Developer Track Record — cross-check past project delivery with local revenue records. (4) Community Validation — speak to existing owners, check Patwari records. Swaroop Realty publishes all four proactively for every project. We are one of the few developers in Braj with an unbroken delivery record across eight consecutive projects spanning three decades.",
        stats: [{ label: "RERA Status", value: "Registered" }, { label: "Delivery Record", value: "8/8" }, { label: "Founded", value: "1988" }]
    },
    {
        id: 8,
        title: "Vastu Shastra for Sacred Farmland — 5 Rules Before Buying in Govardhan",
        category: "Vastu Shastra",
        date: "15 June 2023",
        readTime: "5 min read",
        image: "https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
        project: "Govardhan Greens",
        excerpt: "In the Braj tradition, land orientation is not merely aesthetic — it is spiritually deterministic. Here are five Vastu cardinal rules for buying farmland near Govardhan Hill.",
        body: "Rule 1: The Northeast (Ishaan Kona) must be open and low. Never build a structure or high tree in this corner — it blocks divine energy flow. Rule 2: The main entrance should face North or East for prosperity. Rule 3: Water source (well, bore, irrigation channel) must be in the Northeast or North. Rule 4: Slope of land should run from Southwest to Northeast for natural wealth flow. Rule 5: The Southwest corner must be the heaviest — use it for your main farmhouse structure. Govardhan Greens has been master-planned with all five of these principles embedded into the plot layout — the reason 90% of our buyers here purchase on recommendation.",
        stats: [{ label: "Vastu Rules Applied", value: "5/5" }, { label: "Satisfied Buyers", value: "90% referral" }, { label: "Area", value: "30 Acres" }]
    },
    {
        id: 9,
        title: "VIP Road Vrindavan: Why It Became the Most Sought-After Address",
        category: "Location Spotlight",
        date: "1 June 2023",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        project: "Radha Kunj Villas",
        excerpt: "VIP Road connects the ISKCON temple, the grand Prem Mandir, and the Yamuna ghats in a single uninterrupted corridor. No other address in Vrindavan offers this trinity of proximity.",
        body: "Real estate on VIP Road commands a 35-45% premium over comparable land in Jait or Raman Reti. The reasons are structural: it's a 4-lane road under MVDA's master plan, lined with international-grade hotels (Marriott, ITC), and adjacent to Vrindavan's most photographed religious landmarks. Radha Kunj Villas sits at the quieter, walled residential end of VIP Road — benefiting from the address without the noise of the pilgrim traffic. For buyers who want prestige of location with privacy of residence, this is the only viable option in the market.",
        stats: [{ label: "VIP Road Premium", value: "35-45%" }, { label: "Temple Proximity", value: "< 1 km" }, { label: "Hotel Brands Nearby", value: "ITC, Marriott" }]
    },
    {
        id: 10,
        title: "Resort-Style Plot Developments: How Govardhan Greens Is Redefining Braj Living",
        category: "Lifestyle",
        date: "20 May 2023",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        project: "Govardhan Greens",
        excerpt: "The next frontier in spiritual real estate isn't just a plot — it's an integrated lifestyle where resort-grade amenities meet organic farming and devotional proximity.",
        body: "Govardhan Greens introduces what we call 'Sacred Living Infrastructure.' The 30-acre project contains demarcated plot zones (1000–5000 sq. yards), a central community clubhouse, organic vegetable patches managed by a resident agrarian cooperative, walking trails around a man-made sarovar (pond), and a yoga-meditation pavilion aligned with the local Govardhana Puja tradition. Buyers here aren't just purchasing land — they are subscribing to a managed lifestyle community in one of India's holiest ZIP codes. Seasonal rental income from the furnished farmhouse portion has averaged ₹45,000/month for early buyers.",
        stats: [{ label: "Plot Sizes", value: "1K–5K Sq.Yd" }, { label: "Avg. Rental Yield", value: "₹45K/mo" }, { label: "Community Facilities", value: "8+" }]
    },
    {
        id: 11,
        title: "Understanding Clear Titles in UP Real Estate — A No-Nonsense Guide",
        category: "Legal Guide",
        date: "5 May 2023",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "The single largest risk in Braj real estate is murky land title. Joint ownership disputes, agricultural land not converted to use, and fraudulent Khasra entries plague the unguided buyer.",
        body: "A clear title in UP means: (1) The land is recorded in the Bhulekh portal under a single, identifiable owner. (2) The Khasra/Khatauni shows 'Abaadi' (residential) or applicable commercial classification — not 'Krishi' (agricultural). (3) No pending court cases under revenue records. (4) A recent Encumbrance Certificate (EC) showing no mortgage or lien in the past 30 years. (5) Mutation (Dakhil Kharij) completed in buyer's name after registration. Swaroop Realty engages an independent Advocate (not our own panel) to verify these five parameters for every buyer before a token is accepted.",
        stats: [{ label: "Documents Verified", value: "5 Key" }, { label: "Legal Disputes", value: "0 Pending" }, { label: "Independent Advocate", value: "Yes" }]
    },
    {
        id: 12,
        title: "Long-Term Asset Appreciation in Mathura-Vrindavan — The 10-Year Case",
        category: "Investment Guide",
        date: "18 April 2023",
        readTime: "7 min read",
        image: "/vrindavan-landscape.png",
        excerpt: "A ₹25 lakh plot purchased in Vrindavan's Jait locality in 2013 is worth approximately ₹1.1 crore today. This isn't an outlier — it's the market's structural baseline.",
        body: "Between 2013 and 2023, correctly selected land parcels in the Mathura-Vrindavan belt delivered 340% appreciation — a 16% annualized compound return. This outperformed Nifty 50 (14.2%), Gold (9.8%), and fixed deposits (6.5%) over the same period. The critical qualifier: 'correctly selected' means RERA-compliant, clear title, Vastu-aligned plots in the key micro-markets (VIP Road, Jait, Raman Reti, Govardhan). The next 10-year cycle has even stronger tailwinds: Agra International Airport operationalizing in 2026, Mathura metro Phase 1 completing by 2027, and the Religious Tourism Circuit funding announced in Budget 2024. Entering now is entering before the next structural re-rating.",
        stats: [{ label: "10-Yr Appreciation", value: "340%" }, { label: "CAGR vs Nifty", value: "+1.8%" }, { label: "Next Catalyst", value: "2026 Airport" }]
    }
];

const CATEGORIES = ['All', 'Location Spotlight', 'Investment Guide', 'Market Trends', 'Property Showcase', 'Vastu Shastra', "Buyer's Guide", 'Legal Guide', 'Lifestyle'];

const categoryColors = {
    'Location Spotlight': '#7B6CF6',
    'Investment Guide': '#F59E0B',
    'Market Trends': '#10B981',
    'Property Showcase': '#3B82F6',
    'Vastu Shastra': '#EC4899',
    "Buyer's Guide": '#F97316',
    'Legal Guide': '#6366F1',
    'Lifestyle': '#14B8A6',
};

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } };

const Insights = () => {
    const { isMobile } = useIsMobile();
    const [activeCategory, setActiveCategory] = useState('All');
    const [expandedId, setExpandedId] = useState(null);

    const featured = articles.find(a => a.featured);
    const regular = articles.filter(a => !a.featured);
    const filtered = activeCategory === 'All' ? regular : regular.filter(a => a.category === activeCategory);

    return (
        <div style={{ backgroundColor: 'var(--color-primary)', minHeight: '100vh', color: 'var(--color-white)' }}>
            <SEOHead
                title="Real Estate Insights & Investment Guides — Vrindavan"
                description="In-depth guides on premium plots for sale in Vrindavan, 100 gaj plot prices, Vastu rules, legal title checks, and long-term ROI analysis by Swaroop Realty."
                keywords="Premium plots for sale in Vrindavan, 100 Gaj plot Vrindavan price, Real estate in Vrindavan, Best plots in Vrindavan, Vrindavan property investment, Vastu plots Braj, trusted real estate Vrindavan"
                canonical="/insights"
                schema={insightsSchema}
            />

            {/* ── Hero Header ─────────────────────────────────────── */}
            <section style={{ paddingTop: isMobile ? '120px' : '160px', paddingBottom: isMobile ? '3rem' : '5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="container">
                    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
                        <motion.p variants={fadeUp} style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '5px', color: 'rgba(255,255,255,0.45)', marginBottom: '1.2rem', fontFamily: 'var(--font-body)' }}>
                            Market Knowledge & Guides
                        </motion.p>
                        <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(2.8rem,12vw,4rem)' : 'clamp(3.5rem,7vw,6rem)', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                            Swaroop<br /><span style={{ fontStyle: 'italic', opacity: 0.7 }}>Insights.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} style={{ maxWidth: '560px', fontSize: isMobile ? '1rem' : '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>
                            35 years of distilled expertise on Vrindavan real estate — from 100 gaj plot pricing to Vastu principles and legal title checks. Practical knowledge, zero filler.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Stats Strip ─────────────────────────────────────── */}
            <section style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
                        {[
                            { label: 'Years of Expertise', val: '35+' },
                            { label: 'Projects Delivered', val: '8' },
                            { label: 'Families Settled', val: '500+' },
                            { label: 'Market Coverage', val: 'Braj Mandal' }
                        ].map((s, i) => (
                            <div key={i} style={{ padding: isMobile ? '1.5rem 1rem' : '2rem 2.5rem', borderRight: '1px solid rgba(255,255,255,0.07)', borderBottom: isMobile && i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                                <p style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '2rem' : '2.5rem', lineHeight: 1, marginBottom: '0.4rem' }}>{s.val}</p>
                                <p style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.45)' }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Article ─────────────────────────────────── */}
            {featured && (
                <section style={{ padding: isMobile ? '3rem 0' : '5rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="container">
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>Featured Guide</p>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '5rem', alignItems: 'center' }}
                        >
                            {/* Image */}
                            <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', aspectRatio: '4/3' }}>
                                <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }} />
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(10,17,40,0.5) 0%, transparent 60%)' }} />
                                <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '10px' }}>
                                    <span style={{ background: categoryColors[featured.category] || '#7B6CF6', padding: '5px 14px', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderRadius: '3px', fontWeight: 600 }}>{featured.category}</span>
                                    <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '5px 14px', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderRadius: '3px' }}>Featured</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                                    <span>{featured.date}</span>
                                    <span>·</span>
                                    <span>{featured.readTime}</span>
                                    {featured.project && <><span>·</span><span style={{ color: 'rgba(255,255,255,0.6)' }}>{featured.project}</span></>}
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.8rem' : '2.4rem', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1.2rem' }}>
                                    {featured.title}
                                </h2>
                                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: '1rem' }}>{featured.excerpt}</p>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>{featured.body}</p>

                                {/* Inline Stats */}
                                {featured.stats && (
                                    <div style={{ display: 'flex', gap: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                        {featured.stats.map((s, i) => (
                                            <div key={i}>
                                                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.2rem' }}>{s.value}</p>
                                                <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 32px', border: '1px solid rgba(255,255,255,0.3)', color: 'var(--color-white)', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', transition: 'all 0.4s ease' }}
                                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                                    onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
                                >
                                    Enquire About Brij Garden
                                    <span style={{ fontSize: '1rem' }}>→</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ── Category Filter ───────────────────────────────────── */}
            <section style={{ paddingTop: isMobile ? '2.5rem' : '4rem', paddingBottom: '1.5rem' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {CATEGORIES.map(cat => (
                            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                                padding: '8px 18px',
                                border: `1px solid ${activeCategory === cat ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.12)'}`,
                                background: activeCategory === cat ? 'rgba(255,255,255,0.1)' : 'transparent',
                                color: activeCategory === cat ? 'var(--color-white)' : 'rgba(255,255,255,0.45)',
                                borderRadius: '2px',
                                fontSize: '0.78rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1.5px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontFamily: 'var(--font-body)'
                            }}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Articles Grid ─────────────────────────────────────── */}
            <section style={{ padding: isMobile ? '2rem 0 4rem 0' : '2rem 0 6rem 0' }}>
                <div className="container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                                gap: isMobile ? '1.5rem' : '2rem'
                            }}
                        >
                            {filtered.map((article, i) => {
                                const isExpanded = expandedId === article.id;
                                const color = categoryColors[article.category] || '#7B6CF6';
                                return (
                                    <motion.article
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                        style={{
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            borderTop: `3px solid ${color}`,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: 'hidden',
                                            transition: 'border-color 0.3s ease',
                                        }}
                                    >
                                        {/* Card Image */}
                                        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                            <motion.img
                                                src={article.image}
                                                alt={article.title}
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.8 }}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) grayscale(20%)' }}
                                            />
                                            <div style={{ position: 'absolute', top: '14px', left: '14px', background: color, padding: '4px 12px', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1.5px', borderRadius: '2px', fontWeight: 600 }}>
                                                {article.category}
                                            </div>
                                            {article.project && (
                                                <div style={{ position: 'absolute', bottom: '14px', right: '14px', background: 'rgba(10,17,40,0.85)', backdropFilter: 'blur(6px)', padding: '4px 12px', fontSize: '0.68rem', letterSpacing: '1px' }}>
                                                    {article.project}
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Content */}
                                        <div style={{ padding: isMobile ? '1.5rem' : '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.9rem', fontSize: '0.73rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                <span>{article.date}</span>
                                                <span>{article.readTime}</span>
                                            </div>

                                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.2rem' : '1.3rem', lineHeight: 1.25, letterSpacing: '-0.01em', marginBottom: '0.9rem', flexGrow: 1 }}>
                                                {article.title}
                                            </h3>

                                            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', marginBottom: '1rem' }}>
                                                {article.excerpt}
                                            </p>

                                            {/* Expandable Body */}
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                        style={{ overflow: 'hidden' }}
                                                    >
                                                        <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginBottom: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                                                            {article.body}
                                                        </p>

                                                        {/* Inline Stats */}
                                                        {article.stats && (
                                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                                                                {article.stats.map((s, si) => (
                                                                    <div key={si} style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: '0.8rem 0.6rem', textAlign: 'center', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                                                        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', marginBottom: '0.2rem', color: color }}>{s.value}</p>
                                                                        <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.3 }}>{s.label}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Read More Toggle */}
                                            <button
                                                onClick={() => setExpandedId(isExpanded ? null : article.id)}
                                                style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: color, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '0.5rem', transition: 'opacity 0.2s ease' }}
                                                onMouseOver={e => e.currentTarget.style.opacity = '0.7'}
                                                onMouseOut={e => e.currentTarget.style.opacity = '1'}
                                            >
                                                {isExpanded ? 'Collapse ↑' : 'Read More →'}
                                            </button>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* ── Bottom CTA ───────────────────────────────────────── */}
            <section style={{ padding: isMobile ? '3rem 0' : '5rem 0', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                <div className="container" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '2rem' }}>
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.8rem' : '2.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '0.8rem' }}>
                            Ready to explore<br /><span style={{ fontStyle: 'italic', opacity: 0.7 }}>your plot in Vrindavan?</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '420px', lineHeight: 1.7 }}>
                            Our specialists are available for personalized consultations — site visits, documentation, and Vastu guidance included.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/contact" style={{ padding: '15px 36px', background: 'var(--color-white)', color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, whiteSpace: 'nowrap', transition: 'opacity 0.3s ease' }}
                            onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
                            onMouseOut={e => e.currentTarget.style.opacity = '1'}
                        >
                            Book a Consultation
                        </Link>
                        <Link to="/projects" style={{ padding: '15px 36px', border: '1px solid rgba(255,255,255,0.25)', color: 'var(--color-white)', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', whiteSpace: 'nowrap', transition: 'all 0.3s ease' }}
                            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                            View Projects
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Insights;
