import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import MessageList from './messageList.jsx'
import Chatbar from './Chatbar.jsx'
// import Message from "./Message.jsx"

const URL = 'ws://localhost:3001'

// Creates a random number


class App extends Component {
  constructor() {
    super();
  this.state = {
    socket: null,
    messages : []
  };
  
  this.addMessage = this.addMessage.bind(this); 
  this.handleMessage = this.handleMessage.bind(this);
}

componentDidMount() {
  const socket = new WebSocket(URL)
    socket.onopen = function() {
    console.warn('connected Woooo')
  }
    this.setState({socket: socket})
}
 
//passed down as a prop to chatbar in Chatbar.jsx
handleMessage(evt) {
  if (evt.key === 'Enter') {
      const messageInput = evt.target.value; //grabs value from input field for message
      const userInput = 'Bob';
      //use this to bring addMessage into the function
      this.addMessage(messageInput, userInput);
    } 
}
 
addMessage(message, user) {
  const newMessage = { username: user, 
                      content: message};
  this.state.socket.send(JSON.stringify(newMessage));
}



render() {
    {/* message list gets passed back to messagelist.jsx below thru const messages*/}
  const messages = <MessageList messages={this.state.messages}/>
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
        {messages} 
      <footer className="chatbar">
        <Chatbar handleMessage={this.handleMessage}/>
        {/* pass in handleMessage function into chatbar here to pass down to children */}
      </footer>
    </div>
    );
  }
}
export default App;
