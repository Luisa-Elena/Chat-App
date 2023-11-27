const socket = io('ws://localhost:3500')

const activity = document.querySelector('.activity')
const msgInput = document.querySelector('#msg')
const nameInput = document.querySelector('#name')
const roomInput = document.querySelector('#room')

const firstPage = document.querySelector('.first-page')
const chatDisplay = document.querySelector('.chat-display')

function sendMessage(e) {
    e.preventDefault()
    if (msgInput.value && nameInput.value && roomInput.value) {
        socket.emit('message', {
            name: nameInput.value,
            text: msgInput.value,
        })
        msgInput.value = ""
    }
    msgInput.focus()
}
function enterRoom(e) {
    e.preventDefault()
    if (nameInput.value && roomInput.value) {
        socket.emit('enterRoom', {
            name: nameInput.value,
            room: roomInput.value,
        })
        msgInput.value = ""
    }
    msgInput.focus()
    firstPage.style.display = 'none'
    chatDisplay.style.display = 'block'
}

document.querySelector('.form-msg').addEventListener('submit', sendMessage)
document.querySelector('.form-name-room').addEventListener('submit', enterRoom)

msgInput.addEventListener('keypress', () => {
    socket.emit('activity', nameInput.value)
})

// Listen for messages 
socket.on("message", ({ name, text }) => {
    activity.textContent = ""
    const li = document.createElement('li')

    if(name === "information") {
        li.innerHTML = `<div class="post-center">${text}</div>`
    } else if (nameInput.value && name === nameInput.value) {
        li.innerHTML = `
            <div class="post-right-container">
                <div class="post-right-header"> ${name} </div>
                <div class="post-right-body"> ${text} </div>
            </div>`
    } else {
        li.innerHTML = `
        <div class="post-left-container">
            <div class="post-left-header"> ${name} </div>
            <div class="post-left-body"> ${text} </div>
        </div>`
    }

    if(name === '') {
        li.textContent = text
    } else {
        li.textContent
    }
    document.querySelector('ul').appendChild(li)

    var list = document.querySelector('ul')
    var wrapper = list.parentElement
    wrapper.scrollTop = list.scrollHeight
})

let activityTimer
socket.on("activity", (name) => {
    activity.textContent = `${name} is typing...`

    // Clear after 3 seconds 
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.textContent = ""
    }, 3000)
})