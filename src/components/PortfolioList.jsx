import React from 'react'
import PortfolioItem from './PortfolioItem'
import './PortfolioList.css'

function PortfolioList({ portfolio, onRemove, onUpdate, loading }) {
  if (portfolio.length === 0) {
    return (
      <div className="portfolio-list empty">
        <p>Je portfolio is leeg. Voeg je eerste aandeel of crypto toe!</p>
      </div>
    )
  }

  return (
    <div className="portfolio-list">
      <h2>Mijn Portfolio</h2>
      <div className="portfolio-items">
        {portfolio.map((item) => (
          <PortfolioItem
            key={item.id}
            item={item}
            onRemove={onRemove}
            onUpdate={onUpdate}
            loading={loading}
          />
        ))}
      </div>
    </div>
  )
}

export default PortfolioList

