require('dotenv').config();
const express = require('express')
const http = require('http')
const cors = require('cors')
const socketIo = require('socket.io');
const axios = require('axios')
const SERVER_PORT = process.env.SERVER_PORT || 5300;

const app = express()
app.use(express.json()); // json parsing
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5200",
        methods: ["GET", "POST"]
    }
})


const userList = {}
io.on('connection', (socket) => {
    console.log('New client connected to server');
    console.log(`New Socket connection: ${socket.id}`)

    socket.on('disconnect', (reason) => {
        console.log(`Client disconnected: ${reason}`)
    })
    
    socket.on('register_user', (username) => {
        userList[username] = socket.id;
        console.log(`User registered to direct chat: ${username}`)
    })

    socket.on('deregister_user', (username) => {
        delete userList[username];
        console.log(`User deregistered from direct chat: ${username}`)
    })

    // multi-user chat: requires emitting the message
    socket.on('private_message', async (data) => {
        try {
            data.senderId = socket.id // sender's id
            console.log(JSON.stringify(data))
            let fromUserIsOnline = data.from_user in userList;
            let toUserIsOnline = data.to_user in userList;
            if(fromUserIsOnline && toUserIsOnline){
                await axios.post('http://localhost:5200/api/private-messages', data)
                io.to(userList[data.from_user]).emit('private_message', data);
                io.to(userList[data.to_user]).emit('private_message', data);
            } else {
                socket.emit('user_not_found')
            }

        
        } catch (err) {
            console.log(err)
        }
    // broadcast = only to all others (not sender)
    })

    // !!
    // socket.send = socket to socket
    // io (server) .emit = to everyone (including sender)
    // socket.broadcast.emit = to everyone but NOT sender

    socket.on('join_group', (data) => {
        console.log(`${data.username} joined ${data.room}`)
        data.message = `${data.username} joined the chat.`
        data.from_user = "ChatBot"
        socket.join(data.room) // joining a group
        io.to(data.room).emit('group_message', data)

    })

    socket.on('leave_group', (data) => {
        console.log(`${data.username} left ${data.room}`)
        data.message = `${data.username} left the chat.`
        data.from_user = "ChatBot"
        socket.leave(data.room) // joining a group
        io.to(data.room).emit('group_message', data)
    })

    // data must include group name
    socket.on('group_message', (data) =>{
        console.log(JSON.stringify(data))

        axios.post('http://localhost:5200/api/group-messages', data)

        // send group msg to everyone
        io.to(data.room).emit('group_message', data)
    })
})

server.listen(SERVER_PORT, () => console.log(`Chat Server running on port ${SERVER_PORT} ...`))

module.exports = server;