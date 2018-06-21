import React, { Component } from "react";
import "./gameview.css";
import { feature } from "topojson-client";
import { Svg } from "../map/map";

class GameView extends Component {
  constructor() {
    super();
    this.state = {
      paths: "",
      json: ""
    };
  }

  componentDidMount() {
    fetch("poland.json")
      .then(response => {
        return response.json();
      })
      .then(geodata => {
        const svgPaths = feature(geodata, geodata.objects.subregions).features;
        this.setState({
          paths: svgPaths,
          json: geodata
        });
      });
  }

  render() {
    return (
      <div className="GameView">
        {this.state.paths ? <Svg data={this.state.paths} /> : null}
      </div>
    );
  }
}

export default GameView;
