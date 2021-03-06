const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;
const uuidv4 = require('uuid/v4');


// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on port ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Create a broadcast function to send the amount of users to the server
  wss.broadcast = function broadcast(msg) {
    wss.clients.forEach(function each(client) { 
      const userCount = JSON.stringify(msg)
      client.send(userCount);
  });
}
  
  //creates notification for user that has joined the chat
  const newClientNotification = {
    id: uuidv4(),
    type: "incomingNotification",
    content: "Anonymous user has joined the chat.",
    username: "---New User---"
  };

  // const clientHasLeft = {
  //   id: uuidv4(),
  //   content: "has left the chat."
  // }

//console will log below when connected to other server
wss.on("connection", ws => {
  console.log("Client connected");

 //sends the number of users to the client.
  wss.broadcast(wss.clients.size);
  //sends a notification for 
  wss.broadcast(newClientNotification);

  ws.on("message", data => {
    const message = JSON.parse(data);
    message.id = uuidv4();

    //sends the message data to the client
    wss.clients.forEach(function each(client) {
      const newData = JSON.stringify(message)
      if (client.readyState === ws.OPEN) {
        client.send(newData);
      }
    });
  });    
  ws.on('close', () => {
    wss.broadcast(wss.clients.size--);
    // console.log("client is disconnected")  
  });
})
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
 