import React from 'react'
import './PortfolioSummary.css'

function PortfolioSummary({ portfolio }) {
  const totalBuyValue = portfolio.reduce((sum, item) => sum + (item.buyPrice * item.amount), 0)
  const totalCurrentValue = portfolio.reduce((sum, item) => 
    sum + (item.currentPrice ? item.currentPrice * item.amount : 0), 0
  )
  const totalProfit = totalCurrentValue - totalBuyValue
  const totalProfitPercent = totalBuyValue > 0 ? ((totalProfit / totalBuyValue) * 100) : 0

  const hasPrices = portfolio.some(item => item.currentPrice)

  return (
    <div className="portfolio-summary">
      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-label">Totale Investering</div>
          <div className="stat-value">€{totalBuyValue.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Huidige Waarde</div>
          <div className="stat-value">
            {hasPrices ? `€${totalCurrentValue.toFixed(2)}` : 'N/A'}
          </div>
        </div>
        <div className={`stat-card profit-card ${totalProfit >= 0 ? 'positive' : 'negative'}`}>
          <div className="stat-label">Totaal Winst/Verlies</div>
          <div className="stat-value">
            {hasPrices ? (
              <>
                {totalProfit >= 0 ? '+' : ''}€{totalProfit.toFixed(2)}
                <span className="stat-percent">
                  ({totalProfitPercent >= 0 ? '+' : ''}{totalProfitPercent.toFixed(2)}%)
                </span>
              </>
            ) : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioSummary

