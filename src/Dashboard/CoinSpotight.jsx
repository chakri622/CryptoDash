import React, { useContext } from "react";
import styled from "styled-components";
import { Tile } from "../Shared/Tile";

import { AppContext } from "../App/AppProvider";
import CoinImage from "../Shared/CoinImage";

const SpotLightName = styled.div`
  text-align: center;
`;

const CoinSpotight = () => {
  const { currentFavorite, fetchCoins } = useContext(AppContext);
  //console.log(JSON.stringify(fetchCoins));
  if (currentFavorite) {
    return (
      <Tile>
        <SpotLightName>{fetchCoins[currentFavorite].CoinName}</SpotLightName>
        <CoinImage coin={fetchCoins[currentFavorite]} spotLight />
      </Tile>
    );
  } else {
    return <div>No Favorites yet..</div>;
  }
};

export default CoinSpotight;
