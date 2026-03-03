import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEOHead — reusable per-page SEO component
 * Props:
 *   title        — page title (appended with site name)
 *   description  — meta description
 *   keywords     — comma-separated keywords string
 *   canonical    — full canonical URL (e.g. https://swarooprealty.com/about)
 *   image        — OG image URL (defaults to vrindavan-sunrise)
 *   schema       — JSON-LD schema object or array of objects (optional)
 */
const SITE_NAME = 'Swaroop Realty';
const DEFAULT_IMAGE = 'https://swarooprealty.com/vrindavan-sunrise.png';
const BASE_URL = 'https://swarooprealty.com';

const SEOHead = ({
    title,
    description,
    keywords,
    canonical,
    image = DEFAULT_IMAGE,
    schema,
}) => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Premium Vastu Plots & Villas in Vrindavan, Braj`;
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

    return (
        <Helmet>
            {/* Primary */}
            <title>{fullTitle}</title>
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={image} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter */}
            <meta name="twitter:title" content={fullTitle} />
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content={image} />
            <meta name="twitter:card" content="summary_large_image" />

            {/* JSON-LD Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(Array.isArray(schema) ? schema : [schema])}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;
