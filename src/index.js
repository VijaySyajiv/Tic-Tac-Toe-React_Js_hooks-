import React, { useState } from "react";
import ReactDOM from "react-dom";
import Square from './square';
import Restart from './restart';
import "./index.css";

import calculateWinner from './calculatewinner';

function Game() {
  const [ squares, setSquares ] = useState(Array(9).fill(null));
  const [ isXNext, setIsXNext ] = useState(true);
  const nextSymbol = isXNext ? "X" : "O";
  const winner = calculateWinner(squares);

  function getStatus() {
    if (winner) {
      {
        document.querySelector('[data-winning-message-text]').innerText ="Winner is -"+winner;
        document.getElementById('winningMessage').classList.add('show')
      }
      return "Winner: " + winner;
    } else if (isBoardFull(squares)) {
      {
        document.querySelector('[data-winning-message-text]').innerText = "Draw ";
        document.getElementById('winningMessage').classList.add('show')
      }
      return "Draw!";
    } else {
      return "Next player: " + nextSymbol;
    }
  }
  function isBoardFull(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        return false;
      }
    }
    return true;
  }

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          if (squares[i] != null || winner != null) {
            return;
          }
          const nextSquares = squares.slice();
          nextSquares[i] = nextSymbol;
          setSquares(nextSquares);

          setIsXNext(!isXNext); // toggle turns
        }}
      />
    );
  }

  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          setSquares(Array(9).fill(null));
          setIsXNext(true);
          {
            document.getElementById('winningMessage').classList.remove('show')
          }
        }}
      />
    );
  }

  return (
    <div className="game" id="board">
          <div className="board">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)} 
          </div>
         <div className="game-info">{getStatus()}</div>
        
        <div class="winning-message" id="winningMessage">
    <div data-winning-message-text></div>
    < div className="restart-button">{renderRestartButton()}</div>
  </div>
    </div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));



