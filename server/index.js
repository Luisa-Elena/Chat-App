import express from 'express'
import { Server } from "socket.io"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500

const app = express()

app.use(express.static(path.join(__dirname, "public")))

const expressServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

const UsersList = {
    users: [], //array of user objects with id = socket.id, name, room for each user
    setUsers: function (newUsersArray) {
        this.users = newUsersArray
    }
}

io.on('connection', socket => {
    //console.log(`User ${socket.id} connected`)

    //right after connection
    //emit - only to the user
    //broadcast - to the other users
    socket.emit('message', {
        name: 'information',
        text:"Welcome to Chat-App!"
    })
    //socket.broadcast.emit('message', `User ${socket.id} connected`)

    socket.on('enterRoom', ({name, room}) => {

        const user = UsersList.users.find(user => user.id === socket.id)
        const prevRoom = user?.room

        //disconnect from previous room
        if(prevRoom) {
            socket.broadcast.to(prevRoom).emit('message', {
                name: 'information',
                text: `${user.name} has left this chat-room`
            })
            socket.leave(prevRoom)
        }

        //set the users list with the new room
        UsersList.setUsers([
            ...UsersList.users.filter(user => user.id !== socket.id),
            {
                id: socket.id,
                name,
                room,
            }
        ])

        socket.join(room)
        socket.emit('message', {
            name: 'information',
            text: `You entered room ${room}`,
        })
        socket.broadcast.to(room).emit('message', {
            name: 'information',
            text: `${name} has entered the chat-room`,
        })
    })

    // Listening for a message event 
    socket.on('message', ({ name, text }) => {
        const user = UsersList.users.find(user => user.id === socket.id)
        if(user) {
            io.to(user.room).emit('message', {
                name,
                text,
            })
        }
    })

    // When user disconnects - to all others 
    socket.on('disconnect', () => {
        const user = UsersList.users.find(user => user.id === socket.id)
        if(user) {
            socket.broadcast.emit('message', {
                name:'information',
                text: `${user.name} has disconnected`,
            })
        }
    })

    // Listen for activity 
    socket.on('activity', (name) => {
        const user = UsersList.users.find(user => user.id === socket.id)
        if(user) {
            socket.broadcast.to(user.room).emit('activity', name)
        }
    })
})