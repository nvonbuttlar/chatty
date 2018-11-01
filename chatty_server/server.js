const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
  console.log('Client connected');

const clients = [];


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {

  clients.push(ws)

// to receive messages from client
  ws.onmessage = function(event){
    console.log('INCOMING:', JSON.parse(event.data));

    const uniqueId = uuidv4();
    const message  = JSON.parse(event.data);

    const broadcastMessage = {
      id: uniqueId,
      username: message.username,
      content: message.content
    }

    console.log('OUTGOING', broadcastMessage);

    clients.forEach(client => {
      if(client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

  }



// Set up a callback for when a client closes the socket. This usually means they closed their browser.
ws.on('close', () => console.log('Client disconnected'));
});