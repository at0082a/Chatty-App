import React, {Component} from 'react';
// import ReactDOM from "react-dom";
// import MessageList from './messageList.jsx';

class Message extends Component {
render() {
var anonymous = "Anonymous"
if (this.props.message.username) {
 return (
    <div>
        <div className="message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
        </div>
        <div className="message system">
            {this.props.message.type}
        </div>
    </div>
 )
} 

return (
    <div>
        <div className="message">
            <span className="message-username">{anonymous}</span>
            <span className="message-content">{this.props.message.content}</span>
        </div>
        <div className="message system">
            {this.props.message.type}
        </div>
    </div>
)

   
 }   
}
export default Message;