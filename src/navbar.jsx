import React, {Component} from 'react';

class NavBar extends Component {

  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chit-Chat</a>
        <span>Users Connected: {this.props.userCount}</span>
      </nav>
    )
  }
}

export default NavBar;

