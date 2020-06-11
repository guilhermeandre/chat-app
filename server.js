// import express and assign to a variable
const express = require ("express");
const e = require("express");

const app = express();

const server = app.listen(3000,() => {
  console.log(`Web server is up and running`);
});

const io = require('socket.io').listen(server); 

//Create the Express APP object ()



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.use(express.static('.'))

io.on('connection', function (socket) {
	
  // Listen for "chatmsg"
	//   io.emit to all user
	socket.on('chatmsg', (data) => {
		socket.broadcast.emit('chatmsg', data)
	})

	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data) 
	} )

})
	

