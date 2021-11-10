import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { fontSize1, greenBoxShadow, color3 } from "../Shared/Styles.js";

const ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: ${color3};
  ${fontSize1};
  padding: 5px;

  cursor: pointer;
  &:hover {
    ${greenBoxShadow};
  }
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
