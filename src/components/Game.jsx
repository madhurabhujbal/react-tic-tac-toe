import React, { Component } from "react";
import Board from "./Board";
import gameStyle from "../gameStyle.css";

export default class Game extends Component {
  constructor(props) {
    super(props);
    let squaresClicked = 0;
    this.state = {
      squaresClicked: squaresClicked,
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); //slice() returns elements in array as a new array object
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    let squaresClicked = this.state.squaresClicked + 1;
    this.setState({
      squaresClicked: squaresClicked,
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to Game start";
      return (
        <li className="moves-history" key={move}>
          <button onClick={() => this.jumpTo(move)}> {desc} </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner : " + winner;
    } else {
      if (this.state.moves >= 9) {
        status = <div className="status-end">End of game</div>;
      } else {
        status = "Next player : " + (this.state.xIsNext ? "X" : "O");
      }
    }
    return (
      <div className="game" style={gameStyle}>
        <div className="game-info">
          <div className="status"> {status} </div>
          <div className="container">
            <div className="row">
              <div className="game-board">
                <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
                />
              </div>
              <ol> {moves} </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
