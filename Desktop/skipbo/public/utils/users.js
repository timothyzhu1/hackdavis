const users = [];
var hostUsername = "";

//Join user to chat (adds user to array)
function userJoin(id, username, room){
    const user = {id, username, room};
    users.push(user);
    return user;
}

function addHost(username){
    hostUsername = username;
}

function changeHost(){
}

//get current user
function getCurrentUser(id){
    return users.find(user => user.id === id);
}

function getHost(){
    return hostUsername;
}

//user leaves chat (removes user from array)
function userLeave(id){
    const index = users.findIndex(user => user.id === id);
    if (index !== -1){
        return users.splice(index, 1)[0];
    }
}

function getRoomCount(room){
    return users.filter(user => user.room === room).length;
}

// get room users
function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

function getRoomIDs(room){
    var lst = users.filter(user => user.room === room);
    var newlst = new Array();
    for (var i = 0; i < lst.length; i++){
        newlst.push(lst[i].id);
    }
    return newlst
}

function isValidName(name){
    return name!=="";
}

//maybe add an isRoomEmpty function that will allow
//me to figure out when to remove games

module.exports = {
    userJoin,
    addHost,
    getHost,
    getCurrentUser,
    userLeave,
    getRoomCount,
    getRoomUsers,
    isValidName,
    getRoomIDs
}