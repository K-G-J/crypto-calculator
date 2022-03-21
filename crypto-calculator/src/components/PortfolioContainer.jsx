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
  const [active_currency, setActiveCurrency] = useState(null)
  const [search_results, setSearch] = useState([])
  const [amount, setAmount] = useState('')
  const [portfolio, setPortfolio] = useState([])
  
  const [calculate, showCalculate] = useState(false)
  

  const handleChange = (e) => {
    axios.post('http://localhost:3000/search', {
      search: e.target.value
    }).then(data => {
      setSearch(data.data.currencies)
    }).catch(err => {
      console.log(err)
    })
  }

const handleSelect = (curr, e) => {
  e.preventDefault()
  const activeCurrency = search_results.find( item => item.id == curr.id)
  setActiveCurrency(activeCurrency)
  showCalculate(true)
}

const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3000/calculate', {
      id: active_currency.id,
      amount: amount
    }).then(data => {
      console.log(data)
      setInfo({ 
        portfolio: [...info.portfolio, data.data],
        search_results: search_results,
        active_currency: active_currency,
        amount: amount
      })
    }).catch(err => {
      console.log(err)
    })
  }

  const handleAmount = (e) => {
    setAmount(e.target.value)
  }

  return (
    <div>
      {!calculate && <Search
        search_results={search_results}
        handleChange={handleChange}
        handleSelect={handleSelect} />}
      {calculate && <Calculate
        amount={info.amount}
        active_currency={active_currency}
        handleChange={handleAmount}
        handleSubmit={handleSubmit} />}
    </div>
  )
}
