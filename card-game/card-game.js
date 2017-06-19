'use strict';
var console = require('console');
var readline = require('readline');

function print(printVar) {
    console.log(printVar);
}
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

class Card {
    constructor(number, suit){
        this.number = number;
        this.suit = suit;
        if (number === 1) {
            this.number = "ace";
        }
        else if (number === 11) {
            this.number = "jack";
        }
        else if (number === 12) {
            this.number = "queen";
        }
        else if (number === 13){
          this.number = "king";
        }
        else {
            this.number = this.number;
        }
    }
}

class cardGroup {
    constructor(name){
        this.group = [];
        this.name = name;
    }
    addCard(card){
        this.group.push(card);
    }

}

class Deck{
    constructor(){
        this.cards = [];
        for (var i = 1; i <= 4; i ++){
            for (var a = 1; a <= 13; a++){
                if (i === 1){
                    this.cards.push(new Card(a, "spade"));
                }
                else if (i === 2) {
                    this.cards.push(new Card(a, "diamond"));
                }
                else if (i === 3) {
                    this.cards.push(new Card(a, "clover"));
                }
                else {
                    this.cards.push(new Card(a, "heart"))
                }
            }
        }
        this.count = this.cards.length;
    }
    shuffle() {
        var i;
        for (i = 0; i < 100; i++) {
            var pos1 = getRndInteger(0, 51);
            var pos2 = getRndInteger(0, 51);
            var val1 = this.cards[pos1];
            this.cards[pos1] = this.cards[pos2];
            this.cards[pos2] = val1;
        }
    }
    deal(player){
        for (var i = 0; i <=6; i++) {
            player.cards.push(this.cards.pop());
        }
        this.cards.count=this.cards.length;
    }
    newCard(player){

    }
}

class Group {
    constructor(name){
        this.cards = [];
        this.name = name;
    }
    addToGroup(card, groupName) {
        if (groupName.cards[0].number === card.number) {
            groupName.cards.push(card);
        }
        else {
            return "error";
        }
    }

}

class Player {
    constructor(name) {
        this.name = name
        this.cards = [];
        this.groups= [];
    }
    showCards(){
        print(this.cards);
    }
    createGroup(card1,card2, groupName) {
        groupName = new Group;
        if (card1.number === card2.number) {
            groupName.cards.push(card1, card2);
            this.groups.push(groupName);
        }
        else {
            return "error";
        }
    }
}

class Game {
    constructor(players, deck){
        this.players = [];
        for (var a = 1; a <= players; a++ ) { //Couldn't figure out how to do "Player" i
            if (a === 1){
                var Player1 = new Player("Player 1");
                this.players.push(Player1);
                deck.deal(Player1);
            }
            else if (a === 2){
                var Player2 = new Player("Player 2");
                this.players.push(Player2);
                deck.deal(Player2);
            }
            else if (a === 3) {
                var Player3 = new Player("Player 3");
                this.players.push(Player3);
                deck.deal(Player3);
            }
            else{
                print("The game cannot handle so may players");
            }
        }
    }

    turn(input, player){
        if (input ===1) {
            rl.question("Group Number >", (group) => player[0].groups[group - 1].addCard(group));
        }
        else if (input === 2){
            rl.question("Group Number >", (name) => player[0].groups.push(new Group(name)));
        }
        else if (input === 3) {
            player.cards.push(deck.cards.pop());
        }
        else {
            print("This is an invalid input");
        }
    }

    playGame(){

        var input = 0;
        rl.question("1. Add to a group 2. New group 3. Take a card 4. ", (input) => print(input));
        print(input);
        this.turn(input, this.players[0]);
/*
        while (deck.count>0){
            for (var i = 0; i <= this.players.length; i++ ){
                var turn = this.players[i];//turn is whose turn it is
                print(turn);
                var input = 0;
                //while ((input !== 4) && (input !== 3)){
                print();
                rl.question("1. Add to a group 2. New group 3. Take a card 4. ", (input) => print(input));
                print(input);
            }
        }
        */
    }
}


var deck = new Deck();
print(deck);
deck.shuffle();
print(deck);


var game = new Game(3, deck);

game.playGame();

