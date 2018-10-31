import React, {Component} from 'react';
import ChatBar from './chatbar.jsx';
import MessageList from './messagelist.jsx';
import NavBar from './NavBar.jsx';

const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}


class App extends Component {
  // Mounting Phase 1
  constructor(props) {
    super(props);

    this.state = {
      currentUser: data.currentUser.name,
      messages: data.messages
    };

    this.createNewMessage = this.createNewMessage.bind(this);
  }

  createNewMessage(content) {

    console.log('content!!!!', content);
    const newMessage = {
      id: this.state.messages.length+1,
      username: this.state.currentUser,
      content: content
    }
    const allMessages = this.state.messages.concat(newMessage);

    this.setState({messages: allMessages});
    //logic to concat
  }


  // Mounting Phase 3
  render() {

    return (
      <div>
        <NavBar/>
        <MessageList messages={this.state.messages}/>
        <ChatBar newMessage={this.createNewMessage} user={this.state.currentUser}/>
      </div>
    );
  }

    // Mounting Phase 4
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const numCurrMessages = this.state.messages.length;
      const newMessage = {id: numCurrMessages+1, username: "Mike Meyers", content: "Heyoooooooo"};
      const messageList = this.state.messages.concat(newMessage)
      this.setState({messages: messageList})
    }, 3000);
  }

}


export default App;
