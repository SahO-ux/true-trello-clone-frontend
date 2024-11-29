import React from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import Header from "./Components/Header";
import Board from "./Components/Board";

function App() {
  const dispatch = useDispatch();

  const resetBoard = () => {
    localStorage.removeItem("state");
    dispatch({ type: "RESET" });
  };

  return (
    <div className="app">
      <Header resetBoard={resetBoard} />
      <Board />
    </div>
  );
}

export default App;
