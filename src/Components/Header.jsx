import React from "react";
import { Link } from "react-router-dom";
import { getTrendingCoins, getAllCoins } from "../reducer/actions";
import { useDispatch } from "react-redux";
import { Auth } from "../Components/Auth/Auth";
import { CryptoState } from "../Context";
import { UserSidebar } from "./Auth/UserSidebar";

export const Header = () => {
  const dispatch = useDispatch();
  const { user, setCurrency } = CryptoState();

  const handleChange = (e) => {
    dispatch(getTrendingCoins(e.target.value));
    dispatch(getAllCoins(e.target.value));
    setCurrency(e.target.value);
  };

  return (
    <div>
      <div className="container-div-elements">
        <Link className="link-header" to={"/"}>
          Crypto Hunter
        </Link>
        <div className="div-container-log-curr">
          <select onChange={handleChange} className="select-header">
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>
          {user ? <UserSidebar /> : <Auth />}
        </div>
      </div>
    </div>
  );
};
