import React, { useState } from 'react'
import './PortfolioForm.css'

function PortfolioForm({ onAdd }) {
  const [type, setType] = useState('stock')
  const [symbol, setSymbol] = useState('')
  const [amount, setAmount] = useState('')
  const [buyPrice, setBuyPrice] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!symbol || !amount || !buyPrice) {
      alert('Vul alle velden in')
      return
    }

    onAdd({
      type,
      symbol: symbol.toUpperCase(),
      amount: parseFloat(amount),
      buyPrice: parseFloat(buyPrice),
    })

    // Reset form
    setSymbol('')
    setAmount('')
    setBuyPrice('')
  }

  return (
    <div className="portfolio-form">
      <h2>Voeg toe aan portfolio</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type</label>
          <div className="type-selector">
            <button
              type="button"
              className={type === 'stock' ? 'active' : ''}
              onClick={() => setType('stock')}
            >
              📈 Aandeel
            </button>
            <button
              type="button"
              className={type === 'crypto' ? 'active' : ''}
              onClick={() => setType('crypto')}
            >
              ₿ Crypto
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="symbol">
            {type === 'stock' ? 'Symbool (bijv. AAPL, TSLA)' : 'Symbool (bijv. BTC, ETH)'}
          </label>
          <input
            id="symbol"
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder={type === 'stock' ? 'AAPL' : 'BTC'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Aantal</label>
          <input
            id="amount"
            type="number"
            step="0.00000001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1.0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="buyPrice">Aankoopprijs (€)</label>
          <input
            id="buyPrice"
            type="number"
            step="0.01"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            placeholder="100.00"
          />
        </div>

        <button type="submit" className="submit-button">
          ➕ Toevoegen
        </button>
      </form>
    </div>
  )
}

export default PortfolioForm

