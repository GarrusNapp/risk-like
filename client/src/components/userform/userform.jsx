import React, { Component } from "react";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleWriting = e => {
    this.setState({
      [e.target.attributes.name.value]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, password } = this.state;
    const data = { username: name, password };
    console.log(data);
    const API_URL = "http://localhost:8000/api/user/";
    fetch(API_URL + this.props.formType, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(r => {
        if (r.ok) {
          return r.json();
        } else {
          console.log("error");
        }
      })
      .then(data => console.log(data));
  };

  render() {
    let form = "";
    if (this.props.formType == "register") {
      form = (
        <React.Fragment>
          <label>
            Name:<input
              value={this.state.name}
              onChange={this.handleWriting}
              name="name"
              type="text"
            />
          </label>
          <label>
            Password:<input
              onChange={this.handleWriting}
              name="password"
              type="text"
            />
          </label>
          <label>
            Confirm Password:<input
              onChange={this.handleWriting}
              name="confirmPassword"
              type="text"
            />
          </label>
        </React.Fragment>
      );
    } else if (this.props.formType == "login") {
      form = (
        <React.Fragment>
          <label>
            Name:<input
              value={this.state.name}
              onChange={this.handleWriting}
              name="name"
              type="text"
            />
          </label>
          <label>
            Password:<input
              onChange={this.handleWriting}
              name="password"
              type="text"
            />
          </label>
        </React.Fragment>
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>{this.props.formType}</h2>

        {form}
        <button>Submit</button>
      </form>
    );
  }
}

export default UserForm;
