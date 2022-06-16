import React from "react";
import { Carousel } from "./Carousel";

export const Banner = () => {
  return (
    <div className="div-banner">
      <div className="div-titles-banner">
        <p className="p-title-banner">Crypto Hunter</p>
        <p className="p-text-banner">
          We operate the biggest Bitcion and cryptocurrency exchange globally by
          volume
        </p>
      </div>
      <div className="div-carousel-banner">
        <Carousel />
      </div>
    </div>
  );
};
