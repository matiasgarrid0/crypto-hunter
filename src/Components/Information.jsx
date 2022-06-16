import React from "react";
import User from "../images/user.png";
import Coin from "../images/coin.png";
import Follow from "../images/follow.png";
import Link from "../images/linkedin.png";
import { CryptoState } from "../Context";
import { Auth } from "./Auth/Auth";

const Information = () => {
  const { user } = CryptoState();
  return (
    <div>
      <div className="div-container-cards">
        <div className="div-container-card">
          <img className="logo-card-info" src={User} alt="user" />
          {user ? (
            <div>
              <p className="title-card-info">Manage your account</p>
              <p className="text-card-info">
                Add coins to your watchlist and get tunned about your favorite
                cryptos
              </p>
            </div>
          ) : (
            <div>
              <p className="title-card-info">Create your account</p>
              <p className="text-card-info">
              Add coins to your watchlist and get tunned about your favorite
            cryptos
              </p>
              <div className="auth-info-button">
                <Auth className="auth-info-button" />
              </div>
            </div>
          )}
        </div>
        <div className="div-container-card">
          <img className="logo-card-info" src={Coin} alt="user" />
          <p className="title-card-info">Create your watchlist</p>
          <p className="text-card-info">
          Create your custom watch list, add and delete cryptos
            
          </p>
        </div>
        <div className="div-container-card">
          <img className="logo-card-info" src={Follow} alt="user" />
          <p className="title-card-info">Follow me on LinkedIn</p>
          <a href="https://www.linkedin.com/in/matias-garridodev/">
            <img src={Link} style={{width:60, marginTop:30}} alt="linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Information;
