import React, { useState } from 'react'
import './PortfolioItem.css'

function PortfolioItem({ item, onRemove, onUpdate, loading }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editAmount, setEditAmount] = useState(item.amount.toString())
  const [editBuyPrice, setEditBuyPrice] = useState(item.buyPrice.toString())

  const currentValue = item.currentPrice ? item.currentPrice * item.amount : 0
  const buyValue = item.buyPrice * item.amount
  const profit = currentValue - buyValue
  const profitPercent = buyValue > 0 ? ((profit / buyValue) * 100) : 0

  const handleSave = () => {
    onUpdate(item.id, {
      amount: parseFloat(editAmount),
      buyPrice: parseFloat(editBuyPrice),
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditAmount(item.amount.toString())
    setEditBuyPrice(item.buyPrice.toString())
    setIsEditing(false)
  }

  return (
    <div className={`portfolio-item ${profit >= 0 ? 'profit' : 'loss'}`}>
      <div className="item-header">
        <div className="item-symbol">
          <span className="item-type">{item.type === 'stock' ? '📈' : '₿'}</span>
          <span className="symbol">{item.symbol}</span>
        </div>
        <div className="item-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="save-btn">✓</button>
              <button onClick={handleCancel} className="cancel-btn">✕</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="edit-btn">✏️</button>
              <button onClick={() => onRemove(item.id)} className="delete-btn">🗑️</button>
            </>
          )}
        </div>
      </div>

      <div className="item-details">
        {isEditing ? (
          <div className="edit-form">
            <div className="edit-field">
              <label>Aantal:</label>
              <input
                type="number"
                step="0.00000001"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
            </div>
            <div className="edit-field">
              <label>Aankoopprijs (€):</label>
              <input
                type="number"
                step="0.01"
                value={editBuyPrice}
                onChange={(e) => setEditBuyPrice(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="detail-row">
              <span>Aantal:</span>
              <span className="value">{item.amount.toLocaleString('nl-NL')}</span>
            </div>
            <div className="detail-row">
              <span>Aankoopprijs:</span>
              <span className="value">€{item.buyPrice.toFixed(2)}</span>
            </div>
            <div className="detail-row">
              <span>Huidige prijs:</span>
              <span className="value">
                {loading ? '...' : item.currentPrice ? `€${item.currentPrice.toFixed(2)}` : 'N/A'}
              </span>
            </div>
            <div className="detail-row">
              <span>Huidige waarde:</span>
              <span className="value">
                {loading ? '...' : item.currentPrice ? `€${currentValue.toFixed(2)}` : 'N/A'}
              </span>
            </div>
            <div className="detail-row">
              <span>Totale kosten:</span>
              <span className="value">€{buyValue.toFixed(2)}</span>
            </div>
            <div className={`profit-row ${profit >= 0 ? 'positive' : 'negative'}`}>
              <span>Winst/Verlies:</span>
              <span className="value">
                {loading ? '...' : item.currentPrice ? (
                  <>
                    {profit >= 0 ? '+' : ''}€{profit.toFixed(2)} ({profitPercent >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%)
                  </>
                ) : 'N/A'}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PortfolioItem

