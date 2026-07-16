import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.jsx';
import './index.css';

// ─── Aggiornamento automatico della PWA ──────────────────────────────────────
// Con registerType 'autoUpdate' il nuovo service worker prende il controllo
// da solo e la pagina viene ricaricata automaticamente. Qui aggiungiamo il
// controllo ATTIVO degli aggiornamenti: subito all'avvio, ogni volta che
// l'app torna in primo piano e comunque ogni 30 minuti. Cosi' ad ogni deploy
// la PWA si aggiorna da sola alla prima apertura, senza reinstallare nulla.
registerSW({
  immediate: true,
  onRegisteredSW(swUrl, registration) {
    if (!registration) return;
    const checkForUpdates = () => registration.update().catch(() => {});

    // Controlla quando l'app torna in primo piano (riapertura della PWA)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') checkForUpdates();
    });
    window.addEventListener('focus', checkForUpdates);

    // Controllo periodico di sicurezza (app lasciata aperta)
    setInterval(checkForUpdates, 30 * 60 * 1000);
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
