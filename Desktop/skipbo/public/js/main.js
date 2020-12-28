// const { isValidName } = require("../utils/users");

const newBtn = document.getElementById("new");
const joinBtn = document.getElementById("join");
const joinCodeField = document.getElementById("joinCode");
const joinSubmitBtn = document.getElementById("joinSubmit");
const rulesBtn = document.getElementById("rules");
const nameField = document.querySelector("#name");
const roomName = document.querySelector("#roomName");
const userList = document.querySelector("#playerList");
const homeDiv = document.querySelector("#home");
const waitingRoomDiv = document.querySelector("#waitingRoom");

const socket = io();

//click start new game
newBtn.addEventListener("click", function(){
    const username = nameField.value;
    if(isValidName(username)){
        socket.emit('createRoom', username);
    }
    else{
        console.log("invalid");
        nameField.classList.add("shake");
    }
});


joinBtn.addEventListener("click", function(){
    joinBtn.style.display = "none";
    joinCodeField.style.display = "inline";
    joinSubmitBtn.style.display = "inline";
});

joinSubmitBtn.addEventListener("click", function(){
    const username = nameField.value;
    const room = parseInt(joinCodeField.value, 10);
    if(isValidName(username)){
        socket.emit('joinRoom', {username, room});
    }
    else{
        console.log("invalid name");
        nameField.classList.add("shake"); 
    }
});


//get room and users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputRoomUsers(users);
});

socket.on('invalidRoomCode', message => {
    console.log(message);
});

socket.on('joined', message => {
    switchToWaitingRoom();
});


function switchToWaitingRoom(){
    const waitingRoomTitle = document.querySelector("#waitingRoomTitle");
    waitingRoomTitle.innerHTML = "Waiting Room";
    homeDiv.style.display = "none";
    waitingRoomDiv.style.display = "inline";
}

// add room name to DOM
function outputRoomName(room){
    roomName.innerText = room;
}

// // add names to DOM
function outputRoomUsers(users){
    userList.innerHTML = `
        ${users.map(user => `<p>${user.username}</p>`).join('')}
    `;
}

function isValidName(name){
    return name!=="";
}

// message from server
socket.on('message', message => {
    console.log(message);
    // outputMessage(message);

    //scroll down every time message is received
    // chatMessages.scrollTop = chatMessages.scrollHeight;

});

// function isValidRoomCode(room){

// }

// //message submit
// chatForm.addEventListener('submit', (e) =>{
//     //stops the form from submitting
//     e.preventDefault();

//     //get message text
//     // const msg = e.target.elements.msg.value;
    
//     //emit message to server
//     socket.emit('chatMessage', msg); //UPDATE

//     //clear input
//     // e.target.elements.msg.value = '';
//     // e.target.elements.msg.focus();

// });

//output message to DOM
// function outputMessage(message){
//     const div = document.createElement('div');
//     div.classList.add('message');
//     div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
//     <p class="text">
//         ${message.text}
//     </p>`;
//     document.querySelector('.chat-messages').appendChild(div);
// }

