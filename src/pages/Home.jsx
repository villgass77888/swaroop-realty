import React from 'react';
import Hero from '../components/Hero';
import Ethos from '../components/Ethos';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Press from '../components/Press';
import Cta from '../components/Cta';

const Home = () => {
    return (
        <>
            <Hero />
            <Ethos />
            <Portfolio />
            <Services />
            <Press />
            <Cta />
        </>
    );
};

export default Home;
