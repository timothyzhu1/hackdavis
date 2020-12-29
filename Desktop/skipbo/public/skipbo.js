/*
js checklist:
- transfer python code into this file

taken from python checklist:
- put card into discard pile
- reshuffles a full build pile back into the draw pile

- change build input from providing index, to providing the number?
- trigger win state when a player wins
- try/accepts that will not accept wrong inputs?

*/


function dragstart_handler(ev) {
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
}

function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
}

function drop_handler(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("application/my-app");
    ev.target.innerText = document.getElementById(data).innerText;
}

var _CARDS = {
    1: 12,
    2: 12,
    3: 12,
    4: 12,
    5: 12,
    6: 12,
    7: 12,
    8: 12,
    9: 12,
    10: 12,
    11: 12,
    12: 12,
    13: 18 //skipbos
};

function printCardDict(){
    console.log("----------------------REMAINING CARDS-------------------------------");
    for(var i in _CARDS){
        console.log(i + ": " + _CARDS[i]);
    }
    console.log("--------------------------------------------------------------------");
}



//fisher-yates shuffle algorithm, taken from stack overflow
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


//initializes the start of the game.
function startGame(players){
    var playerCount = players.length;
    console.log("Player count: " + playerCount);

    var turn = Math.floor(Math.random() * playerCount);
    var status = new CardState(playerCount, turn);
    status.distributeCardsSetUp();

}

// start();
module.exports = {
    startGame
}


////this will distribute the cards in the beginning, it will also redistribute cards throughout
//class CardState{
//    constructor(playerCount, playerTurn){
//        this.playerCount = playerCount;
//        this.playerTurn = playerTurn;
//        this.gameState = [];
//        this.middleCards = new CardPiles(false, 0);
//    }
//
//
//    //distributes cards for players
//    distributeCardsSetUp(){
//
//        var stockPileCount;
//
//        for(var i = 1; i < this.playerCount + 1; i++){
//            var temp = new CardPiles(true, i);
//            this.gameState.push(temp);
//        }
//
//        if (1 <= this.playerCount <= 4) {
//            stockPileCount = 30;
//        }
//        if (this.playerCount > 4){
//            stockPileCount = 20;
//        }
//
//        //creates the player's piles
//        this.gameState.forEach(function(player, x){
//            while (player.stock_pile.length < stockPileCount){
//                var randomCard = Math.floor(Math.random() * Object.keys(_CARDS).length) + 1;
//                if (_CARDS[randomCard] - 1 !== 0){
//                    player.stock_pile.push(randomCard);
//                    _CARDS[randomCard]--;
//                }
//            }
//            for (var x = 0; x < 5; x++){
//                player.hand.push(player.stock_pile.shift());
//            }
////            printCardDict();
//        });
//
//        //creates the middle pile
//        for (var i in _CARDS){
//            while (_CARDS[i] !== 0){
//                this.middleCards.stock_pile.push(_CARDS[i]);
//                _CARDS[i]--;
//            }
//        }
//        shuffle(this.middleCards.stock_pile);
//        this.gameState[0].displayHandCards(); //these two lines are hardcoded. fix later
//        this.gameState[0].displayStockPile();
//        this.gameState[0].displayOtherPiles("personal");
//        this.middleCards.displayOtherPiles("shared");
//        this.middleCards.displayDrawCardCount();
//
//    }
//
//    //if cards == 0 during turn or at start of turn. does not pick up more cards in the middle of the turn
//    updateCardInHand(){
//        this.player = this.gameState[self.playerTurn - 1];
//        while(this.player.hand.length < 5){
//            this.player.hand.append(this.middleCards.stock_pile.shift());
//        }
//    }
//
//}
//
////handles all the card piles
//class CardPiles{
//    constructor(playerBool, playerNum){
//        this.stock_pile = [];
//        this.other_piles = [[], [], [], []];
//
//        this.isPlayer = playerBool;
//        this.hand = [];
//        this.playerNum = playerNum;
//    }
//
////    createEventListeners(){
////    }
//
//
//    displayStockPile(){
//        var stockPile = document.getElementById("stockPile");
//        stockPile.textContent = this.stock_pile[0];
//    }
//
//    displayOtherPiles(pileType){
//        if(pileType === "shared"){
//            pileType = ".shared";
//        }
//        if(pileType === "personal"){
//            pileType = ".personal"
//        }
//        var other = document.querySelectorAll(pileType);
//        for(var i = 0; i < other.length; i++){
//            if (this.other_piles[i].length){
//                other[i].textContent = this.other_piles[i];
//            } else {
//                other[i].textContent = "n/a";
//            }
//        }
//    }
//
//
//    displayHandCards(){
//        var handCards = document.querySelectorAll(".handCards");
//        for(var i = 0; i < handCards.length; i++){
//            handCards[i].textContent = this.hand[i];
//        }
//    }
//
//    displayDrawCardCount(){
//        var drawPile = document.getElementById("drawPile");
//        drawPile.textContent = "(" + this.stock_pile.length + ")";
//    }
//
//    printStockPile(){
//        console.log("\nStockpile\n");
//        for (var i = 0; i < this.stock_pile.length; i++){
//            console.log(this.stock_pile[i] + " ");
//        }
//        console.log("\n\n")
//    }
//
//    printHand(){
//        console.log("\nHand\n");
//        for (var i = 0; i < this.hand.length; i++){
//            console.log(this.hand[i]);
//        }
//        console.log();
//        console.log();
//    }
//
//    printCardPiles() {
//        var stockpileOrDrawpile;
//        var buildOrDiscard;
//
//        if (this.isPlayer){
//            stockpileOrDrawpile = "stockpile";
//            buildOrDiscard = "discard";
//            console.log("-- Player Number #" + this.playerNum + " --");
//            console.log(stockpileOrDrawpile + " top card (" + this.stock_pile.length + "):" + this.stock_pile[0]);
//        } else {
//            buildOrDiscard = "build";
//            console.log("draw pile(" + this.stock_pile.length + ")");
//        }
//
//        for (var i = 0; i < this.other_piles.length; i++){
//
//            if (this.checkIfPileEmpty(this.other_piles[i])){
//                console.log(buildOrDiscard + " pile #" + (i+1) + ": empty"); //not sure if i + 1 is possible here
//            } else {
//                console.log(buildOrDiscard + " pile #" + (i+1) + ": " + this.other_piles[i][0]);
//            }
//
//        }
//        console.log("\n");
//
//        if (this.isPlayer){
//            console.log("your hand: ");
//            for(var i=0; i < this.hand.length; i++){
//                console.log(this.hand[i]);
//            }
//            console.log("\n\n");
//        }
//    }
//
//    checkIfPileEmpty(pile){
//        return pile.length === 0;
//    }
//}


//figure out what this was for
//function addEventsToStacks(){
//    var sharedStack = document.querySelectorAll("#sharedStack");
//    for(var i = 0; i < sharedStack.length; i++){
//        sharedStack[i].addEventListener("click", function(){
//
//        });
//    }
//}




//cards = new CardPiles(false, 4);
//cards.printStockPile();
//cards.printHand();



// the following 3 functions were created with help from:
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
//function dragstart_handler(ev) {
//    ev.dataTransfer.setData("application/my-app", ev.target.id);
//    ev.dataTransfer.dropEffect = "move";
//}
//
//function dragover_handler(ev) {
//    ev.preventDefault();
//    ev.dataTransfer.dropEffect = "move"
//}
//
//function drop_handler(ev) {
//    ev.preventDefault();
//    var data = ev.dataTransfer.getData("application/my-app");
//    ev.target.innerText = document.getElementById(data).innerText;
//}