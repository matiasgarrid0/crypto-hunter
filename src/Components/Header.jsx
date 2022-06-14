import React from "react";
import { Link } from "react-router-dom";
import { getTrendingCoins, getAllCoins} from "../reducer/actions";
import { useDispatch } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(getTrendingCoins(e.target.value))
    dispatch(getAllCoins(e.target.value))
  }

  return (
    <div>
      <div className="container-div-elements">
        <Link className="link-header" to={'/'}>
        Crypto Hunter
        </Link>
        <select onChange={handleChange} className="select-header">
          <option value="USD">USD</option>
          <option value="ARS">ARS</option>
        </select>
      </div>
    </div>
  );
};

