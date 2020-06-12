const socket = io()

const $msgForm = document.getElementById('sendMsg')
const $msgList = document.getElementById('messages')
const $name = document.getElementById('name')
const $text = document.getElementById('text')
const $isTyping = document.getElementById('is-typing')


let typing = false;
let timeout = undefined;

let userName = ""
while (userName == "") {
  userName = prompt("Please enter your name")
}


$name.value = userName;


$msgForm.addEventListener('submit', (event) => {
  event.preventDefault()  
  typing = false;  
// Creating object to structure data 
  const msgData = {
  msg: event.currentTarget.text.value, 
  name: event.currentTarget.name.value, 
  time: new Date().toLocaleTimeString()
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
  const $newTime = document.createElement('p')
  const $newText = document.createElement('p')
// Populating the element with data
  $newMsg.className = className  
  $newTime.textContent = time + ', ' + name + ':'
  $newText.textContent = msg 
  

// Assigning the element to the parent
  $newMsg.appendChild($newTime).className = 'time'
  $newMsg.appendChild($newText).className = 'mgs'  
  $msgList.appendChild($newMsg)
  // Scrolling the page down to show the newest message
  $msgList.scrollTop = $msgList.scrollHeight;
 
}

socket.on('chatmsg', (data) => {
  renderMsg(data, "left");
  
})  

// Event listener to check typing
$text.addEventListener('keypress', (event) => {
    if (event.which != 10 ) {
  // Checking if the user is typing
    typing = true;
    socket.emit('typing', {user:userName,typing:true})
    clearTimeout(timeout) 
    timeout=setTimeout(typingTimeout, 2000 ) 
  } else {
    clearTimeout(timeout)
    typingTimeout()
  }
 })
//  

socket.on('typing', (data) => { 
  if(data.typing == true) {
  // console.log(`Type bitch true`)
  $isTyping.textContent = `${data.user} is typing...`
  // console.log(`${data.user} is typing`)
  
} else {
  // console.log(`Type bitch False`)   
  $isTyping.textContent = ``
  // console.log(`${data.user} stopped typing`)
  } 
})

function typingTimeout(){
	typing=false
	socket.emit('typing', {user:userName, typing:false})
}

