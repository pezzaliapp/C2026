# QuoteFlow Cascos C2026 – 2 e 4 Colonne

Configuratore e generatore di preventivi/ordini per sollevatori Cascos (2 e 4 colonne).

PWA professionale per uso commerciale: funziona offline, installabile su smartphone e desktop.

Evoluzione di [quoteflow-cascosR0426](https://github.com/pezzaliapp/quoteflow-cascosR0426): **tutta la logica, i cataloghi e i flussi della app originale restano attivi e invariati.**

## Novità C2026

### 1. Seleziona il ponte in funzione del veicolo
Nuovo pulsante in dashboard (e nuova opzione nel configuratore) che avvia un percorso guidato dai **bracci del catalogo misure Cascos** (PDF "Misure Generali Bracci / Tipo Veicoli"):

- L'utente clicca su uno dei 6 bracci: C3.2 E, C3.2 Confort, C4, C5.5, C5.5 Wagon 1500, C5 Wagon 1800 (con range Min–Max mm e veicoli di riferimento)
- Viene poi chiesto se il ponte è per **pavimento industriale** (modelli S — senza pedana) o **non industriale** (con pedana)
- Il braccio scelto viene relazionato ai modelli corrispondenti della logica attuale e il flusso si ricollega in toto alla app originale (risultati, carrello, preventivo/ordine, schede PDF)

### 2. Import listino: prezzo Netto o Lordo
Al caricamento del listino Excel l'utente ora sceglie il tipo di prezzo da importare:

- **Prezzo Netto** (default, comportamento originale): colonna "Netto Riv. (€)". Con listino netto **non è consentito gestire sconti** né costi opzionali.
- **Prezzo Lordo**: colonna "Lordo" (o "Listino"). Con listino lordo l'utente può **gestire sconti** e applicare come opzionale **costi di installazione, trasferte e trasporto**, che confluiscono nei totali del preventivo/ordine, nel documento generato e nel testo WhatsApp.

Il tipo di prezzo attivo è indicato in dashboard, nelle card prodotto e nel documento.

## Stack

- React 18 + Vite 5
- Tailwind CSS
- vite-plugin-pwa (service worker + manifest)
- xlsx (import listino Excel)
- pdf-lib (estrazione schede tecniche da PDF cataloghi)

## Setup

```bash
npm install
npm run dev      # sviluppo locale
npm run build    # build produzione
```

## Deploy

Il workflow GitHub Actions (.github/workflows/deploy.yml) deploya automaticamente su GitHub Pages ad ogni push su main.

## Listino prezzi

I prezzi NON sono inclusi nel repository per motivi di riservatezza commerciale.
L'utente carica il listino Excel dalla dashboard della PWA e i prezzi vengono salvati nel localStorage del browser.

Formato Excel atteso: colonna "Riferimento" + colonna "Netto Riv. (€)" (import netto) oppure colonna "Lordo"/"Listino" (import lordo).

## Licenza

Uso interno Cormach Srl / PezzaliApp. Non distribuire senza autorizzazione.
