// CHATTY SERVER

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


wss.on('connection', (ws) => {
  console.log('Client connected');

  // Set up user count on connection
  let clientCount = {
    type: 'userCount',
    count: wss.clients.size
  };


  // Loop through each connected client and send object to App
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(clientCount));
  });

  // To receive messages from client
  ws.onmessage = function(event){
    const uniqueId = uuidv4();
    const message  = JSON.parse(event.data);
    const broadcastMessage = {
      id: uniqueId,
      username: message.username,
      content: message.content,
      type: message.type
    }


    switch (message.type){
      case 'nameChange':
        message.type = "incomingNotification"
        break;
      case 'postMessage':
        message.type = "incomingMessage"
        break;

    }

    wss.clients.forEach(client => {
    if(client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
  }

// Set up a callback for when a client closes the socket. This usually means they closed their browser.
ws.on('close', () => {
  console.log('Client disconnected')

  // Reassign user count when client disconnects
  clientCount.count = wss.clients.size;

  // Loop through clients and send new client count data
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(clientCount));
  })
});






});