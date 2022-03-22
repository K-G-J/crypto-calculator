import React from 'react'
import PortfolioItem from './PortfolioItem'

export default function Portfolio({portfolio}) {

  const total = portfolio.reduce((total, current) => total + current.value, 0)
  const formatted_total = total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  const portfolioItems = portfolio.map((item, i) => <PortfolioItem key={i} item={item} />)

  return (
      <div>
        <div className="portfolio-value">
          <div className="portfolio-value--header">Your Total Portfolio Value Is:</div>
          <div className="portfolio-value--content">${formatted_total}</div>
        </div>
        <div className="portfolio-items">
          {portfolioItems}
        </div>
      </div>
  )
}
