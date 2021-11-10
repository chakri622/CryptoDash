import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { SelectableTile } from "../Shared/Tile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
`;
const CoinGrid = () => {
  const coinList = useContext(AppContext);
  console.log("keys=" + JSON.stringify(coinList.fetchCoins));

  return coinList ? (
    <CoinGridStyled>
      {Object.keys(coinList.fetchCoins).map((coinKey) => (
        <SelectableTile>{coinKey}</SelectableTile>
      ))}
    </CoinGridStyled>
  ) : (
    <div>No Content</div>
  );
};

export default CoinGrid;
