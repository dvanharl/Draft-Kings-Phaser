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
	this.versus3;
	
	this.setPick;
	
	this.logo;
	this.nflpaLogo;
	
	this.timer;
	this.timeLeft;
	this.timerDisplay;
	this.landscape;
	
	this.hp1;
	this.hp2;
	this.hp3;
	this.ap1;
	this.ap2;
	this.ap3;
	this.homeTeam;
	this.awayTeam;
	
};

BasicGame.Screen2.prototype = {
	init: function (timeLeft){
		this.timeLeft = timeLeft;
	},
	
    create: function () {
		this.background = this.add.sprite(0,0,'background3');
		this.background.scale.setTo(.6);
		this.background.anchor.setTo(.1,.1);
		this.chosenPlayers = new Array(3);

		//Set Picks Button
		this.setPick = this.add.sprite(400,525,'button');
		this.setPick.anchor.setTo(.5,.5);
		this.setPick.scale.setTo(.2);
		style = {font:"120px OpenSans",fill:"#000000"};
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
		this.teamText3 = this.add.text(200,375,'Wide Receiver',style);
		this.teamText3.anchor.setTo(1,.5);
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
		this.versus3 = this.add.text(400,375,'VS',style);
		this.versus3.anchor.setTo(.5,.5);
		
		//Player Photos
		
		////Home
		hStr1 = players[homeP1].lastName + '_' + players[homeP1].firstName + '.png';
		hStr2 = players[homeP2].lastName + '_' + players[homeP2].firstName + '.png';
		hStr3 = players[homeP3].lastName + '_' + players[homeP3].firstName + '.png';
		this.hp1 = this.add.sprite(300,175,'playerHeadshots',hStr1);
		if(!playerJSON["frames"].hasOwnProperty(hStr1)){
			this.hp1.destroy();
			this.hp1 = this.add.sprite(300,175,'playerHeadshots','Ryan_Matt.png');
		}
		this.hp1.inputEnabled = true;
		this.hp1.events.onInputDown.add(function(){
			if(this.chosenPlayers[0] != this.hp1.frameName){
				this.chosenPlayers[0] = this.hp1.frameName;
				this.hp1.tint = 0xffff00;
				this.ap1.tint = 0x696969;
			}else{
				this.chosenPlayers[0] = null;
				this.hp1.tint = 0xffffff;
				this.ap1.tint = 0xffffff
			}
			this.teamCheck();
		},this);
		this.hp2 = this.add.sprite(300,275,'playerHeadshots',hStr2);
		if(!playerJSON["frames"].hasOwnProperty(hStr2)){
			this.hp2.destroy();
			this.hp2 = this.add.sprite(300,275,'playerHeadshots','Freeman_Devonta.png');
		}
		this.hp2.inputEnabled = true;
		this.hp2.events.onInputDown.add(function(){
			if(this.chosenPlayers[1] != this.hp2.frameName){
				this.chosenPlayers[1] = this.hp2.frameName;
				this.hp2.tint = 0xffff00;
				this.ap2.tint = 0x696969;
			}else{
				this.chosenPlayers[1] = null;
				this.hp2.tint = 0xffffff;
				this.ap2.tint = 0xffffff
			}
			this.teamCheck();
		},this);
		this.hp3 = this.add.sprite(300,375,'playerHeadshots',hStr3);
		if(!playerJSON["frames"].hasOwnProperty(hStr3)){
			this.hp3.destroy();
			this.hp3 = this.add.sprite(300,375,'playerHeadshots','Jones_Julio.png');
		}
		this.hp3.inputEnabled = true;
		this.hp3.events.onInputDown.add(function(){
			if(this.chosenPlayers[2] != this.hp3.frameName){
				this.chosenPlayers[2] = this.hp3.frameName;
				this.hp3.tint = 0xffff00;
				this.ap3.tint = 0x696969;
			}else{
				this.chosenPlayers[2] = null;
				this.hp3.tint = 0xffffff;
				this.ap3.tint = 0xffffff
			}
			this.teamCheck();
		},this);
		this.homeTeam = [this.hp1,this.hp2,this.hp3];
		console.log(this.chosenPlayers);
		for(i=0;i<3;i++){
			this.homeTeam[i].anchor.setTo(.5,.5);
			this.homeTeam[i].width = 100;
			this.homeTeam[i].height = 75;
		}
		
		///Away
		aStr1 = players[awayP1].lastName + '_' + players[awayP1].firstName + '.png';
		aStr2 = players[awayP2].lastName + '_' + players[awayP2].firstName + '.png';
		aStr3 = players[awayP3].lastName + '_' + players[awayP3].firstName + '.png';
		
		console.log(playerJSON["frames"].hasOwnProperty(aStr1));
		console.log(playerJSON["frames"].hasOwnProperty(aStr2));
		
		this.ap1 = this.add.sprite(500,175,'playerHeadshots',aStr1);
		console.log(playerJSON['frames'].aStr1);
		if(!playerJSON["frames"].hasOwnProperty(aStr1)){
			this.ap1.destroy();
			this.ap1 = this.add.sprite(500,175,'playerHeadshots','Ryan_Matt.png');
		}
		this.ap1.inputEnabled = true;
		this.ap1.events.onInputDown.add(function(){
			if(this.chosenPlayers[0] != this.ap1.frameName){
				this.chosenPlayers[0] = this.ap1.frameName;
				this.ap1.tint = 0xffff00;
				this.hp1.tint = 0x696969;
			}else{
				this.chosenPlayers[0] = null;
				this.ap1.tint = 0xffffff;
				this.hp1.tint = 0xffffff;
			}
			this.teamCheck();
		},this);
		this.ap2 = this.add.sprite(500,275,'playerHeadshots',aStr2);
		if(!playerJSON["frames"].hasOwnProperty(aStr2)){
			this.ap2.destroy();
			this.ap2 = this.add.sprite(500,275,'playerHeadshots','Freeman_Devonta.png');
		}
		this.ap2.inputEnabled = true;
		this.ap2.events.onInputDown.add(function(){
			if(this.chosenPlayers[1] != this.ap2.frameName){
				this.chosenPlayers[1] = this.ap2.frameName;
				this.ap2.tint = 0xffff00;
				this.hp2.tint = 0x696969;
			}else{
				this.chosenPlayers[1] = null;
				this.ap2.tint = 0xffffff;
				this.hp2.tint = 0xffffff;
			}
			this.teamCheck();
		},this);
		this.ap3 = this.add.sprite(500,375,'playerHeadshots',aStr3);
		if(!playerJSON["frames"].hasOwnProperty(aStr3)){
			this.ap3.destroy();
			this.ap3 = this.add.sprite(500,375,'playerHeadshots','Jones_Julio.png');
		}
		this.ap3.inputEnabled = true;
		this.ap3.events.onInputDown.add(function(){
			if(this.chosenPlayers[2] != this.ap3.frameName){
				this.chosenPlayers[2] = this.ap3.frameName;
				this.ap3.tint = 0xffff00;
				this.hp3.tint = 0x696969;
			}else{
				this.chosenPlayers[2] = null;
				this.ap3.tint = 0xffffff;
				this.hp3.tint = 0xffffff;
			}
			this.teamCheck();
		},this);
		this.awayTeam = [this.ap1,this.ap2,this.ap3];
		for(i=0;i<3;i++){
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
		
		this.landscape = true;
		this.orientationUpdate();
		this.landscape = false;
		this.orientationUpdate();
		this.landscape = true;
		this.orientationUpdate();
		this.teamCheck();
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
	
	teamCheck: function() {
		//Check to see if all 
		temp = true;
		for(i=0;i<3;i++){
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
			this.setPick.tint = 0xbfbfbf;
			this.setPick.alpha = .6;
			this.setPick.inputEnabled = false;
		}
	},
	
	nextScreen: function(){
		if(settings.timer){
			this.state.start('Screen3',true,false, this.timer.duration, this.chosenPlayers);
		}else{
			this.state.start('Screen3',true,false, 0, this.chosenPlayers);
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
			this.landscape = false;
			this.scale.setGameSize(600,900);
			//Rearrange sprites
			this.timerDisplay.x = 450;
			this.timerDisplay.y = 30;
			this.logo.x = 300;
			this.setPick.x = 300;
			this.setPick.y = 850;
			this.teamText1.anchor.setTo(.5,.5);
			this.teamText1.x = 300;
			this.teamText1.y = 200;
			this.teamText2.anchor.setTo(.5,.5);
			this.teamText2.x = 300;
			this.teamText2.y = 400;
			this.teamText3.anchor.setTo(.5,.5);
			this.teamText3.x = 300;
			this.teamText3.y = 600;
			this.versus1.x = 300;
			this.versus1.y = 250;
			this.versus2.x = 300;
			this.versus2.y = 450;
			this.versus3.x = 300;
			this.versus3.y = 650;
			this.background.x = -200;
			this.background.y = 300;
			this.screenText1.x = 300;
			this.screenText2.y = 775;
			this.screenText2.x = 300;
			this.hp1.x = 175;
			this.hp1.y = 250;
			this.hp1.width = 170;
			this.hp1.height = 170;
			this.hp2.x = 175;
			this.hp2.y = 450;
			this.hp2.width = 170;
			this.hp2.height = 170;
			this.hp3.x = 175;
			this.hp3.y = 650;
			this.hp3.width = 170;
			this.hp3.height = 170;
			this.ap1.x = 425;
			this.ap1.y = 250;
			this.ap1.width = 170;
			this.ap1.height = 170;
			this.ap2.x = 425;
			this.ap2.y = 450;
			this.ap2.width = 170;
			this.ap2.height = 170;
			this.ap3.x = 425;
			this.ap3.y = 650;
			this.ap3.width = 170;
			this.ap3.height = 170;
		}else if((window.innerWidth/window.innerHeight) > (3/4) && !this.landscape){
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
			this.teamText1.y = 175;
			this.teamText2.anchor.setTo(1,.5);
			this.teamText2.x = 200;
			this.teamText2.y = 275;
			this.teamText3.anchor.setTo(1,.5);
			this.teamText3.x = 200;
			this.teamText3.y = 375;
			this.versus1.x = 450;
			this.versus1.y = 175;
			this.versus2.x = 450;
			this.versus2.y = 275;
			this.versus3.x = 450;
			this.versus3.y = 375;
			this.background.x = 0;
			this.background.y = 0;
			this.screenText1.x = 400;
			this.screenText2.y = 450;
			this.screenText2.x = 400;
			this.hp1.x = 325;
			this.hp1.y = 175;
			this.hp1.width = 100;
			this.hp1.height = 80;
			this.hp2.x = 325;
			this.hp2.y = 275;
			this.hp2.width = 100;
			this.hp2.height = 80;
			this.hp3.x = 325;
			this.hp3.y = 375;
			this.hp3.width = 100;
			this.hp3.height = 80;
			this.ap1.x = 575;
			this.ap1.y = 175;
			this.ap1.width = 100;
			this.ap1.height = 80;
			this.ap2.x = 575;
			this.ap2.y = 275;
			this.ap2.width = 100;
			this.ap2.height = 80;
			this.ap3.x = 575;
			this.ap3.y = 375;
			this.ap3.width = 100;
			this.ap3.height = 80;
		}
	},
};