import { useState, useEffect } from 'react'
import Search from './Search'
import Calculate from './Calculate'
import Portfolio from './Portfolio'
import axios from 'axios'

export default function PortfolioContainer() {
  
  const [portfolio, setPortfolio] = useState([])

  const [info, setInfo] = useState({ 
    portfolio: [],
    search_results: [],
    active_currency: null,
    amount: ''
  })

  // useEffect(() => {
  //   loadPortfolio();
  // }, [info.portfolio])

  const loadPortfolio = () => {
    let portfolioArr = JSON.parse(localStorage.getItem('portfolio'));
    console.log(portfolioArr)
    if (!portfolioArr || !Array.isArray(portfolioArr)) return [];
    else return portfolioArr;
  }
  
  // const [active_currency, setActiveCurrency] = useState(null)
  // const [search_results, setSearch] = useState([])
  // const [amount, setAmount] = useState('')

  

  const handleChange = async (e) => {
    try {
      const data = await axios.post('http://localhost:3000/search', { search: e.target.value })
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
      const data = await axios.post('http://localhost:3000/calculate', { id: currency.id, amount: amount })
      let portfolioData = data.data
      setInfo(state => ({
        ...state,
        portfolio: [...state.portfolio, portfolioData],
        active_currency: null,
        amount: ''
      }))
      setPortfolio(state => [...state, portfolioData])
      localStorage.setItem('portfolio', JSON.stringify([...info.portfolio, portfolioData]))
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
          <Portfolio portfolio={info.portfolio}/>
        </div>
      </div>
  )
}
