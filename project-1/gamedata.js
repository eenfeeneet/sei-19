
////////// Helper functions

// var SoundEffects = {
//     createBeep: function(){
//         var beep = document.createElement('audio');
//         beep.src = "./audio/Beep.mp3";
//     },
//     btnBeepPlay: function(){
//         beep.play();
//     },
//     createChoices: function(){
//         var choices = document.createElement('audio');
//         choices.src = "./audio/Choices.mp3";
//     },
//     btnChoicesPlay: function(){
//         choices.play();
//     },
//     createNotify: function(){
//         var notify = document.createElement('audio');
//         notify.src = "./audio/Notification.mp3";
//     },
//     btnNotifyPlay: function(){
//         notify.play();
//     },
//     createError: function(){
//         var error = document.createElement('audio');
//         error.src = "./audio/Error.mp3";
//     },
//     btnErrorPlay: function(){
//         error.play();
//     },
//     createLvlUp: function(){
//         var lvlUp = document.createElement('audio');
//         lvlUp.src = "./audio/LevelUp.mp3";
//     },
//     btnLvlUpPlay: function(){
//         lvlUp.play();
//     },
//     createKick: function(){
//         var kick = document.createElement('audio');
//         kick.src = "./audio/Kick.mp3";
//     },
//     btnKickPlay: function(){
//         kick.play();
//     },
// }

