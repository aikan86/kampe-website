// src/services/api.js
import axios from 'axios';

// URL del backend Strapi
const API_URL = (process.env.REACT_APP_API_URL || 'https://strapi-kampe.onrender.com').trim();

export const fetchEventi = async () => {
  try {
    const apiUrl = `${API_URL}/api/eventos?populate=*`;
    console.log('Chiamando API:', apiUrl);
    
    const response = await axios.get(apiUrl);
    
    console.log('Risposta API completa:', response.data);
    
    // In Strapi v4/v5, i dati sono strutturati diversamente
    if (response.data && response.data.data) {
      // Estrai e mappa i dati dalla struttura di risposta di Strapi
      return response.data.data.map(item => {
        // Log completo dell'item per debug
        console.log('Item da processare:', item);
        
        // Non accediamo più a item.attributes, usiamo direttamente item
        // poiché i dati sembrano essere già al livello principale
        return {
          id: item.id,
          Titolo: item.Titolo || '',
          Slug: item.Slug || '',
          Data: item.Data || null,
          Descrizione: item.Descrizione || '',
          Descrizione_Breve: item.Descrizione_Breve || '',
          Luogo: item.Luogo || '',
          Categoria: item.Categoria || '',
          Evidenza: item.Evidenza || false,
          prezzo: item.prezzo || 0,
          Link: item.Link || '',
          Immagine: item.Immagine ? 
            [{
              url: item.Immagine,
              fullUrl: item.Immagine.startsWith('/') ? 
                `${API_URL}${item.Immagine}` : item.Immagine
            }] : []
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error('Errore nel recupero degli eventi:', error);
    throw error;
  }
};
