import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { SelectableTile } from "../Shared/Tile";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-bottom: 10px;
`;
const getLowerSectionCoins = (coinList, filteredCoins) => {
  return (
    (filteredCoins && Object.keys(filteredCoins).slice(0, 100)) ||
    Object.keys(coinList).slice(0, 100)
  );
};
const getCoinsToDisplay = (coinList, topSection, favorites, filteredCoins) => {
  console.log(
    "lower section coins=" + getLowerSectionCoins(coinList, filteredCoins)
  );
  return topSection ? favorites : getLowerSectionCoins(coinList, filteredCoins);
};
const CoinGrid = ({ topSection }) => {
  const coinList = useContext(AppContext);
  //console.log("keys=" + JSON.stringify(coinList.fetchCoins));
  console.log("favorites=" + JSON.stringify(coinList.favorites));
  console.log("Filtered Coins=" + coinList.filteredCoins);

  return coinList ? (
    <CoinGridStyled>
      {getCoinsToDisplay(
        coinList.fetchCoins,
        topSection,
        coinList.favorites,
        coinList.filteredCoins
      ).map((coinKey) => (
        <CoinTile coinKey={coinKey} topSection={topSection}></CoinTile>
      ))}
    </CoinGridStyled>
  ) : (
    <div>No Content</div>
  );
};

export default CoinGrid;
