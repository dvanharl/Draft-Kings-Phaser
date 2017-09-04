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
	
	this.playFree;
	
	this.logo;
	this.nflpa;
};

BasicGame.Screen3.prototype = {
	init: function (team){
		this.team = team;
	},
	
    create: function () {
		this.background = this.add.sprite(0,0,'background2');
		this.background.anchor.setTo(.5,0);
		
		//this.teamText = this.add.text(0,0,'YOUR TEAM');
		//this.endText1 = this.add.text(0,0,'Download DraftKings and submit your team!');
		//this.endText2 = this.add.text(0,0,'SUBMIT YOUR TEAM BEFORE THE GAME STARTS!');
		style = {font:"bold 25px Arial",fill:"#ffffff"};
		this.endText3 = this.add.text(400,450,'FREE Entry to a fantasy sports contest with your first deposit!',style);
		this.endText3.anchor.setTo(.5,.5);
		
		this.timer = this.time.create(false);
		this.timer.add(120000,this.openLink,this);
		style = {font:"36px Arial",fill:"#ffffff"};
		this.timerDisplay = this.add.text(400,25,'',style);
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
		this.playFree.events.onInputUp.add(this.openLink,this);
		
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
    },

    update: function () {
		this.timerUpdate();
    },
	
	timerUpdate: function (){
		min = parseInt(this.timer.duration/60000);
		sec = parseInt((this.timer.duration%60000)/1000);
		ms = parseInt(this.timer.duration%1000);
		this.timerDisplay.setText(min.toString() + ':' + sec.toString() + ':' + ms.toString());
	},
	
	openLink: function(){
		window.open(settings.siteLink);
	},
	
	render: function() {
		//this.game.debug.text(this.team,100,25);
	}
};