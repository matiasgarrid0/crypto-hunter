import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoins } from "../reducer/actions";
import { CoinsRaw } from "./CoinsRaw";
import {Pagination} from '@mui/material'

export const Table = () => {
  const [search, setSearch] = useState("");
  const title = ["#", "Coin", "Price", "Price Change", ];
  const coins = useSelector((state) => state.coins);

  const dispatch = useDispatch();
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(getAllCoins());
  }, [dispatch]);


  return (
    <div>
      <div className="div-table-input">
        <p className="p-input-table">Cryptocurrency Pricecs by Market Cap</p>
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="input-table"
        ></input>
      </div>
      <table className="table black">
        <thead>
          <tr className="tr-title title-center">
            {title.map((title) => (
              <td className="td-title">{title}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCoins.slice((pageNumber-1)*10,(pageNumber-1)*10+10).map((coin, index) => {
            return <CoinsRaw coin={coin} key={index} index={index + 1} />
          })}
        </tbody>
      </table>
      <Pagination
        style={{
          padding:5,
          width:'100%',
          display:'flex',
          justifyContent:'center',
          backgroundColor:'gold',
        }}
        count={(filteredCoins?.length/10).toFixed(0)}
        onChange={(_,value)=>{
          setPageNumber(value)
          
        }}
      />
    </div>
  );
};
