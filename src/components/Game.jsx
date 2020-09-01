import React, { Component } from "react";
import Board from "./Board";
import gameStyle from "../gameStyle.css";

export default class Game extends Component {
  render() {
    return (
      <div className="game" style={gameStyle}>
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    );
  }
}
