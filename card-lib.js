class Card {
  constructor(suite, value) {
    this.suite = suite;
    this.value = value;
    this.img = "img/" + value + "_of_" + suite + ".png";
  }
  getValue() {
    return this.value + "_of_" + this.suite;
  }
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

class Deck {
  createSuite(suite) {
    var i;
    for (i=1; i <= 13; i++) {
      var value = i.toString();
      if (i == 1) { value ="ace"; }
      else if (i == 11) { value = "jack"; }
      else if (i == 12) { value = "queen"; }
      else if (i == 13) { value = "king"; }
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
    console.log(this.deck.length);
    for (i = 0; i < 200; i++) {
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

class Model {
  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();
    this.deck.deal(1);
  }

  deal() {
    this.hand = this.deck.deal(7);
    console.log(this.hand);
  }

  gofish() {
    var card = this.deck.deal(1);
    this.hand.push(card);
    return card[0];
  }

  getHand() { return this.hand; }
}

module.exports = Model;
