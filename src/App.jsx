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
  const [showAddForm, setShowAddForm] = useState(false)

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

  useEffect(() => {
    // Laad portfolio uit localStorage
    const savedPortfolio = getPortfolioFromStorage()
    if (savedPortfolio.length > 0) {
      setPortfolio(savedPortfolio)
      refreshPrices(savedPortfolio)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <div className="logo-container">
          <div className="text-logo">
            <span className="logo-line-1">╔═══════════════════════════════╗</span>
            <span className="logo-line-2">║   📊 PORTFOLIO TRACKER 📊   ║</span>
            <span className="logo-line-3">╚═══════════════════════════════╝</span>
          </div>
        </div>
        <div className="header-description">
          <h2>Jouw Beleggingsportefeuille in Één Overzicht</h2>
          <p>
            Houd al je aandelen en cryptocurrency investeringen bij op één plek. 
            Bekijk real-time prijzen, bereken je winst en verlies, en beheer je portfolio 
            met gemak. Perfect voor zowel beginnende als ervaren beleggers.
          </p>
        </div>
      </header>

      <div className="app-content">
        <div className="portfolio-overview-section">
          <div className="overview-header">
            <h2>Portfolio Overzicht</h2>
            <div className="action-buttons">
              <button 
                className="action-btn primary"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? '✕ Annuleren' : '➕ Nieuw Item Toevoegen'}
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => refreshPrices()}
                disabled={loading || portfolio.length === 0}
              >
                {loading ? '⏳ Laden...' : '🔄 Prijzen Verversen'}
              </button>
            </div>
          </div>

          {showAddForm && (
            <div className="form-container">
              <PortfolioForm 
                onAdd={(item) => {
                  addToPortfolio(item)
                  setShowAddForm(false)
                }} 
              />
            </div>
          )}

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

