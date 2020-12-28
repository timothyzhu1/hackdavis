const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
// const formatMessage = require('./public/utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers, isValidName} = require('./public/utils/users');
const {generateRoomCode, addRoom, removeRoom, isValidRoomCode} = require('./public/utils/rooms');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


//run when a client connects
io.on('connection', socket => {

    socket.on('createRoom', (username) => {
        const room = generateRoomCode();
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        addRoom(user.room);
        socket.emit('joined', 'Successfully joined');
        socket.emit('message', `${user.username} joined the Skip-Bo lobby!`);
    
        console.log(getRoomUsers(user.room));
        //broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit('message', `${user.username} has joined the chat`);

        //send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })

    });

    socket.on('joinRoom', ({username, room}) => {
        console.log(room);
        const user = userJoin(socket.id, username, room);
        // console.log();
        if(isValidRoomCode(room)){
            socket.join(user.room);
            console.log(socket.id, user.room);
            //welcome current user
            // socket.emit('message', formatMessage(botname, 'Welcome to ChatCord!'));
            socket.emit('joined', 'Successfully joined');
            socket.emit('message', `${user.username} joined the Skip-Bo lobby!`);
    
            console.log(getRoomUsers(user.room));
            //broadcast when a user connects
            socket.broadcast
                .to(user.room)
                .emit('message', `${user.username} has joined the chat`);
    
            //send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
    
        }
        else{
            socket.emit('invalidRoomCode', "The room code is invalid.")
        }

    });

    //listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io
            .to(user.room)
            .emit('message', formatMessage(user.username, msg));
    });

    //runs when client disconnects
    //this needs to be inside the socket.on()
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            io
                .to(user.room)
                .emit('message', `${user.username} has left the chat`);
            
                //send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
        })
        }
    });

});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));