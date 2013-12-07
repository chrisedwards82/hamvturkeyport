(function() {

	var Ham = function(range) {
	  this.initialize(range);
	}
	var p = Ham.prototype = new createjs.Container();
 	
	p.count = 0;
	p.speed = .1;
	p.range = 100;
	p.background;
	p.sprite;
	//
	p.Container_initialize = p.initialize;
	p.initialize = function(range) {
	    this.Container_initialize();
	 	this.range = range;
		//this.background = new createjs.Shape();
		//this.background.graphics.beginFill(color).drawRect(0, 0, 60,80);
		//this.addChild(this.background);
		this.on("tick", this.handleTick);
		this.mouseChildren = false;
	}
	p.buildSprite = function(img){
		var ss = new createjs.SpriteSheet( {
			'framerate':24,
			"animations":{
				"save":[3,7],
				"rest":[6,6],
				"dance":[0,3]
			},
			"images":[img],
			"frames":{
				"regX":0,
				"regY":0,
				"height":146,
				"width":142,
				"count":11
			}
		});
		ss.getAnimation('dance').speed = .5;
		ss.getAnimation('save').speed = 2;
		ss.getAnimation('save').next = 'rest';
		ss.getAnimation('dance').next = 'rest';
		this.sprite = new createjs.Sprite(ss,'rest');
		this.sprite.scaleX = this.sprite.scaleY = .5;
		this.addChild(this.sprite);
	}
	p.handleTick = function(event) {
		var r = this.range*.5   
		this.sprite.x = r+Math.cos(p.count++*this.speed)*r-25;
		///	console.log(this.background.x);
	}
	p.save = function(){
		this.sprite.gotoAndPlay('save');
	}
	
 
	window.Ham = Ham;
}());