import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
}
render() {
    const messages = this.props.messages.map(message => (
        <Message key={message.id} message={message} />
      ));
    return (
       <main className="messages">
         {messages};
       </main>
    );
  }
}


export default MessageList;