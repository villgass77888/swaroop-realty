import React from 'react';
import ReactLenis, { useLenis } from 'lenis/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { PrivacyPolicy, TermsOfService, Disclaimer } from './pages/LegalPages';
import CustomCursor from './components/CustomCursor';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
};

// Inner app that consumes LoadingContext
const AppInner = () => {
  const { isLoading, setIsLoading } = useLoading();

  return (
    <>
      <CustomCursor />
      {isLoading && <Preloader onLoadingComplete={() => setIsLoading(false)} />}

      <Router>
        <ReactLenis root options={{ lerp: 0.075, smoothTouch: true, touchMultiplier: 1.2 }}>
          <ScrollToTop />
          <div className="app-wrapper relative" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.8s ease' }}>
            <Navigation />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ReactLenis>
      </Router>
    </>
  );
};

function App() {
  return (
    <LoadingProvider>
      <AppInner />
    </LoadingProvider>
  );
}

export default App;
