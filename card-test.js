var console = require('console');
var Model = require('./card-lib').Model;
var Card  = require('./card-lib').Card;
var CardGroup  = require('./card-lib').CardGroup;

var m = new Model();
m.deal();
console.log(m.getHand());

var c0 = new Card("spades", "ace", 1);
var c1 = new Card("spades", "2", 2);
var c2 = new Card("spades", "4", 4);

var c3 = new Card("diamonds", "ace", 1);
var c4 = new Card("clubs", "ace", 1);

var g0 = new CardGroup();

console.log("Add c0: " + g0.addCard(c0));
console.log(g0);

console.log("Add c1: " + g0.addCard(c1));
console.log(g0);

console.log("Add c2: " + g0.addCard(c2));
console.log("Add c2: " + g0.addCard(c3));

var g1 = new CardGroup();
console.log("Add C0 to g1: " + g1.addCard(c0));
console.log("Add C3 to g1: " + g1.addCard(c3));
console.log("Add C4 to g1: " + g1.addCard(c4));
console.log("Add C2 to g1: " + g1.addCard(c2));

console.log(g1);
