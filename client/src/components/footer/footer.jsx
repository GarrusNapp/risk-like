import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        {this.props.user ? (
          <h1>Logged</h1>
        ) : (
          <h2>Not Logged</h2>
        )}
      </div>
    );
  }
}

export default Footer;
