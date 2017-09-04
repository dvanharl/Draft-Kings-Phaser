BasicGame.Screen1 = function (game) {
	this.background;
	
	this.titleText1;
	this.titleText2;
	
	this.installNow;
	this.start;
	
	this.timer;
	
	this.logo;
	
	this.landscape;
};

BasicGame.Screen1.prototype = {
	init: function (){
	
	},
	
    create: function () {
		this.landscape = false;
		
		this.background = this.add.sprite(0,0,'background1');
		
		style = {font:"bold 64px Courier",fill:"#ffffff"};
		this.text1 = this.add.text(400,225,'WIN $1,000,000',style);
		this.text1.anchor.setTo(.5,.5);
		style = {font:"36px Arial",fill:"#ffffff"};
		this.text2 = this.add.text(400,300,'Build your team now!',style);
		this.text2.anchor.setTo(.5,.5);
		
		//Install Now Button
		this.installNow = this.add.sprite(200,400,'button');
		this.installNow.anchor.setTo(.5,.5);
		this.installNow.scale.setTo(.2);
		style = {font:"180px OpenSans",fill:"#000000"};
		tempText = this.add.text(0,0,'Install Now',style);
		tempText.anchor.setTo(.5,.5);
		this.installNow.addChild(tempText);
		this.installNow.inputEnabled = true;
		this.installNow.events.onInputUp.add(this.openLink,this);
		
		
		//Start Button
		this.start = this.add.sprite(600,400,'button');
		this.start.anchor.setTo(.5,.5);
		this.start.scale.setTo(.2);
		tempText = this.add.text(0,0,'Start',style);
		tempText.anchor.setTo(.5,.5);
		this.start.addChild(tempText);
		this.start.inputEnabled = true;
		this.start.events.onInputUp.add(this.nextScreen,this);
		
		//Timer to next screen
		this.timer = this.time.create(false);
		this.timer.add(30000,function(){
			this.state.start('Screen2');
		},this);
		/*if(this.timerSet){
			this.timer.start();
		}*/
		
		this.logo = this.add.sprite(700,50,'logo');
		this.logo.anchor.setTo(.5,.5);
		this.logo.scale.setTo(.1);
			
		this.landscape = true;
		this.orientationUpdate();
		this.landscape = false;
		this.orientationUpdate();
		this.landscape = true;
		this.orientationUpdate();
    },

    update: function () {
		this.orientationUpdate();
    },
	
	render: function() {
		/* this.game.debug.text(this.inTutorial,100,25); */
	},
	
	openLink: function(){
		window.open(settings.siteLink);
	},
	
	nextScreen: function(){
		this.state.start('Screen2');
		/*
		if(settings.screen1){
			this.state.start('Screen2');
		}else{
			this.state.start('Screen3');
		}*/
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
			this.installNow.x = 150;
			this.installNow.y = 700;
			this.start.x = 450;
			this.start.y = 700;
			this.text1.x = 300;
			this.text2.x = 300;
		}else if((window.innerWidth/window.innerHeight) > (3/4) && !this.landscape){
			this.landscape = true;
			this.scale.setGameSize(800,600);
			//Rearrange sprites
			this.logo.x = 700;
			this.installNow.x = 200;
			this.installNow.y = 400;
			this.start.x = 600;
			this.start.y = 400;
			this.text1.x = 400;
			this.text2.x = 400;
		}
	},
};