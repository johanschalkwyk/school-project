var console = require('console');

class Card {
  constructor(suite, value) {
    this.suite = suite;
    this.value = value;
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
      if (i == 0) { value ="Ace"; }
      else if (i == 10) { value = "Jack"; }
      else if (i == 11) { value = "Queen"; }
      else if (i == 12) { value = "King"; }
      this.deck.push(new Card(suite, value));
    }
  }

  constructor() {
    this.deck = [];
    this.createSuite("Hearts");
    this.createSuite("Clubs");
    this.createSuite("Spades");
    this.createSuite("Diamonds");
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
    return hand;
  }
}

var deck = new Deck();
deck.shuffle();

var hand = deck.deal(7);
console.log(hand);
