import React, { useState, useEffect } from 'react'
import PortfolioForm from './components/PortfolioForm'
import PortfolioList from './components/PortfolioList'
import PortfolioSummary from './components/PortfolioSummary'
import { getPortfolioFromStorage, savePortfolioToStorage } from './utils/storage'
import { updatePrices } from './utils/priceService'
import './App.css'

function App() {
  const [portfolio, setPortfolio] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Laad portfolio uit localStorage
    const savedPortfolio = getPortfolioFromStorage()
    if (savedPortfolio.length > 0) {
      setPortfolio(savedPortfolio)
      refreshPrices(savedPortfolio)
    }
  }, [])

  const refreshPrices = async (portfolioToUpdate = portfolio) => {
    if (portfolioToUpdate.length === 0) return
    
    setLoading(true)
    try {
      const updatedPortfolio = await updatePrices(portfolioToUpdate)
      setPortfolio(updatedPortfolio)
      savePortfolioToStorage(updatedPortfolio)
    } catch (error) {
      console.error('Fout bij ophalen prijzen:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToPortfolio = (item) => {
    const newPortfolio = [...portfolio, { ...item, id: Date.now() }]
    setPortfolio(newPortfolio)
    savePortfolioToStorage(newPortfolio)
    refreshPrices(newPortfolio)
  }

  const removeFromPortfolio = (id) => {
    const newPortfolio = portfolio.filter(item => item.id !== id)
    setPortfolio(newPortfolio)
    savePortfolioToStorage(newPortfolio)
  }

  const updatePortfolioItem = (id, updates) => {
    const newPortfolio = portfolio.map(item =>
      item.id === id ? { ...item, ...updates } : item
    )
    setPortfolio(newPortfolio)
    savePortfolioToStorage(newPortfolio)
    refreshPrices(newPortfolio)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Portfolio Tracker</h1>
        <p>Houd je aandelen en crypto bij</p>
      </header>

      <div className="app-content">
        <div className="left-panel">
          <PortfolioForm onAdd={addToPortfolio} />
          <button 
            className="refresh-button" 
            onClick={() => refreshPrices()}
            disabled={loading || portfolio.length === 0}
          >
            {loading ? 'Laden...' : '🔄 Ververs Prijzen'}
          </button>
        </div>

        <div className="right-panel">
          <PortfolioSummary portfolio={portfolio} />
          <PortfolioList
            portfolio={portfolio}
            onRemove={removeFromPortfolio}
            onUpdate={updatePortfolioItem}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default App

