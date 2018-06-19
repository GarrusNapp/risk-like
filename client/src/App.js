import React, { Component } from 'react';
import NavPanel from "./components/navpanel/navpanel";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import './App.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      user: ""
    }
  }
  render() {
    return (
      <div className="App">
        <NavPanel />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
