import React, { Component } from "react";

class NavPanel extends Component {
  render() {
    return (
      <div className="navPanel">
        {this.props.user ? (
          <React.Fragment>
            <button>ProfilePage</button>
            <button>Logout</button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button>Register</button>
            <button>Login</button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default NavPanel;
