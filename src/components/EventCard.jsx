// components/EventCard.jsx
import React from 'react';
import './EventCard.css';

const EventCard = ({ evento }) => {
  // Aggiungi un controllo di sicurezza
  if (!evento) {
    return <div className="event-card">Evento non disponibile</div>;
  }
  
  // Usa le proprietà dirette dell'oggetto evento invece di attributes
  const { titolo, data, immagine, descrizione } = evento;
  
  return (
    <div className="event-card">
      <div className="event-image">
        <img 
          src={immagine || '/images/events/default.jpg'} 
          alt={titolo || 'Evento'}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = '/images/events/default.jpg';
          }}
        />
        <div className="event-date">{data}</div>
      </div>
      <div className="event-content">
        <h3>{titolo}</h3>
        <p>{descrizione}</p>
        <button className="btn-details">Scopri di più</button>
      </div>
    </div>
  );
};

export default EventCard;
