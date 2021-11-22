import React, { useContext } from "react";
import { AppContext } from "../App/AppProvider";
import styled from "styled-components";
import PriceTile from "./PriceTile";

const PriceGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

const PriceGrid = () => {
  const { prices } = useContext(AppContext);
  //console.log("Prices=" + JSON.stringify(prices));
  return (
    <PriceGridContainer>
      {prices.map((price, i) => (
        <PriceTile price={price} index={i}></PriceTile>
      ))}
    </PriceGridContainer>
  );
};

export default PriceGrid;
