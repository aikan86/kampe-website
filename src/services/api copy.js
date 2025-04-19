// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:1337'; // o l'URL del tuo backend Strapi in produzione

/**
 * Recupera tutti gli eventi da Strapi
 * @param {Object} queryParams - Parametri di query opzionali (filtri, ordinamento, ecc.)
 * @returns {Promise<Array>} - Array di oggetti evento
 */
export const fetchEventi = async (queryParams = {}) => {
  try {
    const response = await axios.get(`${API_URL}/api/eventos`, {
      params: {
        ...queryParams,
        populate: '*'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Errore nel caricamento degli eventi:', error);
    return [];
  }
};

/**
 * Recupera un singolo evento per slug
 * @param {string} slug - Lo slug dell'evento da recuperare
 * @returns {Promise<Object>} - Oggetto evento
 */
export const fetchEventoBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/api/eventos`, {
      params: {
        filters: {
          slug: {
            $eq: slug
          }
        },
        populate: '*'
      }
    });
    return response.data.data[0];
  } catch (error) {
    console.error(`Errore nel caricamento dell'evento con slug ${slug}:`, error);
    return null;
  }
};
/**
 * Recupera tutti i progetti da Strapi
 * @param {Object} queryParams - Parametri di query opzionali
 * @returns {Promise<Array>} - Array di oggetti progetto
 */
export const fetchProgetti = async (queryParams = {}) => {
    try {
      const response = await axios.get(`${API_URL}/api/progettos`, {
        params: {
          ...queryParams,
          populate: '*'
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Errore nel caricamento dei progetti:', error);
      return [];
    }
  };
  
  /**
   * Recupera un singolo progetto per slug
   * @param {string} slug - Lo slug del progetto da recuperare
   * @returns {Promise<Object>} - Oggetto progetto
   */
  export const fetchProgettoBySlug = async (slug) => {
    try {
      const response = await axios.get(`${API_URL}/api/progettos`, {
        params: {
          filters: {
            slug: {
              $eq: slug
            }
          },
          populate: '*'
        }
      });
      return response.data.data[0];
    } catch (error) {
      console.error(`Errore nel caricamento del progetto con slug ${slug}:`, error);
      return null;
    }
  };
  
  /**
   * Recupera eventi in evidenza
   * @param {number} limit - Numero massimo di eventi da recuperare
   * @returns {Promise<Array>} - Array di eventi in evidenza
   */
  export const fetchEventiInEvidenza = async (limit = 3) => {
    try {
      const response = await axios.get(`${API_URL}/api/eventos`, {
        params: {
          filters: {
            in_evidenza: {
              $eq: true
            }
          },
          pagination: {
            limit
          },
          populate: '*'
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Errore nel caricamento degli eventi in evidenza:', error);
      return [];
    }
  };
 
  /**
 * Recupera progetti in evidenza
 * @param {number} limit - Numero massimo di progetti da recuperare
 * @returns {Promise<Array>} - Array di progetti in evidenza
 */
export const fetchProgettiInEvidenza = async (limit = 3) => {
    try {
      const response = await axios.get(`${API_URL}/api/progettos`, {
        params: {
          filters: {
            in_evidenza: {
              $eq: true
            }
          },
          pagination: {
            limit
          },
          populate: '*'
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Errore nel caricamento dei progetti in evidenza:', error);
      return [];
    }
  };
  
  /**
   * Funzione helper per formattare i dati ricevuti da Strapi
   * @param {Object} strapiItem - Oggetto dati come restituito da Strapi
   * @returns {Object} - Oggetto dati formattato
   */
  export const formatStrapiData = (strapiItem) => {
    if (!strapiItem) return null;
    
    const { attributes } = strapiItem;
    const formattedData = {
      id: strapiItem.id,
      ...attributes
    };
    
    // Gestisce le immagini
    if (attributes.immagine && attributes.immagine.data) {
      formattedData.immagine = `${API_URL}${attributes.immagine.data.attributes.url}`;
    }
    
    // Gestisce le collezioni di immagini
    if (attributes.immagini && attributes.immagini.data) {
      formattedData.immagini = attributes.immagini.data.map(img => 
        `${API_URL}${img.attributes.url}`
      );
    }
    
    return formattedData;
  };
  
  export default {
    fetchEventi,
    fetchEventoBySlug,
    fetchProgetti,
    fetchProgettoBySlug,
    fetchEventiInEvidenza,
    fetchProgettiInEvidenza,
    formatStrapiData
  };
  