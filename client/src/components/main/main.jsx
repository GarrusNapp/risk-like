import React, { Component } from "react";
import UserForm from "../userform/userform";
import "./main.css";


class Main extends Component {
  render() {
    return (
      <div className="main">
        {this.props.user ? <h1>Logged</h1> : <UserForm formType={this.props.formType} />}
      </div>
    );
  }
}

export default Main;
