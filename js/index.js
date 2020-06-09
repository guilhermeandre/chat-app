const socket = io()

const $msgForm = document.getElementById('sendMsg')
const $msgList = document.getElementById('messages')

$msgForm.addEventListener('submit', (event) => {
	event.preventDefault()
  
	socket.emit('chatmsg', {msg: event.currentTarget.text.value})
	event.currentTarget.text.value = ''
})

socket.on('chatmsg', (data) => {
  const newMsg = document.createElement('li')
  $msgList.appendChild(newMsg)
  newMsg.textContent = data.msg
})