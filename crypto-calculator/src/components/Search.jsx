import React from 'react'
import SearchItem from './SearchItem'

export default function Search({ name, search_results, handleChange, handleSelect }) {

  const searchItems = search_results.map( curr => {
    return (
      <SearchItem 
        key={curr.id} 
        currency={curr} 
        handleSelect={(e) => handleSelect(curr, e)} 
      />
    )
  })
  

  return (
    <div>
      <h1>Cryptocurrency Portfolio Calculator</h1>
      <form>
        <div className='form-group'>
          <label>Search for a Currency</label><br/>
          <input autoComplete='off' type='text' name='name' placeholder='Ex: Bitcoin, Litecoin, Ethereum...' className='field' value={name} onChange={handleChange}/>
        </div>
        <div className='currency-list'>
          {searchItems}
        </div>
      </form>
    </div>
  )
}
