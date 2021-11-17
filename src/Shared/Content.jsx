import React, { useContext } from "react";
import { AppContext } from "../App/AppProvider";

const Content = ({ children }) => {
  const page = useContext(AppContext);
  //console.log("*Page=" + JSON.stringify(page));
  if (!page.fetchCoins) {
    return <div>Loading Coins ...</div>;
  }
  if (!page.firstVisit && !page.prices) {
    return <div>Loading Prices ...</div>;
  }
  return <div>{children}</div>;
};

export default Content;
