
// const rulesBtn = document.getElementById("rules");
const roomName = document.querySelector("#roomName");
const userList = document.querySelector("#playerList");
const homeDiv = document.querySelector("#home");
const waitingRoomDiv = document.querySelector("#waitingRoom");
const backBtn = document.querySelector("#backBtn");
const readyBtn = document.querySelector("#ready");
const card = document.querySelector(".card");

const socket = io();
const myStorage = window.localStorage;

const newBtn = document.getElementById("new");
const nameField = document.querySelector("#name");
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

//join existing game
const joinBtn = document.getElementById("join");
const joinCodeField = document.getElementById("joinCode");
joinBtn.addEventListener("click", function(){
    joinBtn.style.display = "none";
    joinCodeField.style.display = "inline";
    joinSubmitBtn.style.display = "inline";
});

const joinSubmitBtn = document.getElementById("joinSubmit");
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

backBtn.addEventListener("click", function(){
    switchToHomePage();
    socket.emit('leaves');
});

readyBtn.addEventListener("click", function(){
    socket.emit('startGame');
    location.href = "dummyUI.html";
});

socket.on('startGame', (playerCount, PIDs, userRoom) => {
    myStorage.setItem("playerCount", playerCount);
    myStorage.setItem("PIDs", PIDs);
    myStorage.setItem("roomNum", userRoom);
    location.href = `dummyUI.html`;
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

// message from server
socket.on('message', message => {
    console.log(message);
    // outputMessage(message);
});

const waitingRoomTitle = document.querySelector("#waitingRoomTitle");
function switchToWaitingRoom(){
    waitingRoomTitle.innerHTML = "Waiting Room";
    homeDiv.style.display = "none";
    waitingRoomDiv.style.display = "inline";
    backBtn.style.display = "inline";
}

function switchToHomePage(){
    waitingRoomTitle.innerHTML = " ";
    homeDiv.style.display = "inline";
    waitingRoomDiv.style.display = "none";
    backBtn.style.display = "none";
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

