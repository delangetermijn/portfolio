# Portfolio Tracker

Een moderne web applicatie voor beleggers om hun aandelen- en cryptoportfolio bij te houden.

## Features

- 📈 **Aandelen tracking**: Voeg aandelen toe aan je portfolio
- ₿ **Crypto tracking**: Houd je cryptocurrency investeringen bij
- 💰 **Real-time prijzen**: Automatisch bijgewerkte prijzen voor je holdings
- 📊 **Portfolio overzicht**: Zie je totale winst/verlies in één oogopslag
- 💾 **LocalStorage**: Je portfolio wordt automatisch opgeslagen
- ✏️ **Bewerken**: Pas je holdings aan wanneer nodig
- 🎨 **Moderne UI**: Mooie, responsive interface

## Installatie

```bash
npm install
```

## Gebruik

Start de development server:

```bash
npm run dev
```

Open je browser en ga naar `http://localhost:5173`

## Build voor productie

```bash
npm run build
```

## Technologie

- **React** - UI framework
- **Vite** - Build tool
- **Axios** - HTTP client voor API calls
- **CoinGecko API** - Cryptocurrency prijzen
- **Twelve Data API** - Aandelen prijzen (demo mode)

## Opmerkingen

- De gratis APIs hebben rate limits. Voor productie gebruik zou je betaalde API keys moeten gebruiken.
- Aandelen prijzen worden momenteel in USD opgehaald en geconverteerd naar EUR met een vaste wisselkoers. Voor productie gebruik zou je een currency conversion API moeten integreren.

## Licentie

MIT

