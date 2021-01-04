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

//this will distribute the cards in the beginning, it will also redistribute cards throughout
class CardState{
    constructor(playerCount, playerTurn, PIDs){
        this.playerCount = playerCount;
        this.playerTurn = playerTurn;
        console.log("INSIDE CARD STATE", PIDs, typeof PIDs);
        this.PIDs = PIDs;
        this.gameState = [];
        this.middleCards = new CardPiles(false, 0, null);
    }


    //distributes cards for players
    distributeCardsSetUp(){

        var stockPileCount;

        for(var i = 0; i < this.playerCount; i++){
            console.log('INSIDE FOR LOOP', i, this.playerCount + 1);
            console.log("PIDS", this.PIDs);
            var temp = new CardPiles(true, i, this.PIDs[i]);
            this.gameState.push(temp);
        }

        if (2 <= this.playerCount <= 4) {
            stockPileCount = 30;
        }
        if (this.playerCount > 4){
            stockPileCount = 20;
        }
        console.log(this.gameState);
        //creates the player's piles
        this.gameState.forEach(function(player, x){
            while (player.stock_pile.length < stockPileCount){
                var randomCard = Math.floor(Math.random() * Object.keys(_CARDS).length) + 1;
                if (_CARDS[randomCard] - 1 !== 0){
                    player.stock_pile.push(randomCard);
                    _CARDS[randomCard]--;
                }
            }
            for (var x = 0; x < 5; x++){
                player.hand.push(player.stock_pile.shift());
            }
//            printCardDict();
        });
        console.log("HERE 2");

        //creates the middle pile
        for (var y in _CARDS){
            while (_CARDS[y] !== 0){
                this.middleCards.stock_pile.push(_CARDS[y]);
                _CARDS[y]--;
            }
        }
        console.log("GameState: ", this.gameState);
        shuffle(this.middleCards.stock_pile);
        // this.displayCards();
        // this.gameState[0].displayHandCards(); //these two lines are hardcoded. fix later
        // this.gameState[0].displayStockPile();
        // this.gameState[0].displayOtherPiles("personal");
        // this.middleCards.displayOtherPiles("shared");
        // this.middleCards.displayDrawCardCount();

    }

    displayCards(PID){
        var index;
        for (var i = 0; i < this.gameState.length; i++){
            if (this.gameState[i].getPID === PID){
                index = i;
            }
        }
        this.gameState[i].displayHandCards(); //these two lines are hardcoded. fix later
        this.gameState[i].displayStockPile();
        this.gameState[i].displayOtherPiles("personal");
        this.middleCards.displayOtherPiles("shared");
        this.middleCards.displayDrawCardCount();
    }

    //if cards == 0 during turn or at start of turn. does not pick up more cards in the middle of the turn
    updateCardInHand(){
        this.player = this.gameState[self.playerTurn - 1];
        while(this.player.hand.length < 5){
            this.player.hand.append(this.middleCards.stock_pile.shift());
        }
    }

}
