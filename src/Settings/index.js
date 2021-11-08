import React from "react";
import WelcomeMessage from "./WelcomeMessage";
import ConfirmButton from "./ConfirmButton";
import Page from "../Shared/Page";

const Welcome = () => {
  return (
    <Page name="settings">
      <WelcomeMessage />
      <ConfirmButton />
    </Page>
  );
};

export default Welcome;
