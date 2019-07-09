var isGameRunning = false;
var isPlayerAssignedStats = false;
var isEnemyAssignedStats = false;

var menu = new Audio();
var prologue = new Audio();
var beep = new Audio();
var alert = new Audio();
var error = new Audio();


menu.src = "./audio/RPG.mp3";
function bgmMenuPlay(){
    menu.play().catch(function(){});
};
function bgmMenuPause(){
    menu.pause();
};
prologue.src = "./audio/HauntedForest.mp3";
function bgmProloguePlay(){
    prologue.play().catch(function(){});
};;
function bgmProloguePause(){
    prologue.play();
};

beep.src = "./audio/Beep.mp3";
function sndBeep(){
    beep.play();
};
alert.src = "./audio/Alert.mp3";
function sndNotify(){
    alert.play();
};
error.src = "./audio/Error.mp3";
function sndError(){
    error.play();
};


window.onload=bgmMenuPlay();

if(!isGameRunning){
    console.log("game is not running")
};



$("#btnStory").on('click', function(){
    if(isGameRunning){

        sndBeep();
        $("#status-player").hide();
        $("#status-enemy").hide();
        $("#game-story").show();
        $("#status-game").slideToggle();
    }else{
        sndError();
    }
});
$("#btnPlayer").on('click', function(){
    if(isGameRunning && isPlayerAssignedStats){
        sndBeep();
        $("#btnPlayer").animate({
            color: "#757d6f"})
        $("#status-game").show();
        $("#status-game").hide();
        $("#status-player").slideToggle();
        $("#status-enemy").hide();
    }else{
        sndError();
    }
});
$("#btnEnemy").on('click', function(){
    if(isGameRunning && isEnemyAssignedStats){
        sndBeep();
        $("#btnEnemy").animate({
            color: "#757d6f"})
        $("#status-game").show();
        $("#status-game").hide();
        $("#status-player").hide();
        $("#status-enemy").slideToggle();
    }else{
        sndError();
    }
});
$("#btnStart").on('click', function(){
    if(!isGameRunning){
        sndBeep();
        bgmMenuPause();
        bgmProloguePlay();
        $("#game-welcome").fadeOut(10)
        Prologue.triggerEvent();
        isGameRunning = true;
    }else{
        sndError();
    }
});