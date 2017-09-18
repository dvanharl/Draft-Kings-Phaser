BasicGame.Screen1 = function (game) {
	this.background;
	
	this.titleText1;
	this.titleText2;
	
	this.installNow;
	this.start;
	
	this.timer;
	this.screenTimer;
	this.timerDisplay;
	
	this.logo;
	
	this.landscape;
	this.testing;
	
	this.closeButton;
};

BasicGame.Screen1.prototype = {
	init: function (){
	
	},
	
    create: function () {
		this.landscape = false;
		this.testing = 0;
		this.background = this.add.sprite(0,0,'background1');
		
		style = {font:"bold 64px Arial Black",fill:"#ffffff"};
		this.text1 = this.add.text(400,225,'WIN $1,000,000',style);
		this.text1.anchor.setTo(.5,.5);
		style = {font:"36px Impact",fill:"#ffffff"};
		this.text2 = this.add.text(400,300,'Build your team now!',style);
		this.text2.anchor.setTo(.5,.5);
		
		//Install Now Button
		this.installNow = this.add.sprite(200,400,'button');
		this.installNow.anchor.setTo(.5,.5);
		this.installNow.scale.setTo(.2);
		style = {font:"180px Impact",fill:"#000000"};
		tempText = this.add.text(0,0,'Install Now',style);
		tempText.anchor.setTo(.5,.5);
		this.installNow.addChild(tempText);
		this.installNow.inputEnabled = true;
		this.installNow.input.useHandCursor = true;
		this.installNow.events.onInputUp.add(function(){
			PlayableSdk.openClickUrl();
		},this);
		if(!settings.install_now_button){
			this.installNow.kill();
		}
		
		
		
		//Start Button
		this.start = this.add.sprite(600,400,'button');
		this.start.anchor.setTo(.5,.5);
		this.start.scale.setTo(.2);
		tempText = this.add.text(0,0,'Start',style);
		tempText.anchor.setTo(.5,.5);
		this.start.addChild(tempText);
		this.start.inputEnabled = true;
		this.start.input.useHandCursor = true;
		this.start.events.onInputUp.add(this.nextScreen,this);
		this.startTween = this.add.tween(this.start.scale).to({x:.22,y:.2},400,null,true,0,-1,true);
		
		if(settings.timer){
			this.timer = this.time.create(false);
			this.timer.add(settings.max_play_time * 1000,function(){
				PlayableSdk.openClickUrl();
			},this);
			style = {font:"36px Arial",fill:"#ffffff"};
			this.timer.start();
		}
		this.timerDisplay = this.add.text(650,90,'',style);
		if(!settings.timer){
			this.timerDisplay.kill();
		}
		
		//Timer to next screen
		if(settings.screen1_timer){
			this.screenTimer = this.time.create(false);
			this.screenTimer.add(settings.screen1_time,this.nextScreen);
			this.screenTimer.start();
		}
		/*
		this.logo = this.add.sprite(700,50,'logo');
		this.logo.anchor.setTo(.5,.5);
		this.logo.scale.setTo(.1);
		*/
		this.nflpa = this.add.sprite(50,50,'nflpa');
		this.nflpa.anchor.setTo(.5,.5);
		this.nflpa.scale.setTo(.02);
		
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
		if(settings.didInteractTimeLimitEnabled){
			this.interactUpdate();
		}
		this.clickUpdate();
    },
	clickUpdate: function(){
		if(this.game.input.activePointer.isDown){
			if(this.firstClick){
				this.firstClick = false;
				if(settings.close_button_property1){
					this.closeButton.kill();
				}else if(settings.close_button_property4){
					
				}
			}else if(this.secondClick){
				this.secondClick = false;
				if(settings.close_button_property1){
					this.closeButton.kill();
				}
			}
		}
	},
	
	interactUpdate: function(){
		if(this.game.input.activePointer.isDown){
			this.testing = this.time.totalElapsedSeconds();
		}
		if(this.time.totalElapsedSeconds() - this.testing >= settings.didInteractTimeLimit && !settings.tutorial){
			
		}
	},
	
	nextScreen: function(){
		if(settings.timer){
			this.state.start('Screen2',true,false, this.timer.duration);
		}else{
			this.state.start('Screen2',true,false, 0);
		}
	},
	
	timerUpdate: function (){
		min = parseInt(this.timer.duration/60000);
		sec = parseInt((this.timer.duration%60000)/1000);
		ms = parseInt((this.timer.duration%1000)/10);
		this.timerDisplay.setText(min.toString() + ':' + sec.toString() + ':' + ms.toString());
	},
	
	orientationUpdate: function() {
		this.scale.maxHeight = window.innerHeight;
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
			//Rearrange sprites
			////this.logo.x = 500;
			this.timerDisplay.x = 450;
			this.timerDisplay.y = 30;
			this.installNow.x = 150;
			this.installNow.y = 700;
			this.start.x = 450;
			this.start.y = 700;
			this.text1.x = 300;
			this.text2.x = 300;
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
			this.landscape = true;
			this.scale.setGameSize(800,600);
			//Rearrange sprites
			////this.logo.x = 700;
			this.installNow.x = 200;
			this.installNow.y = 400;
			this.start.x = 600;
			this.start.y = 400;
			this.text1.x = 400;
			this.text2.x = 400;
		}
	},
};