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

class Card {
    constructor(number, suit){
        this.number = number;
        this.suit = suit;
        if (number = 1) {
            this.number = "ace";
        }
        else if (number = 11) {
            this.number = "jack";
        }
        else if (number = 12) {
            this.number = "queen";
        }
        else {
            this.number = "king";
        }
    }
}

class cardGroup {
    constructor(){
        this.group = [];
    }
    addCard(card){
        this.group.push(card);
    }
}

class Deck{
    constructor(){
        this.cards = [];
        this.count = this.cards.length;
        for (var i = 1; i <= 4, i ++){
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
    }
    shuffle(){
        var shuffled = [];
        while (shuffled.length < 51) {
            var number = (Math.floor(Math.random() * 51 )+ 1);
            if (this.cards[number] === 0) {
                continue;
            }
            else {
                shuffled.push(this.cards[number]);
                this.cards[number]= 0;
            }
        }
        this.cards = shuffled;
        this.cards.count = this.cards.length;
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
    constructor(){
        this.cards = [];
    }
}

class Player {
    constructor() {
        this.cards = [];
        this.groups= [];
    }
    showCards(){
        print(this.cards);
    }
    createGroup(card1,card2, groupName){
        groupName = new Group;
        if (card1.number === card2.number){
            groupName.cards.push(card1, card2);
            this.groups.push(groupName);
        }
        else {
            return "error";
        }
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
/*
class Game {
    constructor(deck){
        this.cards = deck.cards;
        this.players = [];
    }

    dealCards(players, deck){
        for (var i = 0; i <= this.players.length; i++ ){
            this.player[i]
        }
        deck.count = deck.count - 1;
    }

    playGame(){
        while (deck.count>0){
            for (var i = 0; i <= this.players.length; i++ ){
                this.player[i].move();

            }
        }
    }
}
*/


