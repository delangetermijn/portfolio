import axios from 'axios'

// Free API endpoints (geen API key vereist)
const STOCK_API = 'https://api.twelvedata.com/price'
const CRYPTO_API = 'https://api.coingecko.com/api/v3/simple/price'

// Fallback voor stocks als twelvedata niet werkt
const ALPHA_VANTAGE_API = 'https://www.alphavantage.co/query'

export const updatePrices = async (portfolio) => {
  const updatedPortfolio = await Promise.all(
    portfolio.map(async (item) => {
      try {
        if (item.type === 'crypto') {
          const price = await getCryptoPrice(item.symbol)
          return { ...item, currentPrice: price }
        } else {
          const price = await getStockPrice(item.symbol)
          return { ...item, currentPrice: price }
        }
      } catch (error) {
        console.error(`Fout bij ophalen prijs voor ${item.symbol}:`, error)
        return { ...item, currentPrice: null }
      }
    })
  )
  return updatedPortfolio
}

const getCryptoPrice = async (symbol) => {
  try {
    // CoinGecko gebruikt lowercase IDs
    const coinId = symbol.toLowerCase()
    const response = await axios.get(CRYPTO_API, {
      params: {
        ids: coinId,
        vs_currencies: 'eur',
      },
      timeout: 5000,
    })

    if (response.data[coinId] && response.data[coinId].eur) {
      return response.data[coinId].eur
    }

    // Fallback: probeer met andere common IDs
    const commonIds = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'BNB': 'binancecoin',
      'ADA': 'cardano',
      'SOL': 'solana',
      'XRP': 'ripple',
      'DOT': 'polkadot',
      'DOGE': 'dogecoin',
      'MATIC': 'matic-network',
      'LTC': 'litecoin',
    }

    const mappedId = commonIds[symbol.toUpperCase()]
    if (mappedId) {
      const fallbackResponse = await axios.get(CRYPTO_API, {
        params: {
          ids: mappedId,
          vs_currencies: 'eur',
        },
        timeout: 5000,
      })

      if (fallbackResponse.data[mappedId] && fallbackResponse.data[mappedId].eur) {
        return fallbackResponse.data[mappedId].eur
      }
    }

    throw new Error('Cryptoprijs niet gevonden')
  } catch (error) {
    console.error('Crypto API error:', error)
    throw error
  }
}

const getStockPrice = async (symbol) => {
  try {
    // Probeer eerst Twelve Data (gratis, geen API key nodig voor beperkt gebruik)
    try {
      const response = await axios.get(STOCK_API, {
        params: {
          symbol: symbol,
          apikey: 'demo', // Demo key, kan rate limited zijn
        },
        timeout: 5000,
      })

      if (response.data && response.data.price) {
        // Convert USD to EUR (simplified, zou eigenlijk een currency API moeten gebruiken)
        const priceUSD = parseFloat(response.data.price)
        // Approximate EUR conversion (1 USD ≈ 0.92 EUR)
        return priceUSD * 0.92
      }
    } catch (twelveDataError) {
      console.log('Twelve Data niet beschikbaar, gebruik fallback')
    }

    // Fallback: gebruik Yahoo Finance via een proxy of mock data
    // In productie zou je een betrouwbare API moeten gebruiken
    throw new Error('Stock API niet beschikbaar')
  } catch (error) {
    console.error('Stock API error:', error)
    // Voor demo doeleinden: return null zodat de UI nog steeds werkt
    // In productie zou je hier een betere error handling moeten hebben
    return null
  }
}

