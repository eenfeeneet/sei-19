
////////// Helper functions

var Display = {
    story : function(story){
        $("#game-story").text(story).fadeIn(100);
    },
    narration : function(narration){
        $("#game-narration").html(narration);
        sndNotify();
    },
    statusPlayer : function(status){
        $("#player-stats").html(status);
        $("#btnPlayer").animate({
            color: "#DC143C "})
        $("#btnPlayer").effect("shake", {times:4, distance: 5}, 500);
        sndNotify();
    },
    statusEnemy : function(status){
        $("#enemy-stats").html(status);
        $("#btnEnemy").animate({
            color: "#DC143C"})
        $("#btnEnemy").effect("shake", {times:4, distance: 5}, 500);
        sndNotify();
    },
    choices : function(choices){
        $("#choice-window").html(choices);
        $("#choice-window").fadeIn(500);

    },
    delayStory: function(story, choice){
        setTimeout(function(){
            Display.story(story);
        } , 3000 );
    },
    delayNarration: function(narration, choice){
        setTimeout(function(){
            Display.narration(narration);
            StatusWindow.showGame();
            setTimeout(function(){
                Display.choices(choice)
            } , 1000 );
        } , 3000 );
    },
    delayChoice: function(choice){
        setTimeout(function(){
            Display.choices(choice)
        } , 1500 );
    }
};
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
};
var Random = {
    randomNumber: function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomArray: function(array){
        return array[Math.floor(Math.random() * array.length)];
    }
};

////////// Game Mechanics

var GameState = {


}

var DDay = {
  counter : 30,
  get decrement() {
    this.counter--;
  },
};
var MonsterKills = {
      counter : 0,
      get kills() {
            this.counter++;
      }, 
};

////////// Skills

var Skills = [{
        skillName: "Snap",
        description: "Snap your fingers arrogantly to instantly destroy targeted enemies. High chance of failing.",
        damage: "Instant Death",
        mpRequired: 2000,
        use : function(target){
            var x = Random.randomNumber(0,1)
            if(x===0){
                target.isAlive = false;
                setTimeout(function(){
                    // alert("You have slain the monster")
                },1000);

            } else{
                target.isAlive = true;
                setTimeout(function(){
                    // alert("You failed to kill the monster")
                },1000);
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
            if(target.hp>0){
                // alert("Enemy has " + target.hp + " left");
            } else {
                target.isAlive = false;
                setTimeout(function(){
                    // alert("You have slain the monster")
                },1000);
            }

        }
    }];

////////// Items

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
};
var FryingPan = {
    itemname: "Frying Pan",
    owner: "",
    description: "A frying pan blessed by the heavens",
    mpRequired: 1000,
    effects: "Smite with the full force of the heavens and fully restore them to health",
    use : function(injured){
        injured.hp = 1000;
    }
};
var Twig = {
    itemname: "Twig",
    owner: "",
    description: "A broken branch from an ancient tree",
    mpRequired: 1000,
    effects: "May hurt the enemy. ",
    use : function(injured){
        injured.hp = 1;
    }
};

////////// Characters

