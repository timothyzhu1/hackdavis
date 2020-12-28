const rooms = [];

function generateRoomCode(){
    const roomCode = Math.floor(Math.random() * 100000);
    if(!rooms.includes(roomCode)){
        return roomCode;
    }
    else{
        return generateRoomCode();
    }
}

function addRoom(room){
    rooms.push(room)
}

function removeRoom(room){
    rooms.pop(room);
}

function isValidRoomCode(room){
    console.log(rooms, room);
    return rooms.includes(room);
}


module.exports = {
    generateRoomCode,
    addRoom,
    removeRoom,
    isValidRoomCode
}