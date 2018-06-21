import React, { Component } from "react";
import "./navpanel.css";


class NavPanel extends Component {
  render() {
    return (
      <div className="navPanel">
        <span className="navTitle">R I S K</span>
        {this.props.user ? (
          <React.Fragment>
          <span className="userName" >{this.props.user}</span>
            <button onClick={() => this.props.viewChange("dashboard")}>Dashboard</button>
            <button onClick={() => this.props.viewChange("profile")}>ProfilePage</button>
            <button onClick={this.props.logout}>Logout</button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button onClick={() => this.props.formTypeChange("register")}>Register</button>
            <button onClick={() => this.props.formTypeChange("login")}>Login</button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default NavPanel;