var Player = {
    name: 'Anon',
    level: 1,
    hp: 100,
    mp: 2000,
    sta: 500,
    isAlive: true,
    xp: 0,
    toLvlUp: 10,
    cores: 0,
    items: [],
    skills: Skills,
    postBattle: function(xp, core){
        this.xp += xp;
        if (this.xp >= this.toLvlUp){
            this.level ++;
            this.xp -= this.toLvlUp;
            this.toLvlUp = this.toLvlUp + (this.toLvlUp * 0.3);
        }
        this.cores += core;
        this.updateStats();
    },
    updateStats: function(){
        var z = 0
        var n = this.name + "<br>";
        var l = "Level: " + this.level + "<br>";
        var h = "Hp: " + this.hp + "<br>";
        var m = "Mp: " + this.mp + "<br>";
        var s = "Sta: " + this.sta + "<br>";
        var i = "";
        if(this.items.length===0){
            i = "0";
        }else{
            var i = "";
            for(var x=0; x<= this.items.length; x++){
                i =  this.items[0].itemname + ", "
            }
        }
        var item = "Items: " + i + "<br>";
        var x = "Xp: " + this.xp + "<br>";
        var sk = "Skills: " + Skills[0].skillName + ", " + Skills[1].skillName
        isPlayerAssignedStats = true;
        setTimeout(function(){
            Display.statusPlayer(n + l + h + m + s + item + x + sk);
        }, 2000);

    },
    moving: function(staexhausted){
        this.sta = this.sta - staexhausted;
        this.updateStats();
    },
    resting: function(staregen, mpregen){
        this.sta += staregen;
        this.mp += mpregen;
        this.updateStats();
    },
    takeItem: function(item){
        this.items.push(item);
        item.owner = this.name;
        this.updateStats();
    },
    useFryinPan: function(injured){
        this.mp = this.mp - FryingPan.mpRequired
        FryingPan.use(injured)
        this.updateStats();
    },
    usePen: function(target){
        this.mp = this.mp - Pen.mpRequired
        Pen.use(target);
        this.updateStats();
    },
    useSnap: function(target){
        if(this.mp<=2000){
            // alert("warning! you barely have enough MANA for this move");
            this.mp = this.mp -Skills[0].mpRequired;
            Skills[0].use(target);
            this.updateStats();
        }
        if(this.mp<2000){
            // alert("You do not have enough MANA");
        }
    },
    useKick: function(target){
        if(target.isAlive){
            Skills[1].use(target);
            this.sta = this.sta - Skills[1].staRequired
            this.updateStats();
        }

    },

};
var DyingMan = {
    name: 'John',
    hp: 0,
    mp: 0,
    sta: 0,
    isAlive: true,
    skills: "skills",
};

////////// Monsters


var Monster = {
    type:[{
        species: "Goblin",
        description: "Goblins are a common and fairly weak race of evil humanoid monsters."},
        {
        species: "Kobold",
        description: "Aggressive, xenophobic, yet industrious small humanoid creatures, kobold are noted for their skill at building traps and preparing ambushes."},
        {
        species: "Green Slime",
        description: "A horrible, fetid growth, resembling a bright green, sticky, wet moss which grows on the walls and ceilings of caves, sewers, dungeons, mines, and the like."},
        {
        species: "Imp",
        description: "Imps are weak devils and are typically wizards' familiars. An imp is able to shapeshift."
        }],
    hp:0,
    xpGiven: 0,
    core: 1,
    isAlive: true,
    createRandom: function(){
        var mon = Object.create(Monster);
        mon.type = Random.randomArray(this.type)
        mon.hp = Random.randomNumber(5, 15);
        mon.xpGiven = Random.randomNumber(5,15);
        mon.core = 1;
        mon.isAlive = true;
        console.log("mon has been created");
        return mon
    }
};

////////// Actions






////////// Encounter - Prologue

var Prologue = {
    eventStory: "Earth exploded. You died. Or at least you thought you died. You woke up in the middle of a dense forest. Surrounded by trees, you know for sure, did not exist on earth. You take your time to check your surroundings. However it was then when you blacked out. You woke up again but this time with a.. 'game prompt?' hovering in front of you.",
    gamenarration: "Welcome Anon, to Planet Tutorial. You are one of the lucky few to be chosen. This planet is considered a benchmark. A benchmark to determine whether you have what it takes to survive your next destination. This is only a pitstop. In 30 days, reach Level 5 or accumulate 20 Monster Cores by the end of the tutorial, and you clear your objective. Whether you LIVE or DIE is up to you. There is only Rule here: SURVIVE. Enjoy.",
    playerChoices: "<a class='player-choice' onclick='beginAdv()'>Begin</a>",
    triggerEvent: function(){
        Display.story(this.eventStory)
        Display.delayNarration(this.gamenarration, this.playerChoices);
    }
};

