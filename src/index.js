const express = require('express');
const socketio = require('socket.io');

// initialization
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(express.json());

//Global Variables

// Routes
app.use(require('./routes/users'));
app.use(require('./routes/confirmation'));
app.use(require('./routes/travels'));
app.use(require('./routes/conductores'));

// Starting the server
const server = app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

//web Socket
const websocket = socketio(server); //Initiate Socket

websocket.on('test', (data) => {
  console.log('new connection', data);
});
