// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div>Caricamento...</div>;
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
            <Route path="*" element={<div>Pagina non trovata</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
