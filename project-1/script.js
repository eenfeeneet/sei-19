
// $(document).ready(function() {

// $("#btnStats").on('click', function(){
//     $("#status-window").fadeToggle(500)
// });



// console.log("script.js loaded")

// });




var isGameRunning = false;
var isPlayerActive = false;




var Display = {
    story : function(story){
        $("#game-welcome").fadeOut(10);
        $("#game-story").text(story).fadeIn(100);
        // var output = document.querySelector("#game-story");
        // output.innerText = story;
    },
    narration : function(narration){
         $("#status-window").html(narration);
    },
    status : function(status){
         $("#player-status").html(status);
    },
    choices : function(choices){
        $("#player-choice").html(choices);
        $("#player-choice").fadeIn();

    },
    delayNarration: function(message){
    setTimeout(function(){
        Display.status(message);
        StatusWindow.show();
        } , 7000 );
    },
    delayStatus: function(message){
    setTimeout(function(){
        Display.status(message);
        StatusWindow.show();
        } , 7000 );
    },
    delayChoice: function(message){
        setTimeout(function(){
        Display.choices(message)
        } , 8000 );
    }
}

var StatusWindow = {
    show: function(){
        $("#game-story").fadeOut(10);
        $("#status-window").css({margin: '50px 200px 50px 200px'});
        $("#status-window").fadeIn(100);
        // var x = document.getElementById("#status-window");
        // x.style.display = "block";
    },
    hide: function(){
        $("#status-window").fadeOut(10);
        $("#game-story").fadeIn(100);
    },
    // clear: function(){
    //     var x = document.getElementById(".playerstatus");
    //     x.innerText = "";
    //     var y = document.getElementById(".gamenarration")
    //     y.innerHTML = "";
    // }
}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}



if(!isGameRunning){
    console.log("game is not running")
}




$(".content").fadeIn(3000)



$("#btnStats").on('click', function(){
    if(isGameRunning){
        $("#game-story").fadeToggle(5)
        $("#status-window").fadeToggle(10)
    }
});


function runGame (){
    if(!isGameRunning){
        $("#game-welcome").fadeOut(10)
        Prologue.triggerEvent();
        isGameRunning = true;
    }
}