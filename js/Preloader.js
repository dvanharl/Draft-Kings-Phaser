BasicGame.Preloader = function (game) {
};

BasicGame.Preloader.prototype = {
	init: function () {
	},

	preload: function () {
		this.load.image('background1','Assets/Background/Non_Photo_Background.jpg');
		this.load.image('background2','Assets/Background/background2.jpg');
		this.load.image('background3','Assets/Background/background3.jpg');
		
		this.load.image('button','Assets/UI/cta_button.png');
		this.load.image('logo','Assets/UI/logo.png');
		this.load.image('nflpa','Assets/UI/NFLPA_Logo.png');
		
		//Preloader Sprites based on selected teams
		////TEST SPRITES
		this.load.image('TomBrady','Assets/Players/Brady_Tom.png');
	},

	create: function () {
		if(settings.screen1){
			this.state.start('Screen1');
		}else if(settings.screen2){
			this.state.start('Screen2');
		}else{
			this.state.start('Screen3');
		}
	},
	
	loadUpdate: function () {
	}
};