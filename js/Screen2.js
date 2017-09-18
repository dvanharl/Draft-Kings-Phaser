BasicGame.Screen2 = function (game) {
	this.background;
	this.chosenPlayers;
	
	this.teamText1;
	this.teamText2;
	this.teamText3;
	this.screenText1;
	this.screenText2;
	this.versus1;
	this.versus2;
	
	this.setPick;
	
	this.logo;
	this.nflpaLogo;
	
	this.timer;
	this.timeLeft;
	this.timerDisplay;
	this.landscape;
	
	this.hp1;
	this.hp2;
	this.ap1;
	this.ap2;
	this.hf1;
	this.hf2;
	this.af1;
	this.af2;
	this.homeTeam;
	this.awayTeam;
	
	this.tutFlag = 0;
	this.arrow;
	this.arrow2;
	this.arrowTween;
	
	this.closeButton;
};

BasicGame.Screen2.prototype = {
	init: function (timeLeft){
		this.timeLeft = timeLeft;
	},
	
    create: function () {
		this.background = this.add.sprite(0,0,'background3');
		//this.background.scale.setTo(.6);
		this.background.anchor.setTo(.1,.1);
		this.chosenPlayers = new Array(2);
		this.chosenColors = new Array(2);

		//Set Picks Button
		this.setPick = this.add.sprite(400,525,'button');
		this.setPick.anchor.setTo(.5,.5);
		this.setPick.scale.setTo(.2);
		style = {font:"150px Impact",fill:"#000000"};
		tempText = this.add.text(0,0,'SET YOUR PICKS',style);
		tempText.anchor.setTo(.5,.5);
		this.setPick.addChild(tempText);
		this.setPick.inputEnabled = true;
		this.setPick.input.useHandCursor = true;
		this.setPick.events.onInputUp.add(this.nextScreen,this);
		
		//Role position text
		style = {font:"bold 18px Arial",fill:"#ffffff"};
		this.teamText1 = this.add.text(200,175,'Quarterback',style);
		this.teamText1.anchor.setTo(1,.5);
		this.teamText2 = this.add.text(200,275,'Running Back',style);
		this.teamText2.anchor.setTo(1,.5);
		style = {font:"bold 36px",fill:"#ffffff"};
		this.screenText1 = this.add.text(400,100,'WEEK ' + week +  ' MATCHUP',style);
		this.screenText1.anchor.setTo(.5,.5);
		this.screenText2 = this.add.text(400,450,'PICK THE WINNER',style);
		this.screenText2.anchor.setTo(.5,.5);
		style = {font:'bold 45px',fill:'red'};
		this.versus1 = this.add.text(400,175,'VS',style);
		this.versus1.anchor.setTo(.5,.5);
		this.versus2 = this.add.text(400,275,'VS',style);
		this.versus2.anchor.setTo(.5,.5);
		
		//Player Photos
		
		////Home
		hColor = parseInt("0x" + teams[homeTeam].colors[1]);
		hStr1 = players[homeP1].lastName + '_' + players[homeP1].firstName + '.png';
		hStr2 = players[homeP2].lastName + '_' + players[homeP2].firstName + '.png';
		this.hf1 = this.add.sprite(325,175,'frame');
		this.hf1.width = 100;
		this.hf1.height = 100;
		this.hf1.anchor.setTo(.5,.5);
		this.hf1.tint = hColor;
		this.hp1 = this.add.sprite(300,175,'playerHeadshots',hStr1);
		if(!playerJSON["frames"].hasOwnProperty(hStr1)){
			this.hp1.destroy();
			this.hp1 = this.add.sprite(300,175,'playerHeadshots','Ryan_Matt.png');
		}
		this.hf1.inputEnabled = true;
		this.hf1.events.onInputDown.add(function(){
			if(settings.tutorial && this.tutFlag == 0){
				this.tutFlag = 1;
				this.tutorialUpdate();
			}
			if(this.chosenPlayers[0] != this.hp1.frameName){
				this.chosenPlayers[0] = this.hp1.frameName;
				this.chosenColors[0] = hColor;
				this.hp1.tint = 0xffff00;
				this.ap1.tint = 0x696969;
				this.hf1.tint = 0xccffcc;
				this.af1.tint = 0x808080;
			}else{
				this.chosenPlayers[0] = null;
				this.chosenColors[0] = null;
				this.hp1.tint = 0xffffff;
				this.ap1.tint = 0xffffff
				this.hf1.tint = hColor;
				this.af1.tint = aColor;
			}
			this.teamCheck();
		},this);
		this.hp1.inputEnabled = true;
		this.hp1.events.onInputDown.add(function(){
			if(settings.tutorial && this.tutFlag == 0){
				this.tutFlag = 1;
				this.tutorialUpdate();
			}
			if(this.chosenPlayers[0] != this.hp1.frameName){
				this.chosenPlayers[0] = this.hp1.frameName;
				this.chosenColors[0] = hColor;
				this.hp1.tint = 0xffff00;
				this.ap1.tint = 0x696969;
				this.hf1.tint = 0xccffcc;
				this.af1.tint = 0x808080;
			}else{
				this.chosenPlayers[0] = null;
				this.chosenColors[0] = null;
				this.hp1.tint = 0xffffff;
				this.ap1.tint = 0xffffff
				this.hf1.tint = hColor;
				this.af1.tint = aColor;
			}
			this.teamCheck();
		},this);
		
		this.hf2 = this.add.sprite(325,275,'frame');
		this.hf2.width = 100;
		this.hf2.height = 100;
		this.hf2.anchor.setTo(.5,.5);
		this.hf2.tint = hColor;
		this.hp2 = this.add.sprite(300,275,'playerHeadshots',hStr2);
		if(!playerJSON["frames"].hasOwnProperty(hStr2)){
			this.hp2.destroy();
			this.hp2 = this.add.sprite(300,275,'playerHeadshots','Freeman_Devonta.png');
		}
		this.hf2.inputEnabled = true;
		this.hf2.events.onInputDown.add(function(){
			if(settings.tutorial && this.tutFlag == 1){
				this.tutFlag = 2;
				this.tutorialUpdate();
			}
			if(this.chosenPlayers[1] != this.hp2.frameName){
				this.chosenPlayers[1] = this.hp2.frameName;
				this.chosenColors[1] = hColor;
				this.hp2.tint = 0xffff00;
				this.ap2.tint = 0x696969;
				this.hf2.tint = 0xccffcc;
				this.af2.tint = 0x808080;
			}else{
				this.chosenPlayers[1] = null;
				this.chosenColors[1] = null;
				this.hp2.tint = 0xffffff;
				this.ap2.tint = 0xffffff;
				this.hf2.tint = hColor;
				this.af2.tint = aColor;
			}
			this.teamCheck();
		},this);
		this.hp2.inputEnabled = true;
		this.hp2.events.onInputDown.add(function(){
			if(settings.tutorial && this.tutFlag == 1){
				this.tutFlag = 2;
				this.tutorialUpdate();
			}
			if(this.chosenPlayers[1] != this.hp2.frameName){
				this.chosenPlayers[1] = this.hp2.frameName;
				this.chosenColors[1] = hColor;
				this.hp2.tint = 0xffff00;
				this.ap2.tint = 0x696969;
				this.hf2.tint = 0xccffcc;
				this.af2.tint = 0x808080;
			}else{
				this.chosenPlayers[1] = null;
				this.chosenColors[1] = null;
				this.hp2.tint = 0xffffff;
				this.ap2.tint = 0xffffff;
				this.hf2.tint = hColor;
				this.af2.tint = aColor;
			}
			this.teamCheck();
		},this);
		this.homeTeam = [this.hp1,this.hp2];
		this.homeFrames = [this.hf1,this.hf2];
		style = {font:"bold 14px Courier",fill:"#ffffff",};
		this.ht1 = this.add.text(325, 225, players[homeP1].firstName + " " + players[homeP1].lastName,style);
		this.ht2 = this.add.text(325, 325, players[homeP2].firstName + " " + players[homeP2].lastName,style);
		this.ht1.anchor.setTo(.5,.5);
		this.ht2.anchor.setTo(.5,.5);
		for(i=0;i<2;i++){
			this.homeTeam[i].anchor.setTo(.5,.5);
			this.homeTeam[i].width = 100;
			this.homeTeam[i].height = 75;
		}
		
		
		
		///Away
		aStr1 = players[awayP1].lastName + '_' + players[awayP1].firstName + '.png';
		if(!playerJSON["frames"].hasOwnProperty(aStr1)){
			if(homeP2 != 'dJohnson' && awayP2 != 'dJohnson'){
				aStr1 = 'Johnson_David.png';
			}else if(homeP2 != 'dFreeman' && awayP2 != 'dFreeman'){
				aStr1  = 'Freeman_Devonta.png';
			}else{
				aStr1  = 'Howard_Jordan.png';
			}
		}
		aStr2 = players[awayP2].lastName + '_' + players[awayP2].firstName + '.png';
		if(!playerJSON["frames"].hasOwnProperty(aStr2)){
			if(homeP2 != 'dJohnson' && awayP2 != 'dJohnson'){
				aStr2 = 'Johnson_David.png';
			}else if(homeP2 != 'dFreeman' && awayP2 != 'dFreeman'){
				aStr2  = 'Freeman_Devonta.png';
			}else{
				aStr2  = 'Howard_Jordan.png';
			}
		}
		
		aColor = parseInt("0x" + teams[awayTeam].colors[1]);
		this.af1 = this.add.sprite(575,175,'frame');
		this.af1.width = 100;
		this.af1.height = 100;
		this.af1.anchor.setTo(.5,.5);
		this.af1.tint = aColor;
		this.ap1 = this.add.sprite(500,175,'playerHeadshots',aStr1);
		if(!playerJSON["frames"].hasOwnProperty(aStr1)){
			this.ap1.destroy();
			this.ap1 = this.add.sprite(500,175,'playerHeadshots','Ryan_Matt.png');
		}
		this.af1.inputEnabled = true;
		this.af1.events.onInputDown.add(function(){
			if(settings.tutorial && this.tutFlag == 0){
				this.tutFlag = 1;
				this.tutorialUpdate();
			}
			if(this.chosenPlayers[0] != this.ap1.frameName){
				this.chosenPlayers[0] = this.ap1.frameName;
				this.chosenColors[0] = aColor;
				this.ap1.tint = 0xffff00;
				this.hp1.tint = 0x696969;
				this.af1.tint = 0xccffcc;
				this.hf1.tint = 0x808080;
			}else{
				this.chosenPlayers[0] = null;
				this.chosenColors[1] = null;
				this.ap1.tint = 0xffffff;
				this.hp1.tint = 0xffffff;
				this.af1.tint = aColor;
				this.hf1.tint = hColor;
			}
			this.teamCheck();
		},this);
		this.ap1.inputEnabled = true;
		this.ap1.events.onInputDown.add(function(){
			if(settings.tutorial && this.tutFlag == 0){
				this.tutFlag = 1;
				this.tutorialUpdate();
			}
			if(this.chosenPlayers[0] != this.ap1.frameName){
				this.chosenPlayers[0] = this.ap1.frameName;
				this.chosenColors[0] = aColor;
				this.ap1.tint = 0xffff00;
				this.hp1.tint = 0x696969;
				this.af1.tint = 0xccffcc;
				this.hf1.tint = 0x808080;
			}else{
				this.chosenPlayers[0] = null;
				this.chosenColors[1] = null;
				this.ap1.tint = 0xffffff;
				this.hp1.tint = 0xffffff;
				this.af1.tint = aColor;
				this.hf1.tint = hColor;
			}
			this.teamCheck();
		},this);
		this.af2 = this.add.sprite(575,275,'frame');
		this.af2.width = 100;
		this.af2.height = 100;
		this.af2.anchor.setTo(.5,.5);
		this.af2.tint = aColor;
		this.ap2 = this.add.sprite(500,275,'playerHeadshots',aStr2);
		if(!playerJSON["frames"].hasOwnProperty(aStr2)){
			this.ap2.destroy();
			this.ap2 = this.add.sprite(500,275,'playerHeadshots','Freeman_Devonta.png');
		}
		this.af2.inputEnabled = true;
		this.af2.events.onInputDown.add(function(){
			if(settings.tutorial && this.tutFlag == 1){
				this.tutFlag = 2;
				this.tutorialUpdate();
			}
			if(this.chosenPlayers[1] != this.ap2.frameName){
				this.chosenPlayers[1] = this.ap2.frameName;
				this.chosenColors[1] = aColor;
				this.ap2.tint = 0xffff00;
				this.hp2.tint = 0x696969;
				this.af2.tint = 0xccffcc;
				this.hf2.tint = 0x808080;
			}else{
				this.chosenPlayers[1] = null;
				this.chosenColors[1] = null;
				this.ap2.tint = 0xffffff;
				this.hp2.tint = 0xffffff;
				this.af2.tint = aColor;
				this.hf2.tint = hColor;
			}
			this.teamCheck();
		},this);
		this.ap2.inputEnabled = true;
		this.ap2.events.onInputDown.add(function(){
			if(settings.tutorial && this.tutFlag == 1){
				this.tutFlag = 2;
				this.tutorialUpdate();
			}
			if(this.chosenPlayers[1] != this.ap2.frameName){
				this.chosenPlayers[1] = this.ap2.frameName;
				this.chosenColors[1] = aColor;
				this.ap2.tint = 0xffff00;
				this.hp2.tint = 0x696969;
				this.af2.tint = 0xccffcc;
				this.hf2.tint = 0x808080;
			}else{
				this.chosenPlayers[1] = null;
				this.chosenColors[1] = null;
				this.ap2.tint = 0xffffff;
				this.hp2.tint = 0xffffff;
				this.af2.tint = aColor;
				this.hf2.tint = hColor;
			}
			this.teamCheck();
		},this);
		this.awayTeam = [this.ap1,this.ap2];
		this.awayFrames = [this.af1,this.af2];
		this.at1 = this.add.text(575, 225, players[awayP1].firstName + " " + players[awayP1].lastName,style);
		this.at2 = this.add.text(575, 325, players[awayP2].firstName + " " + players[awayP2].lastName,style);
		this.at1.anchor.setTo(.5,.5);
		this.at2.anchor.setTo(.5,.5);
		for(i=0;i<2;i++){
			this.awayTeam[i].anchor.setTo(.5,.5);
			this.awayTeam[i].width = 100;
			this.awayTeam[i].height = 75;
		}
		
		
		
		this.logo = this.add.sprite(700,50,'logo');
		this.logo.anchor.setTo(.5,.5);
		this.logo.scale.setTo(.1);
		
		this.nflpa = this.add.sprite(50,50,'nflpa');
		this.nflpa.anchor.setTo(.5,.5);
		this.nflpa.scale.setTo(.02);
		
		//Timer to next screen
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
		
		
		
		//Close Button
		this.closeButton = this.add.sprite(50,20,'button');
		this.closeButton.anchor.setTo(.5,.5);
		this.closeButton.scale.setTo(.05);
		style = {font:"bold 200px OpenSans",fill:"#000000"};
		tempText = this.add.text(0,0,'Close',style);
		tempText.anchor.setTo(.5,.5);
		this.closeButton.addChild(tempText);
		this.closeButton.inputEnabled = true;
		this.closeButton.input.useHandCursor = true;
		this.closeButton.events.onInputUp.add(function(){
			if(window.mraid){
				window.mraid.close();
			}else{
				window.close();
			}
		},this);
		
		//Tutorial
		if(settings.tutorial){
			this.hp2.inputEnabled = false;
			this.ap2.inputEnabled = false;
			style = {font:"bold 25px Arial Black",fill:"#ffff00"};
			this.tt = this.add.text(400,135, "Tap to select a player",style);
			this.tt.anchor.setTo(.5,.5);
			this.tt.alpha = .75;
			//Text
			if(!settings.tutorial_text){
				this.tt.kill();
			}
			
			//Arrow
			this.arrow = this.add.sprite(665, 175, 'arrow');
			this.arrow.anchor.setTo(.5,.5);
			this.arrow.scale.setTo(-.2);
			this.arrowTween = this.add.tween(this.arrow).from({x:(this.arrow.x-20)},500,null,true,0,-1,true);
			//Arrow 2
			this.arrow2 = this.add.sprite(240, 175, 'arrow');
			this.arrow2.anchor.setTo(.5,.5);
			this.arrow2.scale.setTo(.2);
			this.arrowTween2 = this.add.tween(this.arrow2).from({x:(this.arrow2.x+20)},500,null,true,0,-1,true);
			
			//Blur Focus on first row
			this.tutFlag = 0	
		}
		
		this.landscape = true;
		this.orientationUpdate();
		this.landscape = false;
		this.orientationUpdate();
		this.landscape = true;
		this.orientationUpdate();
		this.teamCheck();
		if(settings.tutorial){this.tutorialUpdate();}
	},
	
	update: function () {
		if(settings.timer){
			this.timerUpdate();
		}
		
		this.orientationUpdate();
    },
	
	tutorialUpdate: function(){
		if(!settings.tutorial_arrows){
			this.arrow.kill();
			this.arrow2.kill();
		}
		if(this.tutFlag > 0){
			this.tt.kill();
		}
		if(this.tutFlag == 2){
			this.arrow.kill();
			this.arrow2.kill();
		}
		if(this.landscape){
			this.arrow.y = 200 + 150*this.tutFlag;
			this.arrow2.y = 200 + 150*this.tutFlag;
		}else{
			this.arrow.y = 300 + 300*this.tutFlag;
			this.arrow2.y = 300 + 300*this.tutFlag;
		}
		for(i=this.tutFlag;i<2;i++){
			if(i == this.tutFlag){
				this.homeTeam[i].inputEnabled = true;
				this.homeTeam[i].tint = 0xffffff;
				this.homeTeam[i].alpha = 1;
				this.awayTeam[i].inputEnabled = true;
				this.awayTeam[i].tint = 0xffffff;
				this.awayTeam[i].alpha = 1;
				this.homeFrames[i].alpha = .9;
				this.awayFrames[i].alpha = .9;
			}else{
				this.homeTeam[i].inputEnabled = false;
				this.homeTeam[i].tint = 0x808080;
				this.homeTeam[i].alpha = .3;
				this.awayTeam[i].inputEnabled = false;
				this.awayTeam[i].tint = 0x808080;
				this.awayTeam[i].alpha = .3;
				this.homeFrames[i].alpha = .3;
				this.awayFrames[i].alpha = .3;
			}
		}
		
		
	},
	
	timerUpdate: function(){
		min = parseInt(this.timer.duration/60000);
		sec = parseInt((this.timer.duration%60000)/1000);
		ms = parseInt((this.timer.duration%1000)/10);
		this.timerDisplay.setText(min.toString() + ':' + sec.toString() + ':' + ms.toString());
	},
	
	teamCheck: function(){
		//Check to see if all 
		temp = true;
		for(i=0;i<2;i++){
			if(this.chosenPlayers[i] == null){
				temp = false;
				break;
			}
		}
		
		if(temp){
			this.setPick.tint = 0xffffff;
			this.setPick.alpha = 1;
			this.setPick.inputEnabled = true;
		}else{
			this.setPick.tint = 0x808080;
			this.setPick.alpha = .6;
			this.setPick.inputEnabled = false;
		}
	},
	
	nextScreen: function(){
		if(settings.timer){
			this.state.start('Screen3',true,false, this.timer.duration, this.chosenPlayers, this.chosenColors);
		}else{
			this.state.start('Screen3',true,false, 0, this.chosenPlayers, this.chosenColors);
		}
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
			if(settings.property3 == 2){
				this.closeButton.x = 50;
				this.closeButton.y = 25;
			}else if(settings.property3 == 3){
				this.closeButton.x = 550;
				this.closeButton.y = 875;
			}else if(settings.property3 == 4){
				this.closeButton.x = 50;
				this.closeButton.y = 875;
			}else{
				this.closeButton.x = 550;
				this.closeButton.y = 25;
			}
			this.landscape = false;
			this.scale.setGameSize(600,900);
			if(settings.tutorial){
				this.arrowTween.stop();
				this.arrow.x = 520;
				this.arrow2.x = 80;
				this.arrowTween = this.add.tween(this.arrow).from({x:(this.arrow.x-20)},500,null,true,0,-1,true);
				this.arrowTween2 = this.add.tween(this.arrow2).from({x:(this.arrow2.x+20)},500,null,true,0,-1,true);
				this.tutorialUpdate();
			}
			//Rearrange sprites
			this.timerDisplay.x = 450;
			this.timerDisplay.y = 30;
			this.logo.x = 300;
			this.setPick.x = 300;
			this.setPick.y = 850;
			this.teamText1.anchor.setTo(.5,.5);
			this.teamText1.x = 300;
			this.teamText1.y = 175;
			this.teamText2.anchor.setTo(.5,.5);
			this.teamText2.x = 300;
			this.teamText2.y = 475;
			this.versus1.x = 300;
			this.versus1.y = 300;
			this.versus2.x = 300;
			this.versus2.y = 600;
			this.background.x = -400;
			this.background.y = 0;
			this.screenText1.x = 300;
			this.screenText2.y = 775;
			this.screenText2.x = 300;
			this.hf1.x = 175;
			this.hf1.y = 300;
			this.hf1.width = 170;
			this.hf1.height = 170;
			this.hf2.width = 170;
			this.hf2.height = 170;
			this.hf2.x = 175;
			this.hf2.y = 600;
			
			this.hp1.x = 175;
			this.hp1.y = 300;
			this.hp1.width = 170;
			this.hp1.height = 150;
			this.hp2.x = 175;
			this.hp2.y = 600;
			this.hp2.width = 170;
			this.hp2.height = 150;
			this.ht1.x = 175;
			this.ht1.y = 400;
			this.ht2.x = 175;
			this.ht2.y = 700;
			this.af1.x = 425;
			this.af1.y = 300;
			this.af1.width = 170;
			this.af1.height = 170;
			this.af2.width = 170;
			this.af2.height = 170;
			this.af2.x = 425;
			this.af2.y = 600;
			
			this.at1.x = 425;
			this.at1.y = 400;
			this.at2.x = 425;
			this.at2.y = 700;
			this.ap1.x = 425;
			this.ap1.y = 300;
			this.ap1.width = 170;
			this.ap1.height = 150;
			this.ap2.x = 425;
			this.ap2.y = 600;
			this.ap2.width = 170;
			this.ap2.height = 150;
		}else if((window.innerWidth/window.innerHeight) > (3/4) && !this.landscape){
			if(settings.property3 == 2){
				this.closeButton.x = 50;
				this.closeButton.y = 25;
			}else if(settings.property3 == 3){
				this.closeButton.x = 550;
				this.closeButton.y = 575;
			}else if(settings.property3 == 4){
				this.closeButton.x = 50;
				this.closeButton.y = 575;
			}else{
				this.closeButton.x = 750;
				this.closeButton.y = 25;
			}
				if(settings.tutorial){
				this.arrowTween.stop();
				this.arrow.x = 665;
				this.arrow2.x = 240;
				this.arrowTween = this.add.tween(this.arrow).from({x:(this.arrow.x-20)},500,null,true,0,-1,true);
				this.arrowTween2 = this.add.tween(this.arrow2).from({x:(this.arrow2.x+20)},500,null,true,0,-1,true);
				this.tutorialUpdate();
			}
			this.landscape = true;
			this.scale.setGameSize(800,600);
			//Rearrange sprites
			this.logo.x = 700;
			this.timerDisplay.x = 650;
			this.timerDisplay.y = 90;
			this.setPick.x = 400;
			this.setPick.y = 525;
			this.teamText1.anchor.setTo(1,.5);
			this.teamText1.x = 200;
			this.teamText1.y = 200;
			this.teamText2.anchor.setTo(1,.5);
			this.teamText2.x = 200;
			this.teamText2.y = 350;
			this.versus1.x = 450;
			this.versus1.y = 200;
			this.versus2.x = 450;
			this.versus2.y = 350;
			this.background.x = 0;
			this.background.y = 0;
			this.screenText1.x = 400;
			this.screenText2.y = 450;
			this.screenText2.x = 400;
			this.hp1.x = 325;
			this.hp1.y = 200;
			this.hp1.width = 100;
			this.hp1.height = 80;
			this.hp2.x = 325;
			this.hp2.y = 350;
			this.hp2.width = 100;
			this.hp2.height = 80;
			this.ap1.x = 575;
			this.ap1.y = 200;
			this.ap1.width = 100;
			this.ap1.height = 80;
			this.ap2.x = 575;
			this.ap2.y = 350;
			this.ap2.width = 100;
			this.ap2.height = 80;
			this.ht1.x = 325;
			this.ht1.y = 270;
			this.ht2.x = 325;
			this.ht2.y = 420;
			this.at1.x = 575;
			this.at1.y = 270;
			this.at2.x = 575;
			this.at2.y = 420;
			//
			this.hf1.x = 325;
			this.hf1.y = 205;
			this.hf1.width = 100;
			this.hf1.height = 100;
			this.hf2.width = 100;
			this.hf2.height = 100;
			this.hf2.x = 325;
			this.hf2.y = 350;
			//
			this.af1.x = 575;
			this.af1.y = 200;
			this.af1.width = 100;
			this.af1.height = 100;
			this.af2.width = 100;
			this.af2.height = 100;
			this.af2.x = 575;
			this.af2.y = 350;
		}
	},
};