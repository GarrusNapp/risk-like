import React, { Component } from "react";
import UserForm from "../userform/userform";
import DashBoard from "../dashboard/dashboard";
import UserProfile from "../userprofile/userprofile";
import GameView from "../gameview/gameview";

import "./main.css";

class Main extends Component {
  render() {
    let view = "";
    if (this.props.view === "form") {
      view = (
        <UserForm formType={this.props.formType} login={this.props.login} />
      );
    } else if (this.props.view === "dashboard") {
      view = (
        <DashBoard user={this.props.user} enterGame={this.props.enterGame} />
      );
    } else if (this.props.view === "profile") {
      view = <UserProfile />;
    } else if (this.props.view === "game") {
      view = <GameView gameId={this.props.gameId} />;
    }
    return <div className="main">{view}</div>;
  }
}

export default Main;
