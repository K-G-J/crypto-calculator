import { useState} from 'react'

export default function PortfolioItem({ item }) {
  const [showBtn, toggleBtn] = useState(true)

  const loadPortfolio = () => {
    let portfolioArr = JSON.parse(localStorage.getItem('portfolio'));
    if (!portfolioArr || !Array.isArray(portfolioArr)) return [];
    else return portfolioArr;
  }

  const handleSave = (item) => {
    let portfolioArr = loadPortfolio();
    item.saved = true
    item.id = Math.floor(Math.random() * 1000)
    portfolioArr.push(item);
    localStorage.setItem('portfolio', JSON.stringify(portfolioArr))
    toggleBtn(false)
  }

  const removeItem = (itemId) => {
    let portfolioArr = loadPortfolio();
    portfolioArr = portfolioArr.filter(item => item.id !== itemId)
    localStorage.setItem('portfolio', JSON.stringify(portfolioArr))
    setTimeout(function () {
      window.location.reload()
    }, 100)
  }
  
  return (
      <div>
        <div className='row'>
          <div className='col'>
            <div className='header'>Currency:</div>
            <div className='text'>{item.currency.name}</div>
          </div>

          <div className='col'>
            <div className='header'>Current Price:</div>
            <div className='text'>${item.current_price}</div>
          </div>

          <div className='col'>
            <div className='header'>Amount In Your Portfolio:</div>
            <div className='text'>{item.amount}</div>
          </div>

          <div className='col'>
            <div className='header'>Current Value:</div>
            <div className='text'>${item.value}</div>
          </div>

          <div className='col btns-container'>
            {!item.saved && showBtn && <button className='btn-save' onClick={() => handleSave(item)}>Save</button>}
            {item.saved && <button className='btn-remove' onClick={() => { removeItem(item.id) }}>Remove</button>}
          </div>
        </div>
      </div>
  )
}