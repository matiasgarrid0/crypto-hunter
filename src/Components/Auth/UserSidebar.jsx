import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { CryptoState } from "../../Context";
import { Avatar } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase";

export const UserSidebar = () => {
  const [state, setState] = React.useState({
    right: false,
  });
  const coins = useSelector((state) => state.coins);
  const { user, setAlert, wachlist } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const logout = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout successful",
    });
    toggleDrawer();
  };

  const removeFromWachlist = async (coin) => {
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

  let profit = coins.price_change_percentage_24h >= 0;
  let dollarTransform = Intl.NumberFormat("en-US");

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            anchor={anchor}
            open={state[anchor]}
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
          />
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className="div-drawer-user">
              <div className="div-avatar-drawer-user">
                <Avatar
                  anchor={anchor}
                  open={state[anchor]}
                  onClick={toggleDrawer(anchor, true)}
                  style={{
                    height: 100,
                    width: 100,
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D",
                  }}
                  src={user.photoURL}
                />
                <span className="span-avatar-drawer-user">
                  {user.displayName || user.email}
                </span>
                <div className="div-watchlist">
                  <p>Watchlist</p>
                  <div className="div-scroll-drawer">
                    {coins.map((coin) => {
                      if (wachlist.includes(coin.id))
                        return (
                          <div
                            className="div-container-coins-wachlist"
                            key={coin.id}
                          >
                            <span className="span-wachlist">{coin.name}</span>
                            <span className="margin-left">
                              {"  $" +
                                dollarTransform.format(coin?.current_price)}
                            </span>
                            <span
                              className={
                                coin.price_change_percentage_24h < 0
                                  ? "span-price-change-red margin-left"
                                  : "span-price-change-green margin-left"
                              }
                            >
                              {profit && "+"}
                              {" " +
                                coin.price_change_percentage_24h?.toFixed(2)}
                              %
                            </span>
                            <AiFillDelete
                            style={{width:40, cursor:'pointer'}}
                              onClick={()=>removeFromWachlist(coin)}
                            />
                          </div>
                        );
                    })}
                  </div>
                </div>
              </div>
              <div className="div-logout-drawer">
                <Button
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: "#EEBC1D" }}
                  onClick={logout}
                >
                  logout
                </Button>
              </div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};
