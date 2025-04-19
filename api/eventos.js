// api/eventos.js
const axios = require('axios');

module.exports = async (req, res) => {
  // Configura gli header CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Gestisci le richieste preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Codifica l'URL corretto del tuo backend Strapi
    const strapiURL = 'https://strapi-kampe.onrender.com';
    
    // Estrai parametri di query dalla richiesta originale
    const queryString = req.url.includes('?') ? req.url.split('?')[1] : '';
    
    // Effettua la richiesta a Strapi
    const response = await axios.get(`${strapiURL}/api/eventos?${queryString}`);
    
    // Invia i dati ricevuti come risposta
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Errore nella richiesta proxy:', error);
    
    // Invia l'errore come risposta
    return res.status(error.response?.status || 500).json({
      error: true,
      message: error.message,
      details: error.response?.data
    });
  }
};
