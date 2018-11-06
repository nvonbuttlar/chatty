import React, {Component} from 'react';

class Message extends Component {



  render() {
    console.log('in message')
    return (
      <div>
        <div className="message">
          <div>
          <span className="message-username">{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
          </div>
        </div>
      </div>
    )
  }
}


export default Message;
