const socket = io()

const $id  = Math.random().toString(36).substr(2, 9);

const userClass = ["user-1", "user-2", "user-3", "user-4", "user-5", "user-6"];  
const ramdomClass = userClass[Math.floor(Math.random()*userClass.length)];



const $msgForm = document.getElementById('sendMsg')
const $msgList = document.getElementById('messages')
const $name = document.getElementById('name')

let userName = ""
while (userName == "") {
  userName = prompt("Please enter your name")
}

$name.value = userName;
$name.style.backgroundColor = "#999999";
$name.style.pointerEvents = "none";

$msgForm.addEventListener('submit', (event) => {
	event.preventDefault()
  
  socket.emit('chatmsg', {msg: event.currentTarget.text.value, 
                          name: event.currentTarget.name.value, 
                          userId: $id, 
                          class: `${ramdomClass}`, 
                          time: new Date().toLocaleString() }, 
  )
  event.currentTarget.text.value = ''
})

socket.on('chatmsg', (data) => {
  const newMsg = document.createElement('li')
  $msgList.appendChild(newMsg).className = data.class
  newMsg.textContent = data.time + ' ' + data.name + ' said: '
  const newText = document.createElement('p')
  newMsg.appendChild(newText).id = "text"  
  newText.textContent =  data.msg 
})  

