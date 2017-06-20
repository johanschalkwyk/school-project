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
    this.deck.deal(1);
  }

  deal() {
    this.hand = deck.deal(7);
    console.log(this.hand);
  }
}

class View {
  constructor(model) {
    this.model = model;
    this.gallery = $("#gallery");
    this.cardgroup = $("#cardgroup");
    showHand();
  }

  showHand() {

  // Add cards to the gallery
  var i;
  for (i=0; i < hand.length; i++) {
    var html = "<li class=\"ui-widget-content ui-corner-tr\">" +
	"<img name=\"" + i.toString() + "\" src=\"" + hand[i].img +
	"\" width=\"72px\" height=\"96px\"></img>" + "</li>";
    console.log(html);
    gallery.append(html);
  }

  // Let the gallery items be draggable
  $( "li", gallery ).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid",   // when not dropped, the item will revert back
                         // to its initial position
    containment: "document",
    helper: "clone",
    cursor: "move"
  });

  // Let the cardgroup be droppable, accepting the gallery items
  cardgroup.droppable({
    accept: "#gallery > li",
    classes: {
      "ui-droppable-active": "ui-state-highlight"
    },
    drop: function( event, ui ) {
      moveCard( ui.draggable );
    }
  });

  // Let the gallery be droppable as well, accepting items from the cardgroup
  gallery.droppable({
    accept: "#cardgroup li",
    classes: {
      "ui-droppable-active": "custom-state-active"
    },
    drop: function( event, ui ) {
      revertCard( ui.draggable );
    }
  });

  function moveCard( item ) {
    var name = item.find("img").attr("name");
    console.log("card: " + hand[parseInt(name)].getValue());

    item.fadeOut(function() {
      var list = $( "ul", cardgroup ).length ?
          $( "ul", cardgroup ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo(cardgroup);

      item.appendTo(list).fadeIn(function() {
        item.find( "img" );
      });
    });
  }

  function revertCard( item ) {
    item.fadeOut(function() {
      item
          .find( "img" )
          .end()
          .appendTo( gallery )
          .fadeIn();
    });
  }
} );
