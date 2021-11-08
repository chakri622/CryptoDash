import React, { useContext } from "react";
import { AppContext } from "../App/AppProvider";

function WelcomeMessage() {
  const context = useContext(AppContext);
  if (context.firstVisit) {
    return (
      <div>
        <h4>
          Welcome to Crypto Dash, PLease select your favorite coins to begin.{" "}
        </h4>
      </div>
    );
  } else {
    return null;
  }
}

export default WelcomeMessage;
