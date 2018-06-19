import React, { Component } from "react";

class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      formType: "register"
    };
  }
  render() {
    let form = "";
    if (this.state.formType == "register") {
      form = (
        <React.Fragment>
          <label>
            Name:<input type="text" />
          </label>
          <label>
            Password:<input type="text" />
          </label>
          <label>
            Confirm Password:<input type="text" />
          </label>
        </React.Fragment>
      );
    } else if (this.state.formType == "login") {
      form = (
        <React.Fragment>
          <label>
            Name:<input type="text" />
          </label>
          <label>
            Password:<input type="text" />
          </label>
        </React.Fragment>
      );
    }
    return (
      <form>
        <label>Register<input type="checkbox" /></label>
        {form}
      </form>
    );
  }
}

export default UserForm;
