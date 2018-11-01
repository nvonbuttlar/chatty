import React, {Component} from 'react';
import ChatBar from './chatbar.jsx';
import MessageList from './messagelist.jsx';
import NavBar from './NavBar.jsx';


class App extends Component {
  // Mounting Phase 1
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };

    this.createNewMessage = this.createNewMessage.bind(this);
    this.updateUser = this.updateUser.bind(this);

    // Creates a new WebSocket at localhost:3001
    this.dogSocket = new WebSocket("ws://localhost:3001");


  }

  updateUser(username) {
    // this.state.currentUser.name = username;
    this.setState((previousState) => {
      let user = previousState.currentUser;
      user.name = username;
      return {currentUser: user};
    });
  }


  createNewMessage(content) {
    const newMessage = {
      username: this.state.currentUser.name,
      content: content
    };
    this.dogSocket.send(JSON.stringify(newMessage));
  }


  // Mounting Phase 3
  render() {
    console.log('in render ', this.state.messages);
    return (
      <div>
        <NavBar/>
        <MessageList messages={this.state.messages}/>
        <ChatBar newMessage={this.createNewMessage} newUser={this.updateUser} user={this.state.currentUser.name}/>
      </div>
    );
  }


    // Mounting Phase 4
  componentDidMount() {

    this.dogSocket.onopen = (event) => {
      console.log("Connected to server")
    };

    this.dogSocket.onmessage = (event) => {
      console.log('RE', event.data);
      const parseData = JSON.parse(event.data);

      const newMessages = this.state.messages;
      newMessages.push(parseData);
      this.setState({messages: newMessages});
    }


    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   const numCurrMessages = this.state.messages.length;
    //   const newMessage = {id: numCurrMessages+1, username: "Mike Meyers", content: "Heyoooooooo"};
    //   // this.setState({messages: messageList})
    // }, 3000);

  }


}

export default App;
