import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import MessageList from './messageList.jsx'
import Chatbar from './Chatbar.jsx'
// import Message from "./Message.jsx"

const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

function NewMessageForm({ addMessage }) {
  const onSubmit = evt => {
    evt.preventDefault();
    const messageInput = evt.target.elements.newMessage;
    const userInput = evt.target.elements.newUser;
    addMessage(messageInput.value, userInput.value);
    messageInput.value = '';
    userInput.value = '';
  };
  return (
   <Chatbar/>
  );
}

class App extends Component {
  constructor() {
    super();
  this.state = {
    messages : [
      { id: 1,
        type: "incomingMessage",
        content: "I won't be impressed with technology until I can download food.",
        username: "Lou"
      },
      { id: 2,
        type: "incomingNotification",
        content: "Anonymous1 changed their name to nomnom",
      },
      { id: 3,
        type: "incomingMessage",
        content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
        username: "Alex"
      },
      { id: 4,
        type: "incomingMessage",
        content: "...",
        username: "Dana"
      },
      { id: 5,
        type: "incomingMessage",
        content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
        username: "Leo"
      },
      {   
        id : 6,
        type: "incomingMessage",
        content: "This isn't funny. You're not funny",
        username: "nomnom"
      },
      { id: 7,
        type: "incomingNotification",
        content: "Anonymous2 changed their name to NotFunny",
      },
    ]
  };
  // this.addMessage = this.add.bind(this); 
}

addMessage(message, user) {
  const oldMessages = this.state.messages
  const newMessage = {id: generateRandomId, 
                      username: user, 
                      content: message};
  const newMessages = [...oldMessages, newMessage];
  this.setState({ messages: newMessages });
}

componentDidMount() {
  setTimeout(() => {
      // Add a new message to the list of messages in the data store
    // const newMessage = {id: 8, username: "Michelle", content: "Hello world"}
    // cons t messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
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
        <NewMessageForm addMessage={this.addMessage}/>
        {/* replace Chatbar with <NewMessageForm addMessage={this.addMessage} */}
      </footer>
    </div>
    );
  }
}
export default App;
