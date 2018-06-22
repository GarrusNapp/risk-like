import "./gametab.css";
import React, { Component } from "react";

class GameTab extends Component {
  render() {
    return (
      <div className="gameTab">
        <h3>{this.props.name}</h3>
        <p>Map:{this.props.board}</p>
        <p>Host:{this.props.creator.username}</p>
        <p>Players: {this.props.players.join(" ,")}</p>
        {this.props.players.includes(this.props.currentPlayer) ? (
          <React.Fragment>
          <button onClick={() => this.props.leave(this.props.id)}>
            Leave
          </button>
          <button onClick={() => this.props.enterGame(this.props.id)}>
            Enter
          </button>
          </React.Fragment>
        ) : (
          <button onClick={() => this.props.join(this.props.id)}>
            Join
          </button>
        )}
      </div>
    );
  }
}

export default GameTab;
