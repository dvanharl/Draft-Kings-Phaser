var BasicGame = {};


BasicGame.Boot = function (game) {};
BasicGame.Boot.prototype = {
    init: function () {

        this.input.maxPointers = 1;
		
		//Make active if on different window
        this.stage.disableVisibilityChange = true;
		
		//Scale game window
		this.scale.maxHeight = window.innerHeight;
		
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.width = this.scale.height *(4/3);
		
    },

    preload: function () {
    },

    create: function () {
        //Move to Preloader State
        this.state.start('Preloader');
    }
};