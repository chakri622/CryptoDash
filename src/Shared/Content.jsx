import React, { useContext } from "react";
import { AppContext } from "../App/AppProvider";

const Content = ({ children }) => {
  const page = useContext(AppContext);
  console.log("*Page=" + JSON.stringify(page.fetchCoins));
  if (!page.fetchCoins) {
    return <div>Loading Coins ...</div>;
  }
  return <div>{children}</div>;
};

export default Content;
