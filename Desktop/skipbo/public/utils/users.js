const users = [];

//Join user to chat (adds user to array)
function userJoin(id, username, room){
    const user = {id, username, room};
    users.push(user);
    return user;
}

//get current user
function getCurrentUser(id){
    return users.find(user => user.id === id);
}

//user leaves chat (removes user from array)
function userLeave(id){
    const index = users.findIndex(user => user.id === id);
    if (index !== -1){
        return users.splice(index, 1)[0];
    }
}

// get room users
function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

function isValidName(name){
    return name!=="";
}

//maybe add an isRoomEmpty function that will allow
//me to figure out when to remove games

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    isValidName
}