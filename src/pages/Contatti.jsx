// Contatti.jsx - Parte 1: Importazioni e configurazione iniziale
import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Map from '../components/Map';
import AnimatedSection from '../components/AnimatedSection';
import './Contatti.css';

const Contatti = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    messaggio: '',
  });
  const [inviato, setInviato] = useState(false);
  const [errore, setErrore] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    // Contatti.jsx - Parte 2: Gestione del form e della logica
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const validateForm = () => {
        // Validazione base del form
        if (!formData.nome || !formData.email || !formData.messaggio) {
          setErrore('Per favore, compila tutti i campi obbligatori.');
          return false;
        }
        
        // Validazione email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setErrore('Per favore, inserisci un indirizzo email valido.');
          return false;
        }
        
        return true;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrore(null);
        
        if (!validateForm()) return;
        
        setLoading(true);
        
        try {
          // Qui andrebbe la logica di invio del form a un backend
          // Simuliamo una chiamata API con un timeout
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setInviato(true);
          setFormData({
            nome: '',
            cognome: '',
            email: '',
            telefono: '',
            messaggio: '',
          });
          
        } catch (error) {
          console.error('Errore durante l\'invio del messaggio:', error);
          setErrore('Si è verificato un errore durante l\'invio. Per favore riprova più tardi.');
        } finally {
          setLoading(false);
        }
      };
  // Contatti.jsx - Parte 3A: Prima metà del rendering JSX
  return (
    <div className="contatti-page">
      <Helmet>
        <title>Contatti | Kampè</title>
        <meta name="description" content="Contatta il team Kampè per informazioni, collaborazioni o domande sui nostri eventi." />
      </Helmet>

      <AnimatedSection>
        <div className="header-section">
          <h1>Contattaci</h1>
          <p>Hai domande o vuoi collaborare con noi? Siamo qui per ascoltarti!</p>
        </div>
      </AnimatedSection>

      <div className="contatti-content">
        <AnimatedSection className="form-section">
          {inviato ? (
            <div className="success-message">
              <h2>Grazie per averci contattato!</h2>
              <p>Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.</p>
              <button onClick={() => setInviato(false)} className="btn-primary">
                Invia un altro messaggio
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nome">Nome *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cognome">Cognome</label>
                  <input
                    type="text"
                    id="cognome"
                    name="cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                  />
                </div>
              </div>
              // Contatti.jsx - Parte 3B: Seconda metà del rendering JSX
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Telefono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="messaggio">Messaggio *</label>
                <textarea
                  id="messaggio"
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              {errore && <div className="error-message">{errore}</div>}

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Invio in corso...' : 'Invia messaggio'}
              </button>
            </form>
          )}
        </AnimatedSection>

        <AnimatedSection className="info-section">
          <div className="info-card">
            <h3>Informazioni di contatto</h3>
            <div className="contact-info">
              <div className="info-item">
                <i className="fa fa-envelope"></i>
                <span>info@kampe.it</span>
              </div>
              <div className="info-item">
                <i className="fa fa-phone"></i>
                <span>+39 123 456 7890</span>
              </div>
              <div className="info-item">
                <i className="fa fa-map-marker"></i>
                <span>Via Roma 123, 00100 Roma, Italia</span>
              </div>
            </div>
            
            <h3 className="social-heading">Seguici sui social</h3>
            <div className="social-links">
              <a href="https://facebook.com/kampe" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="https://instagram.com/kampe" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="https://twitter.com/kampe" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-twitter"></i>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      <AnimatedSection className="map-section">
        <h2>Dove siamo</h2>
        <Map 
          location={{ lat: 41.9028, lng: 12.4964 }} 
          zoom={15} 
          markerTitle="Kampè HQ" 
        />
      </AnimatedSection>
    </div>
  );
};

export default Contatti;
    