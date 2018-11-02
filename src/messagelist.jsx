import React, {Component} from 'react';
import Message from './message.jsx';

class MessageList extends Component {

  render () {
    const messages = this.props.messages.map((msg, index) => {
      return <Message key={index} message={msg} />;
    })
    console.log('messages ', messages)
    return (
      <main className="messages">
        {messages}
      </main>
    )
  }
}


export default MessageList;