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
      healthPoints: 130,
      attackPower: 15,
      counterAttackPower: 20
    },

    {
      name: 'Count Dooku',
      source: 'assets/images/countdooku.jpg',
      healthPoints: 170,
      attackPower: 20,
      counterAttackPower: 15
    },

    {
      name: 'Darth Maul',
      source: 'assets/images/maul.jpg',
      healthPoints: 200,
      attackPower: 25,
      counterAttackPower: 10
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

      //Character type status flags prevents the selection of multiple player characters and enemies.
      //Value of status flag, which is a custom attribute added to character div, may be any of the following:
      // 'ready' -> intial value, no player charcter selected yet
      // 'player' -> character is selected as player
      // 'enemy' -> non-player characters

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
      playerHP = charArray[sId].healthPoints;
      playerBaseAP = charArray[sId].attackPower;

      $('.char').each(function() {
        if ($(this).attr('id') != sId) {
          $(this).data('status', 'enemy');
          $(this).appendTo('#enemies');
        }
      });
    } else if ($(this).data('status') === 'enemy' && hasDefender == 0) {
      // $('#' + sId).data('status', 'defender');
      $('#defender')
        .children()
        .hide();
      $('#' + sId).appendTo('#defender');
      hasDefender = 1;
      defenderName = charArray[sId].name;
      defenderHP = charArray[sId].healthPoints;
      defenderCAP = charArray[sId].counterAttackPower;
    }
  });

  $('#attack').on('click', function() {
    if (hasDefender == 1) {
      //Attack enebled only when there is a defender

      //Update HP of player and defender
      playerAP += playerBaseAP;
      defenderHP -= playerAP;
      playerHP -= defenderCAP;

      //Display new HP values
      $('#player p:nth-child(3)').text(playerHP);
      $('#defender p:nth-child(3)').text(defenderHP);

      //Display fight status
      $('#status1').text(
        'You Attacked ' + defenderName + ' for ' + playerAP + ' damage'
      );
      $('#status2').text(
        defenderName + ' attacked you for ' + defenderCAP + ' damage'
      );

      if (playerHP <= 0) {
        $('#status1').text('You have been defeated...GAME  OVER! ! !');
        $('#status2').empty();
        $('#restart').show();
        hasDefender = 0; //Disable any further attacks
      }

      if (defenderHP <= 0) {
        $('#defender')
          .children()
          .css('visibility', 'hidden');
        hasDefender = 0; // Disable further attacks
        if ($('#enemies').children().length > 0) {
          $('#status1').text(
            'You have defeated ' +
              defenderName +
              ', you can choose to fight another enemy.'
          );
          $('#status2').text('');
        } else {
          $('#status1').text('You won!!!!   GAME OVER!!!');
          $('#restart').show();
        }
      }
    }
  });

  $('#restart').on('click', function() {
    $('.char')
      .appendTo('#start-here')
      .css('visibility', 'visible')
      .show();
    $('.char').data('status', 'ready');

    for (var i = 0; i < charArray.length; i++) {
      $('#' + i + ' p:nth-child(3)').text(charArray[i].healthPoints);
    }

    $('#status1, #status2').empty();
    hasDefender = 0;
    playerHP = 0;
    playerAP = 0;
    playerBaseAP = 0;
    defenderHP = 0;
    defenderCAP = 0;
    defenderName = '';
    $('#restart').hide();
  });
});
