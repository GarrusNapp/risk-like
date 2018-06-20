import React, { Component } from "react";
import NavPanel from "./components/navpanel/navpanel";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      formType: "register",
      token: ""
    };
  }

  handleUserFormSubmit = obj => {}


  formTypeChange = type => {
    this.setState({
      formType: type
    });
  };

  render() {
    return (
      <div className="App">
        <NavPanel user={this.state.user} formTypeChange={this.formTypeChange} />
        <Main user={this.state.user} formType={this.state.formType} />
        <Footer />
      </div>
    );
  }
}

export default App;
