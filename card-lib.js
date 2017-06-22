class Card {
  constructor(suite, name, value) {
    this.suite = suite;
    this.name  = name;
    this.value = value;
    this.img = "img/" + name + "_of_" + suite + ".png";
  }
  getValue() {
    return this.name + "_of_" + this.suite;
  }
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

class CardGroup {
  constructor() {
    this.group = [];
    this.grouptype = 'none';
  }

  // add a new card (if possible), return true/false to indicate success
  addCard(newCard) {
    if (this.group.length == 0) {
      this.group.push(newCard);
      return true;
    }

    // compare to last card in group
    var lastCard = this.group[this.group.length - 1];
    if (this.group.length == 1) {
      // determine if we do same of a kind or a running suite
      if (lastCard.value == newCard.value) {
	this.grouptype = 'samesuite';
	this.group.push(newCard);
      } else if ((lastCard.suite == newCard.suite) &&
	         (newCard.value == lastCard.value + 1)) {
	this.grouptype = 'runningsuite';
	this.group.push(newCard);
      } else {
	return false;
      }
    } else if ((this.grouptype == 'samesuite') &&
               (lastCard.value == newCard.value)) {
      this.group.push(newCard);
    } else if (
	(this.grouptype == 'runningsuite') &&
	(newCard.value == lastCard.value + 1)) {
      this.group.push(newCard);
    } else {
      return false;
    }

    return true;
  }
}


class Deck {
  createSuite(suite) {
    var i;
    for (i=1; i <= 13; i++) {
      var name = i.toString();
      if (i == 1) { name ="ace"; }
      else if (i == 11) { name = "jack"; }
      else if (i == 12) { name = "queen"; }
      else if (i == 13) { name = "king"; }
      this.deck.push(new Card(suite, name, i));
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
    this.groups = {};
    this.cards  = {};
    this.hand   = [];
  }

  deal() {
    this.hand = this.deck.deal(7);
    var i;
    for (i=0; i < this.hand.length; i++) {
      this.cards[this.hand[i].getValue()] = this.hand[i];
    }
    console.log(this.hand);
  }

  gofish() {
    var card = this.deck.deal(1);
    console.log("go fish: " + card[0].getValue());
    this.cards[card[0].getValue()] = card[0];
    this.hand.push(card[0]);
    return card[0];
  }

  getHand() { return this.hand; }

  addCardToGroup(cardId, groupId) {
    if (this.groups[groupId] === undefined) {
      this.groups[groupId] = new CardGroup();
    }
    var group = this.groups[groupId];
    var card  = this.cards[cardId];
    return group.addCard(card);
  }
}

module.exports = { Model, Deck, Card, CardGroup};
