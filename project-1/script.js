var isGameRunning = false;

var isPlayerActive = false;


const character = {
    name: 'name',
    job: 'class',
    hp: 0,
    mp: 0,
    sta: 0,
    skills: "skills",
    logStats() {
        console.log(this.name);
        console.log("job: " + this.job);
        console.log("hp: " + this.hp);
        console.log("mp: " + this.mp);
        console.log("skills: " + this.skills);
    }
};



var Display = {
    story : function(story){
        var output = document.querySelector(".gamestory");
        output.innerHTML = story;
    },
    status : function(status){
        var output = document.querySelector(".playerstatus");
        output.innerHTML = status;
    },
    narration : function(narration){
        var output = document.querySelector(".gamenarration");
        output.innerHTML = narration;
    },
    choices : function(choices){
        var output = document.querySelector(".playerchoice");
        output.innerHTML = choices;
    },
    delayStatus: function(message){
    setTimeout(function(){
        Display.status(message);
        StatusWindow.show();
        } , 3000 );
    },
    delayChoice: function(message){
        setTimeout(function(){
        Display.choices(message)
        } , 6000 );
    }
}
var StatusWindow = {
    show: function(){
        var x = document.getElementById("statuswindow");
        x.style.display = "block";
    },
    hide: function(){
        var x = document.getElementById("statuswindow");
        x.style.display = "none";
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

function playerStatsWindow (currentPlayer){
    var x = currentPlayer.name;
    x.toupper
    displayStatus(`${currentPlayer.name} <br> Job: ${currentPlayer.job}<br>
    Hp: ${currentPlayer.hp}<br>Mp: ${currentPlayer.mp}<br>Sta: ${currentPlayer.sta}<br>Skills: ${currentPlayer.skills}`)
}
function assignCharacter (player){
    console.log("assigning character");
    nameEntered = true;
    if(nameEntered)
    var newplayer = Object.create(character);
    newplayer.name = player;
    newplayer.job = randomArray(jobDB);
    newplayer.hp = randomArray(statPointsDB);
    newplayer.mp = randomArray(statPointsDB);
    newplayer.sta = randomArray(statPointsDB);
    newplayer.skills = randomArray(skillsDB);
    console.log("character created")

    characterDB.push(newplayer)
    console.log("character added to DB")

    currentPlayer = newplayer;
    playerStatsWindow(currentPlayer)

    newplayer.logStats();
    nameEntered = false;
    console.log("initialized new player")
    isPlayerActive = true;
}



if(!isGameRunning){
    console.log("game is not running")
}

function testMsg(){
    alert("just a test")
}

function toggleInputBar() {
    var x = document.getElementById("inputWrapper");
    var y = document.getElementById("choices");
    var z = document.getElementById("stats");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
    z.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "block";
  }
}

////////// Helper functions

function runGame (){
    if(!isGameRunning){
        Prologue.triggerEvent();
        isGameRunning = true;
    }
}