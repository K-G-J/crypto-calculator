import React from 'react'

export default function SearchItem({currency, handleSelect}) {
  return (
    <li data-id={currency.id} onClick={handleSelect} className='currency-list-item'>
      <a href='#' className='currency'>
        <span>{currency.name}</span>
        <span className='currency_symbol'>{currency.currency_symbol}</span>
      </a>
    </li>
  )
}