var GameEventListeners = {
    addEventBtnStart: function(){
        var x = document.querySelector("#btnStart");
        x.addEventListener('click', this.start)
    },
    start: function(event){
        if(!Game.isRunning){
            // SoundEffects.btnBeepPlay();
            ToggleSelection.hideWelcome();
            ToggleSelection.showStory();
            GameEvent.triggerEvent();
        } else{
            // SoundEffects.btnErrorPlay();
        }
    },
    addEventBtnStory: function(){
        var x = document.querySelector("#btnStory");
        x.addEventListener('click', this.toggleStory)
    },
    toggleStory: function(event){
        var a = document.querySelector("#mainstory").style.display
        var b = document.querySelector("#objectivegame").style.display
        var c = document.querySelector("#statusenemy").style.display
        var d = document.querySelector("#statusplayer").style.display

        if(Game.isRunning && GameObjective.isAssigned){
            // SoundEffects.btnBeepPlay();
            if(a === "none"){
                ToggleSelection.showMainHideAllWindows();
            }
            if(b === "none"){
                ToggleSelection.showObjective();
            }
            if(a === "block" && b === "block"){
                ToggleSelection.hideObjective();
            }
        }
    },
    addEventBtnEnemy: function(){
        var x = document.querySelector("#btnEnemy");
        x.addEventListener('click', this.toggleEnemy)
    },
    toggleEnemy: function(event){
        var a = document.querySelector("#mainstory").style.display
        var b = document.querySelector("#objectivegame").style.display
        var c = document.querySelector("#statusenemy").style.display
        var d = document.querySelector("#statusplayer").style.display

        if(Game.isRunning && MonsterEncounter.monster.isAssigned){
            // SoundEffects.btnBeepPlay();
            if(c === "none"){
                Animate.btnEnemyRmvPulse();
                ToggleSelection.showEnemy();
            } else {
                ToggleSelection.hideEnemy();
            }
        } else{
            // SoundEffects.btnErrorPlay();
        }
    },
    addEventBtnPlayer: function(){
        var x = document.querySelector("#btnPlayer");
        x.addEventListener('click', this.togglePlayer)
    },
    togglePlayer: function(event){
        var a = document.querySelector("#mainstory").style.display
        var b = document.querySelector("#objectivegame").style.display
        var c = document.querySelector("#statusenemy").style.display
        var d = document.querySelector("#statusplayer").style.display

        if(Game.isRunning && Player.isAssigned){
            // SoundEffects.btnBeepPlay();
            if(d === "none"){
                Animate.btnPlayerRmvPulse();
                ToggleSelection.showPlayer();
            } else {
                ToggleSelection.hidePlayer();
            }
        } else{
            // SoundEffects.btnErrorPlay();
        }
    }
};
var Animate = {
    btnEnemyAddPulse: function(){
    var x = document.querySelector("#btnEnemy");
    x.style.animation = "pulse 1s 10";
    x.style.color = "#FF0000";
    },
    btnEnemyRmvPulse: function(){
    var x = document.querySelector("#btnEnemy");
    x.style.animation = "none";
    x.style.color = "#757d6f";
    },
    btnPlayerAddPulse: function(){
        var x = document.querySelector("#btnPlayer");
        x.style.animation = "pulse 1s 10";
        x.style.color = "#FF0000";
    },
    btnPlayerRmvPulse: function(){
    var x = document.querySelector("#btnPlayer");
    x.style.animation = "none";
    x.style.color = "#757d6f";
    }
};
var Print = {
    story : function(story){
        var x = document.querySelector("#gamestory");
        x.innerText = story;
    },
    objective : function(narration){
        var x = document.querySelector("#gameobjective");
        x.innerHTML = narration;
        // sndNotify();
    },
    statusPlayer : function(status){
        var x = document.querySelector("#playerstats");
        x.innerHTML = status;
        Animate.btnPlayerAddPulse();
        // sndNotify();
    },
    statusEnemy : function(status){
        var x = document.querySelector("#enemystats");
        x.innerHTML = status;
        Animate.btnEnemyAddPulse();
        // sndNotify();
    },
    choices : function(choices){
        var x = document.querySelector("#choicewindow");
        x.innerHTML = choices;
    },
    delayStory: function(story, choice){
        setTimeout(function(){
            Print.story(story);
        } , 3000 );
    },
    delayObjective: function(narration, choice){
        setTimeout(function(){
            Print.objective(narration);
            ToggleSelection.showObjectiveHideAll();
            setTimeout(function(){
                Print.choices(choice)
            } , 1000 );
        } , 3000 );
    },
    delayChoice: function(choice){
        setTimeout(function(){
            Print.choices(choice)
        } , 1500 );
    }
};
var ToggleSelection = {
    showWelcome: function(){
        var x = document.querySelector("#gamewelcome");
        x.style.display = "block"
    },
    hideWelcome: function(){
        var x = document.querySelector("#gamewelcome");
        x.style.display = "none"
    },
    showStory: function(){
        var x = document.querySelector("#gamestory");
        x.style.display = "block"
    },
    hideStory: function(){
        var x = document.querySelector("#gamestory");
        x.style.display = "none"
    },
    showMain: function(){
        var x = document.querySelector("#mainstory");
        x.style.display = "block"
    },
    hideMain: function(){
        var x = document.querySelector("#mainstory");
        x.style.display = "none"
    },
    showEnemy: function(){
        var x = document.querySelector("#statusenemy");
        x.style.display = "block"
    },
    hideEnemy: function(){
        var x = document.querySelector("#statusenemy");
        x.style.display = "none"
    },
    showObjective: function(){
        var x = document.querySelector("#objectivegame");
        x.style.display = "block"
    },
    hideObjective: function(){
        var x = document.querySelector("#objectivegame");
        x.style.display = "none"
    },
    showPlayer: function(){
        var x = document.querySelector("#statusplayer");
        x.style.display = "block"
    },
    hidePlayer: function(){
        var x = document.querySelector("#statusplayer");
        x.style.display = "none"
    },
    showChoices: function(){
        var x = document.querySelector(".playerchoice");
        x.style.display = "block"
    },
    hideChoices: function(){
        var x = document.querySelector(".playerchoice");
        x.style.display = "none"
    },
    showAll: function(){
        this.showMain();
        this.showObjective();
        this.showEnemy();
        this.showPlayer();
    },
    hideAll: function(){
        this.hideMain();
        this.hideObjective();
        this.hidePlayer();
        this.hideEnemy();
    },
    showMainHideAllWindows: function(){
        this.showMain();
        this.hideObjective();
        this.hidePlayer();
        this.hideEnemy();
    },
    showAllWindowsHideMain(){
        this.hideMain();
        this.showObjective();
        this.showPlayer();
        this.showEnemy();
    },
    showObjectiveHideAll(){
        this.hideMain();
        this.showObjective();
        this.hidePlayer();
        this.hideEnemy();
    },
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
    level: 0,
    hp: 100,
    mp: 200,
    sta: 500,
    isAlive: true,
    xp: 0,
    toLvlUp: 10,
    cores: 0,
    items: [],
    skills: Skills,
    isAlive: true,
    isAssigned: false
};

