import { useState, useEffect } from 'react'
import Search from './Search'
import Calculate from './Calculate'
import Portfolio from './Portfolio'
import axios from 'axios'

export default function PortfolioContainer() {

  const [info, setInfo] = useState({ 
    portfolio: [],
    search_results: [],
    active_currency: null,
    amount: ''
  })


  const loadPortfolio = () => {
    let portfolioArr = JSON.parse(localStorage.getItem('portfolio'));
    if (!portfolioArr || !Array.isArray(portfolioArr)) return [];
    else return portfolioArr;
  }
  
  const [currentPortfolio, setPortfolio] = useState([])

  useEffect(() => {
    const current = loadPortfolio();
    setPortfolio(current)
  }, [])
  
  const handleChange = async (e) => {
    try {
      const data = await axios.post('https://crypto-calculator-rails.herokuapp.com/search', { search: e.target.value })
      setInfo(state => ({ ...state, search_results: [...data.data.currencies] }))
    } catch(err) {
      console.log(err)
    }
  }

const handleSelect = (curr, e) => {
  e.preventDefault()
  const activeCurrency = info.search_results.find(item => item.id == curr.id)
  setInfo(state => ({ ...state, search_results: [], active_currency: activeCurrency }))
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let currency = info.active_currency
      let amount = info.amount
      const data = await axios.post('https://crypto-calculator-rails.herokuapp.com/calculate',
        { id: currency.id, amount: amount })
      let portfolioData = data.data
      setInfo(state => ({
        ...state,
        portfolio: [...state.portfolio, portfolioData],
        active_currency: null,
        amount: ''
      }))
      setPortfolio(state => [...state, portfolioData])
    } catch (err) {
      console.log(err)
    }
  }

  const handleAmount = (e) => {
    setInfo(state => ({ ...state, amount: e.target.value }))
  }

  const searchOrCalculate = info.active_currency ?
    <Calculate
        amount={info.amount}
        active_currency={info.active_currency}
        handleChange={handleAmount}
      handleSubmit={handleSubmit} /> :
    <Search
        search_results={info.search_results}
        handleChange={handleChange}
        handleSelect={handleSelect} />
    

  return (
      <div className='grid'>
        <div className='left'>
          {searchOrCalculate}
        </div>
        <div className='right'>
          <Portfolio portfolio={currentPortfolio}/>
        </div>
      </div>
  )
}
