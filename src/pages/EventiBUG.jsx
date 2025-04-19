// src/pages/Eventi.jsx
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import './Eventi.css';
import { fetchEventi } from '../services/api';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Risolve il problema delle icone di Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente per centrare la mappa su un marker
function SetViewOnClick({ coords }) {
  const map = useMap();
  useEffect(() => {
    // Forza aggiornamento mappa
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    if (coords) {
      map.setView(coords, map.getZoom());
    }
  }, [coords, map]);
  return null;
}
const Eventi = () => {
  const [eventi, setEventi] = useState([]);
  const [eventiRecenti, setEventiRecenti] = useState([]);
  const [eventiAltri, setEventiAltri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseDebug, setResponseDebug] = useState(null);
  const [eventoHover, setEventoHover] = useState(null);
  const [mapCenter, setMapCenter] = useState([44.3055, 9.3230]); // Coordinate predefinite (Chiavari)
  const mapRef = useRef();
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const caricaEventi = async () => {
      try {
        setLoading(true);
        
        console.log('Inizio caricamento eventi...');
        const eventiData = await fetchEventi();
        
        setResponseDebug(eventiData);
        
        // Log completo dei dati ricevuti
        console.log('Dati ricevuti da API:', JSON.stringify(eventiData, null, 2));

        // Verifica esplicita della struttura dei dati
        if (!eventiData) {
          console.error('Dati non validi ricevuti dall\'API');
          setEventi([]);
          setLoading(false);
          return;
        }
        
        // Mappa i dati con controlli aggiuntivi
        const eventiFormattati = eventiData.map(evento => {
          if (!evento) {
            console.warn('Evento non valido:', evento);
            return null;
          }
          
          console.log('Formattazione evento:', evento.id);
          
          // Per semplicità, simuliamo coordinate geografiche
          const getRandomCoords = (baseLocation, range) => {
            const lat = baseLocation[0] + (Math.random() - 0.5) * range;
            const lng = baseLocation[1] + (Math.random() - 0.5) * range;
            return [lat, lng];
          };
          // Assegna coordinate basate sulla location
          const baseCoords = {
            "Chiavari": [44.3173, 9.3240],  // Chiavari
            "Rapallo": [44.3506, 9.2311],   // Rapallo
            "Genova": [44.4056, 8.9463],    // Genova
            "default": [44.3055, 9.3230]    // Default
          };

          // Adatta ai nomi dei campi con prima lettera maiuscola
          const formattato = {
            id: evento.id,
            titolo: evento.Titolo,
            slug: evento.Slug,
            data: evento.Data ? new Date(evento.Data) : null,
            descrizione: evento.Descrizione,
            descrizione_breve: evento.Descrizione_Breve,
            luogo: evento.Luogo,
            categoria: evento.Categoria,
            in_evidenza: evento.Evidenza,
            prezzo: evento.prezzo,
            link: evento.Link,
            coordinates: baseCoords[evento.Luogo] 
                        ? getRandomCoords(baseCoords[evento.Luogo], 0.01) 
                        : getRandomCoords(baseCoords["default"], 0.05)
          };
          
          // Gestione sicura dell'immagine
          if (evento.Immagine && evento.Immagine.length > 0) {
            const immagine = evento.Immagine[0];
            if (immagine && immagine.url) {
              formattato.immagine = `http://localhost:1337${immagine.url}`;
            }
          }
          
          return formattato;
        }).filter(Boolean); // Rimuove eventuali elementi null
        
        // Ordina gli eventi per data (più recenti prima)
        const eventiOrdinati = eventiFormattati.sort((a, b) => {
          if (!a.data) return 1;
          if (!b.data) return -1;
          return a.data - b.data;
        });
        
        // Dividi tra eventi recenti (i primi 4) e altri
        const recenti = eventiOrdinati.slice(0, 4);
        const altri = eventiOrdinati.slice(4);
        
        setEventi(eventiOrdinati);
        setEventiRecenti(recenti);
        setEventiAltri(altri);
        
      } catch (err) {
        console.error('Errore completo:', err);
        setError('Si è verificato un errore nel caricamento degli eventi. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    caricaEventi();
  }, []);

  // Gestisce l'hover su un evento
  const handleEventoHover = (evento) => {
    setEventoHover(evento);
    if (evento && evento.coordinates) {
      setMapCenter(evento.coordinates);
    }
  };

  // Gestisce il click su un marker della mappa
  const handleMarkerClick = (evento) => {
    // Scorri alla card corrispondente
    const element = document.getElementById(`evento-${evento.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Evidenzia la card
      element.classList.add('evento-highlighted');
      setTimeout(() => {
        element.classList.remove('evento-highlighted');
      }, 2000);
    }
  };

  // Controlli per lo slider
  const nextSlide = () => {
    const maxIndex = Math.max(0, eventiAltri.length - 3);
    setSliderIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const prevSlide = () => {
      const maxIndex = Math.max(0, eventiAltri.length - 3);
      setSliderIndex(prev => prev <= 0 ? maxIndex : prev - 1);
    };
    return (
      <div className="eventi-container">
        {loading && <div className="loading">Caricamento eventi in corso...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && (
          <div className="eventi-content">
            <div className="mappa-container">
              {/* Mappa in sovraimpressione */}
              {eventi.length > 0 && (
                <MapContainer 
                  center={mapCenter} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                  ref={mapRef}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  
                  {eventi.map(evento => (
                    <Marker 
                      key={`marker-${evento.id}`}
                      position={evento.coordinates}
                      eventHandlers={{
                        click: () => handleMarkerClick(evento)
                      }}
                      icon={eventoHover && eventoHover.id === evento.id ? 
                        new L.Icon({
                          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                          popupAnchor: [1, -34],
                          shadowSize: [41, 41]
                        }) : 
                        new L.Icon.Default()
                      }
                    >
                      <Popup>
                        <div>
                          <h3>{evento.titolo}</h3>
                          <p>{evento.luogo}</p>
                          {evento.data && (
                            <p>{evento.data.toLocaleDateString('it-IT')}</p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  
                  <SetViewOnClick coords={mapCenter} />
                </MapContainer>
              )}
            </div>
  
            <div className="header-section">
              <h1>I nostri Eventi</h1>
              <p>Scopri tutti gli eventi organizzati da Kampè</p>
            </div>
          {/* Sezione Eventi in Evidenza */}
          {eventiRecenti.length > 0 && (
            <div className="eventi-recenti">
              <h2>Eventi in Evidenza</h2>
              <div className="eventi-grid">
                {eventiRecenti.map(evento => (
                  <div 
                    key={`evento-${evento.id}`} 
                    id={`evento-${evento.id}`}
                    className="evento-card"
                    onMouseEnter={() => handleEventoHover(evento)}
                    onMouseLeave={() => setEventoHover(null)}
                  >
                    {evento.immagine && (
                      <div className="evento-immagine">
                        <img src={evento.immagine} alt={evento.titolo} />
                      </div>
                    )}
                    <div className="evento-info">
                      <h3>{evento.titolo}</h3>
                      <p className="evento-luogo">{evento.luogo}</p>
                      {evento.data && (
                        <p className="evento-data">{evento.data.toLocaleDateString('it-IT')}</p>
                      )}
                      <p className="evento-descrizione">{evento.descrizione_breve}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Altri Eventi (con slider) */}
          {eventiAltri.length > 0 && (
            <div className="altri-eventi">
              <h2>Altri Eventi</h2>
              <div className="eventi-slider">
                {eventiAltri.slice(sliderIndex, sliderIndex + 3).map(evento => (
                  <div 
                    key={`evento-${evento.id}`} 
                    id={`evento-${evento.id}`}
                    className="evento-card"
                    onMouseEnter={() => handleEventoHover(evento)}
                    onMouseLeave={() => setEventoHover(null)}
                  >
                    {evento.immagine && (
                      <div className="evento-immagine">
                        <img src={evento.immagine} alt={evento.titolo} />
                      </div>
                    )}
                    <div className="evento-info">
                      <h3>{evento.titolo}</h3>
                      <p className="evento-luogo">{evento.luogo}</p>
                      {evento.data && (
                        <p className="evento-data">{evento.data.toLocaleDateString('it-IT')}</p>
                      )}
                      <p className="evento-descrizione">{evento.descrizione_breve}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="slider-controls">
            <button className="slider-button" onClick={prevSlide}>
              &lt;
            </button>
            <button className="slider-button" onClick={nextSlide}>
              &gt;
            </button>
          </div>
        </div>
      )}
      {!loading && !error && eventi.length === 0 && (
        <div>
          <p>Nessun evento disponibile al momento.</p>
          <p style={{color: 'gray', fontSize: '0.9rem'}}>Questo potrebbe indicare che non ci sono eventi pubblicati in Strapi o che la risposta API ha una struttura diversa da quella prevista.</p>
          
          {responseDebug && (
            <div style={{marginTop: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px'}}>
              <h3 style={{marginTop: 0}}>Debug: Dati grezzi ricevuti</h3>
              <button 
                onClick={() => window.open('http://localhost:1337/api/eventos?populate=*', '_blank')}
                style={{padding: '8px 16px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '15px'}}
              >
                Visualizza API direttamente
              </button>
              <pre style={{overflow: 'auto', maxHeight: '400px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', fontSize: '12px'}}>
                {JSON.stringify(responseDebug, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
  }
};

export default Eventi;
    