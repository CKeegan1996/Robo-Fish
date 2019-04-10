//*********************************************************
//*********Code by Mauro Lana and Connor Keegan************
//*********************************************************


//variables 
var timer;
var timesHit=0;
var hitsToKill=8;
var timesHitBoss=0;
var hitsToKillBoss=300;
var score = 0;
var scoreText;
var enemyText;
var bulletsFired=0;
var enemiesKilled=0;
//sounds
var shot;
var music;
var boom;

//This function handles the impact between bullets and fish type 1. It takes 8 hits to eliminate a single one.
var killFish= function (weapon,fishGroup)
{
    timesHit++;
    console.log(timesHit);
    if(timesHit==hitsToKill)
    {
        console.log("Tango down!");
        fishGroup.kill();
        boom.play();
        score=score+150;
        enemiesKilled = enemiesKilled+1;
        console.log("enemies killed: "+enemiesKilled);
        enemyText.setText('ENEMIES KILLED: ' + enemiesKilled);
        scoreText.setText('SCORE: ' + score);
        timesHit=0;
    }
    weapon.kill();
    //color sprite based on damage! Not in use, looks confusing
    //if(timesHit>=3)
    //fishGroup.tint = 0xffff00;
    //if(timesHit>=6)
    //fishGroup.tint = 0xFF2D00;
};

var killFish2= function (weapon,fishGroup2)
{
    timesHit++;
    console.log(timesHit);
    if(timesHit==hitsToKill)
    {
        console.log("Tango down!");
        fishGroup2.kill();
        boom.play();
        score=score+150;
        enemiesKilled = enemiesKilled+1;
        console.log("enemies killed: "+enemiesKilled);
        enemyText.setText('ENEMIES KILLED: ' + enemiesKilled);
        scoreText.setText('SCORE: ' + score);
        timesHit=0;
    }
    weapon.kill();
};

//this handles the boss helath and collisions with bullets. 2 points are awarded for each time the biss is hit. 
//It takes 300 bullets to defeat Eclypse Eye, but with the fastrate of fire that can be achieved very fast.
var killBoss= function (weapon,bossGroup)
{
    timesHitBoss++;
    console.log(timesHitBoss);
    if(timesHitBoss==hitsToKillBoss)
    {
        console.log("Tango down!");
        bossGroup.kill();
        boom.play();
        score=score+1250;
        scoreText.setText('SCORE: ' + score);
        game.state.start('win', true, false, score, bulletsFired,enemiesKilled);
        music.stop();
        timesHitBoss=0;
        score=0;
        //********HERE************
        //This is the time to GET THE SCORE before it's reset for the next game
        game.state.start('menu');
    }
    //here we are changing the sprite color based on Boss's remaining health
    weapon.kill();
    score=score+2;
    scoreText.setText('SCORE: ' + score);
    if(timesHitBoss>=100)
    bossGroup.tint = 0xffff00;
    if(timesHitBoss>=200)
    bossGroup.tint = 0xFF2D00;
    
};

//handle player death
var playerDead= function ()
{
        console.log("R.I.P heroes of the cosmos...");
        //********HERE************
        //This is the time to GET THE SCORE before it's reset for the next game
        console.log("Player score: " + score);
        game.state.start('death', true, false, score, bulletsFired,enemiesKilled);
        score=0;
        boom.play();
        //this.game.state.restart()
        music.stop();
};

//Createa group of enemies 
//Attack formation: "/"
var spawn= function()
{
    fishGroup = game.add.group();
    fishGroup.enableBody=true;
    fishGroup.physicsBodyType = Phaser.Physics.ARCADE;
        var x=0;
        var y=0;
        for (var i = 0; i < 20; i++)
        {
            fish = fishGroup.create(2+x , 2-y, 'eclypse',[],true,i);
            game.physics.enable(fish, Phaser.Physics.ARCADE);
            fish.body.setSize(600, 600, -600, 400);
            fish.scale.set(0.1);
            fish.angle= +75
            fish.lifeSpan = 10000;
            fish.name= 'fish'+i;
            fish.body.velocity.y = 150;
            x=x+130;
            y=y+20;
            //Randomizes the movement of roboFish (not in use, used only for the boss) 
            //var tween = game.add.tween(fish).to( { x: fish.x+-game.rnd.integerInRange(0, 200) }, game.rnd.integerInRange(2500, 3000), Phaser.Easing.Linear.None, true, 0, game.rnd.integerInRange(2500, 3000), true);
        }
}

//Formation: "Row"
var spawn2= function()
{
    fishGroup2 = game.add.group();
    fishGroup2.enableBody=true;
    fishGroup2.physicsBodyType = Phaser.Physics.ARCADE;
        var x=game.rnd.integerInRange(100, 1000);
        var y=0;
        for (var i = 0; i < 10; i++)
        {
            fish2 = fishGroup2.create(x , 2-y, 'eclypse',[],true,i);
            game.physics.enable(fish2, Phaser.Physics.ARCADE);
            fish2.body.setSize(600, 600, -600, 400);
            fish2.scale.set(0.1);
            fish2.angle= +75
            fish2.lifeSpan = 10000;
            fish2.name= 'fish2'+i;
            fish2.body.velocity.y = 150;
            y=y+120;
        }
}

