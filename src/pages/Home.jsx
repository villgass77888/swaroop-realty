import React from 'react';
import Hero from '../components/Hero';
import Ethos from '../components/Ethos';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Press from '../components/Press';
import Cta from '../components/Cta';
import Testimonials from '../components/Testimonials';
import ScrollProgressBar from '../components/ScrollProgressBar';
import SEOHead from '../components/SEOHead';
import FAQ from '../components/FAQ';

const homeSchema = [
    {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'RealEstateAgent'],
        name: 'Swaroop Realty',
        description: 'Premium vastu-compliant real estate developer in Vrindavan, Braj. Specialising in residential plots, villas, and sacred farmland with 35+ years of trusted experience.',
        url: 'https://swarooprealty.com',
        logo: 'https://swarooprealty.com/logo-dark.png',
        image: 'https://swarooprealty.com/vrindavan-sunrise.png',
        telephone: '+918383928784',
        email: 'contact@swarooprealty.com',
        foundingDate: '1990',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Near Jait Police Station',
            addressLocality: 'Vrindavan',
            addressRegion: 'Uttar Pradesh',
            postalCode: '281003',
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 27.5744,
            longitude: 77.6987,
        },
        areaServed: [
            { '@type': 'City', name: 'Vrindavan' },
            { '@type': 'City', name: 'Mathura' },
            { '@type': 'City', name: 'Govardhan' },
            { '@type': 'AdministrativeArea', name: 'Braj Mandal' },
        ],
        openingHours: 'Mo-Sa 09:00-18:00',
        priceRange: '₹₹₹',
        sameAs: [],
    },
    {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Swaroop Realty',
        url: 'https://swarooprealty.com',
        logo: 'https://swarooprealty.com/logo-dark.png',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+918383928784',
            contactType: 'sales',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi'],
        },
        sameAs: [
            'https://instagram.com/swarooprealty',
            'https://linkedin.com/company/swarooprealty'
        ]
    },
    {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Is Vrindavan a good place to invest in real estate?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Vrindavan is one of India\'s fastest-growing spiritual and residential destinations. With increasing pilgrim footfall, government infrastructure development, and limited developable land, Vrindavan real estate offers strong long-term appreciation potential. Swaroop Realty has developed vastu-compliant estates in Vrindavan for over 35 years.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is vastu-compliant real estate in Vrindavan?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Vastu-compliant real estate aligns the layout, orientation, and design of a property with traditional Vastu Shastra principles — an ancient Indian science of spatial arrangement. Swaroop Realty integrates vastu principles at the master-planning stage for every plot and villa project in Vrindavan and Braj.',
                },
            },
            {
                '@type': 'Question',
                name: 'What types of properties does Swaroop Realty offer in Vrindavan?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Swaroop Realty offers residential land plots, vastu-aligned luxury villas, and sacred farmland in Vrindavan, Govardhan, and the Braj Mandal region. All projects feature clear titles, structured documentation, and vastu-compliant master planning.',
                },
            },
            {
                '@type': 'Question',
                name: 'How do I buy a plot in Vrindavan?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'You can contact Swaroop Realty directly at +91 83839 28784 or visit our office near Jait Police Station, Vrindavan 281003. Our team will guide you through site visits, documentation, and the complete purchase process with full transparency.',
                },
            },
            {
                '@type': 'Question',
                name: 'Are plots near Govardhan or Mathura available?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Swaroop Realty operates across the Braj Mandal, including Vrindavan, Govardhan, and surrounding areas near Mathura. Projects like Govardhan Greens offer resort-style plot developments in the sacred Govardhan precinct.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is the price and investment benefits of a 100 Gaj plot in Vrindavan?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'A 100 Gaj plot in Vrindavan offers an excellent entry point for long-term real estate investment in Braj. Prices vary based on location and proximity to key temples, but they yield high appreciation due to limited land availability and growing demand.',
                },
            },
            {
                '@type': 'Question',
                name: 'Where can I discover my dream property in Vrindavan?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'You can explore premium vastu-compliant properties, plots, and luxury villas right here with Swaroop Realty. Contact us to schedule a site visit and find your ideal investment or spiritual home.',
                },
            },
            {
                '@type': 'Question',
                name: 'Why buy premium plots for sale in Vrindavan?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Buying premium plots in Vrindavan secures your investment in one of India\'s fastest-developing spiritual hubs. Premium plots developed by trusted builders like Swaroop Realty ensure clear titles, gated security, array of amenities, and adherence to Vastu principles.',
                },
            },
        ],
    },
];

const Home = () => {
    return (
        <>
            <div id="pricing" style={{ position: "absolute", top: "-100px" }} aria-hidden="true"></div>
            <div id="location" style={{ position: "absolute", top: "-100px" }} aria-hidden="true"></div>
            <div id="faq" style={{ position: "absolute", top: "-100px" }} aria-hidden="true"></div>

            <SEOHead
                title="Best Plots & Real Estate in Vrindavan"
                description="Swaroop Realty — 35+ years of trusted real estate in Vrindavan. Premium vastu-compliant plots, luxury villas & sacred farmland in Braj. Clear titles, transparent documentation. Call +91 83839 28784."
                keywords="real estate in Vrindavan, best real estate Vrindavan, vastu plots Vrindavan, land for sale Vrindavan, Vrindavan property, Braj land investment, plots near Mathura, sacred land investment, spiritual real estate Vrindavan, real estate agent Vrindavan, Plots in Vrindavan, Premium Plots for Sale in Vrindavan, 100 Gaj Plot in Vrindavan"
                canonical="/"
                schema={homeSchema}
            />
            <ScrollProgressBar />
            <Hero />
            <Ethos />
            <Portfolio />
            <Services />
            <Press />
            <Testimonials />
            <FAQ />
            <Cta />
        </>
    );
};

export default Home;

