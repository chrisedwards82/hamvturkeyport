this.hamvturkey = this.hamvturkey || {};
(function(){
	//
	var Scoreboard = function(bg_asset,digit_asset) {
	  this.initialize(bg_asset,digit_asset);
	}
	var p = Scoreboard.prototype = new createjs.Container();
	//
	p.Container_initialize = p.initialize;
	p.showY = 33;
	p.hideY = -200;
	
	p.initialize = function(bg_asset,digit_asset) {
	    this.Container_initialize();
		var ss = new createjs.SpriteSheet( {
			"framerate":24,
			"animations":{
				"lit":[64,64],
				"bg":[63,63],
				'n0':[23,23],
				"n1":[25,46]
			},
			"images":[digit_asset],
			"frames":{
				"regX":0,
				"regY":0,
				"height":43,
				"width":27,
				"count":65
			}
		});
		this.bg = this.addChild(new createjs.Bitmap(bg_asset));
		this.y = this.showY;
		this.shots = this.addChild(new hamvturkey.Digit(ss));
		this.shots.x = 52; 
		this.saves = this.addChild(new hamvturkey.Digit(ss));
		this.saves.x = 190; 
		this.goals = this.addChild(new hamvturkey.Digit(ss));
		this.goals.x = 335; 
		this.shots.y = this.saves.y = this.goals.y = 57;
	}
	hamvturkey.Scoreboard = Scoreboard;
}());