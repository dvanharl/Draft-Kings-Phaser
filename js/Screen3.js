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
	this.p1;
	this.p2;
	
	this.bar1;
	this.bar2;
	
	this.landscape
};

BasicGame.Screen3.prototype = {
	init: function (timeLeft,team,colors){
		this.timeLeft = timeLeft
		this.team = team;
		this.colors = colors;
	},
	
    create: function () {
		this.background = this.add.sprite(0,0,'background2');
		this.background.anchor.setTo(.5,0);
		if(settings.banner_clickable_on_show){
			this.background.inputEnabled = true;
			this.background.events.onInputUp.add(function(){
				PlayableSdk.openClickUrl();
			},this);
		}
		
		style = {font:"bold 22px Impact",fill:"#ffffff",wordWrap:true, wordWrapWidth:this.background.width*0.3, align:"center"};
		this.endText3 = this.add.text(400,460,'FREE Entry to a fantasy sports contest with your first deposit!',style);
		this.endText3.anchor.setTo(.5,.5);
		
		if(settings.timer){
			this.timer = this.time.create(false);
			this.timer.add(this.timeLeft,function(){
				PlayableSdk.openClickUrl();
			},this);
			style = {font:"36px Arial",fill:"#ffffff"};
			this.timer.start();
		}
		this.timerDisplay = this.add.text(650,90,'',style);
		if(!settings.timer){
			this.timerDisplay.kill();
		}
		
		//this.timerText = this.add.text(0,0,'Offer ends in:');
		
		//Button and disclaimer
		style = {font:"12px Arial",fill:"#ffffff"};
		this.disclaimer = this.add.text(400,585,'*Eligibilty Restrictions Apply. See Website for Details.',style);
		this.disclaimer.anchor.setTo(.5,.5);
		if(!settings.disclaimer){
			this.disclaimer.kill();
		}
		this.playFree = this.add.sprite(400,525,'football');
		this.playFree.anchor.setTo(.5,.5);
		this.playFree.animations.add('show',null,8);
		this.playFree.animations.play('show');
		if(settings.banner_clickable_on_show){
			this.playFree.inputEnabled = true;
			this.playFree.input.useHandCursor = true;
			this.playFree.events.onInputUp.add(function(){
				PlayableSdk.openClickUrl();
			},this);
		}
		
		//Role position text
		style = {font:"bold 18px Arial",fill:"#ffffff"};
		this.teamText1 = this.add.text(200,175,'Quarterback',style);
		this.teamText1.anchor.setTo(1,.5);
		this.teamText2 = this.add.text(200,275,'Running Back',style);
		this.teamText2.anchor.setTo(1,.5);
		
		//Players
		this.f1 = this.add.sprite(275,175,'frame');
		this.f1.width = 150;
		this.f1.height = 150;
		this.f1.anchor.setTo(.5,.5);
		this.f1.tint = this.colors[0];
		this.p1 = this.add.sprite(275,175,'playerHeadshots',this.team[0]);
		this.p1.anchor.setTo(.5,.5);
		this.p1.width = 150;
		this.p1.height = 120;
		
		this.f2 = this.add.sprite(275,75,'frame');
		this.f2.width = 150;
		this.f2.height = 150;
		this.f2.anchor.setTo(.5,.5);
		this.f2.tint = this.colors[1];
		this.p2 = this.add.sprite(275,275,'playerHeadshots',this.team[1]);
		this.p2.anchor.setTo(.5,.5);
		this.p2.width = 150;
		this.p2.height = 120;
		
		//Logos
		this.logo = this.add.sprite(700,50,'logo');
		this.logo.anchor.setTo(.5,.5);
		this.logo.scale.setTo(.1);
		
		this.nflpa = this.add.sprite(50,50,'nflpa');
		this.nflpa.anchor.setTo(.5,.5);
		this.nflpa.scale.setTo(.02);
		
		//Bars
		style = {font:"40px Impact",fill:"#ffffff"};
		this.bar1 = this.add.sprite(575, 175,'bar');
		this.bar1.anchor.setTo(.5,.5);
		this.bar1.scale.setTo(.4);
		tempInt = this.rnd.integerInRange(30,100)
		temp = this.add.text(0,0,tempInt+'%');
		temp.anchor.setTo(.5,.5);
		if(tempInt > 35){
			this.bar1.tint = 0x32cd32;
		}else{
			this.bar1.tint = 0xff0000;
		}
		this.bar1.addChild(temp);
		temp = this.add.text(-400,-80,'Selected to win',style);
		this.bar1.addChild(temp);
		this.bar2 = this.add.sprite(575, 275,'bar');
		this.bar2.anchor.setTo(.5,.5);
		this.bar2.scale.setTo(.4);
		tempInt = this.rnd.integerInRange(0,100)
		temp = this.add.text(0,0,tempInt+'%');
		temp.anchor.setTo(.5,.5);
		if(tempInt > 35){
			this.bar2.tint = 0x32cd32;
		}else{
			this.bar2.tint = 0xff0000;
		}
		this.bar2.addChild(temp);
		temp = this.add.text(-400,-80,'Selected to win',style);
		this.bar2.addChild(temp);
		
		this.landscape = true;
		this.orientationUpdate();
		this.landscape = false;
		this.orientationUpdate();
		this.landscape = true;
		this.orientationUpdate();
    },

    update: function () {
		if(settings.timer){
			this.timerUpdate();
		}
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
			this.endText3.y = 740;
			this.endText3.fontSize = 18;
			this.teamText1.anchor.setTo(.5,.5);
			this.teamText1.x = 300;
			this.teamText1.y = 250;
			this.teamText2.anchor.setTo(.5,.5);
			this.teamText2.x = 300;
			this.teamText2.y = 550;
			this.playFree.x = 300;
			this.playFree.y = 825;
			this.disclaimer.x = 300;
			this.disclaimer.y = 885;
			this.timerDisplay.x = 450;
			this.p1.x = 125;
			this.p1.y = 300;
			this.p1.width = 170;
			this.p1.height = 170;
			this.p2.x = 125;
			this.p2.y = 600;
			this.p2.width = 170;
			this.p2.height = 170;
			this.bar1.x = 400;
			this.bar2.x = 400;
			this.bar1.y = 300;
			this.bar2.y = 600;
			this.f1.x = 125;
			this.f1.y = 300;
			this.f2.x = 125;
			this.f2.y = 600;
			this.f1.width = 200;
			this.f1.height = 200;
			this.f2.width = 200;
			this.f2.height = 200;
		}else if((window.innerWidth/window.innerHeight) > (3/4) && !this.landscape){
			this.landscape = true;
			this.scale.setGameSize(800,600);
			//Rearrange sprites
			this.logo.x = 700;
			this.endText3.x = 400;
			this.endText3.y = 450;
			this.teamText1.anchor.setTo(1,.5);
			this.teamText1.x = 200;
			this.teamText1.y = 200;
			this.teamText2.anchor.setTo(1,.5);
			this.teamText2.x = 200;
			this.teamText2.y = 350;
			this.playFree.x = 400;
			this.playFree.y = 525;
			this.disclaimer.x = 400;
			this.disclaimer.y = 585;
			this.timerDisplay.x = 650;
			this.bar1.x = 575;
			this.bar1.y = 200;
			this.bar2.x = 575;
			this.bar2.y = 350;
			this.p1.x = 325;
			this.p1.y = 200;
			this.p1.width = 100;
			this.p1.height = 80;
			this.p2.x = 325;
			this.p2.y = 350;
			this.p2.width = 100;
			this.p2.height = 80;
			this.f1.x = 325;
			this.f2.x = 325;
			this.f1.y = 200;
			this.f2.y = 350;
			this.f1.width = 100;
			this.f1.height = 100;
			this.f2.width = 100;
			this.f2.height = 100;
		}
	},
};