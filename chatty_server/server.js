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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {
  console.log('Client connected');
  ws.on('message', function incoming(data) {
    const info = JSON.parse(data);
    info['id'] = uuidv4()
    console.log(info) 
    const content = info.content
    const user = info.username
    console.log(`User ${user} said ${content}`)
  });     
  
  ws.on('close', () => console.log('Client disconnected'));
});
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
 