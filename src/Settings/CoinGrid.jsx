import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { SelectableTile } from "../Shared/Tile";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
`;

const getCoinsToDisplay = (coinList) => {
  return Object.keys(coinList).slice(0, 100);
};
const CoinGrid = () => {
  const coinList = useContext(AppContext);
  console.log("keys=" + JSON.stringify(coinList.fetchCoins));

  return coinList ? (
    <CoinGridStyled>
      {getCoinsToDisplay(coinList.fetchCoins).map((coinKey) => (
        <CoinTile coinKey={coinKey}></CoinTile>
      ))}
    </CoinGridStyled>
  ) : (
    <div>No Content</div>
  );
};

export default CoinGrid;
