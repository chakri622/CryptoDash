import React from "react";
import "./App.css";
import styled from "styled-components";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import AppProvider from "./AppProvider";

function App() {
  return (
    <>
      <AppLayout>
        <AppProvider>
          <AppBar />
          <div className="App">Hello World</div>
        </AppProvider>
      </AppLayout>
    </>
  );
}

export default App;
