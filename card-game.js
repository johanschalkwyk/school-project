var console = require('console');

class Card {
  constructor(suite, value) {
    this.suite = suite;
    this.value = value;
    this.img = "img/" + value + "_of_" + suite + ".png";
  }
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

class Deck {
  createSuite(suite) {
    var i;
    for (i=0; i < 13; i++) {
      var value = i.toString();
      if (i == 0) { value ="ace"; }
      else if (i == 10) { value = "jack"; }
      else if (i == 11) { value = "queen"; }
      else if (i == 12) { value = "king"; }
      this.deck.push(new Card(suite, value));
    }
  }

  constructor() {
    this.deck = [];
    this.createSuite("hearts");
    this.createSuite("clubs");
    this.createSuite("spades");
    this.createSuite("diamonds");
  }

  shuffle() {
    var i;
    for (i = 0; i < 100; i++) {
      var pos1 = getRndInteger(0, 51);
      var pos2 = getRndInteger(0, 51);
      var val1 = this.deck[pos1];
      this.deck[pos1] = this.deck[pos2];
      this.deck[pos2] = val1;
    }
  }


  deal(numCards) {
    var hand = [];
    var i;
    for (i = 0; i < numCards && this.deck.length > 0; i++) {
      hand.push(this.deck.pop());
    }
    console.log("deck size: " + this.deck.length);
    return hand;
  }
}

var deck = new Deck();
deck.shuffle();

deck.deal(7);
deck.deal(7);
deck.deal(7);
deck.deal(7);
deck.deal(7);
deck.deal(7);
deck.deal(7);
var hand = deck.deal(7);
console.log(hand);
