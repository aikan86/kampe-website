// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

// Importazione opzionale per analytics o altri servizi
// import reportWebVitals from './reportWebVitals';

// Per gestire lo scroll automatico al cambio di pagina
const scrollToTop = () => {
  window.scrollTo(0, 0);
};

// Ottieni l'elemento root dal DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering dell'applicazione
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Se desideri misurare le performance dell'app, puoi utilizzare reportWebVitals
// reportWebVitals(console.log);

// Gestione del service worker per PWA (opzionale)
// Se vuoi che la tua app funzioni offline e carichi più velocemente, puoi cambiare
// unregister() in register() qui sotto. Nota che questo comporta alcuni rischi.
// Per saperne di più: https://cra.link/PWA
// serviceWorkerRegistration.unregister();
