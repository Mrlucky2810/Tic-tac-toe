import React, { useState } from "react";

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [status, setStatus] = useState("");

  const handleClick = (index) => {
    if (board[index] !== null || status) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setStatus(`${winner} Wins!`);
    } else if (checkDraw(newBoard)) {
      setStatus("Draw!");
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (board) => {
    // Check rows for winner
    if (board[0] && board[0] === board[1] && board[0] === board[2]) {
      return board[0];
    }
    if (board[3] && board[3] === board[4] && board[3] === board[5]) {
      return board[3];
    }
    if (board[6] && board[6] === board[7] && board[6] === board[8]) {
      return board[6];
    }
    if (board[0] && board[0] === board[3] && board[0] === board[6]) {
      return board[0];
    }
    if (board[1] && board[1] === board[4] && board[1] === board[7]) {
      return board[1];
    }
    if (board[2] && board[2] === board[5] && board[2] === board[8]) {
      return board[2];
    }
    if (board[0] && board[0] === board[4] && board[0] === board[8]) {
      return board[0];
    }
    if (board[2] && board[2] === board[4] && board[2] === board[6]) {
      return board[2];
    }

    return null;
  };

  const checkDraw = (board) => {
    return board.every((cell) => cell !== null) && !checkWinner(board);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setStatus("")
  };

  return (
    <div>
      <div className="main-container">
        <h1>Tic Tac Toe</h1>
        {status && <h2>{status}</h2>}
        <div className="board">

          <div className="row">
            {board.slice(0, 3).map((cell, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className="cell"
              >
                {cell}
              </div>
            ))}
          </div>

          <div className="row">
            {board.slice(3, 6).map((cell, index) => (
              <div
                key={index + 3}
                onClick={() => handleClick(index + 3)}
                className="cell"
              >
                {cell}
              </div>
            ))}
          </div>

          <div className="row">
            {board.slice(6, 9).map((cell, index) => (
              <div
                key={index + 6}
                onClick={() => handleClick(index + 6)}
                className="cell"
              >
                {cell}
              </div>
            ))}
          </div>

          <button onClick={handleRestart} className="restart-btn">
            Restart
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Board;