var spawnBoss= function()
{
    bossGroup = game.add.group();
    bossGroup.enableBody=true;
    bossGroup.physicsBodyType = Phaser.Physics.ARCADE;
        var x=0;
        var y=0;
        for (var i = 0; i < 1; i++)
        {
            boss = bossGroup.create(800 , -1000, 'eclypse',[],true,i);
            game.physics.enable(boss, Phaser.Physics.ARCADE);
            boss.body.setSize(600, 600, -600, 400);
            boss.scale.set(0.8);
            boss.angle= +75
            //boss.lifeSpan = 10000;
            boss.name= 'boss'+i;
            //tween btween 2 poistions
            var tween = game.add.tween(boss).to( { y: 0 }, 6000, Phaser.Easing.Linear.None, true, 200, 200, true);
        }
}

//beginnin of main state
var mainState = {
    
create: function () {
    
    //Timed events. Let's dance!
    //NOTE: don't spawn same group within TIME<=Life Span of enemies to avoid collider issues.
    //By using events it's easy to organiseenemy spawn. Here we are using 2 formations only, but it can be asily expanded
    game.time.events.add(Phaser.Timer.SECOND * 4, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 10, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 12, spawn2, this);
    game.time.events.add(Phaser.Timer.SECOND * 20, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 22, spawn2, this);
    game.time.events.add(Phaser.Timer.SECOND * 26, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 36, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 42, spawn2, this);
    game.time.events.add(Phaser.Timer.SECOND * 50, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 54, spawn2, this);
    game.time.events.add(Phaser.Timer.SECOND * 60, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 66, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 68, spawn2, this);
    game.time.events.add(Phaser.Timer.SECOND * 72, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 76, spawn2, this);
    //Boss coming through!
    game.time.events.add(Phaser.Timer.SECOND * 85, spawnBoss, this);
    game.time.events.add(Phaser.Timer.SECOND * 95, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 102, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 106, spawn2, this);
    game.time.events.add(Phaser.Timer.SECOND * 115, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 120, spawn, this);
    game.time.events.add(Phaser.Timer.SECOND * 125, spawn2, this);
    game.time.events.add(Phaser.Timer.SECOND * 130, spawn, this);
    
    //Create world bounds
    game.world.setBounds(0, 0, 1200, 650);
    //Initialise physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //Video background
    var video = game.add.video('video')
    video.play(true);
    video.addToWorld();
    
    /*Static background (not in use)
    var BG = game.add.sprite(-6,0, 'menupic');
    BG.scale.setTo(1.01,1);*/
    
    //Player spawn
    player = game.add.sprite(600,500, 'player');
    player.angle += 270;
    player.scale.set(0.1);
    player.anchor.x = 0.5;
    player.anchor.y = 0.5;
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.setSize(600, 400, 120, 170);
    
    /*test spaceship. Used to test collisions
    player2 = game.add.sprite(600,300, 'player');
    player2.angle += 270;
    player2.scale.set(0.1);
    player2.anchor.x = 0.5;
    player2.anchor.y = 0.5;
    game.physics.enable(player2, Phaser.Physics.ARCADE);
    player2.body.collideWorldBounds = true;
    player2.body.setSize(600, 400, 120, 170);*/
    
    //CONTROLS: MOVEMENT
    cursors = game.input.keyboard.createCursorKeys();
    //CONTROLS: WEAPONS
    //Note: Only W key is used to play. The reason for this are time constraints.
    wkey= game.input.keyboard.addKey(Phaser.Keyboard.W);
    qkey= game.input.keyboard.addKey(Phaser.Keyboard.Q);
    ekey= game.input.keyboard.addKey(Phaser.Keyboard.E);
    rkey= game.input.keyboard.addKey(Phaser.Keyboard.R);
    lkey= game.input.keyboard.addKey(Phaser.Keyboard.L);
    
    //BULLETS
    weapon = game.add.weapon(50, 'bullet');
    weapon.enableBody=true;
    weapon.physicsBodyType = Phaser.Physics.ARCADE;
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletAngleOffset = 180;
    weapon.bulletSpeed = 1200;
    //shoot ever X millisconds
    weapon.fireRate = 50;
    weapon.bulletAngleVariance = 5;
    weapon.trackSprite(player, 0, -30);
    weapon.bulletSpeedVariance = 50;
    /*awesome way to apply gravity to bullets and adjust their rotation
    weapon.bulletGravity = new Phaser.Point(2000, 0);
    weapon.bulletRotateToVelocity = true;*/
    
    
    //BULLETS- side guns, NOT IN USE, just for eye-candy
    weapon2 = game.add.weapon(40, 'bullet');
    weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon2.bulletAngleOffset = 180;
    weapon2.bulletSpeed = -500;
    weapon2.fireRate = 100;
    weapon2.fireAngle = 160;
    weapon2.bulletAngleVariance = 3;
    weapon2.trackSprite(player, 30, 0);
    weapon2.bulletSpeedVariance = 0;
    weapon3 = game.add.weapon(40, 'bullet');
    weapon3.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon3.bulletAngleOffset = 180;
    weapon3.bulletSpeed = -500;
    weapon3.fireRate = 100;
    weapon3.fireAngle = 20;
    weapon3.bulletAngleVariance = 3;
    weapon3.trackSprite(player, -30, 0);
    weapon3.bulletSpeedVariance = 0;
    
    //MISSILES NOT IN USE, just for eye-candy
    missile1 = game.add.weapon(1, 'missile');
    missile1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    missile1.bulletAngleOffset = -180;
    missile1.bulletSpeed = 300;
    missile1.fireRate = 1;
    missile1.bulletAngleVariance = 2;
    missile1.trackSprite(player, 0, -40);
    missile1.bulletGravity = new Phaser.Point(500, 0);
    missile1.bulletRotateToVelocity = true;
    missile2 = game.add.weapon(1, 'missile');
    missile2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    missile2.bulletAngleOffset = 180;
    missile2.bulletSpeed = 300;
    missile2.fireRate = 1;
    missile2.bulletAngleVariance = 2;
    missile2.trackSprite(player, 0, -40);
    missile2.bulletGravity = new Phaser.Point(-500, 0);
    missile2.bulletRotateToVelocity = true;
    
    //laser NOT IN USE, just for eye-candy
    laser = game.add.weapon(40, 'laser');
    laser.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    laser.bulletAngleOffset = 180;
    laser.bulletSpeed = 2000;
    laser.fireRate = 1;
    laser.bulletAngleVariance = 0;
    laser.trackSprite(player, 0, -50);
    
    //add enemy groups to game
    fishGroup = game.add.group();
    fishGroup2 = game.add.group();
    bossGroup = game.add.group();
    
    //UI
    //SCORE
    var style = { font: "30px Arial", fill: "#ffff00", align: "center" };
    scoreText = this.add.text(15, 15, "SCORE: " + score, style);
    enemyText = this.add.text(15, 50, "ENEMIES KILLED: " + enemiesKilled, style);
    
    //sound
    shot = game.add.audio('shot');
    shot.volume = 0.05;
    music = game.add.audio('music',1,true);
    music.volume = 0.6;
    music.play();
    boom = game.add.audio('boom');
    boom.volume = 0.5;
    
},
    
update: function () {
    //weapon-enemy
    //weapon2-enemy
    //missile-enemy
    //laser-enemy
    //player-enemy
    //to code it all = 5* Number of enemies
    
    //Collisions
    game.physics.arcade.collide(player, fishGroup, playerDead, null, this);
    game.physics.arcade.collide(player, fishGroup2, playerDead, null, this);
    game.physics.arcade.collide(player, bossGroup, playerDead, null, this);
    game.physics.arcade.overlap(weapon.bullets, fishGroup, killFish, null, this);
    game.physics.arcade.overlap(weapon.bullets, fishGroup2, killFish2, null, this);
    game.physics.arcade.overlap(weapon.bullets, bossGroup, killBoss, null, this);
    //Stops the player whan movement keys are not pressed
    player.body.velocity.y=0;
    player.body.velocity.x=0;
    player.angle = 270;
    
    //Movement
    if (cursors.up.isDown)
    {
        player.body.velocity.y = -300;
    }
    
        if (cursors.down.isDown)
    {
        player.body.velocity.y = 300;
    }
    
        if (cursors.left.isDown)
    {
        player.body.velocity.x=-300;
        player.angle = -95;
    }
    
        if (cursors.right.isDown)
    {
        player.body.velocity.x= 300;
        player.angle = -85;
    }
    //BULLETS
    if (wkey.isDown)
    {
        weapon.fire();
        shot.play();
        bulletsFired++;
        console.log(parseInt(bulletsFired/2));
    }
    
    //MISSILE
    if (qkey.isDown)
    {
        missile1.fire();
        missile2.fire();
    }
    //SIDE GUNS
        if (ekey.isDown)
    {
        weapon2.fire();
        weapon3.fire();
    }
    //LASER
        if (rkey.isDown)
    {
        laser.fire();
        player.body.velocity.y=0;
        player.body.velocity.x=0;
        player.angle = 270;
    }
    //DEBUG KEY
     lkey.onDown.addOnce(this.start, this);
},


//used for debug
render: function()
{
    //uncomment to see colliders
    //game.debug.bodyInfo(player, 32, 32);
    //game.debug.body(player);
    //game.debug.body(player2);
    //game.debug.physicsGroup(fishGroup);
    //game.debug.physicsGroup(bossGroup);
    //game.debug.physicsGroup(weapon);
},
    
//Not currently used, go back to win state 
start: function () 
    {
    game.state.start('win');
    console.log("L Pressed");
    }
     
};