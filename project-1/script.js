var isGameRunning = false;

var Display = {
    story : function(story){
        $("#game-welcome").fadeOut(10);
        $("#game-story").text(story).fadeIn(100);
        // var output = document.querySelector("#game-story");
        // output.innerText = story;
    },
    narration : function(narration){
         $("#game-narration").html(narration);
    },
    clear : function(){
         $("#game-narration").empty();
    },
    status : function(status){
         $("#player-status").html(status);
    },
    choices : function(choices){
        $("#choice-window").html(choices);
        $("#choice-window").fadeIn();

    },
    delayNarration: function(narration, choice){
        setTimeout(function(){
            Display.narration(narration);
            StatusWindow.show();
            setTimeout(function(){
                Display.choices(choice)
            } , 2000 );
        } , 5000 );
    },
    delayStatus: function(status, choice){
        setTimeout(function(){
            Display.status(status);
            StatusWindow.show();
            setTimeout(function(){
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
    show: function(){
        $("#game-story").fadeOut(10);
        // $("#status-window").css({margin: '50px 200px 50px 200px'});
        $("#status-window").fadeIn(100);
        // var x = document.getElementById("#status-window");
        // x.style.display = "block";
    },
    hide: function(){
        $("#status-window").fadeOut(10);
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

$("#btnStats").on('click', function(){
    if(isGameRunning){
        $("#game-story").fadeToggle(5)
        $("#status-window").fadeToggle(10)
    }
});

$("#btnStart").on('click', function(){
    if(!isGameRunning){
        $("#game-welcome").fadeOut(10)
        Prologue.triggerEvent();
        isGameRunning = true;
    }
});

// function runGame (){
//     if(!isGameRunning){
//         $("#game-welcome").fadeOut(10)
//         Prologue.triggerEvent();
//         isGameRunning = true;
//     }
// }