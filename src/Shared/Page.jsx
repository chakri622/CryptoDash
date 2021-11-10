import React, { useContext } from "react";
import { AppContext } from "../App/AppProvider";

const Page = ({ name, children }) => {
  const context = useContext(AppContext);

  if (context.page !== name) return null;

  return <div>{children}</div>;
};

export default Page;
