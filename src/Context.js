import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ContextApp = createContext();

export const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [currency, setCurrency] = useState("usd");
  const [wachlist, setWachlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
          if (coin.exists()) {
            setWachlist(coin.data().coins);
          }else{
            console.log('No items')
          }
        });
        return () => {
          unsubscribe();
        };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <ContextApp.Provider
      value={{
        alert,
        setAlert,
        user,
        currency,
        setCurrency,
        wachlist,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

export const CryptoState = () => {
  return useContext(ContextApp);
};
