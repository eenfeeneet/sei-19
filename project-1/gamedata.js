



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
            alert("you have slain the monster")
        } else{
            target.isAlive = true;
            alert("you failed to kill the monster")
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
        alert("Enemy has " + target.hp + " left")
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
        isPlayerAssignedStats = true;
        Display.delayPeekStatusPlayer(n + l + h + m + s + i + sk);

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
        if(this.mp<=2000){
            alert("warning! you barely have enough mana for this move");
            Skills[0].use(target);
        }
    },
    useKick: function(target){
        Skills[1].use(target);
        this.displayStats();
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
    isAlive: true,
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
        mon.isAlive = true;
        console.log("mon has been created")

        return mon
    }
};

////////// Actions



function run(){

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
    playerChoices: "<a id='player-choice' onclick='beginAdv()'>Begin</a>",
    triggerEvent: function(){
        Display.story(this.story)
        Display.delayNarration(this.gamenarration, this.playerChoices);
    }
};
function beginAdv(){
    $("#player-choice").fadeOut();
    StatusWindow.hideAllWindows();
    Beginning.triggerEvent();
    Player.displayStats();
};
var Beginning = {
    story: "You spend minutes trying to figure things out. Pressing the 'STATUS' button brings up a window where you can see a list of stats. With nothing else to be done, or could be done, in your current situation, you decide to proceed forward",
    playerChoices: "<a id='player-choice' onclick='moveForward()'>Move Onwards</a>",
    triggerEvent: function(){
        Display.story(this.story)
        Display.delayChoice(this.playerChoices);
    }
};
function moveForward(){
    $("#player-choice").fadeOut();
    StatusWindow.hideAllWindows();
    MeetRandomWeak.triggerEvent();
};
var MeetRandomWeak = {
    story: "You encountered a monster not long after walking. Though the monster looks weak, you're unsure of what to do.",
    fightStory: "You cautiously approach the monster",
    monster: Monster.createRandom(),
    playerChoices: "<a id='player-choice' onclick='fight()'>Fight</a> <a id='player-choice' onclick='run()'>Run</a>",
    fightChoices: "<a id='player-choice' onclick='useSkills()'>Use Skills</a> <a id='player-choice' onclick='run()'>Use Items</a>",
    skillChoices: "<a id='player-choice' onclick='Player.useSnap(MeetRandomWeak.monster)'>Snap</a> <a id='player-choice' onclick='Player.useKick(MeetRandomWeak.monster)'>Kick</a>",
    triggerEvent: function(){
        Display.story(this.story)
        var n = this.monster.species + "<br>";
        var h = "Hp: " + this.monster.hp + "<br>";
        isEnemyAssignedStats = true;
        Display.delayPeekStatusEnemy(n + h);
        Display.delayChoice(this.playerChoices);
    },
    fightEvent: function(){
        Display.story(this.fightStory);
        Display.choices(this.fightChoices);
    },
    skillEvent: function(){
        Display.choices(this.skillChoices);

    }
};
function fight(){
    $("#player-choice").fadeOut();
    StatusWindow.hideAllWindows();
    MeetRandomWeak.fightEvent();
}
function useSkills(){
    $("#player-choice").fadeOut();
    StatusWindow.hideAllWindows();
    MeetRandomWeak.skillEvent();

}

console.log("simplegame.js loaded")