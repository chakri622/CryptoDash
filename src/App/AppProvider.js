import React, { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment";
const cc = require("cryptocompare");
export const AppContext = React.createContext();
export const AppUpdateContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

function AppProvider({ children }) {
  const addCoin = (key, state) => {
    //console.log("add coin=" + JSON.stringify(state));
    let favorites = state.favorites;
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      //console.log("Add coin Favorites=" + favorites);
      setPage((prevPage) => ({ ...prevPage, favorites: favorites }));
    }
  };

  const removeCoin = (key, state) => {
    //console.log("rem coin=" + JSON.stringify(state));
    let favorites = state.favorites;
    if (favorites.length > 0) {
      favorites = favorites.filter((name) => key !== name);

      //console.log("remove coin Favorites=" + favorites);
      setPage((prevPage) => ({ ...prevPage, favorites: favorites }));
    }
  };

  const isInFavorites = (key, state) => {
    //console.log("Is in favorites=" + state.favorites);
    return _.includes(state.favorites, key);
  };
  const savedSettings = () => {
    //console.log("***********in saved settings*******");
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    let { favorites, currentFavorite } = cryptoDashData;
    return { favorites, currentFavorite };
  };

  const confirmFavorites = (favorites) => {
    let currentFavorite = favorites[0];
    setPage((prevPage) => {
      fetchPrices();
      return {
        ...prevPage,
        firstVisit: false,
        page: "dashboard",
        historical: null,
        prices: null,
        currentFavorite,
      };
    });
    //("confirm Favorites=" + favorites);
    //console.log("current favorites=" + currentFavorite);
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({ favorites: favorites, currentFavorite })
    );
  };

  const setFilteredCoins = (filteredCoins) => {
    setPage((prevPage) => ({ ...prevPage, filteredCoins: filteredCoins }));
  };
  const fetchHistoricalData = async () => {
    console.log("In Fetch Historical Data");
    //console.log("First visit=" + page.firstVisit);
    if (page.firstVisit) return;
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    let { currentFavorite } = cryptoDashData;
    if (!currentFavorite) {
      return { page: "settings", firstVisit: true };
    }
    console.log("-----------Historical current favorite = " + currentFavorite);
    let results = await historical();
    let historicalData = [
      {
        name: currentFavorite,
        data: results.map((ticker, index) => [
          moment()
            .subtract({ months: TIME_UNITS - index })
            .valueOf(),
          ticker.USD,
        ]),
      },
    ];

    setPage((prevPage) => ({ ...prevPage, historical: historicalData }));
    console.log("****results=" + JSON.stringify(results));
  };

  const historical = async () => {
    let promises = [];
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    let { currentFavorite } = cryptoDashData;
    //console.log("Coming here");
    //console.log("-----------Historical current favorite = " + currentFavorite);
    for (let units = 10; units > 0; units--) {
      //console.log("In Loop***********currentFavorite" + currentFavorite);
      console.log("***Date=" + moment().subtract({ months: units }).toDate());
      promises.push(
        await cc.priceHistorical(
          currentFavorite,
          ["USD"],
          moment().subtract({ months: units }).toDate()
        )
      );
    }
    return Promise.all(promises);
  };
  const setCurrentFavorite = (sym) => {
    setPage((prevPage) => ({
      ...prevPage,
      currentFavorite: sym,
      historical: null,
    }));
    console.log("%%%%%%%%%%Going to fetch historical Data");

    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoDash")),
        currentFavorite: sym,
      })
    );
    fetchHistoricalData();
  };

  //Use state
  const [page, setPage] = useState(() => ({
    page: "dashboard",
    favorites: ["BTC", "ETH", "ADA", "DOGE"],
    ...savedSettings(),
    addCoin: addCoin,
    removeCoin: removeCoin,
    isInFavorites: isInFavorites,
    setCurrentFavorite: setCurrentFavorite,
    confirmFavorites: confirmFavorites,
    setFilteredCoins: setFilteredCoins,
  }));

  const [fetchCoins, setfetchCoins] = useState(() => []);
  const setCurrentPage = (name) => {
    //console.log("In set page=" + name);
    setPage((prevPage) => ({ ...prevPage, page: name }));
    //console.log("Set page=" + JSON.stringify(page));
  };

  //Use effect
  useEffect(() => {
    const fetchMyApi = async () => {
      //console.log("page in use effect [before]=" + JSON.stringify({ ...page }));
      let coinList = (await cc.coinList()).Data;
      //console.log("coinlist=" + JSON.stringify(coinList));
      setfetchCoins((data) => (data = coinList));
      //console.log("fetchCoins=" + JSON.stringify(fetchCoins));
      //console.log("page in use effect [after]=" + JSON.stringify({ ...page }));
      setPage((prevPage) => ({ ...prevPage, fetchCoins: coinList }));
    };
    fetchMyApi();
    fetchPrices();
    fetchHistoricalData();
    return () => {};
  }, []);

  const fetchPrices = async () => {
    if (page.firstVisit) return;
    //console.log("Going to get prices");
    let priceList = await prices();
    //console.log(priceList);
    setPage((prevPage) => ({ ...prevPage, prices: priceList }));
  };

  const prices = async () => {
    let returnData = [];
    //console.log("******fav=" + page.favorites);
    try {
      for (let i = 0; i < page.favorites.length; i++) {
        try {
          //console.log("calling price for .." + page.favorites[i]);
          let priceData = await cc.priceFull(page.favorites[i], "USD");
          //console.log(priceData);
          returnData.push(priceData);
        } catch (e) {
          console.warn("Fetch Price Error:", e);
        }
      }
    } catch (e) {
      console.warn("Error in loop" + e);
    }
    return returnData;
  };

  //fetch

  //console.log("Page=" + JSON.stringify(page));
  return (
    <AppContext.Provider value={page}>
      <AppUpdateContext.Provider value={setCurrentPage}>
        {children}
      </AppUpdateContext.Provider>
    </AppContext.Provider>
  );
}

export default AppProvider;
