import React, {Component} from 'react';
import Message from './message.jsx';

class MessageList extends Component {

  render () {
    const messages = this.props.messages.map((msg, index) => {
      if (msg.type === 'incomingMessage') {
      return <Message key={index} message={msg}/>;
    } else if (msg.type === 'incomingNotification') {
      return <div className="message system">{msg.content}</div>;
    }
  });

  return <main className="messages"> {messages} </main>;

  }
}


export default MessageList;