import React from "react";

function Header({ resetBoard }) {
  return (
    <>
      <header className="header">
        <h1>Trello Clone</h1>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600r" onClick={resetBoard}>
          Reset Board
        </button>
      </header>
    </>
  );
}

export default Header;
