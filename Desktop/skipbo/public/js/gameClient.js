
const endTurnBtn = document.querySelector("#endTurn");
const distributeCards = document.querySelector("#distribute");
const socket = io();



endTurnBtn.addEventListener("click", function(){
    console.log("here!");
});

distributeCards.addEventListener("click", function(){
    startGame();
});

// socket.on("startGame", () => {
//     console.log("in game client");
// });

function startGame(players){
    var playerCount = players.length;
    console.log("Player count: " + playerCount);

    var turn = Math.floor(Math.random() * playerCount);
    var status = new CardState(playerCount, turn);
    status.distributeCardsSetUp();

}


