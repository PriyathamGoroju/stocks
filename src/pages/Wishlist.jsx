import React, { useEffect, useState } from 'react'
import StockList from '../components/StockList';

function Wishlist() {
    const [stocks, setStocks] = useState('');
    useEffect(()=>{
        const favoritedStock = localStorage.getItem('wishlist');
        setStocks(JSON.parse(favoritedStock));

    },[])
  return (
    <div>
        <div>
            {stocks ? <StockList stocks={stocks} /> : <div className='w-screen h-screen items-center justify-center'>No items Wishlisted, please add some stocks!</div>}
        </div>
    </div>
  )
}

export default Wishlist