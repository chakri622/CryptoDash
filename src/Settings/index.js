import React from "react";
import WelcomeMessage from "./WelcomeMessage";
import ConfirmButton from "./ConfirmButton";
import Page from "../Shared/Page";
import CoinGrid from "./CoinGrid";

const Welcome = () => {
  return (
    <Page name="settings">
      <WelcomeMessage />
      <ConfirmButton />
      <CoinGrid />
    </Page>
  );
};

export default Welcome;
