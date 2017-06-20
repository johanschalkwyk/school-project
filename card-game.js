var $       = require('jquery');
var jqui    = require('jquery-ui');
var console = require('console');

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

class View {
  constructor() {
    this.handview   = $("#hand");
    this.cardgroups = $("#cardgroups");
  }

  addCard(card) {
    var html = "<div name=\"" + card.getValue() +
	"\" class='card ui-widget'><img class='cardimage' src='img/" +
	card.getValue() + ".png'></div>";
    console.log(html);

    var newHtml = this.handview.html() + html;
    this.handview.empty().append(newHtml);
  }

  showHand(hand) {
    // Add cards to the gallery
    this.handview.empty();
    var i;
    for (i=0; i < hand.length; i++) {
      this.addCard(hand[i]);
    }
    sleep(10);
  }

  updateDraggable() {
    $( "#hand div.card" ).draggable();
  }

  updateDroppable() {
    $( "#cardgroups div.groupbox" ).droppable({
      accept: "#hand div.card",
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function( event, ui ) {
        $( this ).addClass( "ui-state-highlight" )
        console.log("drop box name: " + $(this).attr("name"));
        console.log("card name    : " + ui.draggable.attr("name"));
     }
   });
  }
}

model = new Model();

// controller
$(document).ready(function() {
  view  = new View();

  $("#newgame").click(function() {
    model.deal();
    view.showHand(model.getHand());
    view.updateDraggable();
    view.updateDroppable();
  });

  $("#gofish").click(function() {
    view.addCard(model.gofish());
    view.updateDraggable();
    view.updateDroppable();
  });
});
