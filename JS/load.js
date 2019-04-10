//*********************************************************
//*********Code by Mauro Lana and Connor Keegan************
//*********************************************************

//moving into load, this loads all the assets used in the game across all levels
//then loads the first game state

var loadState = {
    
    preload: function () {
        
        var loadingLabel = game.add.text(80, 150, 'loading...',
                                         {font: '30px Courier', fill: '#fffff'});
        
//*****************************************PRELOAD FUNCTION*****************************************
//the preload function is used to get URLs for all game assets. The first arguement is a unique key that is used to quicky identify the asset.          
    game.load.video('video', 'assets/video.MP4');
    game.load.audio('shot', 'assets/shot.wav');
    game.load.audio('boom', 'assets/boom.wav');
    game.load.audio('music', 'assets/darius.mp3');
    game.load.image('player', 'assets/Spaceship.png');
    game.load.image('eclypse', 'assets/eclypseeye.png'); 
    game.load.image('enemy1', 'assets/enemy1.png'); 
    game.load.image('enemy2', 'assets/enemy2.png');
    game.load.image('enemy3', 'assets/enemy3.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('missile', 'assets/missile.png');
    game.load.image('laser', 'assets/laser.png');
    game.load.image('start', 'assets/Start_Button.png');
    game.load.image('menupic', 'assets/robo_fish.jpg');
    game.load.image('start', 'assets/Start_button');  
    
        
    //font
    game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
},
    
create: function() {
        game.state.start('menu');
    }
    
};