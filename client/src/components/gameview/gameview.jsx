import React, { Component } from "react";
import "./gameview.css";
import { feature } from "topojson-client";
import { Svg } from "../map/map";
import axios from "axios";
import Cookies from "js-cookie";

class GameView extends Component {
  constructor() {
    super();
    this.state = {
      paths: "",
      json: "",
      gameInfo: "",
      currentRegion: ""
    };
  }
  getDataOfClickedElement = (obj) => {
    this.setState({
      currentRegion: obj
    })
  }
  componentDidMount() {
    fetch("poland.json")
      .then(response => {
        return response.json();
      })
      .then(geodata => {
        console.log(geodata)
        const svgPaths = feature(geodata, geodata.objects.subregions).features;
        this.setState({
          paths: svgPaths,
          json: geodata
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
    return (
      <div className="gameView">
        {this.state.paths ? <Svg getDataOfClickedElement={this.getDataOfClickedElement} data={this.state.paths} /> : null}
        <div className="Game data">
          {this.state.gameInfo ? (
            <React.Fragment>
              <h2>{name}</h2>
              <p>Players: {players.join(", ")}</p>
            </React.Fragment>
          ) : (
            "Loading"
          )}

          <div className="">
            <h4>{JSON.stringify(this.state.currentRegion)}</h4>
          Deploy</div>
        </div>
      </div>
    );
  }
}

export default GameView;
