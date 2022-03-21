import React from 'react'

export default function Calculate({amount, active_currency, handleChange, handleSubmit}) {
  return (
      <div>
      <h1>How much {active_currency.name} do you own?</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='form-group'>
          <label>Enter Amount Owned:</label><br/>
          <input autoComplete='off' type='text' name='amount' placeholder='How much do you own?' className='field'
            defaultValue={amount} onChange={(e) => handleChange(e)} />
        </div>
        <div className='form-group'>
          <input type='submit' className='calculate-btn' value='Calculate My Total' />
        </div>
      </form>
    </div>
  )
}