var PlayerAction = {
    postBattle: function(xp, core){
        Player.xp += xp;
        if (Player.xp >= Player.toLvlUp){
            // sndLvlUp();
            Player.level ++;
            GameObjective.levelReached = Player.level;
            Player.xp -= Player.toLvlUp;
            Player.toLvlUp = Player.toLvlUp + (Player.toLvlUp * 0.3);
        }
        Player.cores += core;
        GameObjective.coresObtained = Player.cores;
        PlayerAction.updateStats();
    },
    updateStats: function(){
        var n = Player.name + "<br>";
        var l = "Level: " + Player.level + "<br>";
        var h = "Hp: " + Player.hp + "<br>";
        var m = "Mp: " + Player.mp + "<br>";
        var s = "Sta: " + Player.sta + "<br>";
        var c = "Cores: " + Player.cores + "<br>";
        var i = "";
        if(Player.items.length===0){
            i = "0";
        }else{
            var i = "";
            for(var x=0; x<= Player.items.length; x++){
                i =  Player.items[0].itemname + ", "
            }
        }
        var item = "Items: " + i + "<br>";
        var x = "Xp: " + Player.xp + "<br>";
        var sk = "Skills: " + Skills[0].skillName + ", " + Skills[1].skillName;
        Player.isAssigned = true;
        setTimeout(function(){
            Print.statusPlayer(n + l + h + m + s + c + item + x + sk);
        }, 2000);

    },
    exhaustingStamina: function(staexhausted){
        Player.sta = Player.sta - staexhausted;
        PlayerAction.updateStats();
    },
    restingTime: function(staregen, mpregen){
        Player.sta += staregen;
        Player.mp += mpregen;
        PlayerAction.updateStats();
    },
    takeItem: function(item){
        Player.items.push(item);
        item.owner = Player.name;
        PlayerAction.updateStats();
    },
    useFryinPan: function(injured){
        Player.mp = Player.mp - FryingPan.mpRequired
        FryingPan.use(injured)
        PlayerAction.updateStats();
    },
    usePen: function(target){
        Player.mp = Player.mp - Pen.mpRequired
        Pen.use(target);
        PlayerAction.updateStats();
    },
    useSnap: function(target){
        if(Player.mp<=2000){

            // alert("warning! you barely have enough MANA for this move");
            Player.mp = Player.mp -Skills[0].mpRequired;
            Skills[0].use(target);
            PlayerAction.updateStats();
        }
        if(Player.mp<2000){

            // alert("You do not have enough MANA");
        }
    },
    useKick: function(target){
        if(Player.sta<10){

        }
        if(target.isAlive){
            // sndKick();
            Skills[1].use(target);
            Player.sta = Player.sta - Skills[1].staRequired
            PlayerAction.updateStats();
        }
    }
};
var DyingMan = {
    name: 'John',
    hp: 0,
    mp: 0,
    sta: 0,
    isAlive: true,
    isAssigned: false,
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
    isAssigned: false,
    createRandom: function(){
        var mon = Object.create(Monster);
        mon.type = Random.randomArray(this.type)
        mon.hp = Random.randomNumber(5, 15);
        mon.xpGiven = Random.randomNumber(5,15);
        mon.core = 1;
        mon.isAlive = true;
        mon.isAssigned = true;
        console.log("mon has been created");
        return mon
    }
};

