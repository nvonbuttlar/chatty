import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if(event.key === 'Enter' && event.target.className === 'chatbar-message'){
      this.props.newMessage(event.target.value);
      event.target.value = "";
    } else if (event.target.className === 'chatbar-username') {
      this.props.newUser(event.target.value);
    }

  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onChange={this.handleKeyPress} placeholder="Enter a username" />
        <input className="chatbar-message" onKeyPress={this.handleKeyPress} placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}


export default ChatBar;