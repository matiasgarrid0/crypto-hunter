import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoin } from "../reducer/actions";
import { CoinsChart } from "./CoinsChart";
import { CryptoState } from "../Context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

export const Detail = () => {
  const { id } = useParams();
  const { user, wachlist, setAlert } = CryptoState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoin(id));
  }, [dispatch, id]);
  const coin = useSelector((state) => state.coin);
  let dollarTransform = Intl.NumberFormat("en-US");

  const inWachlist = wachlist?.includes(coin?.id)

  const addToWachlist = async () => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(coinRef,
        {
          coins:wachlist?[...wachlist, coin?.id] : [coin?.id]
        })
        setAlert({
          open:true,
          type: 'success',
          message: `${coin.name} Added to your watchlist`
      })
    } catch (error) {
      setAlert({
        open:true,
        type: 'error',
        message: error.message
    })
    }
  }
  const removeFromWachlist = async () => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(coinRef,
        {
          coins: wachlist.filter((watch)=> watch !== coin?.id)
        },
        {merge:'true'}
        )
        setAlert({
          open:true,
          type: 'warning',
          message: `${coin.name} Removed from your watchlist`
      })
    } catch (error) {
      setAlert({
        open:true,
        type: 'error',
        message: error.message
    })
    }
  }
  
  return (
    <div className="detail-container-cards">
      <div className="container-detail-div">
        <div className="detail-card-div">
          <img
            className="image-detail"
            src={coin?.image?.large}
            alt={coin?.name}
          />
          <p className="p-name-detail">{coin?.name}</p>
          <p className="p-detail">{coin?.symbol}</p>
          <div className="div-container-p">
            <p className="p-detail">
              Rank:{" "}
              <span className="p-span-detail"># {coin?.coingecko_rank}</span>
            </p>
            <p p className="p-detail">
              Current Price:{" "}
              <span className="p-span-detail">
                $ {dollarTransform.format(coin.market_data?.current_price.usd)}
              </span>
            </p>
            <p p className="p-detail">
              MC: {" "}
              <span className="p-span-detail">
                $ {dollarTransform.format(coin?.market_data?.market_cap.usd)}
              </span>
            </p>
          </div>
          {user && (
            <Button
              variant="contained"
              style={{ marginTop: 20, backgroundColor: inWachlist ? '#FF1A1A' : '#00DA11' }}
              onClick={inWachlist ?  removeFromWachlist : addToWachlist}
            >
              {inWachlist? 'Remove from watchlist':'Add to Watchlist'}
            </Button>
          )}
        </div>
      </div>
      <div className="separatedd"></div>
      <div className="coinchart-father-div">
        <CoinsChart coin={coin} />
      </div>
    </div>
  );
};
