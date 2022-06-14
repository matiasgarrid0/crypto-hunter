import React from "react";
import { Link } from "react-router-dom";

export const CoinsRaw = ({ coin, index }) => {
  let dollarTransform = Intl.NumberFormat("en-US");
  let profit = coin.price_change_percentage_24h >= 0

  return (  
    < >
    <tr className="white">
      <td className="white">{index}</td>
      <td className="trrr">
        <Link  to={`/coin/${coin.id}`} className="text-decoration-none hover-link-table">
          <div className="aling-center">
            <img
              className="space-img"
              src={coin.image}
              alt="coin_image"
            />
            <span className="white">{coin.name}</span>
            <span className="separate whiteSpan">{coin.symbol}</span>
          </div>
        </Link>
      </td>
      <td className="white">$ {dollarTransform.format(coin.current_price)}</td>
      <td className={profit === false ? 'span-price-change-red' : 'span-price-change-green'}>
      {profit && "+"}{coin.price_change_percentage_24h?.toFixed(2)}%
      </td>
     
    </tr>
    </>
  );
};
