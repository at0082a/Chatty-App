import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import MessageList from './messageList.jsx'
import Chatbar from './Chatbar.jsx'
// import Message from "./Message.jsx"

//com


class App extends Component {
  constructor() {
    super();
    const socket = new WebSocket('ws://localhost:3001')
  this.state = {
    currentUser: {name: 'Anonymous'},
    socket: null,
    messages : [],
    userCount : null,
    userJoining : null
  };
  this.socket = socket 
  this.addMessage = this.addMessage.bind(this); 
  this.handleMessage = this.handleMessage.bind(this);
  this.handleUser = this.handleUser.bind(this);
}

//set socket in componentdidmount() to the port in chatty_app server and 
//append message from socket to message list after JSON.parse.
componentDidMount() {
  
    this.socket.onopen = function() {
    console.warn('connected to socket')
  } 
  // this.setState({socket: socket})
  
  
  this.socket.onmessage = event => {
    const receivedMessage = JSON.parse(event.data)
    const newMessageList = this.state.messages.concat(receivedMessage)
   
    this.setState({messages: newMessageList})
    if(Number.isInteger(receivedMessage)) {
      const userCount = receivedMessage;
      console.log(userCount);
      this.setState({userCount})
    } 
  if (receivedMessage.type === "incomingNotification") {
    const userJoining = receivedMessage.content;
    this.setState({ userJoining });
  }
}
}
//passed down as a prop to chatbar in Chatbar.jsx
handleMessage(evt) {
  if (evt.key === 'Enter') {
      const messageInput = evt.target.value; //grabs value from input field for message
      if (!messageInput) {
        return
      }
      //use this to bring addMessage into the function
      this.addMessage(messageInput, 'postMessage');
    } 
  }

//userentered function grabs the text from the username input box. userEntered is passed to 
//chatbar.jsx, and the currentuser state is updated for the new user.
handleUser (event) {
  let newUser = event.target.value;
  if (!newUser) {
    newUser = 'Anonymous'
  }
  if (event.key === 'Enter') {
    if (newUser !== this.state.currentUser.name) {
      this.setState({currentUser : {name : newUser}})
      this.addMessage(
        `${this.state.currentUser.name} changed their username to: ${newUser}`,
        'postNotification')
    }
  }
}

//addmessage sends message to socket
addMessage(message, type) {
  const newMessage = {type: type,
                      username: this.state.currentUser.name, 
                      content: message}
  this.socket.send(JSON.stringify(newMessage));
}

render() {
    {/* message list gets passed back to messagelist.jsx below thru const messages*/}
  const messages = <MessageList messages={this.state.messages}/>
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="user-count"> Users Online : {this.state.userCount} </div>
      </nav>
        {messages} 
      <footer className="chatbar">
        <Chatbar handleMessage={this.handleMessage} handleUser={this.handleUser}
        />
        {/* pass in handleMessage function into chatbar here to pass down to children */}
      </footer>
    </div>
    );
  }
}
export default App;
