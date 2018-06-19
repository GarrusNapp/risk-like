import React, { Component } from "react";
import UserForm from "../userform/userform"

class Main extends Component {
  render() {
    return (
      <div className="main">
        {this.props.user ? (
          <h1>Logged</h1>
        ) : (
          <UserForm />
        )}
      </div>
    );
  }
}

export default Main;
