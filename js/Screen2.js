BasicGame.Screen2 = function (game) {
	this.background;
	this.playerList;
	this.chosenPlayers;
	
	this.teamText1;
	this.teamText2;
	this.teamText3;
	this.screenText1;
	this.screenText2;
	this.versus1;
	this.versus2;
	this.versus3;
	
	this.setPick;
	
	this.logo;
	this.nflpaLogo;
	
	this.timer;
	this.timeLeft;
	this.timerDisplay;
	this.landscape;
};

BasicGame.Screen2.prototype = {
	init: function (timeLeft){
		this.timeLeft = timeLeft;
	},
	
    create: function () {
		this.background = this.add.sprite(0,0,'background3');
		this.background.scale.setTo(.6);
		this.background.anchor.setTo(.1,.1);
		this.chosenPlayers = [null,null,null];
		this.playerList = [];
		/*for(i=0;i<6;i++){
			player = playerList[i];
			player.inputEnabled = true;
			player.events.onInputDown.add(function(){
				chosenIndex = parseInt(i/2);
				
				//Assign to list
				if(this.chosenPlayers[chosenIndex] == player){
					this.chosenPlayers[chosenIndex] = player;
				}else{
					this.chosenPlayers[chosenIndex] = null;
				}
				
				//Visibility
				if(this.chosenPlayers[chosenIndex] == null){
					this.playerList[i%2].tint = 0xffffff;
					this.playerList[(i%2)+1].tint = 0xffffff;
				}else if(i%2 == 0){
					this.playerList[i%2].tint = 0xffffff;
					this.playerList[(i%2)+1].tint = 0xbfbfbf;
				}else{
					this.playerList[i%2].tint = 0xbfbfbf;
					this.playerList[(i%2)+1].tint = 0xffffff;
				}
			},this);
		}*/
		
		//Set Picks Button
		this.setPick = this.add.sprite(400,525,'button');
		this.setPick.anchor.setTo(.5,.5);
		this.setPick.scale.setTo(.2);
		style = {font:"120px OpenSans",fill:"#000000"};
		tempText = this.add.text(0,0,'SET YOUR PICKS',style);
		tempText.anchor.setTo(.5,.5);
		this.setPick.addChild(tempText);
		this.setPick.inputEnabled = true;
		this.setPick.events.onInputUp.add(this.nextScreen,this);
		
		//Role position text
		style = {font:"bold 18px Arial",fill:"#ffffff"};
		this.teamText1 = this.add.text(200,175,'Quarterback',style);
		this.teamText1.anchor.setTo(1,.5);
		this.teamText2 = this.add.text(200,275,'Running Back',style);
		this.teamText2.anchor.setTo(1,.5);
		this.teamText3 = this.add.text(200,375,'Wide Receiver',style);
		this.teamText3.anchor.setTo(1,.5);
		style = {font:"bold 36px",fill:"#ffffff"};
		this.screenText1 = this.add.text(400,100,'WEEK 1 MATCHUP',style);
		this.screenText1.anchor.setTo(.5,.5);
		this.screenText2 = this.add.text(400,450,'PICK THE WINNER',style);
		this.screenText2.anchor.setTo(.5,.5);
		style = {font:'bold 45px',fill:'red'};
		this.versus1 = this.add.text(400,175,'VS',style);
		this.versus1.anchor.setTo(.5,.5);
		this.versus2 = this.add.text(400,275,'VS',style);
		this.versus2.anchor.setTo(.5,.5);
		this.versus3 = this.add.text(400,375,'VS',style);
		this.versus3.anchor.setTo(.5,.5);
		
		this.logo = this.add.sprite(700,50,'logo');
		this.logo.anchor.setTo(.5,.5);
		this.logo.scale.setTo(.1);
		
		this.nflpa = this.add.sprite(50,50,'nflpa');
		this.nflpa.anchor.setTo(.5,.5);
		this.nflpa.scale.setTo(.02);
		
		//Timer to next screen
		this.timer = this.time.create(false);
		this.timer.add(settings.max_play_time,function(){
			PlayableSdk.openClickUrl();
		},this);
		style = {font:"36px Arial",fill:"#ffffff"};
		this.timerDisplay = this.add.text(450,25,'',style);
		this.timer.start();
		
		this.landscape = true;
		this.orientationUpdate();
		this.landscape = false;
		this.orientationUpdate();
		this.landscape = true;
		this.orientationUpdate();
	},
	
	update: function () {
		this.timerUpdate();
		this.orientationUpdate();
    },
	
	timerUpdate: function (){
		min = parseInt(this.timer.duration/60000);
		sec = parseInt((this.timer.duration%60000)/1000);
		ms = parseInt((this.timer.duration%1000)/10);
		this.timerDisplay.setText(min.toString() + ':' + sec.toString() + ':' + ms.toString());
	},
	
	teamCheck: function() {
		//Check to see if all 
		temp = true;
		for(entry in this.chosenPlayers){
			if(entry == null){
				temp = false;
				break;
			}
		}
		
		if(temp){
			this.setPick.tint = 0xffffff;
			this.setPick.inputEnabled = true;
		}else{
			this.setPick.tint = 0xbfbfbf;
			this.setPick.inputEnabled = false;
		}
	},
	
	nextScreen: function(){
		this.state.start('Screen3',true,false, this.timer.duration, this.chosenPlayers);
	},
	
	orientationUpdate: function() {
		this.scale.maxHeight = window.innerHeight;
		//this.scale.maxHeight = document.getElementById("game").offsetHeight;
		if(this.landscape){
			this.scale.maxWidth = this.scale.maxHeight *(4/3);
		}else{
			this.scale.maxWidth = this.scale.maxHeight *(2/3);
		}
		
		
		//If window scale hits a certain ratio to switch from portrait to landscape or vice versa, change orientation and adjust sprites accordingly
		if((window.innerWidth/window.innerHeight) <= (3/4) && this.landscape){
			this.landscape = false;
			this.scale.setGameSize(600,900);
			//Rearrange sprites
			this.logo.x = 500;
			this.setPick.x = 300;
			this.teamText1.x = 150;
			this.teamText2.x = 150;
			this.teamText3.x = 150;
			this.versus1.x = 300;
			this.versus2.x = 300;
			this.versus3.x = 300;
			this.background.x = -200;
			this.background.y = 300;
			this.screenText1.x = 300;
			this.screenText2.x = 300;
		}else if((window.innerWidth/window.innerHeight) > (3/4) && !this.landscape){
			this.landscape = true;
			this.scale.setGameSize(800,600);
			//Rearrange sprites
			this.logo.x = 700;
			this.setPick.x = 400;
			this.teamText1.x = 200;
			this.teamText2.x = 200;
			this.teamText3.x = 200;
			this.versus1.x = 400;
			this.versus2.x = 400;
			this.versus3.x = 400;
			this.background.x = 0;
			this.background.y = 0;
			this.screenText1.x = 400;
			this.screenText2.x = 400;
		}
	},
};