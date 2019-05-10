import React, {Component} from 'react';
// import ReactDOM from "react-dom";
// import MessageList from './messageList.jsx';

class Message extends Component {
render() {
    if (this.props.message.type === 'postMessage') {
 return (
    <div>
        <div className="message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
        </div>
    </div>
    )  
 }   else { 
    return (
        <div>
            <div className="notification">
                <span className="message-username">{this.props.message.username}</span>
                <span className="notification-content">{this.props.message.content}</span>
            </div>
        </div>
    )    
 }   
}
}


export default Message;

