import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MessageList from './messageList.jsx'
import Chatbar from './Chatbar.jsx'
// import Message from "./Message.jsx"

class App extends Component {
  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
        <MessageList/>
      <footer className="chatbar">
        <Chatbar/>
      </footer>
    </div>
    );
  }
}
export default App;
