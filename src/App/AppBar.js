import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { AppContext, AppUpdateContext } from "./AppProvider";

const Logo = styled.div`
  font-size: 1.5em;
`;

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
  margin-bottom: 40px;
`;
const ControlButtonElem = styled.div`
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      color: blue;
      text-shadow: 0px 0px 60px #03ff03;
    `}
`;
const toProperCase = (lower) => {
  return lower.charAt(0).toUpperCase() + lower.substring(1);
};
const ControlButton = ({ name, active }) => {
  const page = useContext(AppContext);
  const setPage = useContext(AppUpdateContext);
  console.log(useContext(AppContext));
  console.log("Page=" + page);
  return (
    <ControlButtonElem onClick={()=>setPage(name)} active={page.page === name}>
      {toProperCase(name)}
    </ControlButtonElem>
  );
};
const AppBar = () => {
  return (
    <Bar>
      <Logo>CyptoDash</Logo>
      <div></div>
      <ControlButton  name="dashboard" />
      <ControlButton name="settings" />
    </Bar>
  );
};

export default AppBar;