function beginAdv(){
    sndBeep();
    $(".player-choice").fadeOut(500);
    StatusWindow.hideAllWindows();
    Beginning.triggerEvent();
    Player.updateStats();
};

////////// Encounter - Beginning

var Beginning = {
    eventStory: "You spend minutes trying to figure things out. Pressing the 'STATUS' button brings up a window where you can see a list of stats. With nothing else to be done, or could be done, in your current situation, you decide to proceed forward.",
    playerChoices: "<a class='player-choice' onclick='moveForward()'>Go</a> <a class='player-choice' onclick='restTime()'>Rest</a>",
    triggerEvent: function(){
        Display.story(this.eventStory);
        Display.delayChoice(this.playerChoices);
    }
};
function moveForward(){
    console.log("move forward")
    var stamNeeded = 10;
    Player.moving(stamNeeded)

    $(".player-choice").fadeOut(500);
    StatusWindow.hideAllWindows();
    MonsterEncounter.triggerEvent();
};
function restTime(){
    $(".player-choice").fadeOut(500);
    StatusWindow.hideAllWindows();
    RestPoint.triggerEvent();
};

////////// Rest -

var RestPoint = {
    eventStory: "You take time to rest and recover. You realize at least a days rest, is needed to recover some of your stamina and mana.. You've feel like you can continue on.  ",
    playerChoices: "<a class='player-choice' onclick='moveForward()'>Go</a> <a class='player-choice' onclick='restTime()'>Rest</a>",
    staRegen: 30,
    mpRegen: 30,
    triggerEvent: function(){
        Display.story(this.eventStory);
        Player.resting(this.staRegen, this.mpRegen);
        Display.delayChoice(this.playerChoices);
    }
};

////////// Encounter - Meet Random Weak Monsters

var MonsterEncounter = {
    eventStory: ["You encountered a monster not long after walking. Though the monster looks weak, you're unsure of what to do.","After walking what feels like an eternity. You find the first sign of life form. A hideous, grotesque life form. A life form nonetheless. You're actually not sure how to feel about that."],
    monster: {},
    playerChoices: "<a class='player-choice' onclick='fight()'>Fight</a> <a class='player-choice' onclick='run()'>Run</a>",
    generateMon: function(){
        this.monster = Monster.createRandom();
    },
    showGenMonStats: function(){
        var s = this.monster.type.species + "<br>";
        var h = "Hp: " + this.monster.hp + "<br>";
        var d = "Description: " + this.monster.type.description + "<br>";
        isEnemyAssignedStats = true;
        setTimeout(function(){
            Display.statusEnemy(s + h + d);
        }, 2000);

    },
    triggerEvent: function(){
        this.generateMon();
        this.showGenMonStats();
        Display.story(Random.randomArray(this.eventStory));
        Display.delayChoice(this.playerChoices);
    },
};
function fight(){
    $(".player-choice").fadeOut(500);
    StatusWindow.hideAllWindows();
    Battle.monster = MonsterEncounter.monster;
    Battle.triggerEvent(MonsterEncounter.monster);
};
function run(){
    var stamNeeded = 30;
    Player.moving(stamNeeded)
};

////////// Encounter - Fight

