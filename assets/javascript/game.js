'use strict';

$(document).ready(function() {
  var charArray = [
    //Name, Image source, Health Points, Attack Power, Counter Attack Power

    {
      name: 'Darth Sidius',
      source: 'assets/images/sidious.jpg',
      healthPoints: 100,
      attackPower: 10,
      counterAttackPower: 25
    },

    {
      name: 'Darth Vader',
      source: 'assets/images/vader.jpg',
      healthPoints: 150,
      attackPower: 15,
      counterAttackPower: 20
    },

    {
      name: 'Count Dooku',
      source: 'assets/images/countdooku.jpg',
      healthPoints: 200,
      attackPower: 20,
      counterAttackPower: 15
    },

    {
      name: 'Darth Maul',
      source: 'assets/images/maul.jpg',
      healthPoints: 250,
      attackPower: 25,
      counterAttackPower: 10
    }
  ];

  //state variables
  var hasDefender = 0;
  var playerHP = 0;
  var playerAP = 0;
  var defenderHP = 0;
  var defenderCAP = 0;

  function initializeGame() {
    //initialize state variables
    hasDefender = 0;
    playerHP = 0;
    playerAP = 0;
    defenderHP = 0;
    defenderCAP = 0;

    //Move characters to starting area
    $('.char').appendTo('#start-here');
  }

  function createCharacters() {
    for (var i = 0; i < charArray.length; i++) {
      var d = $('<div>');
      $('#start-here').append(d);
      d.attr('id', i);
      d.addClass('char col-md-2 pt-2 border border-success');

      //Character type status flags prevents the selection of multiple player characters and enemies.
      //Value of status flag, which is a custom attribute added to character div, may be any of the following:
      // 'ready' -> intial value, no player charcter selected yet
      // 'player' -> character is selected as player
      // 'enemy' -> non-player characters
      // 'defender' -> enemy currently selected to fight player

      d.data('status', 'ready'); //set character type status to ready
      d.append('<p>' + charArray[i].name + '</p>');
      d.append("<img src='" + charArray[i].source + "'/>");
      d.append('<p>' + charArray[i].healthPoints + '</p>');
    }
  }

  createCharacters();

  $('.char').on('click', function() {
    var sId = $(this).attr('id'); //sId -> id of selected character
    if ($(this).data('status') === 'ready') {
      $('#' + sId).data('status', 'player');
      $('#' + sId).appendTo('#player');

      $('.char').each(function() {
        if ($(this).attr('id') != sId) {
          $(this).data('status', 'enemy');
          $(this).appendTo('#enemies');
        }
      });
    } else if ($(this).data('status') === 'enemy' && hasDefender == 0) {
      $('#' + sId).data('status', 'defender');
      $('#' + sId).appendTo('#defender');
      hasDefender = 1;
    }
  });

  // chooseCharacters();
  // fight();
  // gameEnd();
}); // EOF