////////// Scenario - Game Objective

var GameObjective = {
    levelReached: 0,
    coresObtained: 0,
    countDownEnd: 25,
    isAssigned: false,
}
var GameObjectiveEvent = {
    updateLevel: function(){
        var l = EndGame.levelReached

    },
    updateCores: function(){

    },
    updateDeadline: function(){

    },
    checkLevel: function(){

    },
    checkCores: function(){

    },
    checkDeadline: function(){

    },
    triggerEvent: function(){
        Print.objective(Prologue.eventStory)
        Print.delayObjective(Prologue.gamenarration, Prologue.playerChoices);
    }
}

////////// Scenario - Start Game

var Game = {
    isRunning: false,
    eventStory: "Earth exploded. You died. Or at least you thought you died. You woke up in the middle of a dense forest. Surrounded by trees, you know for sure, did not exist on earth. You take your time to check your surroundings. However it was then when you blacked out. You woke up again but this time with a.. 'game prompt?' hovering in front of you.",
    gameIntro: "Welcome Anon, to Planet Tutorial. You are one of the lucky few to be chosen. This planet is considered a benchmark. A benchmark to determine whether you have what it takes to survive your next destination. This is only a pitstop. In 30 days, reach Level 5 or accumulate 20 Monster Cores by the end of the tutorial, and you clear your objective. Whether you LIVE or DIE is up to you. There is only Rule here: SURVIVE. Enjoy.",
    playerChoices: "<a class='playerchoice' onclick='beginAdv()'>Begin</a>",
};
var GameEvent = {
    triggerEvent: function(){
        Game.isRunning = true;
        Print.story(Game.eventStory)
        GameObjective.isAssigned = true;
        Print.delayObjective(Game.gameIntro, Game.playerChoices);
    }
};
////////// Scenario - Beginning

var Beginning = {
    eventStory: "You spend minutes trying to figure things out. Pressing the 'STATUS' button brings up a window where you can see a list of stats. With nothing else to be done, or could be done, in your current situation, you decide to proceed forward.",
    playerChoices: "<a class='playerchoice' onclick='moveForward()'>Go</a> <a class='playerchoice' onclick='restTime()'>Rest</a>"
};
var BeginningEvent = {
    triggerEvent: function(){
        Print.story(Beginning.eventStory);
        Print.delayChoice(Beginning.playerChoices);
    }
};
////////// Scenario - Rest -

var RestPoint = {
    eventStory: "You take time to rest and recover. You realize at least a days rest, is needed to recover some of your stamina and mana.. You've feel like you can continue on.  ",
    playerChoices: "<a class='playerchoice' onclick='moveForward()'>Go</a> <a class='playerchoice' onclick='restTime()'>Rest</a>",
    staRegen: 20,
    mpRegen: 20,
};
var RestPointEvent = {
    triggerEvent: function(){
        Print.story(RestPoint.eventStory);
        Player.resting(RestPoint.staRegen, RestPoint.mpRegen);
        Print.delayChoice(RestPoint.playerChoices);
    }
};
////////// Scenario - Encounter Random Weak Monsters

var MonsterEncounter = {
    eventStory: ["You encountered a monster not long after walking. Though the monster looks weak, you're unsure of what to do.","After walking what feels like an eternity. You find the first sign of life form. A hideous, grotesque life form. A life form nonetheless. You're actually not sure how to feel about that."],
    monster: {},
    playerChoices: "<a class='playerchoice' onclick='fight()'>Fight</a> <a class='playerchoice' onclick='run()'>Run</a>",
};
var MonsterEncounterEvent = {
    generateMon: function(){
        MonsterEncounter.monster = Monster.createRandom();
    },
    showGenMonStats: function(){
        var s = MonsterEncounter.monster.type.species + "<br>";
        var h = "Hp: " + MonsterEncounter.monster.hp + "<br>";
        var d = "Description: " + MonsterEncounter.monster.type.description + "<br>";
        isEnemyAssignedStats = true;
        setTimeout(function(){
            Print.statusEnemy(s + h + d);
        }, 2000);

    },
    triggerEvent: function(){
        this.generateMon();
        this.showGenMonStats();
        Print.story(Random.randomArray(MonsterEncounter.eventStory));
        Print.delayChoice(MonsterEncounter.playerChoices);
    },
};
////////// Scenario - Battle

