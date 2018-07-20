import React, { Component } from "react";
import "./gameview.css";
import { Svg } from "../map/map";
import axios from "axios";
import Cookies from "js-cookie";

class GameView extends Component {
  constructor() {
    super();
    this.state = {
      json: "",
      gameInfo: "",
      currentRegion: ""
    };
  }

  getDataOfClickedElement = obj => {
    this.setState({
      currentRegion: obj
    });
  };

  componentDidMount() {
    fetch("map.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          json: data
        });
      });

    axios({
      method: "get",
      url: "http://localhost:8000/api/game/" + this.props.gameId,
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(r => {
        r.data.board = JSON.parse(r.data.board.replace(/'/g, '"')); //not very elegant
        this.setState({
          gameInfo: r.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { name, players } = this.state.gameInfo;

    return this.state.gameInfo ? (
      <div className="gameView">
        {this.state.json ? (
          <Svg
            getDataOfClickedElement={this.getDataOfClickedElement}
            data={this.state.json}
            gameInfo={this.state.gameInfo}
          />
        ) : null}
        <div className="Game data">
          <React.Fragment>
            <h2>{name}</h2>
            <p>Players: {players.join(", ")}</p>
          </React.Fragment>

          <div className="">
            <h4>{JSON.stringify(this.state.currentRegion)}</h4>
            Deploy
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default GameView;
