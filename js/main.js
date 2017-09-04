var gameOptions = {
	preloader_start_countdown:0,
	preloader_logo:true,
	banner_clickable_on_show:false,
	did_interact_time_limit_enabled:true,
	did_interact_time_limit:0,
	close_button_property1:1,
	close_button_property2:1,
	close_button_property3:1,
	close_button_property4:1,
	close_button_animation:0,
	close_button_time:0,
	close_button_timer:0,
	screen1:true,
	screen1_timer:true,
	screen2:true,
	screen3_timer:true,
	screen3_install_now:true,
	tutorial:true,
	max_play_time:120,
	disclaimer_enable:true,
	siteLink: 'http://www.google.com/',
	"region": "VA"
};
var teamHome = "SEA";
var teamAway = "ARI";

window.addEventListener('load', function() {
    PlayableSdk.start(startGame);
	console.log(PlayableSdk.cfg.getCountry());
});

function startGame() {
	//var game = new Phaser.Game(window.innerWidth *window.devicePixelRatio,window.innerHeight*window.devicePixelRatio, Phaser.CANVAS, 'game' );
	var game = new Phaser.Game(800,600, Phaser.CANVAS, 'game' );

	
	//Add Game States
	game.state.add('Boot', BasicGame.Boot);
	game.state.add('Preloader', BasicGame.Preloader);
	game.state.add('Screen1', BasicGame.Screen1);
	game.state.add('Screen2', BasicGame.Screen2);
	game.state.add('Screen3', BasicGame.Screen3);
	
	//Start boot state
	game.state.start('Boot');
};
