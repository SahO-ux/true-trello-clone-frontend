import React from "react";

function Header({ resetBoard }) {
  return (
    <>
      <header className="header">
        <h1>Trello Clone</h1>
        <button className="btn btn-danger" onClick={resetBoard}>
          Reset Board
        </button>
      </header>
    </>
  );
}

export default Header;
