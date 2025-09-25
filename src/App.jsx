import { useState } from "react";
import "./App.css";
import Timer from "./components/Timer/Timer";
import { roleLayout, demon, minion, outsider, townsfolk } from "./constant";

function App() {
  return (
    <>
      <h1>Blood on the Clocktower</h1>
      <Timer />
      <input type="number" />
    </>
  );
}

export default App;
