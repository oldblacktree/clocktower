import { useState } from "react";
import "./App.css";
import Role from "./components/RoleItem/Role";
import Timer from "./components/Timer/Timer";

function App() {
  return (
    <>
      <h1>Blood on the Clocktower</h1>
      <Timer />
      <div>
        <Role />
      </div>
    </>
  );
}

export default App;
