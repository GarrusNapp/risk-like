import React, { Component } from "react";
import NavPanel from "./components/navpanel/navpanel";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import axios from "axios";
import Cookies from "js-cookie";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      formType: "register",
      view: "form"
    };
  }

  componentDidMount() {
    const user = localStorage.getItem("user");
    console.log(user)
    if (user) {
      this.setState({
        user,
        view: "dashboard"
      });
    }
  }

  login = obj => {
    this.setState({
      user: obj.data.username,
      view: "game"
    });
    localStorage.setItem("user", obj.data.username);
  };

  viewChange = v => {
    this.setState({
      view: v
    });
  };

  formTypeChange = type => {
    this.setState({
      formType: type
    });
  };

  logout = () => {
    axios({
      method: "post",
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      url: "http://localhost:8000/api/user/logout"
    })
      .then(r => {
        localStorage.setItem("user", "");
        this.setState({
          user: "",
          view: "form"
        })
        console.log(r);
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  render() {
    return (
      <div className="App">
        <NavPanel
          user={this.state.user}
          formTypeChange={this.formTypeChange}
          viewChange={this.viewChange}
          logout={this.logout}
        />
        <Main
          user={this.state.user}
          view={this.state.view}
          formType={this.state.formType}
          login={this.login}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
