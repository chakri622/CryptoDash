import React from "react";
import "./App.css";
import styled from "styled-components";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";

function App() {
  return (
    <>
      <AppLayout>
        <AppBar />
        <div className="App">Hello World</div>
      </AppLayout>
    </>
  );
}

export default App;
