'use strict';

$(document).ready(function() {
  var characters = [
    //Name, Image source, Health Points, Attack Power, Counter Attack Power
    ['Darth Sidius', 'assets/images/sidious.jpg', 100, 10, 25],
    ['Darth Vader', 'assets/images/vader.jpg', 150, 15, 20],
    ['Count Dooku', 'assets/images/countdooku.jpg', 200, 20, 15],
    ['Darth Maul', 'assets/images/maul.jpg', 250, 25, 10]
  ];

  //state variables
  var hasDefender = 0;
  var playerHP = 0;
  var playerAP = 0;
  var defenderHP = 0;
  var defenderCAP = 0;

  function initializeGame() {
    //initialize state variables
    var hasDefender = 0;
    var playerHP = 0;
    var playerAP = 0;
    var defenderHP = 0;
    var defenderCAP = 0;

    //Move characters to starting area
    $('.char').appendTo('#start-here');

    //set Status flag to ready
    //Value of status flag may be any of the following:
    // 'ready' -> intial value, no player charcter selected yet
    // 'player' -> character is selected as player
    // 'enemy'

    $('.char').each(function() {
      $(this).data('status', 'ready');
    });
  }

  initializeGame();

  // chooseCharacters();
  // fight();
  // gameEnd();
}); // EOF
