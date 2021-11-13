import React, { useState, useEffect } from "react";
import _ from "lodash";
const cc = require("cryptocompare");
export const AppContext = React.createContext();
export const AppUpdateContext = React.createContext();

const MAX_FAVORITES = 10;

function AppProvider({ children }) {
  const addCoin = (key, state) => {
    console.log("add coin=" + JSON.stringify(state));
    let favorites = state.favorites;
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      console.log("Add coin Favorites=" + favorites);
      setPage((prevPage) => ({ ...prevPage, favorites: favorites }));
    }
  };

  const removeCoin = (key, state) => {
    console.log("rem coin=" + JSON.stringify(state));
    let favorites = state.favorites;
    if (favorites.length > 0) {
      favorites = favorites.filter((name) => key !== name);

      console.log("remove coin Favorites=" + favorites);
      setPage((prevPage) => ({ ...prevPage, favorites: favorites }));
    }
  };

  const isInFavorites = (key, state) => {
    console.log("Is in favorites=" + state.favorites);
    return _.includes(state.favorites, key);
  };
  const savedSettings = () => {
    console.log("***********in saved settings*******");
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    let { favorites } = cryptoDashData;
    return { favorites };
  };

  const confirmFavorites = (favorites) => {
    setPage((prevPage) => ({ ...prevPage, firstVisit: false }));
    console.log("confirm Favorites=" + favorites);
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({ favorites: favorites })
    );
  };
  //Use state
  const [page, setPage] = useState(() => ({
    page: "dashboard",
    favorites: ["BTC", "ETH", "ADA", "DOGE"],
    ...savedSettings(),
    addCoin: addCoin,
    removeCoin: removeCoin,
    isInFavorites: isInFavorites,
    confirmFavorites: confirmFavorites,
  }));

  const [fetchCoins, setfetchCoins] = useState(() => []);
  const setCurrentPage = (name) => {
    console.log("In set page=" + name);
    setPage((prevPage) => ({ ...prevPage, page: name }));
    console.log("Set page=" + JSON.stringify(page));
  };
  //Use effect
  useEffect(() => {
    const fetchMyApi = async () => {
      console.log("page in use effect [before]=" + JSON.stringify({ ...page }));
      let coinList = (await cc.coinList()).Data;
      console.log("coinlist=" + JSON.stringify(coinList));
      setfetchCoins((data) => (data = coinList));
      console.log("fetchCoins=" + JSON.stringify(fetchCoins));
      console.log("page in use effect [after]=" + JSON.stringify({ ...page }));
      setPage((prevPage) => ({ ...prevPage, fetchCoins: coinList }));
    };
    fetchMyApi();

    return () => {};
  }, []);
  //fetch

  console.log("Page=" + JSON.stringify(page));
  return (
    <AppContext.Provider value={page}>
      <AppUpdateContext.Provider value={setCurrentPage}>
        {children}
      </AppUpdateContext.Provider>
    </AppContext.Provider>
  );
}

export default AppProvider;
