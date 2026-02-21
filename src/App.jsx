import React, { useEffect } from 'react';
import ReactLenis from 'lenis/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Footer from './components/Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothTouch: true }}>
        <div className="app-wrapper relative">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ReactLenis>
    </Router>
  );
}

export default App;
