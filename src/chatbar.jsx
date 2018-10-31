import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if(event.key === 'Enter'){
      console.log('ENTER PRESSED');
      this.props.newMessage(event.target.value);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.user} />
        <input onKeyPress={this.handleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}


export default ChatBar;