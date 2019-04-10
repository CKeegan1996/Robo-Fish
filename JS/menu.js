//*********************************************************
//*********Code by Mauro Lana and Connor Keegan************
//*********************************************************

//this is the "menu" scren
//a simple screen that acts as an inbetween from the player accessing the game and actually playing

var menuState = {
    
    create: function () {
    //I stole this font.    
    //var bmpText = game.add.bitmapText(160, 40, 'carrier_command', 'Not Space Evaders!', 24);
    //var bmpText2 = game.add.bitmapText(100, 80, 'carrier_command', 'Press the button below and start evading!', 13);

    //this are davids (C)2018    
    //ship_icon = game.add.sprite (43, 210, 'player');  
    //enemy_icon = game.add.sprite (300, 160, 'enemy1');  
    //bullet_icon = game.add.sprite (250, 170, 'bullet');
    //bullet2_icon = game.add.sprite (150, 150, 'bullet');
    //bullet3_icon = game.add.sprite (50, 130, 'bullet');    
    //enemy2_icon = game.add.sprite (150, 260, 'enemy2');
    //enemy3_icon = game.add.sprite (300, 340, 'enemy3');
        
    //bmpText.inputEnabled = true;
        
    var s = game.add.sprite(-6,0, 'menupic');
    s.scale.setTo(1.01,1);
        
     //keyboard command for debug purposes   
    var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.start, this);
    
    //button for the player to tap to take them to the next screen        
     button = game.add.button(game.world.centerX- 95, 550, 'start', this.start, this);
     button.scale.setTo(2,2);
    },
    
    
    start: function () {
        game.state.start('main');
    }
    
};