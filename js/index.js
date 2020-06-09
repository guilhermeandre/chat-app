const socket = io()

const $id  = Math.random().toString(36).substr(2, 9);


const color = ["user-1", "user-2", "user-3", "user-4", "user-5"];
const ramdomClass = color[Math.floor(Math.random()*color.length)];

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
                          class: `${ramdomClass}` }, 
  )
	event.currentTarget.text.value = ''
})

socket.on('chatmsg', (data) => {
  const newMsg = document.createElement('li')
  $msgList.appendChild(newMsg).className = data.class
  newMsg.textContent = data.name + ' said: '
  const newText = document.createElement('p')
  newMsg.appendChild(newText).id = "text"  
  newText.textContent =  data.msg 
})  

