'use strict';

$(document).ready(function() {
  var charArray = [
    //Name, Image source, Health Points, Attack Power, Counter Attack Power

    {
      name: 'Darth Sidius',
      source: 'assets/images/sidious.jpg',
      healthPoints: 100,
      attackPower: 16,
      counterAttackPower: 5
    },

    {
      name: 'Darth Vader',
      source: 'assets/images/vader.jpg',
      healthPoints: 120,
      attackPower: 8,
      counterAttackPower: 10
    },

    {
      name: 'Count Dooku',
      source: 'assets/images/countdooku.jpg',
      healthPoints: 150,
      attackPower: 4,
      counterAttackPower: 20
    },

    {
      name: 'Darth Maul',
      source: 'assets/images/maul.jpg',
      healthPoints: 180,
      attackPower: 2,
      counterAttackPower: 25
    }
  ];

  //state variables
  var hasDefender = 0;
  var playerHP = 0;
  var playerAP = 0;
  var playerBaseAP = 0;
  var defenderHP = 0;
  var defenderCAP = 0;
  var defenderName = '';
  $('#restart').hide();

  function createCharacters() {
    for (var i = 0; i < charArray.length; i++) {
      var d = $('<div>');
      $('#start-here').append(d);
      d.attr('id', i);
      d.addClass('char col-md-2 pt-2 border border-success');
      d.css('background-color', 'white');
      d.css('color', 'black');

      //Character type status flags prevents the selection of multiple player characters and enemies.
      //Value of status flag, which is a custom attribute added to character div, may be any of the following:
      // 'ready' -> intial value, no player charcter selected yet
      // 'player' -> character is selected as player
      // 'enemy' -> non-player characters

      d.data('status', 'ready'); //set character type status to ready
      d.append('<p class="m-0">' + charArray[i].name + '</p>');
      d.append("<img src='" + charArray[i].source + "'/>");
      d.append('<p class="mb-0">' + charArray[i].healthPoints + '</p>');
    }
  }

  createCharacters();

  $('.char').on('click', function() {
    var sId = $(this).attr('id'); //sId -> id of selected character
    if ($(this).data('status') === 'ready') {
      $('#' + sId).data('status', 'player');
      $('#' + sId).appendTo('#player');
      playerHP = charArray[sId].healthPoints;
      playerBaseAP = charArray[sId].attackPower;

      $('.char').each(function() {
        if ($(this).attr('id') != sId) {
          $(this).data('status', 'enemy');
          $(this).appendTo('#enemies');
          $(this).css('background-color', 'red');
        }
      });
    } else if ($(this).data('status') === 'enemy' && hasDefender == 0) {
      $('#defender')
        .children()
        .hide();
      $('#' + sId).appendTo('#defender');
      $('#' + sId).css('background-color', 'black');
      $('#' + sId).css('color', 'white');
      hasDefender = 1;
      defenderName = charArray[sId].name;
      defenderHP = charArray[sId].healthPoints;
      defenderCAP = charArray[sId].counterAttackPower;
    }
  });

  $('#attack').on('click', function() {
    if (hasDefender == 1) {
      //Attack enebled only when there is a defender

      //Update HP of defender
      playerAP += playerBaseAP;
      defenderHP -= playerAP;
      $('#defender p:nth-child(3)').text(defenderHP);
      $('#status1').text(
        'You Attacked ' + defenderName + ' for ' + playerAP + ' damage'
      );

      //Defender wins
      if (defenderHP > 0) {
        //Update HP of player only if enemy is still undeafeated
        playerHP -= defenderCAP;
        $('#player p:nth-child(3)').text(playerHP);
        $('#status2').text(
          defenderName + ' attacked you for ' + defenderCAP + ' damage'
        );
        if (playerHP <= 0) {
          //Check if player lost
          $('#status1').text('You have been defeated...GAME  OVER! ! !');
          $('#status2').empty();
          $('#restart').show();
          hasDefender = 0; //Disable any further attacks
        }
      } else {
        $('#defender')
          .children()
          .css('visibility', 'hidden');
        hasDefender = 0; // Disable further attacks
        if ($('#enemies').children().length > 0) {
          //Check if there are enemies left to fight
          $('#status1').text(
            'You have defeated ' +
              defenderName +
              ', you can choose to fight another enemy.'
          );
          $('#status2').text('');
        } else {
          //Player wins game
          $('#status1').text('You won!!!!   GAME OVER!!!');
          $('#status2').empty();
          $('#restart').show();
        }
      }
    }
  });

  $('#restart').on('click', function() {
    //Send characters back to starting area
    $('.char')
      .appendTo('#start-here')
      .css('visibility', 'visible')
      .show();
    $('.char').data('status', 'ready');
    $('.char').css('background-color', 'white');
    $('.char').css('color', 'black');

    //reset HP values
    for (var i = 0; i < charArray.length; i++) {
      $('#' + i + ' p:nth-child(3)').text(charArray[i].healthPoints);
    }

    //reset state variables and page elements
    hasDefender = 0;
    playerHP = 0;
    playerAP = 0;
    playerBaseAP = 0;
    defenderHP = 0;
    defenderCAP = 0;
    defenderName = '';
    $('#status1, #status2').empty();
    $('#restart').hide();
  });
});
