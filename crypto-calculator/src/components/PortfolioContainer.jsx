import { useState } from 'react'
import Search from './Search'
import Calculate from './Calculate'
import axios from 'axios'

export default function PortfolioContainer() {

  const [info, setInfo] = useState({ 
    portfolio: [],
    search_results: [],
    active_currency: null,
    amount: ''
  })
  // const [active_currency, setActiveCurrency] = useState(null)
  // const [search_results, setSearch] = useState([])
  // const [amount, setAmount] = useState('')
  // const [portfolio, setPortfolio] = useState([])
  
  // const [calculate, showCalculate] = useState(false)
  

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
      setInfo(state => ({
        ...state,
        portfolio: [...state.portfolio, data.data],
        search_results: [],
        active_currency: null
      }))
    } catch (err) {
      console.log(err)
    }
  }
console.log(info)
  const handleAmount = (e) => {
    setInfo(state => ({ ...state, amount: e.target.value }))
  }

  return (
    <div>
      {!info.active_currency && <Search
        search_results={info.search_results}
        handleChange={handleChange}
        handleSelect={handleSelect} />}
      {info.active_currency && <Calculate
        amount={info.amount}
        active_currency={info.active_currency}
        handleChange={handleAmount}
        handleSubmit={handleSubmit} />}
    </div>
  )
}
