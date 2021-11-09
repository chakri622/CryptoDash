import React, { useState, useEffect } from "react";
const cc = require("cryptocompare");
export const AppContext = React.createContext();
export const AppUpdateContext = React.createContext();

function AppProvider({ children }) {
  const savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    return {};
  };

  const confirmFavorites = () => {
    setPage({ firstVisit: false, page: "dashboard" });
    localStorage.setItem("cryptoDash", JSON.stringify({ test: "hello" }));
  };
  //Use state
  const [page, setPage] = useState({
    page: "dashboard",
    ...savedSettings(),

    confirmFavorites: confirmFavorites,
  });

  const [fetchCoins, setfetchCoins] = useState([]);
  //Use effect
  useEffect(() => {
    const fetchMyApi = async () => {
      let coinList = (await cc.coinList()).Data;
      //console.log(coinList);
      setfetchCoins(coinList);
    };
    fetchMyApi();
    return () => {};
  }, [fetchCoins]);
  //fetch
  const setCurrentPage = (page) => setPage({ page, fetchCoins });

  console.log("Page=" + page);
  return (
    <AppContext.Provider value={page}>
      <AppUpdateContext.Provider value={setCurrentPage}>
        {children}
      </AppUpdateContext.Provider>
    </AppContext.Provider>
  );
}

export default AppProvider;
