import React, { Component } from "react";
import "./dashboard.css";
import axios from "axios";
import Cookies from "js-cookie";


class Dashboard extends Component {
  newGame() {
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
        name: "Example!!"
      }
    })
      .then(r => {
        console.log(r)
      })
      .catch(e => {
        console.log(e);
      });
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <button onClick={this.newGame}>New Game!</button>
        <h3>Current games:</h3>
      </div>
    );
  }
}

export default Dashboard;
