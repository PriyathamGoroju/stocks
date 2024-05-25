import React, { useEffect, useState } from 'react'
import StockList from '../components/StockList';

function Wishlist() {
    const [stocks, setStocks] = useState([]);
    useEffect(()=>{
        const favoritedStock = localStorage.getItem('wishlist');
        if (!favoritedStock){localStorage.setItem('wishlist',JSON.stringify([]))}
        setStocks(JSON.parse(favoritedStock));
    },[])
  return (
    <div>
        <div>
            <StockList stocks={stocks} />
        </div>
    </div>
  )
}

export default Wishlist