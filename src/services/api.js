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
        console.log('Processing item with image:', item.Immagine);
        
        // Converti la data in un oggetto Date se è una stringa
        const data = item.Data ? new Date(item.Data) : null;
        
        // Gestisci le immagini in base alla struttura dell'API
        console.log('Struttura dell\'immagine:', JSON.stringify(item.Immagine, null, 2));
        let immagini = [];
        
        // AGGIUNGI QUESTA NUOVA CONDIZIONE ALL'INIZIO:
        if (item.Immagine && Array.isArray(item.Immagine) && item.Immagine.length > 0) {
          // Per la struttura specifica che abbiamo visto nel log
          immagini = item.Immagine.map(img => ({
            id: img.id,
            name: img.name,
            url: img.url,
            fullUrl: img.url.startsWith('/') ? 
              `${API_URL}${img.url}` : img.url,
            thumbnail: img.formats?.thumbnail?.url ? 
              `${API_URL}${img.formats.thumbnail.url}` : null,
            small: img.formats?.small?.url ? 
              `${API_URL}${img.formats.small.url}` : null,
            medium: img.formats?.medium?.url ? 
              `${API_URL}${img.formats.medium.url}` : null,
            alt: img.alternativeText || item.Titolo
          }));
        }
        else if (item.Immagine && item.Immagine.data) {
          // Resta del codice esistente per altre strutture
          const imgData = item.Immagine.data;
          if (Array.isArray(imgData)) {
            // Se è un array di immagini
            immagini = imgData.map(img => ({
              id: img.id,
              url: img.attributes.url,
              fullUrl: img.attributes.url.startsWith('/') ? 
                `${API_URL}${img.attributes.url}` : img.attributes.url,
              thumbnail: img.attributes.formats?.thumbnail?.url ? 
                `${API_URL}${img.attributes.formats.thumbnail.url}` : null,
              alt: img.attributes.alternativeText || item.Titolo
            }));
          } else if (imgData.id) {
            // Se è una singola immagine
            immagini = [{
              id: imgData.id,
              url: imgData.attributes.url,
              fullUrl: imgData.attributes.url.startsWith('/') ? 
                `${API_URL}${imgData.attributes.url}` : imgData.attributes.url,
              thumbnail: imgData.attributes.formats?.thumbnail?.url ? 
                `${API_URL}${imgData.attributes.formats.thumbnail.url}` : null,
              alt: imgData.attributes.alternativeText || item.Titolo
            }];
          }
        }

        
        // Log delle immagini elaborate per debug
        console.log('Immagini elaborate:', immagini);
        
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
          Immagine: immagini
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error('Errore nel recupero degli eventi:', error);
    throw error;
  }
};
