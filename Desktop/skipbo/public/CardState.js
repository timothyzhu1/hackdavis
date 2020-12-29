

//this will distribute the cards in the beginning, it will also redistribute cards throughout
class CardState{
    constructor(playerCount, playerTurn){
        this.playerCount = playerCount;
        this.playerTurn = playerTurn;
        this.gameState = [];
        this.middleCards = new CardPiles(false, 0);
    }


    //distributes cards for players
    distributeCardsSetUp(){

        var stockPileCount;

        for(var i = 1; i < this.playerCount + 1; i++){
            var temp = new CardPiles(true, i);
            this.gameState.push(temp);
        }

        if (1 <= this.playerCount <= 4) {
            stockPileCount = 30;
        }
        if (this.playerCount > 4){
            stockPileCount = 20;
        }

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

        //creates the middle pile
        for (var i in _CARDS){
            while (_CARDS[i] !== 0){
                this.middleCards.stock_pile.push(_CARDS[i]);
                _CARDS[i]--;
            }
        }
        shuffle(this.middleCards.stock_pile);
        this.gameState[0].displayHandCards(); //these two lines are hardcoded. fix later
        this.gameState[0].displayStockPile();
        this.gameState[0].displayOtherPiles("personal");
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
