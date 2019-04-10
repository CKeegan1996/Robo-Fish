//*********************************************************
//*********Code by Mauro Lana and Connor Keegan************
//*********************************************************

//this game uses a state system, to make it more efficient
//it divides the code into different states
//this defines the physics system and starts the load state

var bootState = {
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.state.start('load');
    }
};