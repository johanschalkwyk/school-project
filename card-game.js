var $       = require('jquery');
var jqui    = require('jquery-ui');
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

var deck = new Deck();
deck.shuffle();
deck.deal(1);
var hand = deck.deal(7);
console.log(hand);

$(document).ready(function() {
  var gallery   = $("#gallery");
  var cardgroup = $("#cardgroup");

  // Add cards to the gallery
  var i;
  for (i=0; i < hand.length; i++) {
    var html = "<li class=\"ui-widget-content ui-corner-tr\">" +
      "<img src=\"" + hand[i].img + "\" width=\"72px\" height=\"96px\"></img>" +
      "</li>";
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
      deleteImage( ui.draggable );
    }
  });

  // Let the gallery be droppable as well, accepting items from the cardgroup
  gallery.droppable({
    accept: "#cardgroup li",
    classes: {
      "ui-droppable-active": "custom-state-active"
    },
    drop: function( event, ui ) {
      recycleImage( ui.draggable );
    }
  });

  // Image deletion function
  function deleteImage( item ) {
    item.fadeOut(function() {
      var list = $( "ul", cardgroup ).length ?
          $( "ul", cardgroup ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo(cardgroup);

      item.appendTo(list).fadeIn(function() {
        item.find( "img" );
      });
    });
  }

  // Image recycle function
  function recycleImage( item ) {
    item.fadeOut(function() {
      item
          .find( "img" )
          .end()
          .appendTo( gallery )
          .fadeIn();
    });
  }
} );
