import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { SelectableTile } from "../Shared/Tile";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-bottom: 10px;
`;

const getCoinsToDisplay = (coinList, topSection, favorites) => {
  return topSection ? favorites : Object.keys(coinList).slice(0, 100);
};
const CoinGrid = ({ topSection }) => {
  const coinList = useContext(AppContext);
  //console.log("keys=" + JSON.stringify(coinList.fetchCoins));
  console.log("favorites=" + JSON.stringify(coinList.favorites));

  return coinList ? (
    <CoinGridStyled>
      {getCoinsToDisplay(
        coinList.fetchCoins,
        topSection,
        coinList.favorites
      ).map((coinKey) => (
        <CoinTile coinKey={coinKey} topSection={topSection}></CoinTile>
      ))}
    </CoinGridStyled>
  ) : (
    <div>No Content</div>
  );
};

export default CoinGrid;
