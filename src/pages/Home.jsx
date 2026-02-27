import React from 'react';
import Hero from '../components/Hero';
import Ethos from '../components/Ethos';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Press from '../components/Press';
import Cta from '../components/Cta';
import Testimonials from '../components/Testimonials';
import ScrollProgressBar from '../components/ScrollProgressBar';

const Home = () => {
    return (
        <>
            <ScrollProgressBar />
            <Hero />
            <Ethos />
            <Portfolio />
            <Services />
            <Press />
            <Testimonials />
            <Cta />
        </>
    );
};

export default Home;
