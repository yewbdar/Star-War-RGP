$(document).ready(function () {
    $('#reset').hide();
   // var audio=document.createElement('audio')

    var game = {
        selectedCharacter: false,
        defderSelected: false,
        attackerSelected: false,
        attackerId: null,
        defenderId: null,
        attackingPower: 0,
        defendingPower: 0,
        attackerHp: 0,
        defnderHp: 0,
        displayAttackerValue: 0,
        displayDefenderValue: 0,
        nameOfDefender:null,
        nameOfAttacker:null,
        
          
        attack: function () {
            var audio = $("#audio")[0];
            audio.play();
            if (this.attackerHp > 0 && this.defnderHp > 0) {

                this.attackerHp = this.attackerHp - this.defendingPower;
                if (this.attackerHp <= 0 && this.defnderHp > 0) {
                    $("#info").show();
                    $("#info").html("You loose ............Game Over!!! Restart The Game!");
                    $("#info").css({ "background-color": "#8c242e", "width": "40%", "margin-top": "2%" });
                    $('#reset').show();
                }
                this.defnderHp = this.defnderHp - this.attackingPower;
                if (this.defnderHp <= 0 && this.attackerHp > 0) {
                    $("#info").show();
                    $("#info").html("You win ............select another defender    !!!");
                    $("#info").css({ "background-color": "#7fa4e0", "width": "40%" });
                    $('#' + game.defenderId).hide();
                    this.defderSelected = false;
                }
                $('#' + this.displayAttackerValue).html(this.attackerHp);
                $('#' + this.displayDefenderValue).html(this.defnderHp);
                this.attackingPower = this.attackingPower + 5;
                $("#attacker-info").html("You attacked "+" "+this.nameOfDefender + " " +"for "+this.attackingPower+" damage.");
                $("#defnder-info").html(this.nameOfDefender + " attacked you back for " + this.defendingPower+" damage.");

            }
        },
    };

    $('.img-holder').on('click', function () {

        var value = $(this).attr('value');

        if (!game.attackerSelected) {

            game.attackerId = $(this).attr('id');
            $('#' + game.attackerId).insertAfter('.your-character');
            game.displayAttackerValue = $(this).find('p').attr('id');
            game.nameOfAttacker=$(this).find('h5').html();
           
            $('.img-holder').css("background-color", "#8c242e");
            $('#' + game.attackerId).css({ "background-color": "#7fa4e0", "border": "3px solid green" });
            game.attackerSelected = true;
            game.attackerHp = value;
            game.attackingPower = (Math.floor(Math.random() * ((40 - 5) + 1) + 5));
        }
        else if (!game.defderSelected && game.attackerSelected) {
            
            $("#info").hide();
            game.defenderId = $(this).attr('id');
            $('#' + game.defenderId).insertAfter('#defend');
            game.displayDefenderValue = $(this).find('p').attr('id');
            game.nameOfDefender=$(this).find('h5').html();
            
            $('#' + game.defenderId).css({ "background-color": "black", "color": "white", "border": "3px solid green" })
            game.defnderHp = value;
            game.defendingPower = (Math.floor(Math.random() * ((40 - 5) + 1) + 5));
            game.defderSelected = true;
        }
    });

    $('#attack').on('click', function () {
        if (game.defderSelected) {

            game.attack();
        }
        else {
            $("#info").html("You didn't select a defnder !");

        }

    });
    $("#reset").on('click', function () {
        location.reload();
    });


});