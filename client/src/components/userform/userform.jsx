import React, { Component } from "react";
import axios from "axios";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      confirmPassword: "",
      feedback: []
    };
  }

  handleWriting = e => {
    this.setState({
      [e.target.attributes.name.value]: e.target.value
    });
  };

  validate = () => {
    let feedback = [];
    const mode = this.props.formType;
    const { name, password, confirmPassword } = this.state;
    if (mode === "register") {
      if (password !== confirmPassword) {
        feedback.push("Passwords don't match");
      }
      if (password.length < 8) {
        feedback.push("Password needs to be at least 8 char long");
      }
      if (name.length < 4) {
        feedback.push("Name needs to be at least 4 char long");
      }
    }
    if (feedback.length !== 0) {
      this.setState({
        feedback
      });
      return false;
    } else {
      return true;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      feedback: []
    });
    if (!this.validate()) {
      return;
    }
    const type = this.props.formType;
    const { name, password } = this.state;
    const data = { username: name, password };
    const API_URL = "http://localhost:8000/api/user/";
    axios({
      method: "post",
      url: API_URL + type,
      withCredentials: true,
      data
    })
      .then(r => {
        if (type === "login") {
          this.props.login(r);
        } else {
          this.setState({
            feedback: ["User created. Please login."]
          });
        }
      })
      .catch(e => {
        if (e.response.data.error) {
          this.setState({
            feedback: [e.response.data.error]
          });
        }
      });
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
        <ul id="formFeedback">
          {this.state.feedback.map((el, i) => <li key={i}>{el}</li>)}
        </ul>
      </form>
    );
  }
}

export default UserForm;
