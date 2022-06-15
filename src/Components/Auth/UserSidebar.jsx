import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { CryptoState } from "../../Context";
import { Avatar } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useSelector } from "react-redux";

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
                  <p>Wachlist</p>
                  <div className="div-scroll-drawer">
                    {coins.map((coin) => {
                      if (wachlist.includes(coin.id)) return (
                        <div key={coin.id}>
                          <span>{coin.name}</span>
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
