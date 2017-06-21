var $       = require('jquery');
var jqui    = require('jquery-ui');
var console = require('console');
var Model   = require('./card-lib').Model;

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
        // $( this ).addClass( "ui-state-highlight" )
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
