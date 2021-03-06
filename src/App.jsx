import React, {Component} from 'react';
import ChatBar from './chatbar.jsx';
import MessageList from './messagelist.jsx';
import NavBar from './NavBar.jsx';


class App extends Component {
  // Mounting Phase 1
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      userCount: 0
    }


    // Creates a new WebSocket at localhost:3001
    this.dogSocket = new WebSocket("ws://localhost:3001");

    this.createNewMessage = this.createNewMessage.bind(this);
    this.updateUser = this.updateUser.bind(this);


  }

  updateUser(username) {
    if(username === this.state.currentUser.name){
      return;
    } else {
       let newName = {
        type: "nameChange",
        content: `${this.state.currentUser.name} changed their name to ${username}`
       }
       this.dogSocket.send(JSON.stringify(newName));
    }
    // this.state.currentUser.name = username;
    this.setState((previousState) => {
      let user  = previousState.currentUser;
      user.name = username;
      return {currentUser: user};
    });
  }


  createNewMessage(content) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: content
    };
    this.dogSocket.send(JSON.stringify(newMessage));
  }


  // Mounting Phase 3
  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount}/>
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
      const parseData = JSON.parse(event.data);

      switch(parseData.type){
        case 'incomingMessage':
          const newMessages = this.state.messages;
          newMessages.push(parseData);
          this.setState({messages: newMessages});
          break;

        case 'incomingNotification':
          const notification = this.state.messages;
          notification.push(parseData);
          this.setState({messages: notification});
          break;

        case 'userCount':
          this.setState({
            userCount: parseData.count
          });
          break;
      }
    }
  }
}

export default App;
