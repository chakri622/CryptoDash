import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const CoinGrid = () => {
  const coinList = useContext(AppContext);
  console.log("keys=" + JSON.stringify(coinList.fetchCoins));

  return coinList ? (
    <CoinGridStyled>
      {Object.keys(coinList.fetchCoins).map((coinKey) => (
        <div>{coinKey}</div>
      ))}
    </CoinGridStyled>
  ) : (
    <div>No Content</div>
  );
};

export default CoinGrid;
