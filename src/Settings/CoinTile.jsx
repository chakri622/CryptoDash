import React, { useContext } from "react";
import { AppContext } from "../App/AppProvider";
import CoinImage from "../Shared/CoinImage";
import { SelectableTile, DeletableTile, DisabledTile } from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";

const clickCoinHandler = (topSection, coinKey, addCoin, removeCoin, state) => {
  return topSection
    ? () => {
        removeCoin(coinKey, state);
      }
    : () => {
        addCoin(coinKey, state);
      };
};
const CoinTile = ({ coinKey, topSection }) => {
  const coinList = useContext(AppContext).fetchCoins;
  const page = useContext(AppContext);
  let coin = coinList[coinKey];
  let addCoin = page.addCoin;
  let removeCoin = page.removeCoin;
  let isInFavorites = page.isInFavorites;
  //console.log(addCoin);
  let TileClass = SelectableTile;
  if (topSection) {
    TileClass = DeletableTile;
  }
  //console.log(JSON.stringify(coin));
  //console.log("Id=" + coinKey);
  console.log("isInFavorites=" + isInFavorites(coinKey, page));
  if (!topSection && isInFavorites(coinKey, page)) {
    TileClass = DisabledTile;
  }

  return (
    <TileClass
      onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin, page)}
    >
      <CoinHeaderGrid
        topSection={topSection}
        name={coin.CoinName}
        symbol={coin.Symbol}
      />
      <CoinImage coin={coin} />
    </TileClass>
  );
};

export default CoinTile;
