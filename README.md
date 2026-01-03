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

**BELANGRIJK:** Zorg eerst dat je Node.js geïnstalleerd hebt (versie 16 of hoger).

1. Open een terminal/command prompt
2. Navigeer naar de portfolio-tracker directory:
   ```bash
   cd portfolio-tracker
   ```

3. Installeer alle dependencies:
   ```bash
   npm install
   ```

## Gebruik

Start de development server:

```bash
npm run dev
```

Je zou een bericht moeten zien zoals:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open je browser en ga naar `http://localhost:5173`

**Als je een lege pagina ziet:**
1. Controleer de browser console (F12) voor errors
2. Zorg dat alle dependencies geïnstalleerd zijn (`npm install`)
3. Zorg dat de dev server draait (`npm run dev`)
4. Probeer de pagina te verversen (Ctrl+F5 of Cmd+Shift+R)

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

