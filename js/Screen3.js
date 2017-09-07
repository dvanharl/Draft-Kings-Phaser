BasicGame.Screen3 = function (game) {
	this.background;
	
	this.team;
	
	this.teamText;
	this.endText1;
	this.endText2;
	this.endText3;
	this.dislaimer;
	
	this.timer;
	this.timerDisplay;
	this.timerText;
	this.timeLeft
	
	this.playFree;
	
	this.logo;
	this.nflpa;
};

BasicGame.Screen3.prototype = {
	init: function (timeLeft,team){
		this.timeLeft = timeLeft
		this.team = team;
	},
	
    create: function () {
		this.background = this.add.sprite(0,0,'background2');
		this.background.anchor.setTo(.5,0);
		
		//this.teamText = this.add.text(0,0,'YOUR TEAM');
		//this.endText1 = this.add.text(0,0,'Download DraftKings and submit your team!');
		//this.endText2 = this.add.text(0,0,'SUBMIT YOUR TEAM BEFORE THE GAME STARTS!');
		style = {font:"bold 25px Arial",fill:"#ffffff",wordWrap:true, wordWrapWidth:this.background.width*0.3, align:"center"};
		this.endText3 = this.add.text(400,450,'FREE Entry to a fantasy sports contest with your first deposit!',style);
		this.endText3.anchor.setTo(.5,.5);
		
		this.timer = this.time.create(false);
		this.timer.add(this.timeLeft,function(){
			PlayableSdk.openClickUrl();
		},this);
		style = {font:"36px Arial",fill:"#ffffff"};
		this.timerDisplay = this.add.text(650,90,'',style);
		this.timer.start();
		
		//this.timerText = this.add.text(0,0,'Offer ends in:');
		
		//Button and disclaimer
		style = {font:"12px Arial",fill:"#ffffff"};
		this.disclaimer = this.add.text(400,575,'*Eligibilty Restrictions Apply. See Website for Details.',style);
		this.disclaimer.anchor.setTo(.5,.5);
		this.playFree = this.add.sprite(400,525,'button');
		this.playFree.anchor.setTo(.5,.5);
		this.playFree.scale.setTo(.2);
		style = {font:"bold 120px OpenSans",fill:"#000000"};
		tempText = this.add.text(0,0,'PLAY FREE*',style);
		tempText.anchor.setTo(.5,.5);
		this.playFree.addChild(tempText);
		this.playFree.inputEnabled = true;
		this.playFree.events.onInputUp.add(function(){
			PlayableSdk.openClickUrl();
		},this);
		
		//Role position text
		style = {font:"bold 18px Arial",fill:"#ffffff"};
		this.teamText1 = this.add.text(200,175,'Quarterback',style);
		this.teamText1.anchor.setTo(1,.5);
		this.teamText2 = this.add.text(200,275,'Running Back',style);
		this.teamText2.anchor.setTo(1,.5);
		this.teamText3 = this.add.text(200,375,'Wide Receiver',style);
		this.teamText3.anchor.setTo(1,.5);
		
		//Logos
		this.logo = this.add.sprite(700,50,'logo');
		this.logo.anchor.setTo(.5,.5);
		this.logo.scale.setTo(.1);
		
		this.nflpa = this.add.sprite(50,50,'nflpa');
		this.nflpa.anchor.setTo(.5,.5);
		this.nflpa.scale.setTo(.02);
		
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
			this.endText3.x = 300;
			this.playFree.x = 300;
			this.disclaimer.x = 300;
			this.disclaimer.y = 700
			this.timerDisplay.x = 450;
		}else if((window.innerWidth/window.innerHeight) > (3/4) && !this.landscape){
			this.landscape = true;
			this.scale.setGameSize(800,600);
			//Rearrange sprites
			this.logo.x = 700;
			this.endText3.x = 400;
			this.playFree.x = 400;
			this.disclaimer.x = 400;
			this.timerDisplay.x = 650;
		}
	},
};