var Battle = {
    eventStory: "You cautiously approach the monster",
    winStory: "Adrenaline still pumping through your veins, it takes you a long while to calm down. Before you could even settle down, a feeling you can only describe as euphoric, courses through your whole being. Despite the pleasant sensation , you can't help but panic. Checking your status , your best guess is that it was related to gaining Exp, seeing as that was the only change aside from your stamina and mana. As exhausted as you are, you have no choice but to carry on grinding.",
    monster: {},
    playerChoices: "<a class='player-choice' onclick='useSkills()'>Skills</a> <a class='player-choice' onclick='useItems()'>Items</a>",
    skillChoices: "<a class='player-choice' onclick='useSkillOne()'>Snap</a> <a class='player-choice' onclick='useSkillTwo()'>Kick</a>",
    itemChoices: "<a class='player-choice' onclick='useItemOne'>Pen</a> <a class='player-choice' onclick='useItemTwo()'>Frying Pan</a>",
    winChoices: "<a class='player-choice' onclick='moveForward()'>Go</a> <a class='player-choice' onclick='restTime()'>Rest</a>",
    updateMonStats: function(){
        if(this.monster.isAlive){
            var s = this.monster.type.species + "<br>";
            var h = "Hp: " + this.monster.hp + "<br>";
            var d = "Description: " + this.monster.type.description + "<br>";
            setTimeout(function(){
                Display.statusEnemy(s + h + d);
            }, 2000);
            this.skillEvent();
        } else if (this.monster.hp <= 0 || !this.monster.isAlive){
            isEnemyAssignedStats = false;
            Player.postBattle(this.monster.xpGiven , this.monster.core);
            this.winEvent();
        }
    },
    triggerEvent: function(){
        Display.story(this.eventStory);
        Display.delayChoice(this.playerChoices);
    },
    skillEvent: function(){
        Display.delayChoice(this.skillChoices);
    },
    itemEvent: function(){
        Display.delayChoice(this.itemChoices);
    },
    winEvent: function(){
        Display.delayStory(this.winStory);
        Display.delayChoice(this.winChoices);
    }
};
function useSkills(){
    $(".player-choice").fadeOut(500);
    StatusWindow.hideAllWindows();
    Battle.skillEvent();
};
function useSkillOne(){
    if(Battle.monster.isAlive){
        $(".player-choice").fadeOut(500);
        Player.useSnap(Battle.monster);
        Battle.updateMonStats();
    }
};
function useSkillTwo(){
    if(MonsterEncounter.monster.isAlive){
        $(".player-choice").fadeOut(500);
        Player.useKick(Battle.monster);
        Battle.updateMonStats();
    }
};
function useItems(){
    if(Player.items.length === 0){
        // alert("You have no items in your inventory!");
        $(".player-choice").fadeOut(500);
        StatusWindow.hideAllWindows();
        Battle.fightEvent();
    } else{
        $(".player-choice").fadeOut(500);
        StatusWindow.hideAllWindows();
        Battle.itemEvent();
    }
};
function useItemOne(){
    if(Battle.monster.isAlive){
        $(".player-choice").fadeOut(500);
        Player.usePen(Battle.monster);
        Battle.updateMonStats();
        Battle.skillEvent();
    }
};
function useItemTwo(){
    if(Battle.monster.isAlive){
        $(".player-choice").fadeOut(500);
        Player.useFryinPan(Battle.monster);
        Battle.updateMonStats();
        Battle.skillEvent();
    }
};

////////// Encounter - Run

var RunWeakMon = {
    eventStory: "You run like theres no tomorrow. You could care less about your Cores and Exp. Nothing could make u face shit like that.",
    playerChoices: "<a class='player-choice' onclick='useSkills()'>Use Skills</a> <a class='player-choice' onclick='useItems()'>Use Items</a>",
    triggerEvent: function(){
        Display.story(this.eventStory);
        Display.delayChoice(this.playerChoices);
    },
    skillEvent: function(){
        Display.delayChoice(this.skillChoices);
    },
    itemEvent: function(){
        Display.delayChoice(this.itemChoices);
    },
    winEvent: function(){
        Display.story(this.winStory);

        Display.delayChoice(this.winChoices);
    }
};

////////// Encounter - Find

var FindItem = {
    eventStory: ["You see something on the ground."],
    item: [Pen, FryingPan, Twig],
    playerChoices: "<a class='player-choice' onclick='takeItems()'>Take</a> <a class='player-choice' onclick='run()'>Ignore</a>",
    triggerEvent: function(){
        Display.story(this.eventStory);
        Display.delayChoice(this.playerChoices);
    },
    takeEvent: function(){

    },
    ignoreEvent: function(){

    },
};
function takeItems(){
    $(".player-choice").fadeOut(500);
    StatusWindow.hideAllWindows();
    Player.takeItem(FindPen.item)
};




////////// Encounter - Find


console.log("simplegame.js loaded")