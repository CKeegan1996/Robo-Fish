//*********************************************************
//*********Code by Mauro Lana and Connor Keegan************
//*********************************************************

//win state


var theScore;
var theBullets;
var theEnemies;

var winState = {
    
    init: function(score){
        this.theScore = score;
        this.theBullets = bulletsFired;
        this.theEnemies = enemiesKilled;
        //alert("Howdy! You scored: "+this.theScore)
    },
    
    
    create: function () {
    var style = { font: "30px Arial", fill: "#ffff00", align: "center"};
    var bmpText = this.add.text(15,15, 'YOU WIN!', style,);  
    var bmpText2 = this.add.text(15,50, 'TAP THE BUTTON BELOW!', style);   
    var bmpText3 = this.add.text(15,95, 'TO RETURN!', style,);   
   
    //display info about score, bullets, enemies killed
    this.game.add.text(5, 250, 'Your score is '+this.theScore+'.', style);
    this.game.add.text(5, 300, 'Number of bullets fired: '+this.theBullets+'.', style);
    this.game.add.text(5, 350, 'Number of enemies killed: '+this.theEnemies+'.', style);    
        
    //this.game.add.text(5, 350, 'Press W to Save Score.', style);    

   bmpText.inputEnabled = true;
        
     
        
    //debug until mobile implementation    
      var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
      wkey.onDown.addOnce(this.dbscore, this);
    

    //button for the player to tap to take them to the next screen   
    //and call function to pass score to db
     button3 = game.add.button(game.world.centerX - 5, 400, 'start', this.dbscore, this);
     button3.scale.setTo(2,2);
},
     //start: function() 
    //{
      //  game.state.start('menu');
    //}
    dbscore: function()
    {
      var person = prompt("Please enter your name", "test");  
    
    
    if (person != null){
    game.state.start('menu');
    var obj = {
        'user': person,
        'thescore': this.theScore,
        'thebullets': this.theBullets,
        'theenemies': this.theEnemies

};
var xhr = new XMLHttpRequest();
		xhr.open('POST', 'savescore.php');
		xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
		jsonData = JSON.stringify(obj);
		
		xhr.onreadystatechange = function() {
			if (xhr.status === 200) {
				alert(xhr.responseText);
			}
		};
		xhr.send('json=' + jsonData);
    
}
        
    }
};