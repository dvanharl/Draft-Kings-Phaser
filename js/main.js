adInfo.gameOptions = {
	"configId": 196,
    "dashboardId": 32,
	
	"close_button_property1":"false",
	"close_button_property2":"false",
	"close_button_property3":"1",
	"close_button_property4":"false",
	"close_button_animation":"0",
	"close_button_time":"0",
	"close_button_timer":"0",
	"screen1":"true",
	"screen1_timer":"true",
	"screen2":"true",
	"screen3_timer":"true",
	"screen3_install_now":"true",
	"tutorial":"true",
	"max_play_time":"120",
	"disclaimer":"true",
	//
	"preloader_start_countdown":"0",
	"preloader_logo":"true",
	"banner_clickable_on_show":"false",
	"did_interact_time_limit_enabled":"true",
	"did_interact_time_limit":"0",
	"siteLink": "http://www.google.com/"
};

var settings = {};

var teamHome = "";
var teamAway = "";

window.addEventListener('load', function() {
    PlayableSdk.start(startGame);
});

function startGame() {
	
	settings = {
		preloader_start_countdown: PlayableSdk.cfg.getNumber("preloader_start_countdown",0),
		preloader_logo: PlayableSdk.cfg.getBoolean("preloader_logo",true),
		banner_clickable_on_show: PlayableSdk.cfg.getBoolean("banner_clickable_on_show",false),
		did_interact_time_limit_enabled:PlayableSdk.cfg.getBoolean("did_interact_time_limit_enabled",true),
		did_interact_time_limit:PlayableSdk.cfg.getNumber("did_interact_time_limit",0),
		close_button_property1:PlayableSdk.cfg.getBoolean("close_button_property1",false),
		close_button_property2:PlayableSdk.cfg.getBoolean("close_button_property2",false),
		close_button_property3:PlayableSdk.cfg.getNumber("close_button_property3",1),
		close_button_property4:PlayableSdk.cfg.getBoolean("close_button_property4",false),
		close_button_animation:PlayableSdk.cfg.getNumber("close_button_animation",0),
		close_button_time:PlayableSdk.cfg.getNumber("close_button_time",0),
		close_button_timer:PlayableSdk.cfg.getNumber("close_button_timer",0),
		screen1:PlayableSdk.cfg.getBoolean("screen1",true),
		screen1_timer:PlayableSdk.cfg.getBoolean("screen1_timer",true),
		screen2:PlayableSdk.cfg.getBoolean("screen2",true),
		screen3_timer:PlayableSdk.cfg.getBoolean("screen3_timer",true),
		screen3_install_now:PlayableSdk.cfg.getBoolean("screen3_install_now",true),
		tutorial:PlayableSdk.cfg.getBoolean("tutorial",true),
		max_play_time:PlayableSdk.cfg.getNumber("max_play_time",120),
		disclaimer:PlayableSdk.cfg.getBoolean("disclaimer",true),
		siteLink: PlayableSdk.cfg.getString("siteLink","http://www.google.com/")
	};
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

function getWeek(){
	currentDate = new Date();
};

function getHomeTeam(){
	state = PlayableSdk.getRegion();
	switch(state){
		case "AL":
};

function getAwayTeam(homeTeam){
	
};