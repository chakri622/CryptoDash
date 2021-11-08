import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";

const ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: green;
  cursor: pointer;
`;

const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`;

export default function ConfirmButton() {
  const { confirmFavorites } = useContext(AppContext);
  console.log(`confirmFavorites=${confirmFavorites}`);
  if (confirmFavorites === undefined) {
    return (
      <div>
        <CenterDiv>
          <ConfirmButtonStyled onClick={() => confirmFavorites()}>
            Confirm Favorites
          </ConfirmButtonStyled>
        </CenterDiv>
      </div>
    );
  }
  return <div></div>;
}
