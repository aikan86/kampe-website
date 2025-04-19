// src/services/api.js
import axios from 'axios';

// URL del backend Strapi
const API_URL = process.env.REACT_APP_API_URL || 'https://kampe-strapi.onrender.com';

export const fetchEventi = async () => {
  try {
    console.log('Chiamando API:', `${API_URL}/api/eventos?populate=*`);
    
    const response = await axios.get(`${API_URL}/api/eventos?populate=*`);
    
    console.log('Risposta API completa:', response.data);
    
    // In Strapi v4/v5, i dati sono strutturati diversamente
    if (response.data && response.data.data) {
      // Estrai e mappa i dati dalla struttura di risposta di Strapi
      return response.data.data.map(item => {
        const evento = item.attributes;
        return {
          id: item.id,
          Titolo: evento.Titolo,
          Slug: evento.Slug,
          Data: evento.Data,
          Descrizione: evento.Descrizione,
          Descrizione_Breve: evento.Descrizione_Breve,
          Luogo: evento.Luogo,
          Categoria: evento.Categoria,
          Evidenza: evento.Evidenza,
          prezzo: evento.prezzo,
          Link: evento.Link,
          Immagine: evento.Immagine?.data ? 
            evento.Immagine.data.map(img => ({
              url: img.attributes.url,
              fullUrl: img.attributes.url.startsWith('/') ? 
                `${API_URL}${img.attributes.url}` : img.attributes.url
            })) : []
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error('Errore nel recupero degli eventi:', error);
    throw error;
  }
};
