var isGameRunning = false;
var isPlayerAssignedStats = false;
var isEnemyAssignedStats = false;

var Display = {
    story : function(story){
        $("#game-story").text(story).fadeIn(100);
    },
    narration : function(narration){
         $("#game-narration").html(narration);
    },
    statusPlayer : function(status){
         $("#player-stats").html(status);
    },
    statusEnemy : function(status){
         $("#enemy-stats").html(status);
    },
    choices : function(choices){
        $("#choice-window").html(choices);
        $("#choice-window").fadeIn();

    },
    delayNarration: function(narration, choice){
        setTimeout(function(){
            Display.narration(narration);
            StatusWindow.showGame();
            setTimeout(function(){
                Display.choices(choice)
            } , 2000 );
        } , 5000 );
    },
    delayPeekStatusPlayer: function(status, choice){
        setTimeout(function(){
            Display.statusPlayer(status);
            StatusWindow.showPlayer();
            setTimeout(function(){
                StatusWindow.hideAllWindows();
                Display.choices(choice)
            } , 2000 );
        } , 3500 );
    },
    delayPeekStatusEnemy: function(status, choice){
        setTimeout(function(){
            Display.statusEnemy(status);
            StatusWindow.showEnemy();
            setTimeout(function(){
                StatusWindow.hideAllWindows();
                Display.choices(choice)
            } , 2000 );
        } , 3500 );
    },
    delayChoice: function(choice){
        setTimeout(function(){
            Display.choices(choice)
        } , 2000 );
    }
}
var StatusWindow = {
    showGame: function(){
        $("#game-story").fadeOut(10);
        $("#status-game").fadeIn(100);
    },
    showPlayer: function(){
        $("#game-story").fadeOut(10);
        $("#status-player").fadeIn(100);
    },
    showEnemy: function(){
        $("#game-story").fadeOut(10);
        $("#status-enemy").fadeIn(100);
    },
    hideAllWindows: function(){
        $("#status-game").fadeOut(10);
        $("#status-player").fadeOut(10);
        $("#status-enemy").fadeOut(10);
        $("#game-story").fadeIn(100);
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}



if(!isGameRunning){
    console.log("game is not running")
};



$("#btnStory").on('click', function(){
    if(isGameRunning){
        $("#status-player").hide();
        $("#status-enemy").hide();
        $("#status-game").hide();
        $("#game-story").show();
    }
});
$("#btnPlayer").on('click', function(){
    if(isGameRunning && isPlayerAssignedStats){
        $("#game-story").hide();
        $("#status-game").hide();
        $("#status-player").show();
        $("#status-enemy").hide();
    }
});
$("#btnEnemy").on('click', function(){
    if(isGameRunning && isEnemyAssignedStats){
        $("#game-story").hide();
        $("#status-game").hide();
        $("#status-player").hide();
        $("#status-enemy").show();
    }
});

$("#btnStart").on('click', function(){
    if(!isGameRunning){
        $("#game-welcome").fadeOut(10)
        Prologue.triggerEvent();
        isGameRunning = true;
    }
});