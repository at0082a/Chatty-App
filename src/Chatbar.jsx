import React, {Component} from 'react';
// import ReactDOM from "react-dom";
// import { MessageList } from "./messageList.jsx";


class Chatbar extends Component {
render() {
   return(
    <div>
     <div>
       <input onKeyDown={this.props.handleUser} className="chatbar-username" placeholder="Your Name (Optional)" />
     </div>
     <div>
     <input onKeyDown={this.props.handleMessage} className="chatbar-message" placeholder="Type a message and hit ENTER"/>
     </div>
    </div>  
      )   
   }
}

export default Chatbar