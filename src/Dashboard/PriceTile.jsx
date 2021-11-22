import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";
import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Styles";
import { SelectableTile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
const JustifyRight = styled.div`
  justify-self: right;
`;
const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig}
`;
const numberFormat = (number) => {
  //console.log("number=" + number);
  if (typeof number !== "undefined") {
    //console.log("In=" + number);
    return +(number + " ").slice(0, 7);
  } else return 0;
};
const PriceTileStyled = styled(SelectableTile)`
  ${(props) =>
    props.compact &&
    css`
      ${fontSize3};
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 5px;
      justify-items: right;
    `}

  ${(props) =>
    props.currentFavorite &&
    css`
      ${greenBoxShadow};
      pointer-events: none;
    `}
`;

const ChangePct = styled.div`
  color: green;
  ${(props) =>
    props.red &&
    css`
      color: red;
    `}
`;
const ChangePercent = ({ data }) => {
  return (
    <JustifyRight>
      <ChangePct red={numberFormat(data.CHANGE24HOUR) < 0}>
        {numberFormat(data.CHANGE24HOUR)}%
      </ChangePct>
    </JustifyRight>
  );
};

const PriceTileCompact = ({
  sym,
  data,
  currentFavorite,
  setCurrentFavorite,
}) => (
  <PriceTileStyled
    compact
    currentFavorite={currentFavorite}
    onClick={setCurrentFavorite}
  >
    <JustifyLeft>
      <div>{sym}</div>
    </JustifyLeft>
    <ChangePercent data={data} />

    <div>{numberFormat(data.PRICE)}</div>
  </PriceTileStyled>
);
const PriceTileDetail = ({
  sym,
  data,
  currentFavorite,
  setCurrentFavorite,
}) => {
  //console.log(`SYM[${sym}]=${JSON.stringify(data.CHANGE24HOUR)}`);
  //console.log(numberFormat(data.CHANGE24HOUR));

  return (
    <PriceTileStyled
      currentFavorite={currentFavorite}
      onClick={setCurrentFavorite}
    >
      <CoinHeaderGridStyled>
        <div>{sym}</div>
        <ChangePercent data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>{numberFormat(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
};

const PriceTile = ({ price, index }) => {
  let sym = Object.keys(price)[0];
  let data = price[sym]["USD"];
  let TileClass = index < 5 ? PriceTileDetail : PriceTileCompact;
  let { currentFavorite, setCurrentFavorite } = useContext(AppContext);
  //console.log("tile - current favorites=" + currentFavorite);
  return (
    <TileClass
      sym={sym}
      data={data}
      currentFavorite={currentFavorite === sym}
      setCurrentFavorite={() => setCurrentFavorite(sym)}
    ></TileClass>
  );
};

export default PriceTile;
