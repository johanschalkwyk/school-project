'use strict';

var console = require('console');

function print(printVar) {
    console.log(printVar);
}

class Card {
    constructor(number, suit){
        this.number = number;
        this.suit = suit;
        if (this.number == 1) {
            this.number = "ace";
        }
        else if (this.number == 11) {
            this.number = "jack";
        }
        else if (this.number == 12) {
            this.number = "queen";
        }
        else if (this.number == 13) {
            this.number = "king";
        }
        else {
            return "error";
        }
    }
}

class Deck{
    constructor(){
        this.cards = [];
        for (var i = 1; i <= 4; i++){
            for (var a = 1; a <= 13; a++){
                if (i == 1){
                    this.cards.push(new Card(a, "spade"));
                }
                else if (i == 2) {
                    this.cards.push(new Card(a, "diamond"));
                }
                else if (i == 3) {
                    this.cards.push(new Card(a, "clover"));
                }
                else {
                    this.cards.push(new Card(a, "heart"))
                }
            }
        }
     //   this.cards.push(0);
        this.count = this.cards.length;
    }

    shuffle(){
        var shuffled = [];
        while (shuffled.length < 51) {
            var number = (Math.floor(Math.random() * 51 +1 ));
            if (this.cards[number] === 0) {
               // print(number);
                continue;
            }
            else {
                shuffled.push(this.cards[number]);
                this.cards[number]= 0;
            }
            print(shuffled.length);
        }
        print("length: " + shuffled.length);
        this.cards = shuffled;
        this.cards.count = this.cards.length;
    }

    deal(player){
        for (var i = 0; i <=6; i++) {
            player.cards.push(this.cards.pop());
        }
        this.cards.count=this.cards.length;
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
        if (groupName.cards[0].number = card.number) {
            groupName.cards.push(card);
        }
        else {
            return "error";
        }
    }
}

var deck = new Deck();
print(deck);
deck.shuffle();
print(deck);
var player1 = new Player();
deck.deal(player1);
player1.showCards();