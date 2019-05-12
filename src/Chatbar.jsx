import React, {Component} from 'react';
// import ReactDOM from "react-dom";
// import { MessageList } from "./messageList.jsx";


class Chatbar extends Component {
render() {
   return(
   <footer className="chatbar">
      <input onKeyDown={this.props.handleUser} className="chatbar-username" placeholder="Your Name (Optional)"/>
      <input onKeyDown={this.props.handleMessage} className="chatbar-message" placeholder="Type a message and hit ENTER"/> 
   </footer>
      )   
   }
}

export default Chatbar