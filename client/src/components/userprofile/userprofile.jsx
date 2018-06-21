import React, { Component } from "react";
import "./userprofile.css";
import axios from "axios";
import Cookies from "js-cookie"

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
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    })
      .then(r => {
        this.setState({
          userinfo: r.data
        })
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <React.Fragment>
        <h1>Userprofile</h1>
        {JSON.stringify(this.state.userinfo)}
      </React.Fragment>
    );
  }
}

export default UserProfile;
