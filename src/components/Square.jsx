import React from "react";

function Square() {
  return (
    <button className="square" onClick={() => this.props.onClick()}>
      {" "}
      {this.props.value}{" "}
    </button>
  );
}

export default Square;
