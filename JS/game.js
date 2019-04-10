//*********************************************************
//*********Code by Mauro Lana and Connor Keegan************

var game = new Phaser.Game(1200, 650, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('win', winState);
game.state.add('death', deathState);
game.state.add('menu', menuState);
game.state.add('main', mainState);

game.state.start('boot');