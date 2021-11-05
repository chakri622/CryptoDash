import React, { useState } from "react";

export const AppContext = React.createContext();
export const AppUpdateContext = React.createContext();

function AppProvider({ children }) {
  const savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    return {};
  };

  const confirmFavorites = () => {
    setPage({ firstVisit: false, page: "dashboard" });
    localStorage.setItem("cryptoDash", JSON.stringify({ test: "hello" }));
  };
  const [page, setPage] = useState({
    page: "dashboard",
    ...savedSettings(),

    confirmFavorites: confirmFavorites,
  });
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
