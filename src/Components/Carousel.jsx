import React, { useEffect } from "react";
import { getTrendingCoins } from "../reducer/actions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export const Carousel = () => {
  const dispatch = useDispatch();
  const trending = useSelector((state) => state.trend);
  
  const handleDragStart = (e) => e.preventDefault();
  const items = trending.map((coin) => {
      let profit = coin.price_change_percentage_24h >= 0
      let dollarTransform = Intl.NumberFormat('en-US')
      
    return (
      <Link className="link-carousel-banner" to={`coin/${coin.id}`}>
        <img
          onDragStart={handleDragStart}
          src={coin?.image}
          width="80px"
          style={{ marginBottom: 10 }}
          alt={coin.name}
        />
        <p className="name-carousel">{coin.name}</p>
        <span className={profit === false ? 'span-price-change-red' : 'span-price-change-green'}>{profit && "+"}{coin.price_change_percentage_24h?.toFixed(2)}%</span>
        <p className="name-carousel">$ {dollarTransform.format(coin?.current_price)}</p>
      </Link>
    );
  });

  useEffect(() => {
    dispatch(getTrendingCoins());
  }, [dispatch]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="div-container-carousel">
      <AliceCarousel
        items={items}
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
      />
    </div>
  );
};
