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
  // There's the gallery and the trash
  var $gallery = $( "#gallery" ),
  $trash = $( "#trash" );

  var i;
  for (i=0; i < hand.length; i++) {
    var html = "<li class=\"ui-widget-content ui-corner-tr\">" +
      "<img src=\"" + hand[i].img + "\" width=\"72px\" height=\"96px\"></img>" +
      "</li>";
    console.log(html);
    $("#gallery").append(html);
  }

  // Let the gallery items be draggable
  $( "li", $gallery ).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document",
    helper: "clone",
    cursor: "move"
  });

  // Let the trash be droppable, accepting the gallery items
  $trash.droppable({
    accept: "#gallery > li",
    classes: {
      "ui-droppable-active": "ui-state-highlight"
    },
    drop: function( event, ui ) {
      deleteImage( ui.draggable );
    }
  });

  // Let the gallery be droppable as well, accepting items from the trash
  $gallery.droppable({
    accept: "#trash li",
    classes: {
      "ui-droppable-active": "custom-state-active"
    },
    drop: function( event, ui ) {
      recycleImage( ui.draggable );
    }
  });

  // Image deletion function
  var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";
  function deleteImage( $item ) {
    $item.fadeOut(function() {
      var $list = $( "ul", $trash ).length ?
          $( "ul", $trash ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $trash );

      $item.find( "a.ui-icon-trash" ).remove();
      $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
        $item
            .animate({ width: "48px" })
            .find( "img" )
            .animate({ height: "36px" });
      });
    });
  }

  // Image recycle function
  var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";
  function recycleImage( $item ) {
    $item.fadeOut(function() {
      $item
          .find( "a.ui-icon-refresh" )
          .remove()
          .end()
          .css( "width", "96px")
          .append( trash_icon )
          .find( "img" )
          .css( "height", "72px" )
          .end()
          .appendTo( $gallery )
          .fadeIn();
    });
  }

  // Image preview function, demonstrating the ui.dialog used as a modal window
  function viewLargerImage( $link ) {
    var src = $link.attr( "href" ),
    title = $link.siblings( "img" ).attr( "alt" ),
    $modal = $( "img[src$='" + src + "']" );

    if ( $modal.length ) {
      $modal.dialog( "open" );
    } else {
      var img = $( "<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />" )
          .attr( "src", src ).appendTo( "body" );
      setTimeout(function() {
        img.dialog({
          title: title,
          width: 400,
          modal: true
        });
      }, 1 );
    }
  }

  // Resolve the icons behavior with event delegation
  $( "ul.gallery > li" ).on( "click", function( event ) {
    var $item = $( this ),
    $target = $( event.target );

    if ( $target.is( "a.ui-icon-trash" ) ) {
      deleteImage( $item );
    } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
      viewLargerImage( $target );
    } else if ( $target.is( "a.ui-icon-refresh" ) ) {
      recycleImage( $item );
    }

    return false;
  });
} );
