import React, { Component } from "react";
import "./userprofile.css";
import axios from "axios";
import Cookies from "js-cookie";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {}
    };
  }
  componentDidMount() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/user/me",
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(r => {
        this.setState({
          userinfo: r.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { userinfo } = this.state;
    return (
      <React.Fragment>
        <h1>Profile</h1>
        <h3>{userinfo.username}</h3>
        <p>Won: {userinfo.won} </p>
        <p>Lost: {userinfo.lost} </p>
        <p>Draws: {userinfo.draws} </p>
        <p>Won by surrender: {userinfo.won_by_surrender} </p>
        <p>Surrendered: {userinfo.surrendered} </p>
      </React.Fragment>
    );
  }
}

export default UserProfile;
