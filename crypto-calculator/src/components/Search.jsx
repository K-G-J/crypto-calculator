import React from 'react'
// import SearchResult from './SearchResult'

export default function Search({ name, search_results, handleChange, handleSelect }) {
  
  // const Search = (search_results) => {
  //   search_results.map(curr => {
  //     return (
  //       <SearchResult
  //         key={curr.id}
  //         currency={curr}
  //         handleSelect={handleSelect}
  //       />
  //     )
  //   })
  // }

  return (
    <div>
      <h1>Cryptocurrency Portfolio Calculator</h1>
      <form>
        <div className='form-group'>
          <label>Search for a Currency</label><br/>
          <input autoComplete='off' type='text' name='name' placeholder='Ex: Bitcoin, Litecoin, Ethereum...' className='field' value={name} onChange={handleChange}/>
        </div>
        <div className='currency-list'>
          {search_results.map
            (curr => (<li key={curr.id} className='currency-list-item'
              onClick={(e) => handleSelect(curr, e)}>
            <a href='#' data-id={curr.id} className='currency'><span>{curr.name}</span> <span>{curr.currency_symbol}</span></a>
          </li>))}
        </div>
      </form>
    </div>
  )
}
