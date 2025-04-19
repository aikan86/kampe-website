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
    
    if (response.data && response.data.data) {
      // Estrai e mappa i dati dalla struttura di risposta di Strapi
      return response.data.data.map(item => {
        // Log dell'item per debug
        console.log('Processing item:', item);
        
        // Converti la data in un oggetto Date se è una stringa
        const data = item.Data ? new Date(item.Data) : null;
        
        return {
          id: item.id,
          Titolo: item.Titolo || '',
          Slug: item.Slug || '',
          Data: data,
          Descrizione: item.Descrizione || '',
          Descrizione_Breve: item.Descrizione_Breve || '',
          Luogo: item.Luogo || '',
          Categoria: item.Categoria || '',
          Evidenza: item.Evidenza || false,
          prezzo: item.prezzo || 0,
          Link: item.Link || '',
          Immagine: [] // Per ora lasciamo vuoto, poi gestiremo le immagini
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error('Errore nel recupero degli eventi:', error);
    throw error;
  }
};
