import { useState} from 'react'

export default function PortfolioItem({ item }) {
  const [showBtn, toggleBtn] = useState(true)

  const loadPortfolio = () => {
    let portfolioArr = JSON.parse(localStorage.getItem('portfolio'));
    // console.log(portfolioArr)
    if (!portfolioArr || !Array.isArray(portfolioArr)) return [];
    else return portfolioArr;
  }

  const handleSave = () => {
    let portfolioArr = loadPortfolio();
    item.saved = true 
    portfolioArr.push(item);
    localStorage.setItem('portfolio', JSON.stringify(portfolioArr))
    toggleBtn(false)
  }

  //   function removeItem(meetupId) {
  //   setUserFavorites((prevUserFavorites) => {
  //     const newFavorites = prevUserFavorites.filter(
  //       (meetup) => meetup.id !== meetupId
  //     );
  //     localStorage.setItem('favorites', JSON.stringify(newFavorites));
  //     return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
  //   });
  // }
  
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

        <div className='col'>
          {!item.saved && showBtn && <button className='btn' onClick={handleSave}>Save</button>}
          {item.saved && <button className='btn'>Remove</button>}
        </div>
      </div>
    </div>
  )
}