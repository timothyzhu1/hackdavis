
const endTurnBtn = document.querySelector("#endTurn");
const distributeCards = document.querySelector("#distribute");

const socket = io();
const myStorage = window.localStorage;

endTurnBtn.addEventListener("click", function(){
    console.log("here!");
});

distributeCards.addEventListener("click", function(){
    const playerCount = parseInt(myStorage.getItem("playerCount"));
    const PIDs = myStorage.getItem("PIDs");

    var turn = Math.floor(Math.random() * playerCount);
    console.log("NEW CARD STATE", playerCount, turn, PIDs);
    var cardState = new CardState(playerCount, turn, PIDs);
    // cardState.distributeCardsSetUp();
    var userRoom = parseInt(myStorage.getItem("userRoom"));
    socket.emit("distributeCards", cardState, userRoom);
    // startGame(playerCount, PIDs);
});

socket.on('distributeCards', (cardState) =>{
    cardState.distributeCardsSetUp();
    cardState.displayCards();
});



function startGame(players, PIDs){
    console.log("Player count: " + players);

    var turn = Math.floor(Math.random() * players);
    console.log("NEW CARD STATE", players, turn, PIDs);
    var status = new CardState(players, turn, PIDs);
    status.distributeCardsSetUp();

}

