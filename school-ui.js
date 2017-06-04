var $ = require('jquery');
var jqui = require('jquery-ui');
var console = require('console');
var Student = require('./school-lib').Student;
var Class   = require('./school-lib').Class;
var Teacher = require('./school-lib').Teacher;

var pam = new Teacher("Pam", "Borowiec", "NYC-12345");
var math = new Class("math", pam);

function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element.getRecord());
}

$(document).ready( function() {
  var dialog, form,

    firstname = $( "#firstname" ),
    lastname = $( "#lastname" ),
    schoolid = $( "#schoolid" ),
    allFields = $( [] ).add( firstname ).add( lastname ).add( schoolid ),
    tips = $( ".validateTips" );

  function updateTips(t) {
    tips
      .text(t)
      .addClass("ui-state-highlight");
    setTimeout(function() {
      tips.removeClass("ui-state-highlight", 1500);
    }, 500);
  }

  function checkLength( o, n, min, max ) {
    if ( o.val().length > max || o.val().length < min ) {
      o.addClass( "ui-state-error" );
      updateTips( "Length of " + n + " must be between " +
        min + " and " + max + "." );
      return false;
    } else {
      return true;
    }
  }

  function addUser() {
    var valid = true;
    allFields.removeClass( "ui-state-error" );

    valid = valid && checkLength( firstname, "firstname`", 3, 16 );
    valid = valid && checkLength( lastname, "lastname", 3, 16 );
    valid = valid && checkLength( schoolid, "schoolid", 5, 5 );

    if ( valid ) {
      $( "#students tbody" ).append( "<tr>" +
        "<td>" + firstname.val() + "</td>" +
        "<td>" + lastname.val() + "</td>" +
        "<td>" + schoolid.val() + "</td>" +
      "</tr>" );
      var student = new Student(firstname.val(), lastname.val(), schoolid.val());
      console.log("student: ", student.getRecord());
      math.enrollStudent(student);
      math.printStudents();

      dialog.dialog( "close" );
    }
    return valid;
  }

  dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    left: 400,
    modal: true,
    buttons: {
      "Add Student": addUser,
      Cancel: function() {
        dialog.dialog( "close" );
      }
    },
    close: function() {
      form[ 0 ].reset();
      allFields.removeClass( "ui-state-error" );
    }
  });

  form = dialog.find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    addUser();
  });

  $( "#create-user" ).button().on( "click", function() {
    dialog.dialog( "open" );
  });
} );
