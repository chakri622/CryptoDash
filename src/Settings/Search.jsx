import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";
import _ from "lodash";
import fuzzy from "fuzzy";
import { coinList } from "cryptocompare";
const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
  ${backgroundColor2}
  ${fontSize2};
  color: #1163c9;
  border: 1px solid;
  height: 25px;
  place-self: center left;
`;

const handleFilter = _.debounce(
  (inputValue, setFilteredCoins, fetchCoins, state) => {
    console.log(inputValue);
    let coinSymbols = Object.keys(fetchCoins);
    let coinNames = coinSymbols.map((sym) => fetchCoins[sym].CoinName);
    let allStringsToSearch = coinSymbols.concat(coinNames);
    let fuzzyResults = fuzzy
      .filter(inputValue, allStringsToSearch, {})
      .map((result) => result.string);

    let filteredCoins = _.pickBy(fetchCoins, (result, symKey) => {
      let coinName = result.coinName;
      return (
        _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
      );
    });

    setFilteredCoins(filteredCoins);
  },
  500
);
const filterCoins = (e, setFilteredCoins, fetchCoins, state) => {
  let inputValue = e.target.value;
  if (!inputValue) {
    setFilteredCoins(null);
  }
  handleFilter(inputValue, setFilteredCoins, fetchCoins, state);
};
const Search = () => {
  const state = useContext(AppContext);
  const { setFilteredCoins, fetchCoins } = useContext(AppContext);
  return (
    <SearchGrid>
      <h2>Search all Coins</h2>
      <SearchInput
        onKeyUp={(e) => filterCoins(e, setFilteredCoins, fetchCoins, state)}
      />
    </SearchGrid>
  );
};

export default Search;
