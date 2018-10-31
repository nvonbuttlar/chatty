import React, {Component} from 'react';
import Message from './message.jsx';

class MessageList extends Component {

  render () {
    const messages = this.props.messages.map((msg) => {
      return <Message key={msg.id} message={msg} />;
    })
    return (
      <main className="messages">
        {messages}
      </main>
    )
  }
}


export default MessageList;