var Battle = {
    eventStory: "You cautiously approach the monster",
    winStory: "Adrenaline still pumping through your veins, it takes you a long while to calm down. Before you could even settle down, a feeling you can only describe as euphoric, courses through your whole being. Despite the pleasant sensation , you can't help but panic. Checking your status , your best guess is that it was related to gaining Exp, seeing as that was the only change aside from your stamina and mana. As exhausted as you are, you have no choice but to carry on grinding.",
    monster: {},
    playerChoices: "<a class='playerchoice' onclick='useSkills()'>Skills</a> <a class='playerchoice' onclick='useItems()'>Items</a>",
    skillChoices: "<a class='playerchoice' onclick='useSkillOne()'>Snap</a> <a class='playerchoice' onclick='useSkillTwo()'>Kick</a>",
    itemChoices: "<a class='playerchoice' onclick='useItemOne'>Pen</a> <a class='playerchoice' onclick='useItemTwo()'>Frying Pan</a>",
    winChoices: "<a class='playerchoice' onclick='moveForward()'>Go</a> <a class='playerchoice' onclick='restTime()'>Rest</a>"
};
var BattleEvent = {
    updateMonStats: function(){
        if(Battle.monster.isAlive){
            var s = Battle.monster.type.species + "<br>";
            var h = "Hp: " + Battle.monster.hp + "<br>";
            var d = "Description: " + Battle.monster.type.description + "<br>";
            setTimeout(function(){
                Print.statusEnemy(s + h + d);
            }, 2000);
            BattleEvent.triggerEvent();
        } else if (Battle.monster.hp <= 0 || !Battle.monster.isAlive){
            isAssigned = false;
            setTimeout(function(){
                PlayerAction.postBattle(Battle.monster.xpGiven , Battle.monster.core);
            }, 2000);
            BattleEvent.winEvent();
        }
    },
    triggerEvent: function(){
        Print.story(Battle.eventStory);
        Print.delayChoice(Battle.playerChoices);
    },
    skillEvent: function(){
        Print.delayChoice(Battle.skillChoices);
    },
    itemEvent: function(){
        Print.delayChoice(Battle.itemChoices);
    },
    winEvent: function(){
        Print.delayStory(Battle.winStory);
        Print.delayChoice(Battle.winChoices);
    }
};

////////// Scenario - Run

var RunAway = {
    eventStory: "You run as far as your legs could take you. Stopping only when you feel no presence behind, chasing you. Even though you're far away from the monster. You still feel some Fear. You take a moment to calm down before you make your next move. ",
    playerChoices: "<a class='playerchoice' onclick='moveForward()'>Go</a> <a class='playerchoice' onclick='restTime()'>Rest</a>",
    staWasted: Random.randomNumber(50, 100)
};
var RunAwayEvent = {
    triggerEvent: function(){
        Print.story(RunAway.eventStory);
        Print.delayChoice(RunAway.playerChoices);
    }
};

////////// Encounter - Find

