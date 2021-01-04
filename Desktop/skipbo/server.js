const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {userJoin, addHost, getHost, getCurrentUser, userLeave, getRoomCount, getRoomUsers, isValidName, getRoomIDs} = require('./public/utils/users');
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
        addHost(user.username);
        socket.emit('joined', 'Successfully joined');
        socket.emit('message', `${user.username} joined the Skip-Bo lobby!`);
    
        //broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit('message', `${user.username} has joined the lobby`);

        //send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })

    });

    socket.on('joinRoom', ({username, room}) => {
        console.log(room);
        const user = userJoin(socket.id, username, room);
        if(isValidRoomCode(room)){
            socket.join(user.room);
            console.log(socket.id, user.room);
            //welcome current user
            socket.emit('joined', 'Successfully joined');
            socket.emit('message', `${user.username} joined the Skip-Bo lobby!`);
    
            console.log(getRoomUsers(user.room));
            //broadcast when a user connects
            socket.broadcast
                .to(user.room)
                .emit('message', `${user.username} has joined the lobby`);
    
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

    socket.on('startGame', () => {

        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', user);

        const playerCount = getRoomCount(user.room);
        io.to(user.room).emit('message', playerCount);
        if (playerCount >= 2){
            io.to(user.room).emit('startGame', playerCount, getRoomIDs(user.room), user.room);
        }
        else{
            io
                .to(user.room)
                .emit('message', 'Not enough players');
        }
        //set up the game here
    });

    //listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io
            .to(user.room)
            .emit('message', formatMessage(user.username, msg));
    });

    socket.on('distributeCards', (cardState, userRoom) => {
        const user = getCurrentUser(socket.id);
        console.log(socket.id);
        console.log("USERRR", user);
        io.to(userRoom).emit('distributeCards', cardState, user.id);
    });

    socket.on("leaves", () =>{
        const user = userLeave(socket.id);
        if(user){
            io
                .to(user.room)
                .emit('message', `${user.username} has left the lobby`);
            
                //send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
        })
        }
    });

    //runs when client disconnects
    //this needs to be inside the socket.on()
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            io
                .to(user.room)
                .emit('message', `${user.username} has left the lobby`);
            
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

