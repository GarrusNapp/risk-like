import React, { Component } from "react";
import "./dashboard.css";
import axios from "axios";
import Cookies from "js-cookie";
import GameTab from "../gameTab/gametab";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      gameName: ""
    };
  }
  handleWriting = e => {
    e.preventDefault();
    this.setState({
      gameName: e.target.value
    });
  };

  newGame = () => {
    if (!this.state.gameName) {
      console.log("Provide name!");
      return;
    }
    axios({
      method: "post",
      url: "http://localhost:8000/api/games",
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        name: this.state.gameName
      }
    })
      .then(r => {
        this.setState({
          gameName: ""
        });
        this.getGames();
      })
      .catch(e => {
        console.log(e);
      });
  };

  joinGame = gameId => {
    console.log(gameId);

    axios({
      method: "post",
      url: `http://localhost:8000/api/game/${gameId}/join`,
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(r => {
        this.getGames();
      })
      .catch(e => {
        console.log(e);
      });
  };

  leaveGame = gameId => {
    axios({
      method: "post",
      url: `http://localhost:8000/api/game/${gameId}/leave`,
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(r => {
        this.getGames();
      })
      .catch(e => {
        console.log(e);
      });
  };

  getGames() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/games",
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(r => {
        this.setState({
          games: r.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  componentDidMount() {
    this.getGames();
  }
  render() {
    const games = this.state.games.map(el => (
      <GameTab
        key={el.id}
        currentPlayer={this.props.user}
        {...el}
        leave={this.leaveGame}
        join={this.joinGame}
        enterGame={this.props.enterGame}
      />
    ));
    return (
      <div>
        <h2>Dashboard</h2>
        <input
          value={this.state.gameName}
          onChange={this.handleWriting}
          type="text"
          placeholder="Room name"
        />
        <button onClick={this.newGame}>New Game!</button>
        <h3>Current games:</h3>
        <div className="gamesWrapper">{games}</div>
      </div>
    );
  }
}

export default Dashboard;
