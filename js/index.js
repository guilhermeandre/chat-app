const socket = io()

const $msgForm = document.getElementById('sendMsg')
const $msgList = document.getElementById('messages')
const $name = document.getElementById('name')
const $text = document.getElementById('text')

let userName = ""
while (userName == "") {
  userName = prompt("Please enter your name")
}

let emitTyping = false;

$name.value = userName;
$name.style.backgroundColor = "#999999";
$name.style.pointerEvents = "none";

$msgForm.addEventListener('submit', (event) => {
	event.preventDefault()  
  emitTyping = false
// Creating object to structure data 
const msgData = {
  msg: event.currentTarget.text.value, 
  name: event.currentTarget.name.value, 
  time: new Date().toLocaleString()
  }
// Sending to socket.emit Object data
  socket.emit('chatmsg', msgData)

// Rendering the sender msg 
  renderMsg(msgData, "right")
  event.currentTarget.text.value = ''
  
})

function renderMsg ({msg, name, time}, className) {

// Creating DOM elements
  const $newMsg = document.createElement('li')
  const $newText = document.createElement('p')
// Populating the element with data
  $newMsg.className = className
  $newMsg.textContent = time + ' ' + name + ' said: '
  $newText.textContent = msg 

// Assigning the element to the parent
  $newMsg.appendChild($newText)
  $msgList.appendChild($newMsg)
 
}

socket.on('chatmsg', (data) => {
  renderMsg(data, "left");
})  

// renderMsg(
//   {msg: "testing", name: "John Doe", time: new Date().toLocaleString()}
//   , "right");



// Event listener to check typing
$text.addEventListener('keyup', (event) => {
  console.log(emitTyping)
  // Checking if the user is typing
  if (!emitTyping) {
    socket.emit('typing', $name.value);
    console.log(`Is Typing`);
    emitTyping = true;
  };
})
//  
socket.on('typing', (userName) => {
  console.log(`${userName} is typing`);

})