//handles all the card piles
class CardPiles{
    constructor(playerBool, playerNum, PID){
        this.stock_pile = [];
        this.other_piles = [[], [], [], []];
        this.PID = PID;
        this.isPlayer = playerBool;
        this.hand = [];
        this.playerNum = playerNum;
    }

    getPID(){
        return this.PID;
    }


    displayStockPile(){
        var stockPile = document.getElementById("stockPile");
        stockPile.textContent = this.stock_pile[0];
    }

    displayOtherPiles(pileType){
        if(pileType === "shared"){
            pileType = ".shared";
        }
        if(pileType === "personal"){
            pileType = ".personal"
        }
        var other = document.querySelectorAll(pileType);
        for(var i = 0; i < other.length; i++){
            if (this.other_piles[i].length){
                other[i].textContent = this.other_piles[i];
            } else {
                other[i].textContent = "n/a";
            }
        }
    }


    displayHandCards(){
        var handCards = document.querySelectorAll(".handCards");
        for(var i = 0; i < handCards.length; i++){
            handCards[i].textContent = this.hand[i];
        }
    }

    displayDrawCardCount(){
        var drawPile = document.getElementById("drawPile");
        drawPile.textContent = "(" + this.stock_pile.length + ")";
    }

    printStockPile(){
        console.log("\nStockpile\n");
        for (var i = 0; i < this.stock_pile.length; i++){
            console.log(this.stock_pile[i] + " ");
        }
        console.log("\n\n")
    }

    printHand(){
        console.log("\nHand\n");
        for (var i = 0; i < this.hand.length; i++){
            console.log(this.hand[i]);
        }
        console.log();
        console.log();
    }

    printCardPiles() {
        var stockpileOrDrawpile;
        var buildOrDiscard;

        if (this.isPlayer){
            stockpileOrDrawpile = "stockpile";
            buildOrDiscard = "discard";
            console.log("-- Player Number #" + this.playerNum + " --");
            console.log(stockpileOrDrawpile + " top card (" + this.stock_pile.length + "):" + this.stock_pile[0]);
        } else {
            buildOrDiscard = "build";
            console.log("draw pile(" + this.stock_pile.length + ")");
        }

        for (var i = 0; i < this.other_piles.length; i++){

            if (this.checkIfPileEmpty(this.other_piles[i])){
                console.log(buildOrDiscard + " pile #" + (i+1) + ": empty"); //not sure if i + 1 is possible here
            } else {
                console.log(buildOrDiscard + " pile #" + (i+1) + ": " + this.other_piles[i][0]);
            }

        }
        console.log("\n");

        if (this.isPlayer){
            console.log("your hand: ");
            for(var i=0; i < this.hand.length; i++){
                console.log(this.hand[i]);
            }
            console.log("\n\n");
        }
    }

    checkIfPileEmpty(pile){
        return pile.length === 0;
    }
}