var FindItem = {
    eventStory: ["You see something on the ground."],
    item: [Pen, FryingPan, Twig],
    playerChoices: "<a class='playerchoice' onclick='takeItems()'>Take</a> <a class='playerchoice' onclick='run()'>Ignore</a>",
    ignoreChoices: "<a class='playerchoice' onclick='moveForward()'>Go</a> <a class='playerchoice' onclick='restTime()'>Rest</a>"
};
var FindItemEvent = {
    triggerEvent: function(){
        Print.story(FindItem.eventStory);
        Print.delayChoice(FindItem.playerChoices);
    },
    takeEvent: function(){
        Print.delayChoice(FindItem.playerChoices);
    },
    ignoreEvent: function(){
        Print.delayChoice(FindItem.playerChoices);
    },
};
////////// Actions

function beginAdv(){

    // sndChoices();
    console.log(" > to Beginning Scenario Object");
    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();
    PlayerAction.updateStats();
    BeginningEvent.triggerEvent();
};
function moveForward(){
    // sndChoices();
    console.log(" > to Random Scenario Object");

    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();

    var staWasted = Random.randomNumber(10, 30);
    PlayerAction.exhaustingStamina(staWasted);

    PlayerAction.updateStats();
    MonsterEncounterEvent.triggerEvent();
};
function restTime(){

    // sndChoices();
    console.log(" > to RestPoint Scenario Object");

    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();

    var staRegen = 20;
    var mpRegen = 20;
    PlayerAction.restingTime(staRegen, mpRegen)

    PlayerAction.updateStats();
    RestPointEvent.triggerEvent();
};
function run(){
    // sndChoices();
    console.log(" > to RunAway Scenario Object");

    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();

    var staWasted = Random.randomNumber(30, 50);
    PlayerAction.exhaustingStamina(staWasted);

    PlayerAction.updateStats();
    RunAwayEvent.triggerEvent();
};
function fight(){

    // sndChoices();
    console.log(" > to Battle Scenario Object");

    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();

    var staWasted = Random.randomNumber(5, 10);
    PlayerAction.exhaustingStamina(staWasted);

    Battle.monster = MonsterEncounter.monster;
    PlayerAction.updateStats();
    BattleEvent.triggerEvent();
};
function useSkills(){
    // sndChoices();
    console.log(" > to UseSkill method in Battle Scenario Object");

    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();

    PlayerAction.updateStats();
    BattleEvent.skillEvent();
};
function useSkillOne(){
    // sndChoices();
    console.log(" > use Players skill one method")

    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();

    PlayerAction.useSnap(Battle.monster);
    PlayerAction.updateStats();
    BattleEvent.updateMonStats();
};
function useSkillTwo(){
    // sndChoices();
    console.log(" > use Players skill two method")

    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();

    PlayerAction.useKick(Battle.monster);
    PlayerAction.updateStats();
    BattleEvent.updateMonStats();
};
function useItems(){
    // sndChoices();
    console.log(" > to UseItems method in Battle Scenario Object");

    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();

    if(Player.items.length === 0){
        alert("You dont have any ITEMS to use!");
        PlayerAction.updateStats();
        BattleEvent.triggerEvent();
    } else {
        PlayerAction.updateStats();
        BattleEvent.itemEvent();
    }
};
function useItemOne(){
    // sndChoices();
    console.log(" > use Players item one method");

    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();

    PlayerAction.usePen(Battle.monster);
    BattleEvent.updateMonStats();
    BattleEvent.triggerEvent();
};
function useItemTwo(){
    // sndChoices();
    console.log(" > use Players item two method");

    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();

    PlayerAction.useFryinPan(Battle.monster);
    BattleEvent.updateMonStats();
    BattleEvent.triggerEvent();
};
function takeItems(){
    // sndChoices();
    console.log(" > use Players item two method");

    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();

    Player.takeItem(FindItem.item);
    PlayerAction.updateStats();
    FindItemEvent.takeEvent();
};
function ignoreItems(){
   // sndChoices();
    console.log(" > use Players item two method");

    ToggleSelection.showMainHideAllWindows();
    ToggleSelection.hideChoices();

    PlayerAction.updateStats();
    FindItemEvent.ignoreEvent();
};

console.log("gamedata.js loaded")