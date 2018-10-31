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
  }


  // Mounting Phase 3
  render() {

    return (
      <div>
        <NavBar/>
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser}/>
      </div>
    );
  }

    // Mounting Phase 4
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Mike Meyers", content: "Heyoooooooo"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

}


export default App;
