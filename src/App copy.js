// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Componenti
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pagine
import Home from './pages/Home';
import ChiSiamo from './pages/ChiSiamo';
import Eventi from './pages/Eventi';
import Contatti from './pages/Contatti';

// Stili
import './App.css';

// Componente wrapper per AnimatePresence
function AnimationWrapper({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {children}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula il caricamento delle risorse
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    // Clean up del timer
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <img src="/images/logo.png" alt="Kampè Logo" className="loader-logo" />
          <div className="loader-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/eventi" element={<Eventi />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="*" element={
              <div className="not-found">
                <h1>404</h1>
                <h2>Pagina non trovata</h2>
                <p>La pagina che stai cercando non esiste o è stata spostata.</p>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
