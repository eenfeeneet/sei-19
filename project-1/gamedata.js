



var count = {
      counter : 0,
      get reset() {
            this.counter = 0;
      },
      get kills() {
            this.counter++;
      }, 
};


var Skills = [{
    skillName: "Snap",
    description: "Snap your fingers arrogantly to instantly destroy targeted enemies. High chance of failing.",
    damage: "Instant Death",
    mpRequired: 2000,
    use : function(target){
        var x = randomNumber(0,1)
        if(x===0){
            target.isAlive = false;
        } else{
            target.isAlive = true;
        }
    }
},
{
    skillName: "Kick",
    description: "Kick an enemy.Does not work if user has no Leg",
    damage: "-5 hp",
    staRequired: 10,
    use : function(target){
        target.hp = target.hp -10;
    }
}]

var FryingPan = {
    itemname: "Frying Pan",
    owner: "",
    description: "A frying pan blessed by the heavens",
    mpRequired: 1000,
    effects: "Smite with the full force of the heavens and fully restore them to health",
    use : function(injured){
        injured.hp = 1000;
    }
}
var Pen = {
    itemname: "Pen",
    owner: "",
    description: "A Pen soaked for eons in the depths of hell",
    mpRequired: 1000,
    effects: "Spike enemies to the depths of hell and thoroughly annihilate them from reality",
    use : function(target){
        target.mp = 0;
        target.isAlive = false;
    }
}
var Player = {
    name: 'Anon',
    level: 1,
    hp: 5,
    mp: 2000,
    sta: 2000,
    isAlive: true,
    items: [],
    skills: Skills,
    displayStats: function(){
        var n = this.name + "<br>";
        var l = "Level: " + this.level + "<br>";
        var h = "Hp: " + this.hp + "<br>";
        var m = "Mp: " + this.mp + "<br>";
        var s = "Sta: " + this.sta + "<br>";
        var i = "Items: " + this.items + "<br>";
        var sk = "Skills: " + Skills[0].skillName + ", " + Skills[1].skillName
        Display.status(n + l + h + m + s + i + sk);
    },
    takeItem: function(item){
        this.items.push(item);
        item.owner = this.name;
    },
    useFryinPan: function(injured){
        this.mp = this.mp - FryingPan.mpRequired
        FryingPan.use(injured)
    },
    usePen: function(injured){
        this.mp = this.mp - Pen.mpRequired
        Pen.use(target)
    },
    useSnap: function(target){

    }
}

var DyingMan = {
    name: 'John',
    hp: 0,
    mp: 0,
    sta: 0,
    isAlive: true,
    skills: "skills",
}


////////// Monsters Data

var Monster = {
    species:["Goblin", "Kobold", "Slime", "Imp"],
    hp:0,
    xpGiven: 0,
    status : function(){
        if(this.hp === 0){
            return console.log("the Monster is dead")
        } else {
            return console.log("the Monster is alive")
        }
    },
    createRandom: function(){
        var mon = Object.create(Monster);
        mon.species = randomArray(this.species)
        mon.hp = randomNumber(5, 15);
        mon.xpGiven = randomNumber(5,15);
        console.log(mon)
        return mon
    }
};

////////// Actions


function fight(){
    alert("fight")
}
function run(){

}
function useSkills(){

}
function useItems(){

}

////////// Helper functions

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

////////// Encounters

var Prologue = {
    story: "Earth exploded. You died. Or at least you thought you died. You woke up in the middle of a dense forest. Surrounded by trees, you know for sure, did not exist on earth. You take your time to check your surroundings. However it was then when you blacked out. You woke up again but this time with a.. 'game prompt?' hovering in front of you.",
    gamenarration: "Welcome Anon. You have just been transported to this world. A world unlike yours. Where magic exists. A world of possibilities. There is only Rule here and that is 'Might is Right'. Survival of the fittest. Enjoy.",
    playerchoices: "<a class='playerschoice' id='output' onclick='beginAdv()'>Begin</a>",
    triggerEvent: function(){
        Display.story(this.story)
        Display.delayNarration(this.gamenarration);
        Display.delayChoice(this.playerchoices);
    }
}


function beginAdv(){
    $("#player-choice").fadeOut();
    StatusWindow.hide();
    Beginning.triggerEvent();
    Player.displayStats();


}
var Beginning = {
    story: "You spend minutes trying to figure things out. Pressing the 'STATUS' button brings up a window where you can see a list of stats. With nothing else to be done, or could be done, in your current situation, you decide to proceed forward",
    playerchoices: "<a class='playerschoice' id='output' onclick='moveForward()'>Move Onwards</a>",
    triggerEvent: function(){
        Display.story(this.story)
        Display.delayChoice(this.playerchoices);




    }
}
function moveForward(){

    $("#player-choice").fadeOut();
    StatusWindow.hide();
    MeetRandomWeak.triggerEvent();
}

var MeetRandomWeak = {
    story: "You encountered a monster not long after walking. Though the monster looks weak, you're unsure of what to do.",
    monster: Monster.createRandom(),
    playerchoices: "<a class='playerschoice' id='output' onclick='moveForward()'>Fight</a> <a class='playerschoice' id='output' onclick='moveForward()'>Run</a>",

    triggerEvent: function(){
        Display.story(this.story)
        Display.delayChoice(this.playerchoices);
    },
    eventFight: function(){

    }
}

var FightTime = {
    story: "",
    characters: [],
    actions: [useSkills],


    triggerEvent: function(){
        displayStory(this.story);


    }
}

console.log("simplegame.js loaded")