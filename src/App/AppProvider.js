import React, { useState } from "react";

export const AppContext = React.createContext();
export const AppUpdateContext = React.createContext();

function AppProvider({ children }) {
  const [page, setPage] = useState({ page: "dashboard" });
  const setCurrentPage = (page) => setPage({ page });
  console.log("Page=" + page);
  return (
    <AppContext.Provider value={page}>
      <AppUpdateContext.Provider value={setCurrentPage}>
        {children}
      </AppUpdateContext.Provider>
    </AppContext.Provider>
  );
}

export default AppProvider;
