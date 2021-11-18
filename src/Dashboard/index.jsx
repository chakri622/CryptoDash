import React from "react";

import Page from "../Shared/Page";
import styled from "styled-components";
import CoinSpotight from "./CoinSpotight";
import PriceGrid from "./PriceGrid";
import PriceChart from "./PriceChart";
const ChartGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
`;

const Dashboard = () => {
  return (
    <Page name="dashboard">
      <PriceGrid></PriceGrid>
      <ChartGrid>
        <CoinSpotight></CoinSpotight>
        <PriceChart></PriceChart>
      </ChartGrid>
    </Page>
  );
};

export default Dashboard;
